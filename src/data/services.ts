export const services = [
  {
    id: "website",
    number: "01",
    title: "Sites e Landing Pages",
    icon: "web",
    description:
      "Páginas responsivas para apresentar seu negócio, divulgar serviços e facilitar o contato com clientes.",
    deliverables: [
      "Landing page",
      "Site institucional simples",
      "Página de divulgação",
    ],
    detail: "HTML, CSS, JavaScript e Vue.js, conforme o projeto.",
    projectSlugs: ["versary", "gymflow", "syntax-studio"],
  },
  {
    id: "social",
    number: "02",
    title: "Design para Redes Sociais",
    icon: "social",
    description:
      "Posts, Stories e capas de Reels consistentes com a identidade visual da marca.",
    deliverables: ["Kits de posts", "Templates", "Capas e peças promocionais"],
    detail: "Peças visuais para uma comunicação consistente.",
    projectSlugs: [],
  },
  {
    id: "uiux",
    number: "03",
    title: "UX/UI e Protótipos",
    icon: "uiux",
    description:
      "Interfaces claras e protótipos navegáveis para transformar ideias em experiências digitais.",
    deliverables: ["Wireframes", "Homepage no Figma", "Protótipo de navegação"],
    detail: "Fluxos, interfaces e redesign de páginas.",
    projectSlugs: ["versary", "gymflow", "ritmo-fitness", "syntax-studio"],
  },
  {
    id: "materiais",
    number: "04",
    title: "Materiais Digitais para Negócios",
    icon: "materials",
    description:
      "Cardápios, catálogos e apresentações que organizam seus produtos e serviços de forma profissional.",
    deliverables: [
      "PDF / cardápio digital",
      "Catálogo de produtos",
      "Apresentações",
    ],
    detail: "Informação organizada para o seu público.",
    projectSlugs: ["cafe-aurora"],
  },
] as const;
export const contactTypes = [
  ...services.map(({ id, title }) => ({ value: id as string, label: title })),
  { value: "identidade", label: "Identidade visual" },
  { value: "grafico", label: "Outros materiais gráficos" },
  { value: "outro", label: "Outra ideia" },
];
export function findService(value: unknown) {
  return typeof value === "string"
    ? services.find((service) => service.id === value)
    : undefined;
}
