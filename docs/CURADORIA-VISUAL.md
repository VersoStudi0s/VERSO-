> Registro histórico da etapa anterior. A seleção e as imagens dos sistemas foram atualizadas na [integração GitHub](GITHUB-INTEGRACAO.md).

# VERSO* — Curadoria visual dos projetos

## Mudança solicitada

Esta etapa substitui a direção de imagens surreal/editorial do kit anterior por projetos com aplicações plausíveis, mantendo a base preta/vermelha e a tipografia do VERSO*. O pedido mais recente substitui a exigência anterior de reproduzir as fotografias e esculturas do mockup aprovado.

Não foram geradas novas fotografias de pessoas ou produtos. As novas peças são **layouts e mockups vetoriais originais produzidos em SVG nesta implementação**. Não devem ser descritas como fotografias, materiais fabricados ou capturas de sistemas entregues. São estudos gráficos, com esse contexto explícito nas páginas.

## Nova seleção

| Projeto | Direção e aplicações | Contexto preservado |
| --- | --- | --- |
| VERSARY | Dashboard escuro, hierarquia de indicadores, gráficos, tabela de ordens; apresentação em notebook e prancha de interface. | O projeto original foi concluído para o Desafios de Ideias. Esta interface é uma proposta conceitual nova, com dados fictícios, não uma tela final daquele sistema. |
| Café Aurora | Vinho e creme, assinatura serifada, embalagem, copo, cardápio e sistema cromático. | Marca fictícia, originada em conversa com o ChatGPT e reorganizada como estudo aplicado. Sem cafeteria cliente, impressão ou validação comercial. |
| Syntax Studio | Catálogo editorial de streetwear, desenhos de camisetas, homepage e página de produto. | A loja está em desenvolvimento em dupla. O estudo fashion não afirma catálogo, segmento ou interface final da loja real. |
| Pulse Lab | Landing page tipográfica, geometria modular, prancha de direção de movimento. | Estúdio fictício e front-end concept. A landing é uma proposta visual; o LAB do VERSO possui a interação implementada. |
| Numa Skin | Sálvia e creme, frascos e embalagem vetoriais, homepage de e-commerce. | Marca fictícia. Nenhum cosmético formulado, testado ou comercializado e nenhuma promessa de eficácia. |

Cada projeto tem capa, categorias, descrição, status, contexto, problema, objetivos, processo visual, solução, limites e uma segunda prancha. A imagem detalhada pode ser aberta no tamanho original. Não há métricas de negócio, clientes ou depoimentos inventados.

## Mudanças na aplicação

- `src/data/projects.ts`: cinco projetos selecionados e estudos completos; o antigo `lab-movimento` continua disponível por rota, fora da galeria principal.
- `src/types/project.ts`: suporte à curadoria e pranchas complementares.
- `src/components/AssetImage.vue`: carrega as novas peças SVG, mantendo suporte aos recursos anteriores. Os nomes `study-*` apontam para `public/images/studies/<nome>.svg`.
- `src/sections/ProjectsSection.vue`: proporções preservam o conteúdo integral das capas, incluindo mobile; quinta peça em destaque; filtros atualizados para a seleção real.
- `src/pages/ProjectPage.vue`: pranchas complementares, acesso ao arquivo original e navegação entre os cinco estudos.
- `src/data/services.ts`: exemplos coerentes com a nova seleção. Redes sociais mantém estado vazio, pois não foi criada uma campanha social.
- `src/sections/HeroSection.vue`: duas pranchas de trabalho substituem a pessoa fictícia e a escultura; título editorial, preto/vermelho, profundidade moderada e CTAs preservados.
- `src/sections/AboutSection.vue`: manifesto tipográfico com inicial R*, sem usar fotografia alheia como identidade da autora.
- `src/sections/LabSection.vue`: grade modular e composição vetorial substituem o cromo e o olho; os três modos, pausa e reinício foram preservados.
- `src/sections/FeaturedProject.vue`: novo dashboard e identificação de estudo visual, distinguindo-o do projeto original concluído.
- `src/components/SiteHeader.vue`, `src/sections/ContactSection.vue`: removidas as texturas do kit antigo, mantendo superfícies escuras e acentos discretos.
- `src/pages/PrivacyPage.vue`: créditos e descrição das imagens atualizados.
- `public/images/verso-social.jpg`: nova captura da apresentação para compartilhamento, sem o retrato antigo.

O script `scripts/create-study-visuals.py` gera as 12 peças SVG, sem dependências externas. Os arquivos são editáveis e usam formas, texto, gradientes discretos de material e sombras; não dependem de uma imagem gigante para representar a aplicação. As pranchas são imagens de portfólio; navegação, filtros, formulários e laboratório continuam em Vue real.

Os originais do kit foram preservados para histórico. Eles não são mais requisitados pela homepage atual. Nenhuma dependência de produção foi adicionada.

## Revisão e validação

A implementação foi aberta em Chromium/Playwright. Houve correção de recortes herdados nos cards mobile e no manifesto do Sobre, além dos nomes acessíveis dos novos links do hero. A revisão considerou legibilidade, proporções, identidade de cada marca, coerência de texto/imagem e honestidade dos estados.

Resultados e comandos finais: [design-qa.md](../design-qa.md). Evidências em `docs/screenshots/curation/`, incluindo homepage desktop/mobile, galeria e dez capturas de estudos (cinco projetos em dois tamanhos).

## Limites e próximos passos reais

- As novas imagens são mockups vetoriais e estudos visuais; não são mockups fotográficos nem fotografias de produtos físicos.
- As telas finais de VERSARY e Syntax ainda dependem dos arquivos reais para documentar os trabalhos originais.
- Pesquisa com usuários, protótipos completos de lojas, checkout e produção física não foram executados nem alegados.
- O contato mantém geração local de mensagem. Envio externo depende de configuração e canais autorizados.
- A prévia permanece com acesso privado à autora; não há alteração de audiência para público.
