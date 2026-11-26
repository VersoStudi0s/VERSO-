# VERSO* — Creative Digital Studio

Site comercial da VERSO*: uma página com seis blocos (Início, Serviços, Projetos, Como funciona, Sobre, Contato), estudos de caso em `/projetos/:slug` e página de privacidade.

Vue 3, TypeScript e Vite. Na build, cada rota é pré-renderizada em HTML estático (o conteúdo aparece sem JavaScript e é hidratado no navegador). Hospedagem: Cloudflare Pages.

O planejamento (análise, informações reais × pendentes, arquitetura, direção visual, wireframe, domínio e analytics) está em [`docs/PLANO.md`](docs/PLANO.md).

## Rodar

Node 20 ou superior.

```bash
npm ci
```

```bash
npm run dev
```

Build de produção e teste completo (em dois terminais):

```bash
npm run build && npm run preview
```

```bash
npm test
```

`npm test` verifica 8 larguras de tela (320 a 1920 px), CTA acima da dobra, links, formulário, menu, consentimento, conteúdo sem JS, metadados e acessibilidade (axe). Nenhuma requisição sai para a internet durante o teste.

## Onde editar

| O quê | Arquivo |
| --- | --- |
| WhatsApp, Instagram, e-mail, URL do site | `src/config/site.ts` (ou variáveis em `.env.example`) |
| Entrada (%) e regras do protótipo grátis | `src/config/commercial.ts` |
| Serviços | `src/content/services.ts` |
| Projetos e estudos de caso | `src/content/projects.ts` |
| Etapas do processo | `src/content/process.ts` |
| Pacotes e preços (hoje vazio e oculto) | `src/content/pricing.ts` |
| Cores, fontes, espaçamentos | `src/styles/tokens.css` |
| Imagem de compartilhamento e ícones | `npm run og-image` (gera a partir de `scripts/make-og-image.mjs`) |

Para adicionar um projeto, inclua um item em `projects.ts` e as imagens em `public/images/` (`nome.webp`, `nome-480.webp`, `nome-960.webp`). A página do estudo de caso é criada na build. O primeiro cliente real entra com `kind: "comercial"` e `featured: true` e passa a abrir a seção.

## Publicar no Cloudflare Pages

Configuração do projeto (Settings → Builds):

- Comando de build: `npm run build`
- Diretório de saída: `dist`
- Variáveis de ambiente: as de `.env.example` que forem usadas (no mínimo `VITE_SITE_URL` e, quando existir, `VITE_WHATSAPP_NUMBER`)

`public/_headers` define cache e cabeçalhos de segurança. O Pages serve `dist/404.html` para rotas inexistentes.

Domínio próprio e e-mail profissional: passo a passo em [`docs/PLANO.md`, seção 7](docs/PLANO.md#7-domínio-e-e-mail-planejamento--nada-foi-contratado). Nada foi comprado nem alterado em DNS.

## Analytics

Nenhum script de terceiros carrega antes de o visitante aceitar o banner. Depois do aceite: Metricool (conta `@versostudioss`, já usada pela marca) e, se configurados, Plausible ou GA4. Eventos rastreados: `cta_prototipo`, `cta_projetos`, `click_whatsapp`, `click_instagram`, `click_email`, `pedido_orcamento`, `formulario_enviado`, `abrir_projeto`, cada um com a posição do clique.

## Versão anterior

Documentação, testes e relatórios da v1 estão em `docs/arquivo-v1/`. O código-fonte anterior está no histórico do Git (commit `27a2666`). Imagens editoriais que saíram do site foram para `assets/webp-v1/`; os originais continuam em `assets/originais/`.
