# VERSO* — integração editorial com GitHub

Implementação local em 22/10/2026. **Não publicada.** Mantida a aplicação Vue 3/TypeScript, suas rotas, serviços, contato e laboratório.

## Diagnóstico e seleção

O site tinha curadoria local com capas conceituais, sem serviço de metadados do GitHub. A seleção principal agora segue a ordem pedida:

1. VERSARY — `renataaap/versary`, projeto acadêmico, estudo de caso.
2. GymFlow — `renataaap/gymflow`, projeto autoral, estudo de caso.
3. Ritmo Fitness — `renataaap/app_fitness`, autoral em desenvolvimento.
4. Syntax Studio — loja autoral em desenvolvimento com um colega; as pranchas são propostas conceituais, não capturas da loja.
5. Café Aurora — marca fictícia, estudo conceitual de branding.

`renataaap/saep_api_notion` está na lista permanente de exclusões em `src/config/github.ts`. A regra é reaplicada à resposta da API e a cada leitura do cache. Não há página, card, filtro ou resultado de busca desse projeto. A menção anterior a Estoque SAEP foi substituída pela instrução final de exclusão.

Pulse Lab, Numa Skin e LAB mantêm as rotas anteriores para preservar links, mas não entram na seleção principal nem no Explorar GitHub.

## Fontes verificadas

Os três repositórios foram clonados sem autenticação, a partir de URLs públicas. READMEs, manifests, componentes e serviços foram inspecionados. Commits e HTTP 200 dos links de código estão em [github-source-review.json](github-source-review.json).

| Projeto | Evidência no código | Limite da revisão |
| --- | --- | --- |
| VERSARY | `src/app/dashboard`, páginas de análises, rotas `api`, `src/lib/sqlite.ts`, scripts de importação e classificação Python | Dashboard e Pareto executados com `scripts/prepare_demo.py --activate`. Nenhuma planilha industrial real foi usada. Predições e qualidade dos modelos não foram validadas. |
| GymFlow | `src/main.tsx`, `Pages.tsx`, `Dashboard.tsx`, `server/app.js`, migrações PostgreSQL | Build passou. PostgreSQL embarcado falhou por ausência de `libicuuc.so.60`. Captura do login real com resposta de sessão anônima 401 interceptada para abrir a tela, sem simular login bem-sucedido. Fluxos autenticados não validados. |
| Ritmo Fitness | `app/(auth)`, `app/(tabs)`, `src/data/mockData`, contexto de autenticação, `services/auth.ts`, `services/profile.ts` | Expo Web executado com URL local inativa e chave fictícia, sem contas ou chamadas de cadastro. README ainda diz “conteúdo local”, mas o código já contém Supabase. Integração remota não validada. |

Não há homepage de demonstração informada na API para esses três repositórios, nem URL de app publicado nos READMEs consultados. Por isso, só há **Ver código**, sem botões **Ver projeto** inventados. O botão de publicação do Render no README do GymFlow não é uma demonstração e não foi acionado.

As referências a Coca-Cola FEMSA fazem parte da interface acadêmica do VERSARY, sem alegação de cliente ou vínculo comercial. Não foram atribuídas à autora decisões individuais ou autoria de todos os módulos sem confirmação; os estudos descrevem a arquitetura observada.

## Arquitetura e atualização

- `src/config/github.ts`: usuário, endpoint, TTL, chave de cache, destaques manuais, topics e exclusões.
- `src/services/github.ts`: normalização tipada, validação de elegibilidade, paginação pelo Link, timeout de 12 s, deduplicação de chamadas, cooldown de limite da API e cache.
- `src/composables/useGithub.ts`: estado compartilhado no cliente; consulta ao montar, verificação de validade a cada minuto enquanto a aba está visível e ao voltar à aba; remove timers/listeners ao desmontar.
- `src/sections/GithubSection.vue`: área independente, busca, linguagem principal, data/hora da consulta, loading, erro, vazio, atualização manual e links reais.
- `src/data/projects.ts`: narrativa, ordem e tecnologias verificadas localmente. A API complementa a apresentação; nunca sobrescreve capas ou texto dos estudos automaticamente.
- `ProjectsSection.vue`: seleção manual, filtros combinados de categoria e stack verificada, proporções editoriais e identidade de cada projeto.
- `ProjectPage.vue`: estudos, capturas ampliáveis, código real e metadados atuais. `HeroSection.vue` e `FeaturedProject.vue` usam a captura real do VERSARY.
- `PrivacyPage.vue`: informa consulta automática à API pública e armazenamento local dos metadados. `site.ts`: perfil GitHub autorizado no rodapé.

**Cache: 3 horas por navegador**, adequado à hospedagem estática existente. Cada minuto se verifica a idade; uma nova chamada só acontece quando o TTL vence, no primeiro acesso ou por atualização manual. Não há job de servidor nem consulta contínua com o site fechado. Em modo sem armazenamento, há cache em memória. Cache expirado continua visível, com data e aviso de erro, caso a renovação falhe. Falhas não apagam a seleção editorial.

A paginação aceita somente o endpoint de repositórios do mesmo usuário em `api.github.com`, com proteção de ciclos e limite de 20 páginas. Novos repos precisam de `portfolio` ou `portfolio-featured`, além de serem públicos, não forks, não arquivados, não desativados e com tamanho maior que zero. Os três primeiros são explicitamente permitidos sem topics. Os demais exercícios não entram por popularidade ou atualização recente. Marcar um topic é uma decisão de curadoria da proprietária.

Nenhum token, SDK autenticado ou segredo é enviado ao navegador. A API pública está sujeita ao limite compartilhado por IP do GitHub. O contador de linguagem do GitHub é a linguagem principal do repositório; a stack editorial completa vem da inspeção local, não desse único campo.

## Imagens e fidelidade

Seis capturas reais substituem os mockups conceituais dos sistemas: dashboard/Pareto VERSARY, login desktop/mobile GymFlow, entrada/cadastro Ritmo. PNGs originais em `docs/screenshots/github/source-*.png`; versões WebP locais responsivas em `public/images/github-*` (aproximadamente 360 KB somando as 18 variantes).

O preto/vermelho, título serifado, composição assimétrica, camadas e interações do VERSO foram preservados. As cores dos sistemas dentro das capturas são as cores reais deles. Syntax e Café mantêm suas identidades próprias e legendas conceituais. Nenhuma arte gerada por IA foi usada para simular os três sistemas.

Foi removido um glifo de seta incompatível com a fonte de título da área GitHub e substituído por ícone SVG. A galeria preserva as proporções das capturas; imagens verticais dos casos têm limite de altura e acesso ao arquivo original. A preferência por movimento reduzido e os controles do LAB permanecem funcionais.

## Verificação

Comandos e resultados finais constam em [design-qa.md](../design-qa.md). Evidências:

- [Homepage desktop](screenshots/github/1440-home.png) e [mobile](screenshots/github/390-home.png).
- [Galeria editorial](screenshots/github/1440-projetos.png).
- [Explorar GitHub desktop](screenshots/github/1440-github.png) e [mobile](screenshots/github/390-github.png).
- [Caso VERSARY](screenshots/github/1440-case-versary.png), [GymFlow](screenshots/github/1440-case-gymflow.png) e [Ritmo Fitness](screenshots/github/390-case-ritmo-fitness.png).
- [Estado offline sem cache](screenshots/github/390-offline.png).

A API real foi verificada no navegador. A mudança de metadados após expiração foi testada com respostas controladas: o teste altera a descrição recebida e envelhece o cache em três horas, confirmando a nova descrição após recarregar. **Nenhum repositório no GitHub foi alterado para executar esse teste.**

## Reproduzir

```sh
npm ci
npm run build
npm run preview -- --port 4190 --strictPort
# em outro terminal
TEST_BASE_URL=http://127.0.0.1:4190 npm run test:github
TEST_BASE_URL=http://127.0.0.1:4190 npm run test:e2e
TEST_BASE_URL=http://127.0.0.1:4190 npm run test:production
npm run test:contact
```

`test:github` inclui uma consulta real e por isso requer rede e cota disponível; as verificações de cache, exclusão, paginação e estados usam fixtures públicas controladas em `scripts/fixtures/github-public.json`. O teste unitário pode ser executado isoladamente com `node scripts/test-github-service.mjs`.

Para refazer as capturas de origem, clone os três repositórios públicos e execute-os nas portas documentadas em `scripts/capture-repositories.mjs`. Não é necessário executar os projetos de origem para compilar ou abrir o portfólio: os WebPs são locais.

## Pendências reais

- Validar os fluxos autenticados GymFlow com PostgreSQL funcional e Ritmo com uma instância Supabase autorizada; complementar capturas internas após essa validação.
- Confirmar detalhes pessoais de participação e aprendizados da autora antes de ampliar esses relatos em primeira pessoa.
- Disponibilizar URLs de demonstração, se houver interesse em incluir o botão Ver projeto.
- Atualizar capturas e estudos manualmente quando a interface dos projetos mudar. A automação atual é de **metadados**, não de screenshots ou análise de código.
- Publicação depende de autorização. Nenhum deploy, push ou alteração no GitHub foi feito nesta etapa.
