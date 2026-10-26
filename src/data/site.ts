function httpsUrl(value: string | undefined) {
  try {
    const url = new URL(value || "");
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}
export const site = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    import.meta.env.VITE_CONTACT_EMAIL || "",
  )
    ? import.meta.env.VITE_CONTACT_EMAIL
    : "",
  whatsapp: /^\d{10,15}$/.test(import.meta.env.VITE_WHATSAPP_NUMBER || "")
    ? import.meta.env.VITE_WHATSAPP_NUMBER
    : "",
  socials: [
    { label: "GitHub da Renata", url: httpsUrl(import.meta.env.VITE_GITHUB_URL || "https://github.com/renataaap") },
    { label: "LinkedIn", url: httpsUrl(import.meta.env.VITE_LINKEDIN_URL) },
    { label: "Instagram", url: httpsUrl(import.meta.env.VITE_INSTAGRAM_URL) },
  ].filter((link) => link.url),
};
export const navigation = [
  { id: "inicio", label: "Início", number: "01" },
  { id: "servicos", label: "Serviços", number: "02" },
  { id: "projetos", label: "Projetos", number: "03" },
  { id: "processo", label: "Processo", number: "04" },
  { id: "sobre", label: "Sobre", number: "05" },
  { id: "lab", label: "Lab", number: "06" },
  { id: "contato", label: "Contato", number: "07" },
];
