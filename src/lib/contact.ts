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
    `Meu nome é ${draft.name.trim()}.`,
    service ? `Tenho interesse em: ${service.name}.` : "Ainda não sei qual serviço preciso.",
    "",
    draft.description.trim(),
    "",
    `Meu contato: ${draft.contact.trim()}`,
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
