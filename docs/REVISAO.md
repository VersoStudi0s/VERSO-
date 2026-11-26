# Revisão de segurança, paleta e design (26/11/2026)

Escopo: o site da VERSO* neste repositório. É um site estático (Vue pré-renderizado, servido pelo Cloudflare Pages), sem backend, banco de dados, login ou upload. Vários itens de segurança da lista não se aplicam por esse motivo; cada um está justificado abaixo.

## 1. Segurança

### Itens verificados

| Item | Situação | Evidência |
| --- | --- | --- |
| **XSS** | OK, nada a corrigir no código do site | Nenhum `v-html`, `innerHTML`, `insertAdjacentHTML`, `eval`, `document.write` ou `new Function` em `src/`, `scripts/` e `index.html` (varredura por `grep`). Interpolações do Vue escapam por padrão. Textos que vão para URLs passam por `encodeURIComponent` (`src/lib/contact.ts:72`, `:76`, `:77`). JSON-LD escapa `<` (`src/lib/seo.ts:67`). A pré-renderização escapa título e metadados (`scripts/prerender.mjs:17`, `:27`). Todos os 6 `target="_blank"` têm `rel="noopener"`; os `window.open` usam `"noopener"` (`src/sections/ContactSection.vue:67`, `:73`). |
| **Rotas de API expostas** | Não se aplica | Não há API: nenhuma chamada `fetch`/XHR em `src/`, nenhuma pasta `functions/` (Cloudflare Pages Functions). A função Netlify da v1 está arquivada em `docs/arquivo-v1/netlify/` e não é publicada. Rotas públicas, todas páginas estáticas de leitura: `/`, `/projetos/:slug` (4), `/privacidade`, `/404`. São públicas porque são o site de apresentação; nenhuma recebe dados. |
| **Chaves de API expostas** | OK | Varredura do **histórico inteiro do Git** por padrões de chave (OpenAI, Resend, AWS, GitHub, Google, Slack, JWT, chaves privadas, `API_KEY=`/`SECRET=`/`TOKEN=`): o único resultado é `"test-not-a-real-key"`, valor falso de teste em `docs/arquivo-v1/scripts/test-contact.mjs:42`. Nenhum `.env` foi versionado (só `.env.example`, sem valores secretos). O hash do Metricool (`src/config/analytics.ts:1`) é um identificador público de rastreamento, visível em qualquer página que use o Metricool; não é segredo. `.openai/hosting.json` tem só o ID do projeto, sem credencial. **Nenhuma chave precisou ser trocada e o histórico não precisou ser limpo.** |
| **Banco de dados aberto / Supabase RLS** | Não se aplica | O site não usa banco. O projeto Ritmo Fitness (mostrado como estudo de caso) usa Supabase, mas vive em outro repositório e não foi auditado aqui. |
| **SQL injection** | Não se aplica | Não há consultas SQL. |
| **Limite de tentativas** | Corrigido no que existe | Não há login, cadastro nem recuperação de senha. O formulário não envia nada a servidor, mas agora bloqueia reenvio por 10 s (`src/lib/contact.ts:19`, `src/sections/ContactSection.vue:53`) para evitar abrir o app várias vezes por duplo clique ou automação. Testado em `scripts/test-site.mjs`. |
| **Prompt injection** | Não se aplica ao site | O site não usa IA. Na construção, as legendas do Instagram lidas via conector foram tratadas só como referência de tom, não como instrução. |
| **Pacotes inventados** | OK | As 14 dependências foram conferidas no registro oficial do npm, com o repositório de origem esperado (fontsource, vuejs, vitejs, microsoft, dequelabs, DefinitelyTyped). `@playwright/test` foi trocado por `playwright`, que é o pacote realmente importado pelo teste. `@types/node` foi mantido: removê-lo quebrou a tipagem do `vite.config.ts`. `npm audit`: 0 vulnerabilidades. |
| Senhas com hash | Não se aplica | Não há senhas. |
| Cookies de sessão | Não se aplica | O site não cria cookies. Guarda só a escolha de consentimento em `localStorage`. Os provedores de analytics só carregam depois do aceite (`src/lib/analytics.ts:45`, `:91`, `:97`). |
| **HTTPS forçado** | Corrigido | `Strict-Transport-Security` adicionado (`public/_headers:5`) e `upgrade-insecure-requests` na CSP (`:11`). O `*.pages.dev` já redireciona HTTP para HTTPS. Com domínio próprio, ativar "Always Use HTTPS" na Cloudflare (ver seção 4). |
| **Cabeçalhos de segurança** | Corrigido | `public/_headers`: CSP com `frame-ancestors 'none'`, `object-src 'none'` e `base-uri 'self'` (`:11`), `X-Content-Type-Options` (`:6`), `X-Frame-Options` (`:7`), `Referrer-Policy` (`:8`), `Cross-Origin-Opener-Policy` (`:9`), `Permissions-Policy` (`:10`). `style-src` mantém `'unsafe-inline'` porque o Vue aplica atributos `style`; não há script inline executável (o JSON-LD é bloco de dados). |
| **Validação de entrada** | Corrigido no cliente; não há servidor | Validação centralizada em `src/lib/contact.ts:31` (nome, contato como e-mail ou telefone com DDD, descrição), remoção de caracteres de controle (`:22`) e limite de tamanho (`:16`) aplicado também em `maxlength` (`src/sections/ContactSection.vue:167`, `:180`, `:201`). Variáveis de ambiente validadas antes do uso (`src/config/site.ts:4`, `:7`, `:10`; `src/config/analytics.ts:12`, `:15`). Não há validação de servidor porque não há servidor. |
| Uploads | Não se aplica | Não há upload. |
| **Proteção contra bots** | Parcial, por desenho | Não existe nada que um bot possa enviar: o formulário só abre o app do próprio visitante. O e-mail aparece em texto no HTML e pode ser coletado por robôs de spam (ver decisões pendentes). |
| Backup do banco | Não se aplica | Sem banco. O código tem cópia no GitHub. |
| **Dependências atualizadas** | Corrigido | Atualizadas para as versões mais recentes: Vue 3.5.46, **Vite 8.4**, **Vue Router 5.5**, Playwright 1.65, axe 4.14. Vue Router 5 precisou de `ssr.noExternal` (`vite.config.ts:25`). TypeScript ficou em 5.9: a 7.0 é a reescrita nativa e o `vue-tsc` ainda depende da API da 5.x. |

### Achado que depende de decisão humana

**E-mails pessoais nos metadados do Git.** Os commits `9e9d861`, `07fb8a7`, `1a5a122`, `2449bf1` e `98b0e59` registram como autora dois endereços `@gmail.com` pessoais de uma integrante. Não estão em nenhum arquivo, só no campo "author" dos commits. Removê-los exige reescrever o histórico da `main` e fazer *force push*, o que muda todos os hashes e afeta clones e branches existentes. Não fiz isso sem autorização. Se o repositório for público e isso for um problema, o caminho é `git filter-repo --mailmap` seguido de *force push*, e configurar o e-mail `noreply` do GitHub para os próximos commits.

## 2. Paleta 60-30-10

Tokens em OKLCH (`src/styles/tokens.css`):

| Papel | Cor | OKLCH | Uso |
| --- | --- | --- | --- |
| 60% | Preto `#0B0B0B` | `oklch(15% 0 0)` | Fundo, seções escuras, cards de serviço e de projeto |
| 30% | Bege `#F2EEE6` | `oklch(95% 0.011 84.6)` | Seções Serviços e Sobre, tira do hero, bloco do protótipo, miolo dos estudos de caso, banner de cookies |
| 10% | Vermelho `#FF2E1F` | `oklch(64.4% 0.242 29.6)` | CTAs, links, números de etapa, painel "Não sabe por onde começar?", rodapé da home, painéis de ação das páginas internas |

Contraste: bege/preto 17:1; vermelho/preto 5,3:1; preto sobre vermelho 5,3:1; **vermelho sobre bege 3,2:1**, que só vale para texto grande. Em fundo bege, links e textos pequenos em vermelho usam `--red-on-light` (`oklch(52% 0.2 29.6)`, 5,25:1). Cada seção declara `theme-dark` ou `theme-light`, e os componentes usam só tokens semânticos (`--bg`, `--fg`, `--link`…), então o contraste vale nos dois fundos.

### Medição nas capturas

Cada pixel da captura de página inteira foi atribuído à família de cor mais próxima em OKLab (escuro, claro, vermelho). "Só interface" esconde as capturas de projeto, porque elas são conteúdo e têm cores próprias (o painel do VERSARY, por exemplo, é branco e vermelho).

| Página | Largura | Só interface (preto/bege/vermelho) | Com imagens |
| --- | --- | --- | --- |
| Início | 1440 | 61 / 32 / 6 | 58 / 35 / 6 |
| Início | 390 | 64 / 28 / 6 | 61 / 30 / 7 |
| VERSARY | 1440 · 390 | 65 / 28 / 7 · 56 / 35 / 7 | 29 / 56 / 15 · 43 / 45 / 10 |
| GymFlow | 1440 · 390 | 64 / 30 / 6 · 58 / 34 / 7 | 63 / 30 / 6 · 57 / 34 / 7 |
| Ritmo Fitness | 1440 · 390 | 64 / 30 / 7 · 62 / 31 / 6 | 63 / 30 / 7 · 61 / 31 / 7 |
| Café Aurora | 1440 · 390 | 67 / 27 / 6 · 56 / 35 / 8 | 47 / 46 / 6 · 48 / 43 / 8 |
| Privacidade | 1440 · 390 | 65 / 27 / 8 · 60 / 31 / 7 | igual (sem imagens) |
| 404 | 1440 · 390 | 65 / 21 / 14 · 63 / 24 / 13 | igual |

Toda a interface fica a até 10 pontos de 60-30-10. As diferenças "com imagens" no VERSARY e no Café Aurora vêm das próprias peças dos projetos. A primeira tela isolada (sem rolar) varia mais: por exemplo, 75/18/5 na home em 1440 px e 81/7/10 em 390 px, porque o hero é escuro de propósito.

Para chegar a isso: Serviços e Sobre viraram seções bege; os cards de serviço ficaram pretos sobre o bege; o rodapé vermelho de fechamento fica só na home (nas páginas curtas ele passava de 25% da tela); as páginas internas ganharam blocos bege e um painel vermelho de ação; o estudo de caso troca de tema por tamanho de tela (`theme-light-desktop`, `theme-dark-mobile`) porque o layout muda de proporção.

## 3. Design

### Lista "evite"

| Item | Situação |
| --- | --- |
| Gradiente roxo→azul, título com gradiente, grão, cursor com feixe de luz | Não existiam. O único gradiente é o brilho vermelho do hero, agora interpolado em OKLCH. |
| Emojis em títulos | Não há. O `✦` (glifo tipográfico usado na bio do Instagram) aparece só em rótulos, não em títulos; saiu do carimbo do hero. |
| Inter no site todo | O texto usava `system-ui`, que no Android/Linux cai em Roboto/Inter. Trocado por IBM Plex Sans (400 e 600), da mesma família da Plex Mono já usada. |
| Cards com borda colorida | Removidos: borda vermelha lateral do "Resolve" e dos princípios, borda de destaque nos cards de projeto, cores por projeto (roxo, rosa, dourado, fora da paleta) e cores por tipo de projeto (azul, rosa). Os campos com erro mantêm contorno vermelho por ser estado funcional, sempre com mensagem de texto. |
| Glassmorphism | O cabeçalho usava `backdrop-filter: blur`. Agora é preto sólido. |
| Selo acima do título | O tipo do projeto (antes um selo com borda acima do nome) virou texto simples **depois** do título, na home e no estudo de caso. O rótulo da seção do protótipo também foi para baixo do título. Os números de seção ("02 Serviços") seguem acima do título como texto mono sem caixa, que é o padrão editorial da identidade aprovada. |
| Fade-in na rolagem | Removido por completo (`useReveal` apagado, nenhum `data-reveal`). O teste verifica que nenhum elemento fica com opacidade 0. Restou só a entrada única do hero no carregamento. |
| Travessão por toda parte | Removido de todo texto visível, títulos de página e metadados. Fica apenas em comentários de código. |
| Copy genérica | Textos revistos; nenhum "solução inovadora", "transforme", "potencialize" etc. |
| Itálico serifado como acento | Ficou só no logo e no "visto." do hero, que são a assinatura da identidade aprovada. Os destaques dos demais títulos usam a mesma Anton, só em vermelho. |
| Ícones iguais em caixas repetidas | Não há. Os ícones aparecem só em botões, na lista de canais e nos marcadores de lista. |

### Ajustes finos

| Item | Onde |
| --- | --- |
| Raio concêntrico | Fórmula `max(3px, raio externo − padding)` em `.inner-radius` (`src/styles/utilities.css`) e aplicada no banner de cookies (14 − 8 = 6 px), formulário, bastidores e painel da privacidade. |
| Bordas com transparência | `--line` e `--line-strong` são o bege ou o preto com alfa 0,14 / 0,30 (`src/styles/tokens.css`). |
| Paleta e degradês em OKLCH | Todos os tokens; `radial-gradient(in oklch …)` no hero e `linear-gradient(in oklch …)` na seta do select. |
| Peso dos ícones | Traço 1,75 junto a texto normal e 2,25 junto a texto em negrito (botões, links, marcadores). |
| Contraste ≥ 4,5:1 no escuro | Texto secundário 9,8:1 e 7,4:1; vermelho 5,3:1. Verificado por cálculo e pelo axe (0 violações). |
| Escala de espaço | `--s-1` a `--s-12` (4 a 96 px) em todos os `gap`, `margin` e `padding`. Ficaram três ajustes ópticos de 1 a 3 px (alinhar ícone à primeira linha, kerning do logo). |
| Sombras com profundidade | Três camadas (contato, meio, ambiente) em `--shadow-sm/md/lg`; no bege, `--shadow-warm` tinge a sombra de marrom em vez de cinza. |
| Pontas de imagem com máscara | Capturas e quadros usam `clip-path: inset(0 round …)`; saíram o anel de `box-shadow` em volta das capturas de celular e a borda dos quadros. |
| Feedback em botões | `:hover` e `:active` (escala 0,94–0,98) em botões, links com seta, canais de contato, menu, botão flutuante, cards e links do rodapé. |
| Multiply | Carimbo "GRÁTIS" vermelho sobre o papel bege do protótipo; escultura cromada sobre o bege da seção Sobre. |

## 4. Verificação

- `npm test`: 89/89 (8 larguras, CTA acima da dobra, links, menu, formulário com contato inválido, limite de tentativas e `maxlength`, consentimento, SSR, hidratação, axe WCAG 2.1 AA em 4 páginas).
- Lighthouse mobile (simulado): 87–89 desempenho / 100 / 100 / 100. FCP 1,7 s, LCP 3,6 s, CLS 0,001. Antes desta revisão: 91. A queda vem da IBM Plex Sans (~47 KB), o custo de não usar fonte do sistema.
- `npm audit`: 0 vulnerabilidades.

Capturas: `docs/screenshots/`.
