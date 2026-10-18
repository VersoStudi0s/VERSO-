export interface ContactPayload {
  name: string;
  email: string;
  projectType: string;
  message: string;
  website: string;
}
export class ContactError extends Error {}
export async function sendContact(payload: ContactPayload): Promise<void> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
  if (!endpoint)
    throw new ContactError(
      "O envio está temporariamente indisponível. Nenhuma mensagem foi enviada.",
    );
  const url = new URL(endpoint, window.location.origin);
  if (url.origin !== location.origin && url.protocol !== "https:")
    throw new ContactError(
      "O canal de contato está indisponível. Nenhuma mensagem foi enviada.",
    );
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15000),
    credentials: "omit",
  });
  if (!response.ok)
    throw new ContactError(
      response.status === 429
        ? "Muitas tentativas. Aguarde alguns minutos antes de tentar novamente."
        : "Não foi possível enviar sua mensagem. Tente novamente mais tarde.",
    );
  const result: unknown = await response.json();
  if (
    !result ||
    typeof result !== "object" ||
    !("sent" in result) ||
    result.sent !== true
  )
    throw new ContactError(
      "O serviço não confirmou o envio. Sua mensagem foi preservada para tentar novamente.",
    );
}
