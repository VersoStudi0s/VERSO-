// Dados públicos do estúdio. Tudo o que aparece como canal de contato vem daqui.
// Valores confirmados em docs/PLANO.md, seção 2.

const onlyDigits = (value: string | undefined) =>
  /^\d{10,15}$/.test(value ?? "") ? (value as string) : "";

const validEmail = (value: string | undefined) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value ?? "") ? (value as string) : "";

const httpsOrigin = (value: string | undefined) => {
  try {
    const url = new URL(value ?? "");
    return url.protocol === "https:" ? url.origin : "";
  } catch {
    return "";
  }
};

export const site = {
  name: "VERSO*",
  fullName: "VERSO* Creative Digital Studio",
  tagline: "Design, tecnologia e soluções digitais para negócios.",
  /** Domínio público. Trocar por VITE_SITE_URL quando o domínio próprio estiver ativo. */
  url: httpsOrigin(import.meta.env.VITE_SITE_URL) || "https://verso-e5t.pages.dev",
  locale: "pt_BR",
  workMode: "100% remoto",
} as const;

export const channels = {
  /** Número comercial (só dígitos). Pendente: definir VITE_WHATSAPP_NUMBER. */
  whatsapp: onlyDigits(import.meta.env.VITE_WHATSAPP_NUMBER),
  instagram: {
    handle: "versostudioss",
    url: "https://www.instagram.com/versostudioss/",
    direct: "https://ig.me/m/versostudioss",
  },
  email:
    validEmail(import.meta.env.VITE_CONTACT_EMAIL) ||
    "contato.versostudio@gmail.com",
} as const;
