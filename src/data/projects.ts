import type { Category, Project } from "../types/project";
export const categories: Category[] = [
  "Todos",
  "Websites",
  "UI/UX",
  "Identidade",
  "Experimentos",
];
export const projects: Project[] = [
  {
    slug: "versary",
    number: "01",
    name: "VERSARY",
    repository: "renataaap/versary",
    subtitle: "Dados para a manutenção industrial",
    description:
      "Consulta de ocorrências, análise de falhas e importação de planilhas em uma aplicação de manutenção industrial.",
    categories: ["Websites", "UI/UX"],
    tags: ["Next.js", "TypeScript", "SQLite"],
    techStack: ["Next.js", "React", "TypeScript", "SQLite", "Python"],
    image: "github-versary",
    alt: "Captura real do dashboard VERSARY com indicadores e dados locais de demonstração.",
    imageCaption:
      "Interface real executada localmente a partir do repositório público. Base fictícia gerada pelo próprio script prepare_demo.py; não são dados de uma fábrica.",
    accent: "#e54858",
    status: "Projeto acadêmico · estudo de caso",
    context:
      "O VERSARY foi desenvolvido para o Desafios de Ideias, conforme relato da autora. O código público organiza consultas e análises de manutenção industrial. A identidade do sistema faz referência à Coca-Cola FEMSA; isso não representa vínculo comercial ou contratação pela marca.",
    problem:
      "Como transformar registros de manutenção em informações consultáveis sobre equipamentos, ocorrências e causas de parada?",
    objectives: [
      "Centralizar a consulta de registros importados.",
      "Apresentar indicadores e análises de falhas.",
      "Permitir importação de planilhas para atualizar a base.",
    ],
    technologies:
      "Next.js, React, TypeScript, Recharts, SQLite (better-sqlite3) e scripts Python. O pacote também contém mysql2, mas as rotas consultadas usam o adaptador SQLite.",
    process: [
      "Rotas separadas para dashboard, máquinas, Pareto, Jack-Knife, tabelas e predições.",
      "Persistência em SQLite com catálogo de datasets e importação transacional.",
      "Leitura de planilhas e classificação de falhas delegadas a scripts Python.",
    ],
    solution:
      "O dashboard resume os registros importados. As páginas de máquinas e análises exploram o mesmo conjunto de dados. O código inclui importação Excel e rotas de classificação preditiva; estas dependem de Python, bibliotecas e modelos configurados.",
    results:
      "Dashboard e análise Pareto capturados em execução local com o dataset de demonstração do repositório. Não foram medidos resultados operacionais nem validada a qualidade preditiva do modelo.",
    learning:
      "O código evidencia a importância de separar importação, armazenamento e apresentação. A validação com dados de operação e a configuração dos modelos continuam sendo etapas distintas da verificação visual.",
    documentationNote:
      "Conteúdo conferido no README, package.json, src/app/api e src/lib/sqlite.ts em 22/10/2026. A autoria detalhada de cada módulo não foi atribuída sem confirmação.",
    gallery: [
      {
        image: "github-versary-detail",
        alt: "Tela real da análise Pareto do VERSARY com dados demonstrativos.",
        caption:
          "Análise Pareto — captura local, com dados fictícios do script de demonstração.",
      },
    ],
  },
  {
    slug: "gymflow",
    number: "02",
    name: "GymFlow",
    repository: "renataaap/gymflow",
    subtitle: "Gestão de academia, por perfil",
    description:
      "Uma aplicação web que reúne alunos, treinos, avaliações e rotinas administrativas, com acesso por perfil.",
    categories: ["Websites", "UI/UX"],
    tags: ["React", "TypeScript", "PostgreSQL"],
    techStack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL"],
    image: "github-gymflow",
    alt: "Tela real de entrada do GymFlow em preto e violeta, com formulário de login.",
    imageCaption:
      "Captura da interface real de login em execução local. Nenhuma conta ou informação de aluno foi acessada. O banco PostgreSQL não foi conectado; a resposta de sessão anônima (401) foi simulada apenas para abrir a tela de entrada.",
    accent: "#ac8cff",
    status: "Projeto autoral · estudo de caso",
    context:
      "GymFlow é um sistema web de gestão de academia no GitHub da autora. A versão inspecionada usa React, API Express e PostgreSQL, com três perfis de acesso: administrador, professor e aluno.",
    problem:
      "Como organizar informações de alunos e treinos sem conceder o mesmo acesso administrativo a todos os perfis?",
    objectives: [
      "Organizar alunos, professores e exercícios.",
      "Manter fichas e histórico de treinos.",
      "Separar permissões e dados por perfil de acesso.",
    ],
    technologies: "React, TypeScript, Vite, Node.js, Express e PostgreSQL.",
    process: [
      "Componentes React separados para dashboard, páginas, formulários e execução de treinos.",
      "API com sessões, validação e operações transacionais.",
      "Migrações SQL com políticas Row Level Security e versionamento de fichas.",
    ],
    solution:
      "O código inclui cadastros, fichas de treino, avaliações, presença, planos e registros manuais de pagamentos. A separação de permissões aparece tanto na API quanto nas políticas do PostgreSQL. Não há gateway de pagamento, prescrição automática por IA ou envio de e-mail operacional nesta versão.",
    results:
      "Build do repositório executado e interface de entrada capturada em desktop e celular. Os fluxos autenticados não foram testados nesta revisão: o PostgreSQL embarcado exigiu uma biblioteca de sistema ausente (libicuuc.so.60).",
    learning:
      "O projeto permite estudar autorização em mais de uma camada e preservação do histórico. Verificar essas garantias exige testes com PostgreSQL real; uma captura da interface não comprova o funcionamento completo da API.",
    documentationNote:
      "Conferência de README, src/main.tsx, src/Pages.tsx, server/app.js e db/migrations. Funcionalidades descritas a partir do código, sem métricas comerciais.",
    gallery: [
      {
        image: "github-gymflow-detail",
        alt: "Login responsivo real do GymFlow em uma viewport de celular.",
        caption:
          "Acesso em celular — interface real, sem autenticação ou banco conectado.",
      },
    ],
  },
  {
    slug: "ritmo-fitness",
    number: "03",
    name: "Ritmo Fitness",
    repository: "renataaap/app_fitness",
    subtitle: "Uma experiência fitness em movimento",
    description:
      "Aplicativo com navegação por treino, evolução e perfil. Interface em React Native e autenticação preparada com Supabase.",
    categories: ["UI/UX"],
    tags: ["React Native", "Expo", "TypeScript"],
    techStack: ["React Native", "Expo", "TypeScript", "Supabase"],
    image: "github-ritmo-fitness",
    alt: "Tela real de entrada do Ritmo Fitness, com título Bem-vinda de volta e campos de e-mail e senha.",
    imageCaption:
      "Captura real da versão web do aplicativo Expo. Execução local com configuração fictícia e inativa do Supabase; nenhum cadastro ou login foi enviado.",
    accent: "#ed9bb4",
    status: "Projeto autoral · em desenvolvimento",
    context:
      "Ritmo Fitness é um aplicativo fitness feminino. O README descreve uma primeira versão com conteúdo fictício e local; o código atual já acrescenta serviços de autenticação e perfil com Supabase. Essa integração não foi validada contra uma instância real.",
    problem:
      "Como apresentar treino e evolução com uma navegação simples e uma identidade visual consistente em telas pequenas?",
    objectives: [
      "Separar início, treino, evolução e perfil em abas.",
      "Apresentar detalhes dos exercícios.",
      "Preparar entrada, cadastro e dados de perfil.",
    ],
    technologies:
      "Expo, Expo Router, React Native, TypeScript e cliente Supabase. A versão web usa React Native Web.",
    process: [
      "Rotas de autenticação separadas das abas do aplicativo.",
      "Componentes reutilizáveis para exercícios, tags e estrutura de tela.",
      "Contexto de autenticação e serviços de perfil separados da apresentação.",
    ],
    solution:
      "As telas de treino usam dados demonstrativos de src/data/mockData. Os serviços de autenticação implementam entrada, cadastro, saída e leitura de sessão; o serviço de perfil consulta a tabela profiles no Supabase. Isso requer ambiente e permissões configurados.",
    results:
      "Telas de entrada e cadastro executadas e capturadas na versão web. Não foram acessadas contas reais, testada persistência remota ou verificada distribuição em lojas de aplicativos.",
    learning:
      "A evolução de um protótipo local para um aplicativo conectado exige manter documentação e código alinhados, além de validar autenticação, permissões e persistência separadamente da interface.",
    documentationNote:
      "Fontes: README, app/(tabs), src/data/mockData, src/contexts/AuthContext.tsx, services/auth.ts e services/profile.ts. Nenhuma credencial real foi utilizada.",
    gallery: [
      {
        image: "github-ritmo-fitness-detail",
        alt: "Tela real de cadastro do aplicativo Ritmo Fitness em celular.",
        caption:
          "Cadastro — captura local da interface Expo, sem envio de dados.",
      },
    ],
  },
  {
    slug: "cafe-aurora",
    number: "05",
    name: "Café Aurora",
    subtitle: "Identidade para uma cafeteria premium",
    description:
      "Uma identidade acolhedora aplicada a embalagem, copo e cardápio. Sofisticação nos pontos de contato do dia a dia.",
    categories: ["Identidade"],
    tags: ["Branding", "Embalagem", "Materiais visuais"],
    image: "study-cafe-aurora",
    accent: "#d5af74",
    alt: "Mockup vetorial Café Aurora com pacote de café em creme e vinho, copo e cardápio impresso.",
    imageCaption:
      "Marca fictícia e aplicações conceituais. Mockups vetoriais originais; não são fotografias de materiais produzidos.",
    status: "Projeto conceitual · branding",
    context:
      "Café Aurora é uma marca fictícia, inicialmente explorada em conversa com o ChatGPT e reorganizada aqui como estudo de identidade aplicada. Não representa uma cafeteria contratante.",
    problem:
      "Como comunicar um café premium com proximidade, sem depender de uma estética luxuosa e distante?",
    objectives: [
      "Construir uma assinatura reconhecível em diferentes escalas.",
      "Combinar uma paleta quente com composição editorial.",
      "Manter consistência entre embalagem, copo e cardápio.",
    ],
    process: [
      "Escolha de serifada clássica e assinatura com referência ao amanhecer.",
      "Definição de vinho, creme e dourado como sistema cromático.",
      "Aplicação do sistema em três suportes com hierarquias próprias.",
    ],
    solution:
      "A palavra Aurora conduz a identidade. O semicírculo do amanhecer acompanha a embalagem, enquanto cardápio e copo usam versões mais simples da marca. O espaço em branco sustenta a leitura.",
    results:
      "Sistema visual e aplicações digitais apresentados neste estudo. Não houve impressão, lançamento ou avaliação comercial; os valores do cardápio são fictícios.",
    learning:
      "Uma futura etapa de produção exigiria validar legibilidade em escala real, materiais, acabamento e especificações de impressão.",
    gallery: [
      {
        image: "study-cafe-aurora-detail",
        alt: "Sistema visual Aurora: assinatura serifada, frase Um ritual todos os dias e paleta creme, dourado, terra e café.",
        caption:
          "02 / Sistema visual — a mesma linguagem em embalagem e comunicação.",
      },
    ],
  },
  {
    slug: "syntax-studio",
    number: "04",
    name: "Syntax Studio",
    subtitle: "E-commerce conceitual de streetwear",
    description:
      "Catálogo editorial e peças essenciais. Um estudo de direção de arte que conecta marca, coleção e página de produto.",
    categories: ["Websites", "UI/UX"],
    tags: ["Web design", "UI/UX", "Direção de arte"],
    image: "study-syntax-studio",
    accent: "#bfc8c0",
    alt: "Proposta de e-commerce Syntax com tipografia Every day, catálogo de camisetas e layout editorial em cinza e off-white.",
    imageCaption:
      "Direção conceitual de streetwear com desenhos vetoriais de produtos. Não é uma captura da loja em desenvolvimento.",
    status: "Projeto autoral · em desenvolvimento",
    summaryRole: "Loja em desenvolvimento por Renata e João Gustavo",
    context:
      "A Syntax Studio é uma loja em desenvolvimento por Renata e João Gustavo. A proposta de streetwear apresentada aqui é um estudo conceitual para o portfólio; não afirma o segmento, o catálogo ou o lançamento da loja real.",
    problem:
      "Como equilibrar uma linguagem fashion marcante com a clareza necessária para explorar um catálogo?",
    objectives: [
      "Criar uma abertura editorial com acesso direto à coleção.",
      "Dar destaque ao produto sem competir com a navegação.",
      "Organizar tamanho, cor e ação principal na página de produto.",
    ],
    process: [
      "Composição de uma homepage com coleção em destaque e peça complementar.",
      "Desenho de produtos vetoriais para manter uma linguagem uniforme.",
      "Estudo de página de produto com seleção de tamanho e ação de compra.",
    ],
    solution:
      "Tipografia sem serifa em grande escala, tons neutros e áreas distintas para campanha e compra. A página de produto reduz a linguagem editorial para priorizar as decisões de seleção.",
    results:
      "Duas interfaces conceituais documentadas. Não há checkout operacional, catálogo comercial ou métricas de conversão associados a essas pranchas.",
    learning:
      "As próximas decisões dependem de catálogo, fotografia de produto e requisitos confirmados com a dupla de desenvolvimento.",
    gallery: [
      {
        image: "study-syntax-studio-detail",
        alt: "Estudo de página de produto Syntax Daily tee com camiseta, opções de tamanho e ação de seleção.",
        caption:
          "03 / Página de produto — hierarquia para escolher, sem perder a identidade.",
      },
    ],
  },
  {
    slug: "pulse-lab",
    selected: false,
    number: "04",
    name: "Pulse Lab",
    subtitle: "Landing page para um estúdio criativo",
    description:
      "Tipografia com presença e movimento com intenção. Uma experiência de apresentação para uma marca digital fictícia.",
    categories: ["Websites", "Experimentos"],
    tags: ["Landing page", "Motion", "Front-end concept"],
    image: "study-pulse-lab",
    accent: "#e54858",
    alt: "Landing page conceitual Pulse Lab com título Make it move, navegação simples e quadrados vermelhos concêntricos.",
    imageCaption:
      "Layout autoral para um estúdio fictício. A prancha representa o conceito visual, não um site de cliente publicado.",
    status: "Projeto autoral · front-end concept",
    context:
      "Pulse Lab é um estúdio criativo e tecnológico fictício, criado como exercício de apresentação digital. O conceito explora a relação entre escala tipográfica, ritmo e clareza de navegação.",
    problem:
      "Como demonstrar personalidade técnica sem recorrer a objetos futuristas ou animações que atrapalhem a leitura?",
    objectives: [
      "Usar tipografia como elemento visual principal.",
      "Organizar uma chamada principal e serviços em sequência clara.",
      "Relacionar movimento a hierarquia e resposta à interação.",
    ],
    process: [
      "Construção do layout com título em duas linhas e uma ação principal.",
      "Criação de um módulo geométrico a partir de quadrados repetidos.",
      "Aplicação do princípio de movimento controlável ao laboratório do VERSO*.",
    ],
    solution:
      "Um fundo claro, texto preto e vermelho pontual. A geometria repetida sugere ritmo sem simular uma tecnologia inexistente. O LAB deste portfólio permite explorar forma, tipografia e composição.",
    results:
      "Landing page apresentada como layout conceitual. O experimento de movimento pode ser usado no LAB do VERSO*; não há site independente do Pulse Lab ou resultados de campanha.",
    learning:
      "Motion precisa respeitar leitura e preferência do sistema. A evolução do conceito pode transformar os estudos em um protótipo navegável completo.",
    gallery: [
      {
        image: "study-pulse-lab-detail",
        alt: "Prancha tipográfica Pausa, Ritmo, Ação com barras gráficas de alturas alternadas.",
        caption: "04 / Direção de movimento — pausa, hierarquia e resposta.",
      },
    ],
  },
  {
    slug: "numa-skin",
    selected: false,
    number: "05",
    name: "Numa Skin",
    subtitle: "Marca conceitual de skincare",
    description:
      "Um sistema visual mínimo para uma rotina essencial. Da embalagem à experiência digital, com calma e consistência.",
    categories: ["Identidade", "Websites", "UI/UX"],
    tags: ["Branding", "E-commerce", "UI visual"],
    image: "study-numa-skin",
    accent: "#b5c0a6",
    alt: "Mockups vetoriais da marca Numa Skin: frascos claros e embalagem verde-sálvia em uma composição minimalista.",
    imageCaption:
      "Marca e embalagens fictícias, desenhadas em vetor. Não representam cosméticos formulados, testados ou vendidos.",
    status: "Projeto conceitual · marca e digital",
    context:
      "Numa Skin é uma marca fictícia criada para investigar uma identidade premium e minimalista. O estudo abrange assinatura, aplicações de embalagem e uma proposta de e-commerce.",
    problem:
      "Como comunicar simplicidade e cuidado sem depender de promessas cosméticas ou de excesso de elementos visuais?",
    objectives: [
      "Construir uma identidade silenciosa e reconhecível.",
      "Manter continuidade entre produto e interface.",
      "Priorizar legibilidade e uma navegação com poucas decisões.",
    ],
    process: [
      "Definição da assinatura serifada em caixa baixa.",
      "Exploração de sálvia, creme e cinza quente em mockups vetoriais.",
      "Aplicação da identidade a uma homepage com uma ação principal.",
    ],
    solution:
      "Embalagens de formas simples, tipografia contida e espaço entre os elementos. A interface usa a mesma paleta e traz o produto para o centro da experiência.",
    results:
      "Sistema conceitual de marca, mockups de embalagem e proposta de homepage. Não há formulação, alegação de eficácia, produto físico ou operação comercial.",
    learning:
      "Para uma marca real, a etapa seguinte exigiria pesquisa com público, fotografia, informações regulatórias e validação dos materiais de embalagem.",
    gallery: [
      {
        image: "study-numa-skin-detail",
        alt: "Homepage conceitual Numa Skin com título Menos passos, Mais presença e apresentação do produto em sálvia e creme.",
        caption:
          "05 / Continuidade visual — da embalagem à primeira dobra do e-commerce.",
      },
    ],
  },
  {
    slug: "lab-movimento",
    number: "LAB",
    selected: false,
    name: "Forma em movimento",
    subtitle: "Laboratório interativo",
    description:
      "Estudo de movimento, tipografia e composição implementado neste portfólio.",
    categories: ["Experimentos"],
    tags: ["Vue", "CSS", "Motion"],
    image: "study-lab-grid",
    alt: "Prancha de módulos geométricos em vermelho, preto e creme.",
    imageCaption:
      "Composição vetorial original, parte do laboratório do VERSO*.",
    status: "Experimento interativo",
    context:
      "O LAB reúne três explorações controláveis de forma, tipografia e composição. A rota original foi preservada após a nova curadoria dos projetos.",
    technologies: "Vue 3, TypeScript, CSS e Intersection Observer.",
    results:
      "Experimentos disponíveis neste site com pausa, reinício e respeito à preferência por movimento reduzido.",
  },
];
export const selectedProjects = projects
  .filter((project) => project.selected !== false)
  .sort((a, b) => Number(a.number) - Number(b.number));
