// Monta links e mensagens de contato. Nada é enviado pelo site:
// o visitante revisa e envia a mensagem no próprio WhatsApp ou e-mail.
import { channels } from "../config/site";
import { findService } from "../content/services";

export type ContactDraft = {
  name: string;
  contact: string;
  serviceId: string;
  description: string;
};

const greeting = "Olá, equipe VERSO*!";

/** Limites de tamanho. Os mesmos valores vão para o maxlength dos campos. */
export const limits = { name: 80, contact: 120, description: 800 } as const;

/** Intervalo mínimo entre dois envios do formulário (limite de tentativas no navegador). */
export const submitCooldownMs = 10_000;

// Remove caracteres de controle (exceto quebra de linha) e corta no limite.
const clean = (value: string, max: number) =>
  value.replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "").trim().slice(0, max);

const isEmail = (value: string) => /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,}$/i.test(value);
const isPhone = (value: string) => /^\+?[\d\s().-]{10,20}$/.test(value) && value.replace(/\D/g, "").length >= 10;

export type DraftErrors = Partial<Record<"name" | "contact" | "description", string>>;

/** Valida o rascunho. Retorna só os campos com erro. */
export const validateDraft = (draft: ContactDraft): DraftErrors => {
  const errors: DraftErrors = {};
  const name = clean(draft.name, limits.name);
  const contact = clean(draft.contact, limits.contact);
  const description = clean(draft.description, limits.description);
  if (name.length < 2) errors.name = "Escreva seu nome.";
  if (!isEmail(contact) && !isPhone(contact))
    errors.contact = "Informe um e-mail válido ou um WhatsApp com DDD.";
  if (description.length < 10) errors.description = "Conte em poucas palavras o que você precisa.";
  return errors;
};

export const defaultMessage = (context?: string) =>
  context
    ? `${greeting} Vi o site de vocês e quero conversar sobre ${context}.`
    : `${greeting} Vi o site de vocês e quero conversar sobre um projeto.`;

export const prototypeMessage = () =>
  `${greeting} Vi o site e quero pedir o protótipo gratuito para o meu negócio.`;

export const buildMessage = (draft: ContactDraft) => {
  const service = findService(draft.serviceId);
  return [
    greeting,
    `Meu nome é ${clean(draft.name, limits.name)}.`,
    service ? `Tenho interesse em: ${service.name}.` : "Ainda não sei qual serviço preciso.",
    "",
    clean(draft.description, limits.description),
    "",
    `Meu contato: ${clean(draft.contact, limits.contact)}`,
  ].join("\n");
};

/** Canal principal de conversa: WhatsApp se configurado; senão, direct do Instagram. */
export const conversationChannel = () =>
  channels.whatsapp
    ? ({ kind: "whatsapp", label: "Conversar no WhatsApp" } as const)
    : ({ kind: "instagram", label: "Chamar no direct" } as const);

export const conversationUrl = (message: string) =>
  channels.whatsapp
    ? `https://wa.me/${channels.whatsapp}?text=${encodeURIComponent(message)}`
    : channels.instagram.direct;

export const emailUrl = (message?: string, subject = "Projeto com a VERSO*") =>
  `mailto:${channels.email}?subject=${encodeURIComponent(subject)}${
    message ? `&body=${encodeURIComponent(message)}` : ""
  }`;
