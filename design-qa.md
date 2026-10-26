# Revisão VERSO* — GitHub e curadoria real

22/10/2026. Implementação local, sem publicação. O relatório da reconstrução visual anterior está em [histórico editorial](docs/design-qa-editorial-historico.md); suas pontuações e capturas não representam esta versão.

## Resultado

Integração e galeria verificadas em Chromium real. Seleção principal: VERSARY, GymFlow, Ritmo Fitness, Syntax Studio e Café Aurora. Dois níveis de apresentação: estudos de caso editoriais e repositórios públicos elegíveis. A exclusão permanente vale para respostas novas e caches antigos.

A nova direção de imagens segue a solicitação posterior de usar interfaces reais e aplicações críveis. Não pretende reproduzir as fotografias e esculturas artificiais da referência inicial. Foram preservados preto/vermelho, tipografia editorial, hierarquia, composição assimétrica, profundidade moderada e interações existentes.

## Testes executados

| Comando / suíte | Resultado observado |
| --- | --- |
| `npm run build` | TypeScript e build cliente/SSR aprovados; dez rotas pré-renderizadas. |
| `node scripts/test-github-service.mjs` | 19 verificações: normalização, projetos permitidos sem topics, exclusões, privados/forks/arquivados/vazios, cache de três horas, metadados alterados, offline, paginação, host não confiável, storage bloqueado, limite da API e concorrência. |
| `node scripts/test-github-browser.mjs` | API real HTTP 200; oito larguras; dez layouts de casos; sete verificações de API/estados/cache; três auditorias axe; nenhum erro de navegador nas páginas auditadas. |
| `npm run test:e2e` | 57 verificações de interação, oito larguras, sete auditorias axe; nenhum erro de navegador. |
| `npm run test:production` | Dez rotas com conteúdo sem JavaScript e hidratação sem avisos; sem overflow mobile. |
| `npm run test:contact` | 18 verificações do adaptador; provedores interceptados, nenhum e-mail enviado. |
| `node scripts/test-navigation.mjs` | 12 verificações de seção ativa e loops de foco do menu desktop/mobile. |
| `node scripts/test-commercial-mobile.mjs` | Seis fluxos touch em 320/390 px e duas auditorias axe. |
| `node scripts/test-editorial-motion.mjs` | Sete verificações: profundidade, serviços, filtros, retorno de rota, movimento reduzido e touch. |
| `node scripts/test-lab-motion.mjs` | Três modos, dois reinícios reais por modo, pausa/continuação, retorno de rota e preferência de movimento reduzido. |
| `node scripts/test-curation.mjs` | Oito larguras sem recorte/overflow indevido, dez layouts de estudos, cinco auditorias axe; nenhuma requisição às antigas artes artificiais. |
| `npm audit --omit=dev` | Zero vulnerabilidades de produção reportadas nesta consulta. |
| `git diff --check` | Sem erros de whitespace. |

Serviço local: `http://127.0.0.1:4190`. As suítes aceitam `TEST_BASE_URL` conforme a documentação. Capturas com movimento reduzido; movimento verificado separadamente com preferência normal. Larguras: 320, 360, 390, 768, 1024, 1280, 1440 e 1920 px.

As 17 auditorias axe citadas não apontaram violações nas páginas/estados inspecionados. Isso não constitui certificação WCAG nem substitui avaliação com tecnologias assistivas por pessoas usuárias.

## Lighthouse mobile

Uma execução local em Chromium, configuração mobile padrão do Lighthouse 13:

- Performance: **93**.
- Acessibilidade: **100**.
- Boas práticas: **100**.
- SEO: **100**.
- FCP: 2,0 s; LCP: 2,9 s; TBT: 30 ms; CLS: 0.

Arquivo medido: [github-lighthouse-mobile.json](docs/github-lighthouse-mobile.json). Não é pontuação de produção, média de múltiplas execuções ou medida de usuários reais. Rede, dispositivo e hospedagem podem alterar os resultados.

## Comparação e refinamento

Foram abertas e inspecionadas as capturas das interfaces de origem, hero desktop/mobile, galeria, Explorar GitHub e casos. A comparação é com o código executado dos sistemas e a identidade editorial preservada, não com imagens inventadas de dashboards.

Correções após inspeção: uso de ícone SVG para a seta incompatível com a fonte condensada; limite de altura para screenshots de celular nos casos; captura Pareto em viewport mais ampla; retirada do indicador de desenvolvimento do Next.js das capturas; data e hora UTC para distinguir renovações do cache; atualização dos exemplos de serviço e expectativas dos testes à seleção atual.

Evidências principais:

- [Hero desktop](docs/screenshots/github/1440-hero.png) · [Hero mobile](docs/screenshots/github/390-hero.png).
- [Homepage desktop](docs/screenshots/github/1440-home.png) · [Homepage mobile](docs/screenshots/github/390-home.png).
- [Galeria editorial](docs/screenshots/github/1440-projetos.png).
- [GitHub desktop](docs/screenshots/github/1440-github.png) · [GitHub mobile](docs/screenshots/github/390-github.png).
- [Ritmo Fitness mobile](docs/screenshots/github/390-case-ritmo-fitness.png).
- [Offline sem cache](docs/screenshots/github/390-offline.png).

## Limitações

O cache é por navegador e só renova durante o uso do site. Nenhum token, cron, servidor de cache ou deploy foi adicionado. A API atualiza metadados; screenshots e narrativas exigem revisão editorial manual. A alteração de metadados foi validada por fixture controlada e expiração artificial do relógio/cache, sem editar o GitHub real.

GymFlow teve o login capturado com resposta anônima 401 interceptada, pois o PostgreSQL embarcado não iniciou por uma biblioteca de sistema ausente. Ritmo foi executado sem instância Supabase conectada; suas capturas não comprovam autenticação/persistência. VERSARY usou apenas o dataset fictício do próprio script do repositório; modelos preditivos não foram validados.

Veja fontes, commits, arquitetura, arquivos e pendências em [GITHUB-INTEGRACAO.md](docs/GITHUB-INTEGRACAO.md).
