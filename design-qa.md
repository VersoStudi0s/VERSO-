# Design QA — VERSO*

**final result: passed**

Aprovação técnica da aproximação visual implementada com os recursos fornecidos. Não equivale a reprodução pixel a pixel, confirmação dos direitos das artes, ativação do contato ou aprovação da publicação.

## Refinamento solicitado em 18/10/2026

**final result: passed** — nova comparação do hero, após Renata priorizar fidelidade à referência.

- Evidência atual: `docs/screenshots/hero-refinement-comparison-final.jpg`, referência e hero de produção lado a lado, com a mesma normalização descrita abaixo. As capturas `1440-hero.png`, `390-hero.png`, `768-hero.png` e páginas completas foram renovadas.
- REALIDADE recebeu Cormorant Garamond 700 itálico, escala e proporção mais próximas do alvo; QUE GANHAM foi compactado em altura mantendo a largura editorial.
- Arte principal reposicionada e escurecida; a máscara atua sobre a imagem proporcional para evitar uma borda vertical abrupta. Cromo lateral usa a variante existente de 480 px (64 KB), fica discreto no desktop e oculto no mobile.
- Cartão do LAB ampliado e reposicionado; anotação deslocada; CTAs e descrição ampliados. O menu numerado ganhou botão funcional também no desktop, conforme a referência.
- Mobile: CTAs empilhados abaixo de 480 px, fontes de 11/10 px e áreas de toque de pelo menos 48/44 px, sem diminuir os controles para fazê-los caber lado a lado.
- Três diferenças P2 encontradas na iteração foram resolvidas e verificadas em revisão visual independente: altura de QUE GANHAM, peso do cromo lateral e tamanho do CTA. Nenhum P1/P2 adicional identificado nas capturas finais.
- Conteúdo confirmado: VERSARY concluído para o Desafios de Ideias; Café Aurora fictício do ChatGPT; Syntax Studio em desenvolvimento em dupla. Detalhes de processo não confirmados deixaram de ser renderizados; numeração das seções acompanha o conteúdo real. Retrato identificado como referência visual, sem atribuição a Renata.
- Validação desta iteração: build de produção; 35 verificações de interação, 8 larguras, 5 auditorias axe sem violações; 6 rotas com HTML sem JavaScript e hidratação; indicadores ativos e foco dos menus desktop/mobile; ausência de erros no console ou carregamento dos recursos visíveis. A geometria do hero mantém título dentro da tela e mais de 60 px entre fim dos CTAs e borda inferior em todas as 8 larguras.
- A fonte exata e os arquivos que compõem o painel aprovado não foram fornecidos; a implementação usa as variações do kit. A comparação aprova esta aproximação, sem alegar identidade pixel a pixel.

## Registro da primeira entrega e método de comparação

## Fonte, estado e normalização

- Fonte: `references/verso-aprovado.png`, **1215 × 1280 px**, proveniente do JPG anexado. O painel contém várias composições do mesmo universo, não uma única página para reproduzir como imagem.
- Hero da fonte: recorte `(13, 13)–(841, 566)`, **828 × 553 px**. A densidade/CSS viewport original não foi informada.
- Implementação: Chromium/Playwright, produção local, viewport **1440 × 1000 CSS px**, deviceScaleFactor **1**, hero de **1396 × 936 px** em `(22,18)`. Normalizado proporcionalmente para largura **828 px**, altura aproximada **555 px**. Diferença residual de proporção do quadro: cerca de dois pixels normalizados.
- Estado: início, galeria Todos, LAB Forma, habilidades Em prática, contato sem integração, movimento reduzido para capturas estáticas. O comportamento com movimento habilitado foi testado separadamente.
- Hero: `docs/screenshots/1440-hero.png`; página: `docs/screenshots/1440-full.png` (**1440 × 3580 px**).
- Mobile: `docs/screenshots/390-hero.png`, viewport **390 × 844**, DPR 1; página completa **390 × 7329 px**.
- Tablet: `docs/screenshots/768-full.png`, viewport **768 × 1000**, DPR 1; página completa **768 × 4333 px**.

## Evidências comparadas juntas

1. `docs/screenshots/comparison-final.jpg`: referência e captura do hero na mesma imagem, com escala normalizada.
2. `docs/screenshots/comparison-details.jpg`: mesma região normalizada do título, arte e CTAs. Necessária para avaliar fontes, recortes, alinhamento e tamanho dos controles.
3. `docs/screenshots/comparison-sections.jpg`: galeria e serviços, fonte e implementação em colunas, preservando as proporções de cada painel. As larguras do painel conceitual não são viewports reais conhecidos; a comparação avalia composição e linguagem, sem alegar equivalência pixel a pixel.
4. Capturas desktop, tablet, mobile, menu e estudos listadas em `docs/ENTREGA.md`. Foram abertas e inspecionadas após o carregamento das imagens fora da dobra.

## Superfícies obrigatórias

| Superfície | Verificação e resultado |
| --- | --- |
| Fontes e tipografia | Barlow Condensed para impacto; Cormorant Garamond para serifada/itálico e marca; IBM Plex Mono para informação. Escala, inclinação, quebra e largura do título ajustadas. REALIDADE cabe em 320/360/390 px. Navegação e CTAs desktop ampliados para legibilidade. Fontes originais da referência não foram fornecidas: correspondência óptica, sem alegação de identidade tipográfica. |
| Espaçamento e layout | Hero assimétrico, título à esquerda, colagem à direita, CTAs deslocados e linhas de construção. Proporção do quadro refinada para a referência. Galeria com cabeçalho compacto e cards; destaque/serviços e Sobre/LAB/contato em painéis. Mobile reorganiza a arte e empilha as seções. Controles, rótulos e informações obrigatórias acrescentam altura a alguns painéis. |
| Cores e tokens | Preto profundo, branco quente, vermelho principal #E54858 e rosa do kit. Vermelho reservado a destaques, CTAs e estados. Contraste textual e de controles medido; bordas de inputs/LAB reforçadas. Bordas decorativas preservadas discretas. |
| Imagens e fidelidade | Oito recursos fornecidos usados; originais preservados, alfa da escultura mantido e variantes proporcionais. Distorção corrigida. As artes do kit são variações das presentes no painel: notebook VERSARY vermelho, café e streetwear não são os mesmos mockups brancos/bege do conceito. Diferença conhecida dos recursos, declarada no site e na entrega. Nenhum print integral substitui a interface. |
| Texto e conteúdo | Frases principais e serviços preservados. Projetos identificados conforme a confirmação de Renata; sem métricas, clientes ou currículo inventados. Foto artística não atribuída a Renata. Aviso de envio indisponível visível antes do formulário. Menus, botões e textos são HTML real. |

## Histórico de revisão e correções

| Iteração / gravidade inicial | Evidência e problema | Correção e evidência posterior |
| --- | --- | --- |
| 1 / P1 | `mobile-hero-v1.png`: REALIDADE ultrapassava a largura útil e era cortada pelo quadro. | Escala fluida mobile recalculada; `390-hero.png` e `hero-final-results.json`: título dentro da tela nas oito larguras. |
| 1 / P2 | `desktop-full-v1.png`: a escultura de serviços ficava alongada, pela altura intrínseca não corrigida. | `height:auto` e dimensões proporcionais; `1440-full.png` e `comparison-sections.jpg` mostram objeto sem distorção. |
| 1 / P2 | Capturas iniciais não incluíam imagens lazy fora da dobra e atrasos de entrada ainda afetavam movimento reduzido. | Percurso de scroll antes das capturas; animações removidas em reduced motion. Últimas capturas incluem todas as artes. |
| 2 / P2 | `comparison-v1.jpg`: arte dominante demais, título horizontal e proporção do hero distante da fonte. | Contain, máscara lateral, título inclinado, ajustes da escala serifada e altura do quadro; `comparison-final.jpg`. |
| 2 / P2 | Cabeçalho da galeria possuía título adicional de grande escala, ausente na composição aprovada; serviços usavam impacto na primeira linha. | Cabeçalho compacto VERSO* com filtros, e serviços em serifada; `comparison-sections.jpg`. |
| 3 / P2 | Verificação adicional em 1280 px: aproximação excessiva dos CTAs à linha inferior do hero. | Altura e escala refinadas; `hero-final-results.json` demonstra mais de 60 px até o limite inferior em todas as larguras. |
| 3 / P2 | Nomes acessíveis dos cards não incluíam todo o texto visível; indicador ativo escolhia Contato ao entrar na linha compartilhada com LAB/Sobre. | Nome natural dos links; observação de seções preserva o destino escolhido. Axe sem violações e `navigation-results.json` com seis estados ativos corretos. |
| 4 / verificação final | Inspeção das comparações normalizadas, desktop, tablet, mobile, menu e estudos. | Nenhum P0/P1/P2 visual acionável permaneceu no escopo dos recursos disponíveis. |

## Interações e console

35 verificações do fluxo, oito larguras, cinco auditorias axe, seis rotas com conteúdo sem JavaScript e hidratação sem avisos. Regressão adicional do indicador ativo em desktop/mobile. Menu aberto/fechado por teclado e toque, Tab/Shift+Tab, Escape, filtros, estudos, serviço pré-selecionado, validação/erro/loading/sucesso interceptado, LAB e reduced motion verificados. Nenhum e-mail foi enviado.

Não houve erro crítico no console ou de carregamento de recursos. Os resultados brutos estão em `docs/*-results.json`. Sem overflow horizontal. Lighthouse mobile registrado em relatório próprio; a revisão visual não representa certificação de acessibilidade.

## P3 e limitações de recurso

- A fonte exata e os arquivos editáveis do painel não foram fornecidos. A comparação mantém uma aproximação tipográfica licenciada.
- Artes do kit, forma do objeto e mockups são variações da fonte; substituição fiel desses detalhes depende dos arquivos originais correspondentes.
- Retrato pessoal, evidências dos projetos, canais e integração de e-mail continuam pendentes. Estão apresentados como pendências reais, sem simulação de sucesso.
- Não há referência mobile aprovada ou Reels disponíveis para comparação de movimento; o mobile foi adaptado preservando a identidade e testado por função/legibilidade.

## Checklist final

- [x] Abrir fonte e capturas reais, inclusive comparações na mesma imagem.
- [x] Avaliar tipografia, layout, cores, imagens e conteúdo.
- [x] Corrigir e recapturar os problemas P1/P2 encontrados.
- [x] Verificar CTAs, filtros, rotas, menu, foco, motion e formulário.
- [x] Documentar aproximações, recursos faltantes e configuração externa.
- [x] Manter aplicação local, sem publicação.

**final result: passed**
