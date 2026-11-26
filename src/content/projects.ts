// Estudos de caso. Para adicionar um projeto, acrescente um item nesta lista:
// a página /projetos/<slug> é gerada automaticamente na build.
//
// Regras: nunca marcar como "comercial" um trabalho sem cliente real;
// não inventar métricas, depoimentos ou resultados.
// O primeiro cliente real deve entrar com kind "comercial" e featured: true.

export type ProjectKind = "comercial" | "autoral" | "academico" | "conceitual";
export type ProjectGroup = "web" | "sistemas" | "identidade";

export type ProjectImage = {
  /** Nome base em public/images (gera -480/-960.webp) ou caminho .svg em /images/studies. */
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** false quando não existem as variantes -480/-960 (capturas de celular). */
  responsive?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  kind: ProjectKind;
  group: ProjectGroup;
  category: string;
  type: string;
  status: string;
  featured?: boolean;
  tagline: string;
  objective: string;
  problem: string;
  solution: string;
  technologies: readonly string[];
  participation: string;
  result: string;
  next?: string;
  note?: string;
  cover: ProjectImage;
  gallery: readonly ProjectImage[];
  /** Antes e depois (ex.: perfil do Instagram de um cliente). Opcional. */
  comparison?: { before: ProjectImage; after: ProjectImage };
  accent: string;
};

export const kindLabels: Record<ProjectKind, string> = {
  comercial: "Projeto comercial",
  autoral: "Projeto autoral",
  academico: "Projeto acadêmico",
  conceitual: "Projeto conceitual",
};

export const groupLabels: Record<ProjectGroup, string> = {
  web: "Sites e interfaces",
  sistemas: "Sistemas e apps",
  identidade: "Identidade visual",
};

export const projects: readonly Project[] = [
  {
    slug: "versary",
    name: "VERSARY",
    kind: "academico",
    group: "sistemas",
    category: "Sistema web",
    type: "Painel de dados para manutenção industrial",
    status: "Concluído para o Desafios de Ideias",
    tagline: "Registros de manutenção viram informação que dá para consultar.",
    objective:
      "Centralizar registros de manutenção e mostrar indicadores de falhas em um painel fácil de ler.",
    problem:
      "Dados de paradas de máquinas ficam em planilhas. Responder perguntas simples, como qual equipamento mais para e por quê, toma tempo.",
    solution:
      "Painel com indicadores, páginas por máquina, análise de Pareto e importação de planilhas. Os dados ficam em SQLite; a leitura das planilhas e a classificação de falhas usam scripts Python.",
    technologies: ["Next.js", "React", "TypeScript", "SQLite", "Recharts", "Python"],
    participation: "Desenvolvido por integrante do Time VERSO* para o Desafios de Ideias.",
    result:
      "Sistema funcionando localmente com a base de demonstração do próprio repositório. Não foram medidos resultados em uma operação real.",
    note:
      "A identidade visual faz referência à Coca-Cola FEMSA por causa do desafio. Isso não representa vínculo comercial com a marca. Os números nas telas são fictícios.",
    cover: {
      src: "github-versary",
      alt: "Painel de manutenção do VERSARY com indicadores, gráfico de falhas por dia e causas principais.",
      caption: "Painel principal, executado localmente com dados de demonstração.",
      width: 1440,
      height: 1000,
    },
    gallery: [
      {
        src: "github-versary-detail",
        alt: "Tela de análise de Pareto do VERSARY com barras de causas de falha.",
        caption: "Análise de Pareto, com dados fictícios do script de demonstração.",
        width: 1920,
        height: 1200,
      },
    ],
    accent: "#e54858",
  },
  {
    slug: "gymflow",
    name: "GymFlow",
    kind: "autoral",
    group: "sistemas",
    category: "Sistema web",
    type: "Gestão de academia com acesso por perfil",
    status: "Em evolução",
    tagline: "Alunos, treinos e rotina da academia no mesmo lugar, cada um vendo só o que precisa.",
    objective:
      "Organizar alunos, professores, fichas de treino e avaliações sem dar acesso administrativo a todo mundo.",
    problem:
      "Em academias pequenas, ficha de treino, presença e pagamento ficam em papel ou em planilhas diferentes, e qualquer pessoa com a senha vê tudo.",
    solution:
      "Aplicação web com três perfis (administrador, professor e aluno). A separação de permissões existe na API e no banco de dados. Inclui cadastros, fichas com histórico, avaliações, presença e registro manual de pagamentos.",
    technologies: ["React", "TypeScript", "Vite", "Node.js", "Express", "PostgreSQL"],
    participation: "Projeto autoral de integrante do Time VERSO*.",
    result:
      "Build do projeto executado e tela de entrada testada em computador e celular. Os fluxos com login ainda não foram validados com um banco real nesta revisão.",
    next: "Testar os fluxos completos com PostgreSQL e dados de uma academia real.",
    cover: {
      src: "github-gymflow",
      alt: "Tela de entrada do GymFlow em preto e violeta, com a frase Seu negócio. Seu movimento. Seu próximo nível.",
      caption: "Tela de entrada real, executada localmente sem banco conectado.",
      width: 1440,
      height: 1000,
    },
    gallery: [
      {
        src: "github-gymflow-detail",
        alt: "Tela de login do GymFlow em um celular.",
        caption: "A mesma entrada no celular.",
        width: 390,
        height: 844,
        responsive: false,
      },
    ],
    accent: "#ac8cff",
  },
  {
    slug: "ritmo-fitness",
    name: "Ritmo Fitness",
    kind: "autoral",
    group: "sistemas",
    category: "Aplicativo",
    type: "App de treinos para celular",
    status: "Em desenvolvimento",
    tagline: "Treino, evolução e perfil em poucas abas, pensado para a tela do celular.",
    objective:
      "Criar um app de treinos com navegação simples e uma identidade visual consistente em telas pequenas.",
    problem:
      "Apps de treino costumam ter menus demais. A ideia aqui é chegar ao treino do dia em um toque.",
    solution:
      "App em React Native com quatro abas (início, treino, evolução e perfil), detalhes de exercícios e telas de entrada e cadastro. A autenticação está preparada com Supabase.",
    technologies: ["React Native", "Expo", "TypeScript", "Supabase"],
    participation: "Projeto autoral de integrante do Time VERSO*.",
    result:
      "Telas de entrada e cadastro executadas na versão web. Os treinos ainda usam dados de exemplo; o app não foi publicado nas lojas.",
    next: "Conectar os dados reais de treino e validar o login com uma instância do Supabase.",
    cover: {
      src: "github-ritmo-fitness",
      alt: "Tela de entrada do app Ritmo Fitness com o título Bem-vinda de volta e campos de e-mail e senha.",
      caption: "Tela de entrada, versão web do app em execução local.",
      width: 390,
      height: 844,
      responsive: false,
    },
    gallery: [
      {
        src: "github-ritmo-fitness-detail",
        alt: "Tela de cadastro do app Ritmo Fitness.",
        caption: "Cadastro, sem envio de dados.",
        width: 390,
        height: 844,
        responsive: false,
      },
    ],
    accent: "#ed9bb4",
  },
  {
    slug: "cafe-aurora",
    name: "Café Aurora",
    kind: "conceitual",
    group: "identidade",
    category: "Identidade visual",
    type: "Marca e aplicações para cafeteria",
    status: "Estudo concluído",
    tagline: "Um café premium que continua próximo, do pacote ao cardápio.",
    objective:
      "Construir uma marca reconhecível em tamanhos diferentes: embalagem, copo e cardápio.",
    problem:
      "Como passar a ideia de café de qualidade sem parecer distante ou caro demais para o cliente do bairro?",
    solution:
      "Assinatura em serifa clássica com um semicírculo de amanhecer. Paleta vinho, creme e dourado. Versões simplificadas da marca para copo e cardápio, com bastante respiro.",
    technologies: ["Branding", "Tipografia", "Embalagem", "Cardápio"],
    participation: "Estudo de identidade criado por integrante do Time VERSO*.",
    result:
      "Sistema visual e mockups vetoriais. A marca é fictícia: não houve impressão nem lançamento, e os preços do cardápio são de exemplo.",
    cover: {
      src: "/images/studies/cafe-aurora.svg",
      alt: "Mockup vetorial do Café Aurora com pacote de café creme e vinho, copo e cardápio.",
      caption: "Mockups vetoriais originais, não são fotos de material produzido.",
      width: 1500,
      height: 1100,
    },
    gallery: [
      {
        src: "/images/studies/cafe-aurora-detail.svg",
        alt: "Sistema visual Aurora: assinatura serifada e paleta creme, dourado, terra e café.",
        caption: "Sistema visual: assinatura, frase e paleta.",
        width: 1500,
        height: 1100,
      },
    ],
    accent: "#d5af74",
  },
];

/** Projetos comerciais e destacados primeiro; a ordem da lista desempata. */
export const orderedProjects = [...projects].sort(
  (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false) ||
    Number(b.kind === "comercial") - Number(a.kind === "comercial"),
);

export const findProject = (slug: string) => projects.find((project) => project.slug === slug);
