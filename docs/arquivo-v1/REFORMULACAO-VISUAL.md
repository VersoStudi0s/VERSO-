# Reformulação visual VERSO* — 22/10/2026

Implementação no repositório `/workspace/verso`, branch `local/comercial-fase1`. **Não publicada.** A prévia hospedada anteriormente continua na versão antiga. Esta etapa segue o pedido de reconstrução editorial mais recente; a reformulação comercial anterior está registrada separadamente em `REFORMULACAO-COMERCIAL.md`.

## Diagnóstico

A aplicação já usava Vue 3, TypeScript, Composition API, Vue Router, Vite e pré-renderização estática. Filtros, estudos, menu por teclado, orçamento local, adaptador de contato e conteúdo dos projetos foram preservados. Não foi necessário iniciar outro projeto ou adicionar bibliotecas.

O hero anterior tinha uma abertura comercial compacta, a galeria possuía quatro cartões uniformes, os serviços eram blocos em duas colunas e o LAB dependia de expansão. Isso enfraquecia a composição editorial solicitada. A referência `references/verso-aprovado.png` e os oito recursos originais estavam disponíveis e foram examinados. Os Reels citados anteriormente não estavam disponíveis.

Antes de editar, capturei a implementação local em 390, 768 e 1440 px e preservei uma cópia do código em `/workspace/scratch/verso-before-editorial/src`. As imagens “antes” representam a etapa comercial local, não uma captura da versão hospedada.

## Alterações reais na interface

| Área / arquivo | Mudança visível |
| --- | --- |
| `src/sections/HeroSection.vue` | IDEIAS / QUE GANHAM / REALIDADE em três escalas, serifada vermelha inclinada, retrato dominante à direita, cromo independente, textura responsiva, cartão do LAB, anotação e linhas. CTAs para projetos e Sobre. |
| `src/components/SiteHeader.vue` | Marca ampliada, links numerados com sublinhado ativo, orçamento como link editorial e menu próprio em painel. Foco, Escape, bloqueio do conteúdo de fundo e fechamento após navegação preservados. |
| `src/sections/ProjectsSection.vue` | Galeria assimétrica de duas colunas, alturas e deslocamentos diferentes, imagens grandes, números, recorte no experimento, títulos e ação de estudo. Filtros e vínculos com serviços preservados. No celular, uma coluna. |
| `src/sections/ServicesSection.vue` | Quatro faixas numeradas com divisórias, títulos expressivos e fundo vermelho escuro que responde ao hover/foco. Entregáveis e ações permanecem disponíveis sem hover. |
| `src/sections/AboutSection.vue` | Retrato artístico ampliado à esquerda, moldura inclinada, camada vermelha, nota rosa e Renata em serifada à direita. Arte explicitamente identificada como não sendo um retrato da autora. Trajetória continua expansível. |
| `src/sections/LabSection.vue` | LAB aberto na página, grande escultura cromada, profundidade com ponteiro, legendas flutuantes e três modos funcionais: Forma, Tipo e Composição. Pausa e reinício reais. |
| `src/sections/ContactSection.vue` | TRANSFORME SUA IDEIA EM REALIDADE, serifada vermelha, campos escuros com linhas inferiores e rótulos numerados. Validação, revisão/cópia e integração opcional preservadas. |
| `src/pages/HomePage.vue` | Nova hierarquia: hero, projetos, serviços, destaque/processo, Sobre, LAB, habilidades e contato. O painel de acesso ao LAB da etapa anterior foi substituído pelo próprio laboratório visível. |
| `src/sections/SkillsSection.vue` | Faixa compacta com classificação de conhecimentos e controles preservados. |
| `src/pages/ProjectPage.vue` | Entrada visual de título/capa, reiniciada ao navegar entre projetos. Conteúdo verificável e rotas mantidos. |
| `src/composables/usePointerDepth.ts` | Novo controlador reutilizável de profundidade, limitado a mouse, com atualização por frame e limpeza ao desmontar. |
| `src/composables/useReveal.ts`, `src/styles/global.css`, `src/styles/tokens.css` | Máscaras, revelação por elemento, estados persistentes durante atualizações Vue, botões angulares, transições e redução de movimento. |
| `scripts/prerender.mjs` | Preload da variante serifada efetivamente usada no hero, mantendo HTML dos estudos disponível sem JavaScript. |

Os oito recursos aparecem na interface: hero editorial, escultura cromada, retrato lateral, VERSARY, café, streetwear, olho e textura. Originais preservados; imagens WebP e variantes existentes reutilizadas. Não foram inseridos retratos aleatórios, novos clientes ou projetos fictícios apresentados como reais.

## Movimento e acessibilidade

- Hero: revelação por máscaras, entradas em sequência do título, retrato, cromo, descrição e anotações. A navegação permanece disponível.
- Scroll: seções e imagens reveladas pelo Intersection Observer; novos cartões inseridos pelos filtros também são observados.
- Hover/foco: projetos ampliam a imagem e destacam a ação; serviços mudam o fundo e deslocam o título; links e botões respondem ao foco/ponteiro.
- Profundidade: camadas do hero e LAB seguem o mouse com deslocamento máximo de 10 px no eixo horizontal e 7 px no vertical. Touch não ativa esse efeito.
- LAB: movimentos finitos de 4–4,8 segundos, com pausa, continuação e reinício. O movimento começa quando a seção aparece.
- Mobile: composição reorganizada, CTAs empilhados, galeria em uma coluna, controles do LAB abaixo da arte e áreas de toque confortáveis.
- `prefers-reduced-motion`: remove animações/máscaras e profundidade; conteúdo permanece visível. Listeners, observers e frames são limpos ao desmontar.

Foram corrigidos durante a revisão: corte de REALIDADE no mobile; largura excessiva do título desktop; nome acessível do link do LAB; marca de revelação removida por atualizações de classe do Vue; menu limitado pela caixa do cabeçalho com backdrop-filter. Há regressões automatizadas para esses comportamentos. A validação de pausa passou a medir a animação CSS do objeto, separadamente da transição do ponteiro.

## Funcionalidades e conteúdo preservados

VERSARY permanece concluído para o Desafios de Ideias; Café Aurora está identificado como fictício; Syntax Studio continua em desenvolvimento em dupla. As imagens são apresentações ilustrativas, não provas de telas ou resultados reais. O experimento Forma em movimento mantém seu estudo.

Sem endpoint configurado, o contato gera uma mensagem local para revisar e copiar. **Não envia e não simula confirmação.** O fluxo integrado só confirma após resposta explícita do adaptador; loading, falha e validação foram testados com requisições interceptadas. Nenhum e-mail foi enviado durante os testes.

Não foram adicionados cookies, rastreamento, SDKs ou serviços pagos. Política de privacidade e configurações de canais foram mantidas. A aplicação não está apresentada como certificada juridicamente ou integralmente conforme WCAG.

## Capturas e comparação

Capturas reais em Chromium/Playwright, DPR 1. Estados estáticos usam movimento reduzido; testes de movimento usam animações habilitadas.

- [Antes/depois desktop](screenshots/editorial/1440-before-after.jpg)
- [Antes/depois celular](screenshots/editorial/390-before-after.jpg)
- [Referência e hero implementado](screenshots/editorial/reference-hero-comparison.jpg)
- Página completa: [desktop](screenshots/editorial/1440-after-full.png), [tablet](screenshots/editorial/768-after-full.png), [celular](screenshots/editorial/390-after-full.png)
- Comparações por seção: [projetos](screenshots/editorial/comparison-projetos.jpg), [serviços](screenshots/editorial/comparison-servicos.jpg), [Sobre](screenshots/editorial/comparison-sobre.jpg), [LAB](screenshots/editorial/comparison-lab.jpg), [contato](screenshots/editorial/comparison-contato.jpg)
- [Menu mobile](screenshots/editorial/390-menu.png)

O painel aprovado reúne várias composições, não viewports equivalentes. O hero foi comparado em escala normalizada; as demais seções foram comparadas por linguagem, hierarquia, imagens, cores e composição. O pedido mais recente exige galeria assimétrica e serviços em linhas, por isso essas áreas expandem a organização compacta do painel. Não se afirma identidade pixel a pixel.

## Testes

Os comandos e resultados finais estão em `../design-qa.md`, com relatórios JSON em `docs/`. As suítes cobrem oito larguras (320, 360, 390, 768, 1024, 1280, 1440 e 1920), menu, filtros, estudos, orçamento, teclado, toque, navegação entre rotas, movimento e auditorias axe. Build inclui TypeScript e pré-renderização de seis rotas. Não existe script de lint no projeto.

Resultados: 57 verificações na suíte principal, seis fluxos touch adicionais, nove auditorias axe sem violações, sete verificações específicas de motion, três modos do LAB com pausa/reinício, 18 testes do adaptador e seis rotas pré-renderizadas. Nenhum erro de console ou carregamento foi registrado na suíte principal.

Lighthouse mobile local: **82 desempenho / 100 acessibilidade / 100 boas práticas / 100 SEO**. O LCP simulado caiu de 7,7 s para 4,5 s após otimizar a entrega das texturas; CLS 0. O LCP ainda está acima da meta de 2,5 s, uma limitação medida que permanece para acompanhamento em hospedagem real. Relatórios inicial, intermediário e final preservados.

## Pendências reais

1. Fornecer canais profissionais autorizados e configurar o provedor/endpoint para envio real. Guia em [SETUP.md](SETUP.md). Atualizar a política conforme o tratamento efetivamente adotado.
2. Acrescentar evidências e detalhes confirmados dos projetos; a capa streetwear de Syntax é ilustrativa e não confirma o segmento comercial da loja.
3. Se desejar substituir a arte editorial por fotografia pessoal, fornecer um retrato autorizado. Não é necessário para o tratamento artístico atual.
4. As fontes exatas, objetos e mockups editáveis do painel não foram entregues; o kit contém variações. Não faltam recursos para esta composição, mas reproduzir literalmente esses detalhes depende dos arquivos correspondentes.
5. Acompanhar e reduzir o LCP de 4,5 s medido em mobile simulado, avaliando a entrega das imagens/fontes no host escolhido.
6. Publicação permanece fora desta entrega, conforme solicitado.
