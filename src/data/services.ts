export const services = [
  {
    id: "website",
    number: "01",
    title: "Sites e Landing Pages",
    icon: "web",
    description:
      "Sites responsivos para apresentar seu estabelecimento, divulgar serviços e facilitar o contato com clientes.",
    deliverables: [
      "Landing page",
      "Site institucional simples",
      "Página de divulgação",
    ],
    detail: "HTML, CSS, JavaScript e Vue.js, conforme o projeto.",
    projectSlugs: ["versary", "gymflow", "syntax-studio"],
  },
  {
    id: "apps",
    number: "02",
    title: "Apps e Sistemas sob Medida",
    icon: "apps",
    description:
      "Agendamentos, pedidos, cadastro de clientes e controle interno: soluções feitas para a rotina do seu negócio.",
    deliverables: [
      "Sistema de agendamento",
      "App ou sistema web",
      "Painel administrativo",
    ],
    detail: "Vue.js, React, Next.js e banco de dados, conforme o projeto.",
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
    id: "identidade",
    number: "04",
    title: "Identidade Visual e Materiais",
    icon: "materials",
    description:
      "Logotipo, cores, cardápios e catálogos para a sua marca ser reconhecida em todo lugar.",
    deliverables: [
      "Identidade visual",
      "Cardápio / catálogo digital",
      "Kit para redes sociais",
    ],
    detail: "Uma marca consistente do balcão ao Instagram.",
    projectSlugs: ["cafe-aurora"],
  },
] as const;
export const contactTypes = [
  ...services.map(({ id, title }) => ({ value: id as string, label: title })),
  { value: "grafico", label: "Outros materiais gráficos" },
  { value: "outro", label: "Outra ideia" },
];
export function findService(value: unknown) {
  return typeof value === "string"
    ? services.find((service) => service.id === value)
    : undefined;
}
