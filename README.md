# VERSO* — Creative Digital Studio

Portfólio de Renata em Vue 3, TypeScript e Vite, reconstruído a partir de `references/verso-aprovado.png` e do kit de imagens fornecido. A publicação de uma prévia privada foi solicitada em 18/10/2026; os dados de hospedagem ficam em `.openai/hosting.json`.

## Executar

Testado com Node 24.19 e npm 11.9.

```bash
npm ci
npm run dev -- --host 0.0.0.0 --port 4173
```

```bash
npm run build
npm run preview -- --port 4180
```

O build valida TypeScript, gera os bundles e pré-renderiza as páginas com o renderizador SSR do Vue. A saída é estática em `dist/`, com hidratação no cliente. Não requer Chromium para compilar. Os estudos são gerados automaticamente a partir de `src/data/projects.ts`.

## Verificação

Com o servidor local aberto:

```bash
npm run test:e2e
npm run test:contact
npm audit
```

Os testes de navegador usam Chromium em `/usr/bin/chromium`; configure `CHROMIUM_PATH` se necessário. Para testar a produção: `TEST_BASE_URL=http://127.0.0.1:4180 npm run test:e2e`. Os testes do formulário interceptam as requisições: nenhum e-mail real é enviado.

## Conteúdo e configuração

- Projetos e estudos: `src/data/projects.ts`.
- Canais profissionais: variáveis opcionais em `.env.example`, validadas em `src/data/site.ts`.
- Habilidades: `src/sections/SkillsSection.vue`; classificação inicial conservadora, a confirmar pela autora.
- Cores, fontes e espaços: `src/styles/tokens.css`.
- Formulário: `src/services/contact.ts` e adaptador opcional em `netlify/functions/contact.ts`.
- Referência e originais: `references/` e `assets/originais/`.
- Guia original do kit: `assets/README-kit.md`.

O envio real permanece desativado até a configuração do endpoint e do provedor. Nenhum contato, cliente, resultado comercial ou experiência profissional foi inventado. Os projetos sem evidências estão identificados como conceitos; a arte de retrato não é apresentada como foto de Renata.

Consulte [configuração](docs/SETUP.md), [recursos e licenças](docs/ASSETS.md), [auditoria](docs/AUDIT.md), [revisão visual](design-qa.md) e [relatório de entrega](docs/ENTREGA.md).
