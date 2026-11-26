# VERSO* — Plano da reconstrução (v2)

Documento de trabalho: análise, arquitetura, direção visual, wireframe e estrutura técnica. Ele vem antes do código e deve ser revisado pelo Time VERSO* junto com o site.

---

## 1. Análise do que existia

O repositório tinha um portfólio Vue 3 + TypeScript + Vite bem construído (SSR na build, imagens WebP responsivas, testes Playwright, Lighthouse 84–88 / 100 / 100 / 100). O problema era de **posicionamento**, não de engenharia:

| Versão anterior | Problema para conversão |
| --- | --- |
| Hero conceitual ("Ideias que ganham realidade") com retrato de modelo | Não dizia o que a VERSO* vende; o rosto podia ser lido como alguém da equipe |
| 7 seções + LAB + habilidades + integração GitHub | Muita coisa competindo com o contato |
| Formulário de 4 campos que gerava texto para copiar | Não havia WhatsApp nem Instagram configurados: o visitante não tinha como falar com o estúdio |
| Apresentação por nomes e "estudantes do SENAI" | O briefing novo pede apresentação coletiva, sem nomes ou cargos individuais |
| Barlow Condensed nos títulos | O Instagram usa Anton |
| Configuração Netlify | O site publicado está no Cloudflare Pages (`verso-e5t.pages.dev`) |

**Aproveitado:** pipeline de pré-renderização com Vue SSR (reescrito e enxugado), capturas reais dos projetos, textos honestos dos estudos de caso (adaptados para a voz coletiva), escultura cromada, textura editorial, mockups vetoriais do Café Aurora, paleta, Cormorant Garamond e IBM Plex Mono.

**Arquivado (não apagado):** documentação, testes e relatórios da v1 estão em `docs/arquivo-v1/`. O código-fonte anterior continua no histórico do Git (commit `27a2666`, branch `main`). Imagens editoriais não usadas foram para `assets/webp-v1/`.

**Removido do site:** integração com a API do GitHub, LAB interativo, seção de habilidades, função Netlify de e-mail, Phosphor Icons e Barlow Condensed.

## 2. Informações reais × pendentes

### Confirmadas (fontes)

| Informação | Fonte |
| --- | --- |
| Instagram `@versostudioss` | Conta conectada ao Metricool e ao Windsor |
| Bio: "Studio criativo digital ✦ 100% Remoto · Sites, apps e identidade visual pra negócios que querem ser vistos · Protótipo grátis ↓" | Perfil do Instagram |
| Site publicado: `https://verso-e5t.pages.dev` (Cloudflare Pages) | Link da bio |
| Tom de voz: direto, informal ("pra", "a gente"), "você vê antes de pagar", "Manda QUERO no direct" | Legendas de 21, 24 e 25/11/2026 |
| Público: pequenos negócios, autônomos e criadores | Legendas do Instagram |
| E-mail `contato.versostudio@gmail.com` | Conta do Metricool da marca — **confirmar se pode ser divulgado** |
| Metricool já instalado no site (hash `357836f4…`) | `index.html` anterior + Metricool |
| Quatro integrantes, apresentação coletiva "Time VERSO*" | Briefing |
| VERSARY: projeto acadêmico (Desafios de Ideias) | Registro da v1, confirmado pela equipe |
| GymFlow e Ritmo Fitness: projetos autorais no GitHub de uma integrante | Repositórios públicos |
| Café Aurora: marca fictícia, estudo conceitual | Registro da v1 |

### Pendentes (o site funciona sem elas, mas precisam ser fornecidas)

| Pendência | Como o site lida hoje |
| --- | --- |
| **Número de WhatsApp** | Variável `VITE_WHATSAPP_NUMBER`. Sem ela, os botões "Conversar" levam ao direct do Instagram, canal que a marca já usa |
| Tabela de preços e pacotes | Seção pronta em `src/content/pricing.ts`, vazia e invisível |
| Percentual de entrada | Configurável em `src/config/commercial.ts` (padrão: texto "entre 40% e 50%, definido na proposta") |
| Domínio próprio e e-mail no domínio | Ver seção 7. Basta definir `VITE_SITE_URL` |
| Participação de cada projeto | Texto genérico verdadeiro ("Desenvolvido por integrante do Time VERSO*"). Detalhar quando a equipe confirmar |
| Serviços que a equipe assina embaixo | Lista inicial em `src/content/services.ts`, marcada para revisão |
| Imagens do Instagram (antes/depois, posts) | A rede deste ambiente bloqueia o CDN do Instagram. Exportar e colocar em `public/images/` |
| Primeiro cliente real | Campo `kind: "comercial"` + `featured: true` já destaca o case |

## 3. Arquitetura da informação

Uma página, seis blocos, nessa ordem. Cada bloco responde uma pergunta do visitante:

| # | Bloco | Pergunta | CTA principal |
| --- | --- | --- | --- |
| 01 | Início | O que é a VERSO* e o que faz? | **Pedir protótipo grátis** · Ver projetos |
| 02 | Serviços | Vocês fazem o que eu preciso? | Pedir orçamento (com o serviço já escolhido) |
| 03 | Projetos | Vocês sabem fazer? | Abrir o estudo de caso · Quero algo assim |
| 04 | Como funciona | Como eu contrato? Quanto risco eu corro? | **Pedir protótipo grátis** |
| 05 | Sobre | Quem está por trás? | Conversar com a equipe |
| 06 | Contato | Como eu falo com vocês agora? | WhatsApp · Instagram · E-mail · mini-formulário |

Fora da página principal: `/projetos/:slug` (estudo de caso completo, compartilhável), `/privacidade`, 404.

Elementos persistentes: cabeçalho com "Pedir protótipo" sempre visível, botão flutuante de conversa (aparece depois do hero e some quando o contato está na tela), banner de consentimento de analytics.

## 4. Direção visual

> Atualizado em 26/11/2026: a paleta passou a 60-30-10 (preto #0B0B0B, bege #F2EEE6, vermelho #FF2E1F), o texto usa IBM Plex Sans e a animação de rolagem saiu. Detalhes e medições em [`REVISAO.md`](REVISAO.md). A tabela abaixo é o registro da primeira versão.

**Ideia:** um caderno editorial. A marca grita nos títulos e nas bordas (papel rasgado, cromo, carimbos, números de seção), mas o miolo é papel limpo: texto escuro sobre fundo grafite, grid previsível, botões grandes.

| Elemento | Onde aparece | Onde não aparece |
| --- | --- | --- |
| **Anton** caixa alta | H1, H2, números grandes | Corpo, botões, labels |
| **Cormorant Garamond itálico** vermelho/rosa | Uma palavra de destaque por título | Parágrafos |
| **IBM Plex Mono** | Labels, números de seção, metadados de projeto | Textos longos |
| Sans do sistema | Todo texto corrido e botões (leitura rápida, zero download) | — |
| Papel rasgado (SVG) | Divisores entre blocos, faixa do processo | Atrás de texto |
| Cromo (escultura) | Hero e Sobre | Cards de serviço |
| Vermelho `#E54858` | CTA principal, um destaque por tela | Fundos grandes |

Paleta: preto `#0B0B0D`, grafite `#16161A` / `#1F1E23`, branco quente `#F7F0EB`, vermelho `#E54858`, rosa `#E6AABD` (foco e detalhes). Contraste dos textos ≥ 4.5:1.

Movimento: só três coisas — entrada do hero (uma vez), revelação suave ao rolar, hover nos cards. Tudo some com `prefers-reduced-motion`.

Sem: glassmorphism, gradientes decorativos, cursor customizado, parallax, carrosséis automáticos.

## 5. Wireframe (mobile first)

```
┌──────────────────────────────┐   ┌───────────────────────────────────────────────────────────┐
│ VERSO*          [Protótipo][≡]│   │ VERSO*   Serviços Projetos Como funciona Sobre Contato [Pedir protótipo] │
├──────────────────────────────┤   ├───────────────────────────────────────────────────────────┤
│ CREATIVE DIGITAL STUDIO · 100% │   │ CREATIVE DIGITAL STUDIO             ┌─────────────────┐   │
│ REMOTO                         │   │ SEU NEGÓCIO                         │  escultura      │   │
│ SEU NEGÓCIO                    │   │ MERECE SER *visto*.                 │  cromada +      │   │
│ MERECE SER *visto*.            │   │ Sites, identidade visual...         │  papel rasgado  │   │
│ Sites, identidade visual...    │   │ [Pedir protótipo grátis] [Ver proj] │                 │   │
│ [Pedir protótipo grátis ▸]     │   │ ✦ Você vê a proposta antes de pagar └─────────────────┘   │
│ [Ver projetos]                 │   ├~~~~~~~~~~~~~~~~~~ papel rasgado ~~~~~~~~~~~~~~~~~~~~~~~~~~┤
│ ✦ Você vê antes de pagar       │   │ 02 SERVIÇOS                                               │
│  (arte cromada, abaixo)        │   │ [Web: Sites | Landing] [Design: Identidade|Social|Mat.]   │
├~~~~~~~~ papel rasgado ~~~~~~~~┤   │ [Soluções: Sistemas]  cada card: problema · inclui · CTA   │
│ 02 SERVIÇOS                    │   ├───────────────────────────────────────────────────────────┤
│ ▸ Web  ▸ Design ▸ Soluções     │   │ 03 PROJETOS   [Todos][Web][Sistemas][Identidade]          │
│ [card] problema/inclui/CTA     │   │ ┌ case grande ───────┐ ┌ case ─┐ ┌ case ─┐               │
│ [card] ...                     │   │ │ img | tipo | obj.  │ │       │ │       │               │
├──────────────────────────────┤   │ └────────────────────┘ └───────┘ └───────┘               │
│ 03 PROJETOS                    │   ├~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~┤
│ [case: selo tipo, img, resumo] │   │ 04 COMO FUNCIONA  1─2─3─4─5─6─7─8 (linha horizontal)       │
│ [Ver estudo de caso →]         │   │ [caixa: o que o protótipo grátis inclui / não inclui]      │
├──────────────────────────────┤   ├───────────────────────────────────────────────────────────┤
│ 04 COMO FUNCIONA               │   │ 05 SOBRE  texto + bastidores (código · wireframe · tela)   │
│ 1 Contato  │ 2 Briefing ...    │   ├───────────────────────────────────────────────────────────┤
│ [Protótipo grátis: inclui ✓ /  │   │ 06 CONTATO  título + canais grandes | mini-formulário      │
│  não inclui ✕] [Pedir agora]   │   ├───────────────────────────────────────────────────────────┤
├──────────────────────────────┤   │ rodapé: canais, privacidade, © VERSO*                      │
│ 05 SOBRE · Time VERSO*         │   └───────────────────────────────────────────────────────────┘
│ texto + bastidores empilhados  │
├──────────────────────────────┤
│ 06 CONTATO                     │
│ [WhatsApp/Direct] [Instagram]  │
│ [E-mail] · formulário 4 campos │
├──────────────────────────────┤
│ rodapé                         │
└──────────────────────────────┘   (●) botão flutuante de conversa, canto inferior direito
```

## 6. Estrutura técnica

```
src/
  config/       site.ts (URL, canais), commercial.ts (entrada, protótipo), analytics.ts
  content/      services.ts, projects.ts, process.ts, pricing.ts  ← editar conteúdo aqui
  components/   ui/ (Button, SectionHeading, TornEdge, KindBadge, Icon) + layout (Header, Footer, FloatingContact, ConsentBanner)
  sections/     Hero, Services, Projects, Process, About, Contact
  pages/        Home, Project, Privacy, NotFound
  composables/  useReveal, useContactLinks
  lib/          analytics.ts (eventos), contact.ts (montagem da mensagem), seo.ts
  styles/       tokens.css, base.css, utilities.css
```

- Vue 3 + TypeScript + Vite + Vue Router. Nenhuma biblioteca de UI. Ícones em SVG inline.
- Build: `vue-tsc` → bundle cliente → bundle SSR → `scripts/prerender.mjs` gera HTML estático por rota, `sitemap.xml`, `robots.txt`. O conteúdo aparece sem JavaScript.
- Cloudflare Pages: comando `npm run build`, saída `dist`. `public/_headers` define cache e cabeçalhos de segurança. O Pages serve `404.html` automaticamente.
- Formulário: sem backend. Monta a mensagem e abre o WhatsApp (ou o e-mail). Nada é enviado ou guardado pelo site.

## 7. Domínio e e-mail (planejamento — nada foi contratado)

1. Escolher e registrar o domínio (ex.: um `.com.br` via Registro.br). **Decisão e compra da equipe.**
2. Cloudflare Pages → projeto → Custom domains → adicionar o domínio. Mais simples: apontar os nameservers do domínio para a Cloudflare.
3. Definir `VITE_SITE_URL=https://seudominio` nas variáveis de build do Pages e refazer o deploy. Canonical, Open Graph, sitemap e robots passam a usar o domínio.
4. Manter `verso-e5t.pages.dev` com redirecionamento 301 para o domínio (regra de redirect na Cloudflare).
5. E-mail: Cloudflare Email Routing (gratuito) encaminha `contato@dominio` para o Gmail atual; para enviar como o domínio, Google Workspace ou Zoho Mail. Configurar SPF, DKIM e DMARC.
6. Atualizar a bio do Instagram com o domínio novo.

## 8. Analytics e privacidade

- Nada de terceiros carrega antes do consentimento (LGPD).
- Ao aceitar: Metricool (já usado pela marca) e, se configurados, Plausible (`VITE_PLAUSIBLE_DOMAIN`) ou GA4 (`VITE_GA_ID`).
- Eventos: `cta_prototipo`, `cta_projetos`, `click_whatsapp`, `click_instagram`, `click_email`, `pedido_orcamento` (com o serviço), `formulario_enviado`. Cada evento leva a posição do clique (`hero`, `header`, `servicos`, `flutuante`…), para saber qual CTA converte.
- Origem dos visitantes: links da bio e dos posts devem usar `?utm_source=instagram&utm_medium=bio` (ou `post`).

## 9. Verificação (26/11/2026, build de produção local)

- `npm test`: **84/84** verificações. 8 larguras (320–1920 px) sem rolagem horizontal e com o CTA "Pedir protótipo grátis" visível sem rolar; nenhum erro no console; 6 blocos na ordem; todas as imagens carregam; links internos e externos válidos; menu mobile (abre, fecha com Esc, leva à seção); formulário (validação, foco no erro, serviço vindo da URL, mensagem montada com nome, serviço e contato); Metricool só depois do aceite; 6 rotas com conteúdo e metadados sem JavaScript; hidratação sem avisos; axe sem violações (WCAG 2.1 AA) em celular e desktop.
- Lighthouse mobile (simulado, 12.8): **91 desempenho / 100 acessibilidade / 100 boas práticas / 100 SEO**. FCP 1,5 s, LCP 3,3 s, TBT 80–110 ms, CLS 0. Medição de laboratório, não de campo.
- JavaScript principal: ~58 kB gzip. CSS principal: ~7 kB gzip. Fontes: Anton 400, Cormorant 600 (normal e itálico), IBM Plex Mono 400.
- Não testado: aparelhos físicos, leitores de tela, Safari/iOS real, e o comportamento do link `ig.me` em cada app.

Capturas: `docs/screenshots/`.
