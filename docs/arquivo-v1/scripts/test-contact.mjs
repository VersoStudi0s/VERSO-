import contact from "../netlify/functions/contact.ts";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";

const checks = [];
const originalFetch = globalThis.fetch;
const previousEnv = Object.fromEntries(
  [
    "RESEND_API_KEY",
    "CONTACT_FROM_EMAIL",
    "CONTACT_TO_EMAIL",
    "CONTACT_ALLOWED_ORIGIN",
  ].map((key) => [key, process.env[key]]),
);
const check = (name, result) => {
  assert.ok(result, name);
  checks.push({ name, passed: true });
};
const valid = {
  name: "Teste local",
  email: "test@example.com",
  projectType: "website",
  message: "Mensagem de teste sem envio real a terceiros.",
  website: "",
};
const send = (data = valid, options = {}) =>
  contact(
    new Request("https://verso.test/api/contact", {
      method: options.method || "POST",
      headers: {
        Origin: options.origin || "https://verso.test",
        "Content-Type": "application/json",
      },
      ...(options.method === "GET" ? {} : { body: JSON.stringify(data) }),
    }),
    options.ip ? { ip: options.ip } : undefined,
  );
try {
  for (const key of Object.keys(previousEnv)) delete process.env[key];
  check("Missing configuration returns 503", (await send()).status === 503);
  Object.assign(process.env, {
    RESEND_API_KEY: "test-not-a-real-key",
    CONTACT_FROM_EMAIL: "from@example.com",
    CONTACT_TO_EMAIL: "to@example.com",
    CONTACT_ALLOWED_ORIGIN: "https://verso.test",
  });
  check(
    "Only POST accepted",
    (await send(valid, { method: "GET" })).status === 405,
  );
  check(
    "Unexpected origin rejected",
    (await send(valid, { origin: "https://other.test" })).status === 403,
  );
  check(
    "Invalid email rejected",
    (await send({ ...valid, email: "invalid" })).status === 400,
  );
  check(
    "Honeypot rejected without fake success",
    (await send({ ...valid, website: "spam" })).status === 400,
  );
  check(
    "Short message rejected",
    (await send({ ...valid, message: "short" })).status === 400,
  );
  check(
    "Oversized body rejected",
    (await send({ ...valid, message: "x".repeat(25000) })).status === 413,
  );
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ id: "intercepted-test" }), { status: 200 });
  check(
    "Explicit provider ID required for success",
    (await (await send()).json()).sent === true,
  );
  for (const projectType of [
    "social",
    "uiux",
    "materiais",
    "identidade",
    "grafico",
  ]) {
    check(
      `New and legacy service accepted: ${projectType}`,
      (await send({ ...valid, projectType })).status === 200,
    );
  }
  check(
    "Unknown service rejected",
    (await send({ ...valid, projectType: "unknown" })).status === 400,
  );
  globalThis.fetch = async () =>
    new Response(JSON.stringify({}), { status: 200 });
  check(
    "Unconfirmed provider response rejected",
    (await send()).status === 502,
  );
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ message: "failure" }), { status: 500 });
  check("Provider failure returns 502", (await send()).status === 502);
  globalThis.fetch = async () => {
    throw new Error("offline");
  };
  check("Network failure returns 502", (await send()).status === 502);
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ id: "local-only" }), { status: 200 });
  for (let i = 0; i < 5; i++) await send(valid, { ip: "192.0.2.1" });
  check(
    "Per-instance rate guard returns 429 on sixth request",
    (await send(valid, { ip: "192.0.2.1" })).status === 429,
  );
  console.log(
    `Passed ${checks.length} server contact checks. All provider requests intercepted; no email sent.`,
  );
} finally {
  globalThis.fetch = originalFetch;
  for (const [key, value] of Object.entries(previousEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  await writeFile(
    "docs/contact-results.json",
    JSON.stringify({ realEmailsSent: 0, checks }, null, 2),
  );
}
