# Revisão visual VERSO* — 22/10/2026

**final result: passed**

Resultado da revisão desta reconstrução com os recursos fornecidos, após correções e nova inspeção. Não representa identidade pixel a pixel, aprovação da autora, certificação WCAG ou autorização de publicação. O registro da entrega anterior foi preservado em [docs/design-qa-historico.md](design-qa-historico.md).

## Fonte, estado e método

- Referência principal: `references/verso-aprovado.png`, 1215 × 1280 px. Painel de múltiplas composições; não é uma única página nem há viewport CSS informado.
- Hero de referência: recorte `(13,13)–(841,566)`, 828 × 553 px.
- Hero atual: captura da seção em Chromium, viewport 1440 × 1000, DPR 1; quadro 1396 × 950 px. Reduzido proporcionalmente para 828 × 563 px na comparação. Há aproximadamente 10 px de diferença de altura normalizada; não houve distorção para forçar coincidência.
- Capturas adicionais: 768 × 1000 e 390 × 844. No mobile, quadro do hero 370 × 802 px. Não há mockup mobile fornecido; adaptação avaliada por legibilidade, composição e comportamento.
- Estado estático: início, filtro Todos, primeiro serviço destacado, LAB Forma, trajetória recolhida, contato sem endpoint, movimento reduzido. Scroll prévio carrega imagens lazy. As seções são capturadas sem deslocar o cabeçalho fixo para dentro do recorte.
- Testes de movimento realizados separadamente com preferência normal, mouse, touch emulado e alternância da preferência do sistema.
- Ferramentas: Chromium real com Playwright local; Pillow somente para montar comparações a partir das capturas. Nenhuma captura foi usada como interface da aplicação.

## Evidências abertas e comparadas

- [Hero: referência e implementação](screenshots/editorial/reference-hero-comparison.jpg).
- Antes/depois: [desktop](screenshots/editorial/1440-before-after.jpg) e [mobile](screenshots/editorial/390-before-after.jpg).
- Referência/implementação por área: [Sobre](screenshots/editorial/reference-sobre-comparison.jpg), [LAB](screenshots/editorial/reference-lab-comparison.jpg), [serviços](screenshots/editorial/reference-servicos-comparison.jpg), [contato](screenshots/editorial/reference-contato-comparison.jpg).
- [Galeria antes/depois](screenshots/editorial/comparison-projetos.jpg), [menu mobile corrigido](screenshots/editorial/390-menu.png) e capturas isoladas de todas as seções em `docs/screenshots/editorial/`.
- Páginas completas: [desktop](screenshots/editorial/1440-after-full.png), [tablet](screenshots/editorial/768-after-full.png), [mobile](screenshots/editorial/390-after-full.png).

`node scripts/capture-editorial.mjs` renova as capturas atuais; `python scripts/compare-editorial.py` monta as comparações (Pillow e DejaVu Sans necessários somente para esse script de documentação). Os arquivos `*-before-*` foram capturados antes desta reconstrução; não devem ser sobrescritos para simular um histórico diferente.

## Cinco superfícies verificadas

| Superfície | Resultado e limites |
| --- | --- |
| Tipografia | IDEIAS condensada pesada, QUE GANHAM leve, REALIDADE serifada vermelha e inclinada. Título dimensionado e verificado pelos limites do texto real, não apenas do bloco. Fontes locais Barlow Condensed, Cormorant Garamond e IBM Plex Mono; as fontes exatas da imagem não foram fornecidas. |
| Layout/espaçamento | Retrato à direita e texto à esquerda no hero, sobreposição controlada, descrição/CTAs deslocados, molduras e linhas. Galeria assimétrica e serviços em faixas atendem à instrução mais recente, expandindo os pequenos painéis do mockup. Sobre em duas colunas; LAB aberto. Mobile reorganizado em coluna. |
| Cores/tokens | Preto profundo, vermelho #E54858, rosa, branco quente, fundos vinho selecionados, bordas finas. Texto e controles auditados nos estados testados; não dependem apenas de cor. |
| Imagens | Oito recursos fornecidos renderizados, sem distorção intencional. Cromo independente, retratos e texturas em camadas. O objeto, retratos e mockups do kit diferem dos presentes no painel: equivalência de linguagem, não do arquivo original. Capa de Syntax permanece ilustrativa. |
| Texto/conteúdo | Frases principais restauradas. Projetos e status confirmados preservados. Foto identificada como arte, não Renata. Formulário informa que a mensagem é gerada localmente, sem envio. Menu, filtros, texto, rótulos e botões são DOM funcional. |

## Iterações e correções

| Prioridade | Achado | Correção e verificação |
| --- | --- | --- |
| P1 | REALIDADE ultrapassava o quadro em 320–390 px; overflow da página não detectava o corte interno. | Escala móvel ajustada. Teste usa Range do texto e compara com a borda do hero nas oito larguras. Capturas `*-iteration-1-hero.png` preservam a primeira iteração; `*-after-hero.png` mostram o ajuste. |
| P2 | Palavra serifada desktop atravessava demais o rosto. | Escala reduzida, descrição reposicionada; comparação normalizada aberta novamente. |
| P1 | Nome acessível do cartão do LAB omitia “01 / Experimentar”. | Nome inclui texto visível e finalidade. Sete auditorias da suíte principal voltaram sem violações. |
| P1 | Vue substituía a classe adicionada pelo observer durante mudanças de estado, ocultando serviços ou pausando o LAB novamente. | Revelação usa `data-visible`, independente das classes Vue. Regressão com hover, foco, filtros, pausa/reinício e retorno de rota. |
| P1 | Menu fixo era limitado à altura do header pelo `backdrop-filter` do ancestral. | Blur desativado apenas com menu aberto. Verificação de altura e hit testing de todos os links, além de nova captura inspecionada. |
| P2 | Textura integral do hero carregava também no celular, prejudicando o LCP. | Textura virou imagem responsiva descoberta no HTML, com prioridade de carregamento; preload da variante serifada correta. Aparência recapturada e comparada. |

Não restou falha visual P0/P1/P2 acionável identificada nas superfícies e estados revisados. Limites de recurso e diferenças intencionais permanecem explicitados abaixo.

## Testes executados

| Comando | Resultado real |
| --- | --- |
| `npm run build` | TypeScript, bundles e pré-renderização de 6 rotas concluídos. |
| `TEST_BASE_URL=http://127.0.0.1:4180 npm run test:e2e` | 57 verificações de interação; 8 larguras; 7 auditorias axe sem violações; nenhum erro de console ou recurso carregado. |
| `node scripts/test-commercial-mobile.mjs` | 6 fluxos touch em 320/390 px, 2 auditorias axe adicionais sem violações, sem overflow. O nome do script vem da etapa anterior; o conteúdo testa o LAB atual aberto. |
| `node scripts/test-lab-motion.mjs` | Três modos do LAB, dois reinícios reais por modo, pausa/continuação, recarga e movimento reduzido. |
| `node scripts/test-editorial-motion.mjs` | 7 verificações: profundidade limitada e reset em hero/LAB, serviços visíveis após estado reativo, filtros/reinserção, transição de estudo e retorno, preferência reduzida, touch sem parallax. |
| `node scripts/test-navigation.mjs` | 12 verificações de seção ativa e ciclos de foco desktop/mobile. |
| `npm run test:contact` | 18 verificações do adaptador; chamadas ao provedor interceptadas; nenhum e-mail real enviado. |
| `npm run test:production` | 6 rotas com conteúdo sem JS e hidratação sem avisos, sem overflow mobile. |
| `node scripts/capture-editorial.mjs` | Desktop/tablet/mobile capturados, sem overflow horizontal. |
| `npm audit --json` | 0 vulnerabilidades reportadas em `docs/editorial-dependencies.json`. |
| `git diff --check` | Sem erros de whitespace. |

Larguras: 320, 360, 390, 768, 1024, 1280, 1440 e 1920 px. Os JSON em `docs/editorial-*-results.json`, `contact-results.json`, `navigation-results.json` e `production-results.json` registram a cobertura. São testes em emulação de viewport/touch; não se afirma teste em aparelho físico ou com leitor de tela humano.

## Desempenho

A medição Lighthouse atual e sua configuração ficam em `docs/editorial-lighthouse.json`. A primeira medição desta reconstrução, antes da correção da textura, foi preservada em `docs/editorial-lighthouse-before-optimization.json` (desempenho 71; LCP simulado 7,7 s). A medição final (Lighthouse 13, emulação mobile e throttling simulado, 22/10/2026 17:17 UTC) registrou **82 em desempenho, 100 em acessibilidade, 100 em boas práticas e 100 em SEO**. FCP 2,0 s; LCP 4,5 s; TBT 70 ms; CLS 0. O ajuste intermediário marcou 79 e foi preservado em `docs/editorial-lighthouse-intermediate.json`.

O LCP melhorou, mas permanece acima da meta de 2,5 s nessa simulação. A entrega das imagens e fontes ainda merece acompanhamento em hospedagem real; a pontuação local não é uma garantia para dispositivos ou redes reais. Não foram reduzidos os retratos principais nem removidas camadas artísticas para melhorar a nota. As texturas de fundo no mobile reutilizam a variante de 480 px, adequada à baixa opacidade dessas camadas.

Bundle principal final: JavaScript 189,08 kB / 66,27 kB gzip; rotas de estudos e privacidade mantêm chunks separados. Sem novas dependências de produção.

## Diferenças intencionais e pendências externas

- Painéis internos ampliados, galeria assimétrica e serviços em linhas seguem o pedido mais recente. A organização não repete a grade pequena da prancha de identidade.
- O cromo é mais presente, usando a escultura autorizada do kit. A forma não corresponde literalmente ao objeto do mockup.
- Não há referência mobile nem Reels acessíveis para comparação de animação; motion e adaptação mobile são implementações próprias dentro da linguagem aprovada.
- Fontes exatas e arquivos editáveis do painel não foram fornecidos. A identidade foi aproximada com os recursos locais, sem declarar reprodução idêntica.
- Envio externo depende de configuração e canais autorizados. Detalhes/evidências dos projetos ainda dependem da autora. Retrato pessoal é opcional para substituir a arte explicitamente identificada.
- Nenhuma publicação realizada nesta etapa.

**final result: passed**
