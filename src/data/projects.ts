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
    subtitle: "Sistema de gestão industrial",
    description:
      "Uma investigação sobre clareza, dados e interfaces para a indústria.",
    categories: ["Websites", "UI/UX"],
    tags: ["UI/UX", "Dashboard", "Desenvolvimento"],
    image: "projeto-versary",
    alt: "Mockup ilustrativo de um notebook com dashboard vermelho e preto.",
    status: "Estudo conceitual",
    context:
      "O VERSARY é apresentado aqui como um conceito de sistema de gestão industrial. A proposta explora como organizar informações operacionais em uma interface compreensível.",
    problem:
      "Como tornar dados de operação e ocorrências de máquinas mais fáceis de consultar, sem sobrecarregar a interface?",
    objectives: [
      "Definir uma hierarquia clara para indicadores e ocorrências.",
      "Explorar fluxos de consulta e organização dos dados.",
      "Construir uma direção de interface acessível e responsiva.",
    ],
    participation:
      "Proposta de direção de interface e organização do estudo. As etapas executadas, o código do produto e a participação detalhada ainda precisam ser documentados pela autora.",
    process: [
      "Contexto e necessidades: hipótese de uso industrial, a validar com pessoas da área.",
      "Arquitetura: proposta de agrupamento de indicadores, máquinas e ocorrências.",
      "Interface: exploração visual por meio do mockup fornecido.",
    ],
    solution:
      "A direção proposta reúne indicadores e visualizações em um painel central. A imagem é um mockup de apresentação, não uma captura de um sistema funcional.",
    results:
      "Não há métricas, testes com usuários ou resultados de implantação documentados. O material disponível é uma exploração visual.",
    learning:
      "O próximo passo é transformar as hipóteses em fluxos testáveis e documentar decisões, implementação e aprendizados reais.",
  },
  {
    slug: "cafe-aurora",
    number: "02",
    name: "Café Aurora",
    subtitle: "Identidade visual",
    description:
      "Texturas, contraste e uma atmosfera que desperta os sentidos.",
    categories: ["Identidade"],
    tags: ["Branding", "Direção de arte"],
    image: "projeto-cafe-aurora",
    alt: "Mockup conceitual de café com xícaras, grãos e embalagem em preto e vermelho.",
    status: "Estudo conceitual",
    context:
      "Uma exploração conceitual de identidade para uma marca de café. Não representa um cliente contratado nem uma marca comercial confirmada.",
    problem:
      "Como traduzir a experiência sensorial do café em uma linguagem visual coerente?",
    objectives: [
      "Investigar a relação entre textura, cor e percepção.",
      "Explorar aplicações de identidade em materiais físicos e digitais.",
    ],
    participation:
      "Curadoria do conceito apresentado no portfólio. Autoria dos materiais finais e processo detalhado pendentes de confirmação.",
    process: [
      "Referências: universo sensorial do café.",
      "Direção visual: superfícies escuras, contraste e luz vermelha.",
      "Aplicação: mockup ilustrativo de embalagem e composição de produto.",
    ],
    solution:
      "Uma linguagem de contraste e texturas aplicada à apresentação conceitual de produtos.",
    results:
      "Mockup visual disponível. Não existem resultados comerciais ou validações documentadas.",
    learning:
      "Validar legibilidade, reprodução de cores e consistência da identidade em aplicações reais.",
  },
  {
    slug: "syntax-studio",
    number: "03",
    name: "Syntax Studio",
    subtitle: "Conceito de e-commerce",
    description:
      "Uma direção digital para explorar moda, imagem e experiência de compra.",
    categories: ["Websites", "UI/UX"],
    tags: ["E-commerce", "Interface"],
    image: "projeto-streetwear",
    alt: "Mockup ilustrativo de uma loja de streetwear em um monitor, com roupas escuras.",
    status: "Conceito · nome a confirmar",
    context:
      "Estudo de e-commerce baseado no mockup de streetwear fornecido. A associação do nome Syntax Studio a essa arte ainda precisa ser confirmada.",
    problem:
      "Como conciliar uma direção de arte expressiva com uma navegação de catálogo clara?",
    objectives: [
      "Explorar apresentação de produto e navegação.",
      "Investigar hierarquia e adaptação da interface para dispositivos móveis.",
    ],
    participation:
      "Organização do conceito para apresentação. Tecnologias e etapas de um produto implementado não foram fornecidas.",
    process: [
      "Referência: mockup de moda fornecido.",
      "Exploração: contraste entre fotografia e elementos de interface.",
      "Próxima etapa: desenhar e validar o fluxo de catálogo.",
    ],
    solution:
      "Direção visual de uma vitrine digital. Não há checkout, catálogo operacional ou produto publicado documentado.",
    results: "Exploração visual, sem métricas ou vendas atribuídas.",
    learning:
      "Transformar a composição em um protótipo navegável e validar a experiência de descoberta de produtos.",
  },
  {
    slug: "lab-movimento",
    number: "04",
    name: "Forma em movimento",
    subtitle: "Laboratório interativo",
    description: "Um estudo real de movimento, composição e interação na web.",
    categories: ["Experimentos"],
    tags: ["Vue", "CSS", "Motion"],
    image: "olho-editorial",
    alt: "Composição editorial de um olho em preto e branco com fragmentos vermelhos.",
    status: "Experimento interativo",
    context:
      "Experimento desenvolvido como parte deste portfólio. O laboratório combina tipografia cinética, um objeto cromado em camada 2D e controles de movimento.",
    problem:
      "Como adicionar profundidade e personalidade preservando controle, acessibilidade e fluidez?",
    objectives: [
      "Oferecer controles acessíveis por teclado e toque.",
      "Respeitar a preferência por movimento reduzido.",
      "Usar transformações leves, sem renderizador 3D.",
    ],
    participation:
      "Concepção da interação e implementação no portfólio VERSO*.",
    process: [
      "Separar o objeto transparente da composição.",
      "Criar estados de forma, tipografia e composição em Vue.",
      "Testar pausa, foco, toque e preferência por movimento reduzido.",
    ],
    solution:
      "Uma experiência com três modos e controle explícito de movimento. O objeto é uma imagem animada em 2D, sem alegação de rotação 3D real.",
    results:
      "Experimento disponível na seção LAB* deste site. A validação técnica está registrada na documentação do projeto.",
    learning:
      "Pequenos controles e estados claros permitem que o movimento seja parte da interface sem limitar seu uso.",
  },
];
