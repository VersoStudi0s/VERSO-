# Auditoria técnica — 17/10/2026

## Escopo e método

Inspeção do workspace, do ZIP, do manifesto e das quatro imagens anexadas. O diretório inicial não continha aplicação, Git, componentes, rotas, estilos nem backend. A referência principal estava apenas no anexo JPG; foi preservada como PNG no projeto. Os dois Reels não estavam disponíveis. Nenhuma afirmação de análise de vídeo ou modelo 3D é feita.

Validação com Chromium real via Playwright, axe-core, build TypeScript/Vite, inspeção de HTML pré-renderizado e Lighthouse sobre a saída de produção. Trata-se de verificação técnica, sem certificação legal ou garantia absoluta de conformidade WCAG.

## Acessibilidade

- Cinco análises axe com critérios WCAG 2 A/AA, 2.1 e 2.2 aplicáveis: home em 390, 768 e 1440; estudo de caso; privacidade. Resultados brutos: `browser-results.json`.
- Medição adicional de contraste (luminância sRGB): texto do CTA `#101014` sobre `#E54858` = 4,88:1; texto secundário `#B1ABAA` sobre `#09090B` = 8,79:1; borda dos inputs `#756B72` sobre `#18171A` = 3,49:1; borda dos modos do LAB sobre `#0C0C0E` = 3,82:1. As bordas decorativas dos painéis não são usadas para identificar controles.
- Contraste: textos claros sobre superfícies escuras; CTAs com texto escuro sobre vermelho; contraste auditado pelo axe e Lighthouse. A cor não é o único indicador dos filtros/abas: estados também expõem `aria-pressed` e bordas. Semântica usa landmarks, H1 único por rota e headings hierárquicos.
- Menu: botão com nome e expansão, foco transferido ao abrir, ciclo de Tab/Shift+Tab, Escape retorna ao botão, fundo inerte, fecha ao navegar e ao ampliar para desktop.
- Link para pular conteúdo, foco visível e gerenciamento do foco após rotas/âncoras. Cards inteiros são links de destino real, sem controles aninhados.
- Formulário: labels explícitos, required, erros associados, `aria-invalid`, foco no primeiro erro, status/alert e indicação de carregamento. Fonte dos inputs mobile evita zoom automático por fonte pequena.
- Artes decorativas têm alt vazio; mockups informativos têm descrições úteis. A arte do Sobre possui legenda que não atribui sua identidade a Renata.
- Preferência por movimento reduzido desativa animações e parallax e preserva conteúdo. O LAB tem controle explícito de movimento. Animações automáticas são curtas e não bloqueiam uso.
- Não houve teste manual com NVDA, JAWS ou VoiceOver, nem dispositivos físicos. Árvore semântica e estados foram verificados no navegador; essa limitação permanece explícita.

## Privacidade, formulários e LGPD

Dados solicitados: nome, e-mail, tipo de projeto e mensagem. Finalidade informada junto ao envio. Sem armazenamento local, banco, cookies ou analytics. O formulário não envia dados com endpoint vazio e informa a indisponibilidade. Testes de sucesso usam interceptação local; nenhum e-mail real foi enviado.

A política explica o funcionamento atual, créditos e pendências para ativação. Nenhum banner de cookies sem função foi inserido. Termos de compra/reembolso e consentimento de idade não foram adicionados, pois não há compra, cobrança, newsletter ou fluxo específico de crianças. Confirmar a adequação jurídica antes de publicar uma operação de coleta.

Pendente: identificar responsável/canal profissional, configurar provedor e retenção e atualizar a política para o tratamento real. Não há contatos fictícios, endereço residencial, mapas ou ferramentas de rastreamento.

## Segurança

Sem segredos no frontend ou no repositório. `.env*` ignorados, com exemplo sem valores. URLs sociais aceitam HTTPS e WhatsApp aceita apenas número válido em formato internacional. Nenhuma requisição para serviços de terceiros acontece por visualização da página.

O adaptador de contato valida origem, método, tipo/tamanho do corpo e campos; usa conteúdo de e-mail em texto simples; honeypot, timeout, guarda por IP do contexto confiável e mensagens genéricas de erro. O serviço só confirma envio após ID aceito pelo provedor. Proteção distribuída contra abuso e configuração de DNS do remetente são necessárias antes da ativação pública.

`netlify.toml` prepara CSP, Permissions-Policy, Referrer-Policy e X-Content-Type-Options. Esses cabeçalhos pertencem à configuração de hospedagem; não alegamos sua aplicação no servidor dev do Vite. A prévia privada foi publicada no Sites em 18/10/2026; o adaptador e os cabeçalhos específicos do Netlify não estão ativos nessa hospedagem estática.

`npm audit` e `npm audit --omit=dev`: nenhuma vulnerabilidade reportada na verificação executada. Isso reflete o banco de advisories consultado na data, sem garantia futura.

## Checklist comercial fornecido

WhatsApp: condicional a número autorizado, com mensagem contextual. Google Maps: não aplicável sem endereço comercial público. Formulário: integração preparada e desativada até configurar. Domínio/HTTPS: orientações em `SETUP.md`. Mobile: oito larguras testadas. Custos: nenhum serviço contratado e nenhum preço inventado.

## SEO e entrega de conteúdo

Títulos, descrições e Open Graph por rota, imagem de compartilhamento, favicon e idioma pt-BR. Home, quatro estudos e privacidade recebem HTML estático com Vue SSR e hidratação no cliente. Os projetos são legíveis sem JavaScript. Canonical, sitemap e URLs OG absolutas dependem de `VITE_SITE_URL`, evitando inventar domínio. `robots.txt` disponível. Rotas estáticas e fallback preparados; o build da prévia privada recebe a URL real do Sites.

## Performance

Imagens WebP responsivas, prioridade alta no hero, dimensões explícitas, lazy loading abaixo da dobra, fontes locais com preload seletivo, importações de ícones selecionados, rotas secundárias em chunks. Nenhum GSAP, Pinia, Three.js, rastreador ou serviço de smooth scrolling foi necessário. Intersection Observers, media queries, listeners e requestAnimationFrame são removidos ao desmontar os componentes.

Lighthouse foi executado no preview de produção com emulação mobile e throttling padrão. Os valores finais e o histórico estão em `ENTREGA.md` e nos relatórios JSON/HTML. Resultados de laboratório variam por execução e não equivalem a métricas de usuários reais.

## Revalidação do hero — 18/10/2026

Lighthouse mobile, produção local, uma nova execução após o refinamento: **84 performance / 100 acessibilidade / 100 boas práticas / 100 SEO**. FCP 2,7 s, LCP 3,7 s, TBT 150 ms, CLS 0,001. Evidência: `lighthouse-refinement-mobile.report.json` e `.html`. Esses valores substituem a pontuação anterior como medição desta versão; não medem o servidor privado remoto. LCP continua sendo uma oportunidade de otimização.

Regressão funcional: 35 verificações, oito larguras, cinco auditorias axe com zero violações; menus desktop/mobile com Escape e ciclo de foco; seis rotas com conteúdo estático e hidratação sem erros. O teste de imagens considera recursos efetivamente exibidos: a imagem decorativa lazy do cromo permanece sem download quando oculta no mobile.
