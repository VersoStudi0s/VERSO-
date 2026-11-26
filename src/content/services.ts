// Serviços anunciados no site.
// Regra do estúdio: só entra aqui o que a equipe entrega hoje com qualidade.
// `priceFrom` fica null até a tabela de preços ser aprovada (ver pricing.ts).

export type ServiceCategory = "web" | "design" | "solucoes";

export type Service = {
  id: string;
  category: ServiceCategory;
  name: string;
  summary: string;
  problem: string;
  includes: readonly string[];
  note?: string;
  priceFrom: number | null;
};

export const serviceCategories: Record<ServiceCategory, { label: string; lead: string }> = {
  web: { label: "Desenvolvimento web", lead: "Presença própria, fora do feed." },
  design: { label: "Design e comunicação", lead: "Uma marca que se reconhece de longe." },
  solucoes: { label: "Soluções digitais", lead: "Ferramentas para a rotina do negócio." },
};

export const services: readonly Service[] = [
  {
    id: "site",
    category: "web",
    name: "Site institucional",
    summary:
      "Um endereço próprio para apresentar o negócio, mostrar o que você faz e levar o cliente direto para a conversa.",
    problem: "Quem procura você fora do Instagram não encontra nada.",
    includes: [
      "Páginas de apresentação, serviços e contato",
      "Layout pensado primeiro para o celular",
      "Botões de WhatsApp e redes sociais",
      "Configuração básica para buscadores",
    ],
    priceFrom: null,
  },
  {
    id: "landing",
    category: "web",
    name: "Landing page",
    summary:
      "Uma página única, focada em uma oferta, um serviço ou um lançamento. Boa para link da bio e anúncios.",
    problem: "A divulgação leva gente para o perfil e a oferta se perde no feed.",
    includes: [
      "Texto organizado em torno de uma oferta",
      "Chamada clara para contato ou compra",
      "Versão para celular e computador",
      "Pronta para usar no link da bio",
    ],
    priceFrom: null,
  },
  {
    id: "identidade",
    category: "design",
    name: "Identidade visual",
    summary:
      "Logotipo, cores e tipografia que fazem o negócio parecer o mesmo no perfil, no cardápio e no site.",
    problem: "Cada material sai de um jeito e a marca não fica na memória.",
    includes: [
      "Logotipo e variações",
      "Paleta de cores e tipografia",
      "Guia simples de uso da marca",
      "Aplicações em perfil e materiais digitais",
    ],
    priceFrom: null,
  },
  {
    id: "social",
    category: "design",
    name: "Artes para redes sociais",
    summary: "Posts, carrosséis e stories com padrão visual, prontos para publicar.",
    problem: "O perfil não passa a confiança que o seu trabalho merece.",
    includes: [
      "Posts e carrosséis",
      "Stories e capas de destaque",
      "Modelos para manter o padrão nas próximas postagens",
    ],
    priceFrom: null,
  },
  {
    id: "materiais",
    category: "design",
    name: "Materiais digitais",
    summary:
      "Cardápio, catálogo ou apresentação comercial para mandar no WhatsApp, por e-mail ou deixar no link da bio.",
    problem: "As informações estão espalhadas em fotos e mensagens soltas.",
    includes: [
      "Cardápio ou catálogo em PDF",
      "Apresentação comercial",
      "Peças para WhatsApp e e-mail",
    ],
    priceFrom: null,
  },
  {
    id: "sistemas",
    category: "solucoes",
    name: "Sistemas e ferramentas sob medida",
    summary:
      "Para rotinas que hoje vivem em planilha ou caderno: cadastros, agendamentos, painéis de controle.",
    problem: "Controle manual que toma tempo e abre espaço para erro.",
    includes: [
      "Entendimento da rotina antes de qualquer proposta",
      "Sistema web com acesso por perfil",
      "Entrega em etapas, com acompanhamento",
    ],
    note: "Avaliamos a viabilidade no briefing. Se não for algo que a gente entregue bem, a gente avisa antes.",
    priceFrom: null,
  },
];

export const findService = (id: unknown) =>
  typeof id === "string" ? services.find((service) => service.id === id) : undefined;
