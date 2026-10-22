// Optional server-only adapter. Do not deploy without completing docs/SETUP.md.
// The provider accepts an email; this does not prove inbox delivery.
const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
// Bounded, per-instance abuse guard; configure distributed rate limiting on the host too.
const attempts = new Map<string, { count: number; until: number }>();
const reply = (status: number, message: Record<string, unknown>) =>
  new Response(JSON.stringify(message), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
export default async (
  request: Request,
  context?: { ip?: string },
): Promise<Response> => {
  if (request.method !== "POST") return reply(405, { sent: false });
  const {
    RESEND_API_KEY,
    CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL,
    CONTACT_ALLOWED_ORIGIN,
  } = process.env;
  if (
    !RESEND_API_KEY ||
    !CONTACT_FROM_EMAIL ||
    !CONTACT_TO_EMAIL ||
    !CONTACT_ALLOWED_ORIGIN
  )
    return reply(503, { sent: false });
  if (request.headers.get("Origin") !== CONTACT_ALLOWED_ORIGIN)
    return reply(403, { sent: false });
  if (context?.ip) {
    const now = Date.now(),
      previous = attempts.get(context.ip);
    if (previous && previous.until > now && previous.count >= 5)
      return reply(429, { sent: false });
    if (attempts.size > 10000) attempts.clear();
    attempts.set(
      context.ip,
      previous && previous.until > now
        ? { ...previous, count: previous.count + 1 }
        : { count: 1, until: now + 60000 },
    );
  }
  if (!request.headers.get("Content-Type")?.startsWith("application/json"))
    return reply(415, { sent: false });
  if (Number(request.headers.get("Content-Length") || 0) > 24000)
    return reply(413, { sent: false });
  let data: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 24000)
      return reply(413, { sent: false });
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return reply(400, { sent: false });
    data = parsed as Record<string, unknown>;
  } catch {
    return reply(400, { sent: false });
  }
  if (typeof data.website !== "string" || data.website)
    return reply(400, { sent: false });
  const { name, email, message, projectType } = data;
  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.length > 100 ||
    typeof email !== "string" ||
    email.length > 254 ||
    !validEmail(email.trim()) ||
    typeof message !== "string" ||
    message.trim().length < 20 ||
    message.length > 5000 ||
    typeof projectType !== "string" ||
    ![
      "website",
      "social",
      "uiux",
      "materiais",
      "identidade",
      "grafico",
      "outro",
    ].includes(projectType)
  )
    return reply(400, { sent: false });
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email.trim(),
        subject: `Contato VERSO — ${projectType}`,
        text: `Nome: ${name.trim()}\nE-mail: ${email.trim()}\nProjeto: ${projectType}\n\n${message.trim()}`,
      }),
      signal: AbortSignal.timeout(12000),
    });
    const body: unknown = await result.json();
    if (
      !result.ok ||
      !body ||
      typeof body !== "object" ||
      !("id" in body) ||
      typeof body.id !== "string"
    )
      return reply(502, { sent: false });
    return reply(200, { sent: true });
  } catch {
    return reply(502, { sent: false });
  }
};
export const config = { path: "/api/contact" };
