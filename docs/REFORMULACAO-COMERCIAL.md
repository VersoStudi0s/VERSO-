# VERSO* — reformulação comercial, etapa 1

22 de outubro de 2026 · Implementação local · **Não publicada**

## Escopo e diagnóstico

Trabalho incremental sobre o código existente, recuperado do repositório do VERSO*, no commit `6c50ca7504b24e0466f17a1c5a9a417d392e2c14`. A branch `main` conserva essa base; as alterações desta etapa estão em `local/comercial-fase1`. Nenhuma versão foi enviada à hospedagem e nenhum deploy foi executado.

O projeto já utilizava Vue 3, TypeScript, Vite, Vue Router, Composition API, fontes locais, imagens WebP responsivas, animações CSS, Intersection Observer e pré-renderização com o renderizador do Vue. Os quatro estudos de projeto, a política de privacidade, o menu, os filtros, as habilidades e os experimentos estavam implementados. Essa fundação foi preservada.

Problemas de apresentação encontrados: o título conceitual não explicava os serviços; a oferta ficava depois dos projetos e tinha pouca informação; faltava um caminho específico entre serviço e exemplos; não havia uma explicação do processo; o contato sem endpoint apenas informava indisponibilidade. No mobile, a arte anterior antecedia os CTAs e os colocava mais abaixo.

O briefing anexado orientou o conteúdo comercial. As instruções diretas de Renata limitaram o trabalho à primeira etapa e impediram publicação. SOLUNA Café e Ateliê Lume foram confirmados como ideias: não foram adicionados. Café Aurora continua identificado como identidade fictícia, sem ser apresentado como cardápio ou site pronto.

## Alterações

| Área | Implementação | Arquivos principais |
| --- | --- | --- |
| Hero | Proposta de valor do briefing; “Ver projetos” e “Solicitar orçamento”; assinatura; mesma colagem e fontes | `src/sections/HeroSection.vue` |
| Serviços | Quatro categorias, descrições, entregáveis, exemplos e orçamento com serviço pré-selecionado | `src/data/services.ts`, `src/sections/ServicesSection.vue` |
| Navegação | Serviços antes de Projetos, nova âncora Processo e CTA persistente de orçamento; menu com foco contido e Escape | `src/data/site.ts`, `src/components/SiteHeader.vue`, `SiteFooter.vue` |
| Homepage | Serviços → projetos/destaque → processo → sobre/habilidades → LAB → contato; composição em colunas no desktop | `src/pages/HomePage.vue` |
| Projetos | Filtro adicional por serviço via URL; estado vazio honesto; filtros por categoria e quatro estudos preservados | `src/sections/ProjectsSection.vue`, `src/data/projects.ts`, `src/types/project.ts` |
| Processo | Entendimento, proposta, criação e entrega, sem preços ou resultados prometidos | `src/sections/ProcessSection.vue` |
| Sobre e habilidades | Texto profissional ligado à formação no SENAI; tipografia mais legível; grupos de aprendizagem mantidos | `src/sections/AboutSection.vue`, `SkillsSection.vue` |
| LAB | Prévia recolhível, preservando os três experimentos e seus controles; pausa quando fechado | `src/sections/LabPreview.vue`, `LabSection.vue` |
| Contato | Gerador local validado, texto revisável e cópia real com alternativa manual; adaptador de envio preservado | `src/sections/ContactSection.vue`, `netlify/functions/contact.ts` |
| Privacidade e SEO | Explicação da geração local, finalidade e área de transferência; título/descrição da homepage atualizados | `src/pages/PrivacyPage.vue`, `src/data/metadata.ts` |
| Verificação e operação | Testes atualizados e novos testes por toque/captura; configuração documentada | `scripts/test-*.mjs`, `scripts/capture-commercial.mjs`, `README.md`, `docs/SETUP.md` |

Nenhuma dependência de produção foi adicionada, nem houve alteração no lockfile. As rotas existentes e os arquivos originais permanecem disponíveis.

## Identidade, composição e movimento

Preservados preto/vermelho, título condensado, destaque serifado em itálico, monoespaçada funcional, colagem editorial, cromados, linhas finas e composição assimétrica. O conteúdo e a hierarquia comercial mudaram conforme solicitado; não se afirma identidade pixel a pixel com o painel original.

Comparação visual realizada no Chromium entre capturas antes/depois em 1440 e 390 px, mais revisão em 768 px. Refinamentos: CTAs antes da arte no mobile; recorte da colagem corrigido no tablet; habilidades e LAB agrupados ao lado do Sobre no desktop; serviços com divisões editoriais, informação legível e duas ações claras.

A sequência de entrada do hero revela arte e linhas do título de forma coordenada. Os CTAs ficam disponíveis imediatamente. O parallax é moderado, restrito ao hero e a ponteiro do tipo mouse; o frame pendente é cancelado ao desmontar. Revelações por scroll, hover de cards, botões e filtros foram preservados. O LAB só anima quando aberto e permite pausa. Foi corrigido um problema de repetição: ao terminar um efeito, uma nova ativação reinicia a animação, inclusive após várias repetições nos três modos. `prefers-reduced-motion` desativa movimentos. Os controles do LAB têm pelo menos 44 px de altura nos testes por toque.

## Funcionalidades e conteúdo verdadeiro

- As quatro categorias comerciais estão ligadas ao contato. O tipo escolhido chega ao formulário pela URL.
- Websites e UX/UI mostram VERSARY e Syntax. Redes sociais e materiais digitais informam a ausência de exemplos correspondentes e permitem voltar aos trabalhos atuais.
- Os filtros Todos, Websites, UI/UX, Identidade e Experimentos continuam funcionando.
- VERSARY: concluído para o Desafios de Ideias. Café Aurora: fictício. Syntax: em desenvolvimento em dupla. Forma em movimento: experimento do próprio portfólio.
- O formulário sem endpoint **gera e copia uma mensagem; não a envia**. A interface informa isso antes e depois da ação. Erros de validação recebem descrição e foco. Se a cópia automática falhar, o texto é selecionado para cópia manual. Editar os campos invalida o rascunho anterior.
- O caminho de envio configurado permanece disponível, com loading, falhas e sucesso somente após `{ "sent": true }`. Os testes desse caminho são interceptados; nenhum e-mail real foi enviado.
- Não foram adicionados cookies, armazenamento persistente, analytics, mapas, terceiros incorporados ou credenciais.

## Testes executados

Node 24.19, Chromium local, build de produção servido na porta 4180. O teste do adaptador também utiliza um servidor local separado, com requisições interceptadas.

| Comando | Resultado |
| --- | --- |
| `npm ci` | Dependências existentes instaladas |
| `npm run build` | TypeScript validado, bundles gerados e seis rotas pré-renderizadas |
| `TEST_BASE_URL=http://127.0.0.1:4180 npm run test:e2e` | 56 verificações de interação, oito larguras, sete análises axe; sem erros no console ou recursos quebrados |
| `npm run test:contact` | 18 verificações do adaptador, incluindo novos tipos de serviço e tipos anteriores; sem envio real |
| `npm run test:production` | Seis rotas com conteúdo sem JavaScript, hidratação sem avisos e sem overflow mobile |
| `node scripts/test-navigation.mjs` | 12 verificações de seção ativa e ciclos de foco do menu em desktop/mobile |
| `node scripts/test-commercial-mobile.mjs` | Seis fluxos por toque em 320/390 px; duas análises axe adicionais; sem overflow ou exceções |
| `node scripts/test-lab-motion.mjs` | Três modos com duas repetições reais cada, pausa/retomada, reabertura e mudança da preferência de movimento reduzido |
| `node scripts/capture-commercial.mjs` | Geometria do hero em 320, 360, 390, 768, 1024, 1280, 1440 e 1920 px; CTAs mobile dentro dos primeiros 844 px; capturas desktop/tablet/mobile |
| `npm audit --json` | Zero vulnerabilidades reportadas |
| `git diff --check` | Sem erros de whitespace |

As nove análises axe não encontraram violações nas regras WCAG testadas. Isso não equivale a certificação de acessibilidade ou a uma avaliação completa com leitores de tela/dispositivos físicos.

O teste de imagens foi ajustado para distinguir imagens visíveis de imagens lazy dentro do LAB recolhido. A imagem do experimento também é verificada depois de abrir o painel. A primeira execução do novo teste mobile exigiu corrigir a criação do contexto Playwright para uso com axe; a execução final passou. Os testes de fechamento passaram a aguardar a transição do menu e o evento nativo de fechamento do LAB, evitando verificar o DOM antes do término da ação.

### Lighthouse local

Execução única com emulação mobile padrão do Lighthouse, em produção local e sem outros testes de navegador em execução:

| Categoria | Pontuação |
| --- | --- |
| Desempenho | 89 |
| Acessibilidade | 100 |
| Boas práticas | 100 |
| SEO | 100 |

FCP 1,9 s; LCP 3,6 s; TBT 40 ms; CLS 0,048. Valores de laboratório, sujeitos ao dispositivo, rede e hospedagem. Restam oportunidades de otimização de entrega das imagens e CSS bloqueante; nenhum resultado em campo ou INP foi medido. Bundle principal final: aproximadamente 201,4 kB (69,0 kB gzip); CSS principal: 43,8 kB (9,5 kB gzip). A medição Lighthouse antecede a correção isolada do reinício do LAB, recolhido na carga inicial.

Evidências: `commercial-browser-results.json`, `commercial-mobile-results.json`, `commercial-visual-results.json`, `commercial-motion-results.json`, `commercial-lighthouse.json`, `commercial-dependencies.json`, `contact-results.json`, `navigation-results.json` e `production-results.json`.

## Capturas

Capturas reais do Chromium. As imagens de seções são recortes da captura do documento, sem a sobreposição do cabeçalho fixo. Movimento reduzido usado para comparações estáveis.

| Tela | Antes | Depois |
| --- | --- | --- |
| Hero desktop 1440 | [Antes](screenshots/commercial/1440-before-hero.png) | [Depois](screenshots/commercial/1440-after-hero.png) |
| Hero mobile 390 | [Antes](screenshots/commercial/390-before-hero.png) | [Depois](screenshots/commercial/390-after-hero.png) |
| Homepage desktop completa | [Antes](screenshots/commercial/1440-before-full.png) | [Depois](screenshots/commercial/1440-after-full.png) |
| Homepage mobile completa | [Antes](screenshots/commercial/390-before-full.png) | [Depois](screenshots/commercial/390-after-full.png) |
| Serviços desktop | [Antes](screenshots/commercial/1440-before-services.png) | [Depois](screenshots/commercial/1440-after-services.png) |
| Serviços mobile | [Antes](screenshots/commercial/390-before-services.png) | [Depois](screenshots/commercial/390-after-services.png) |

Também disponíveis: [hero tablet](screenshots/commercial/768-after-hero.png), [contato mobile](screenshots/commercial/390-after-contact.png) e [LAB aberto no mobile](screenshots/commercial/390-lab-open.png).

## Pendências reais

1. Informar um canal profissional autorizado para receber contatos e atender solicitações de privacidade. Até lá, o gerador local não entrega mensagens ao VERSO*.
2. Caso se deseje envio direto: configurar endpoint/provedor, testar com destinatário autorizado e atualizar a política segundo o tratamento efetivo. Não é necessário para usar o gerador local desta etapa.
3. Completar os casos com telas reais, participação e processo de VERSARY/Syntax. Os mockups seguem identificados como ilustrativos. Projetos de redes sociais/materiais digitais dependem de trabalhos efetivamente produzidos.
4. Confirmar os direitos de publicação das artes fornecidas. O retrato permanece identificado como referência visual, não como fotografia de Renata.
5. Publicação e eventuais configurações de domínio dependem de uma instrução futura. Esta etapa não realizou deploy.
