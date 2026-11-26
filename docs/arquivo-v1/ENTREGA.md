# Entrega local — VERSO*

Implementação em `/workspace/verso`. **Nenhuma publicação ou deploy foi realizado.** O servidor de desenvolvimento permanece na porta 4173 e o preview da produção na 4180.


> Atualização de 18/10/2026: a prévia privada solicitada foi publicada. O hero foi refinado novamente conforme a prioridade de Renata, e os estados dos projetos foram corrigidos. Veja [relatório da iteração](ITERACAO-2026-10-18.md) e [comparação atual](screenshots/hero-refinement-comparison-final.jpg). A medição Lighthouse desta versão é 84/100/100/100; os valores abaixo descrevem a primeira entrega.

## 1. Diagnóstico inicial

O workspace estava vazio: não havia aplicação anterior, repositório Git, dependências, componentes ou backend para preservar. O ZIP fornecia oito imagens, variantes WebP, manifesto e um mapeamento opcional de assets. A referência aprovada estava no JPG anexado, não em `references/verso-aprovado.png`; ela foi convertida e preservada nesse caminho.

Foram examinados o painel aprovado, as três imagens complementares, os oito originais e as orientações do kit. Os dois Reels e os modelos 3D não estavam disponíveis. O kit alerta que retratos e mockups não comprovam identidade, autoria ou implementação de produtos.

## 2. Alterações realizadas

Fundação Vue 3 + TypeScript + Vite, Composition API e Vue Router. Componentes e dados separados, tokens de cor/tipografia/espaçamento, fontes locais e ícones Phosphor. Código formatado e verificado por TypeScript.

Arquivos principais:

- `src/components/`: cabeçalho, menu, rodapé e imagens responsivas.
- `src/sections/`: hero, galeria, destaque VERSARY, serviços, Sobre, LAB, habilidades e contato.
- `src/pages/`: home, estudo parametrizado, privacidade e página não encontrada.
- `src/data/projects.ts`: conteúdo tipado, filtros e estudos; novas entradas também geram páginas estáticas.
- `src/services/contact.ts` e `netlify/functions/contact.ts`: contrato de envio e adaptador serverless opcional.
- `src/entry-server.ts`, `scripts/prerender.mjs`: HTML estático com Vue SSR, hidratação, metadados e regras de rotas.
- `scripts/test-*.mjs`, `docs/*`: verificações e evidências.

Originais preservados em `assets/originais/`, inclusive alfa da escultura. Novas variantes WebP 480/960, imagem social, favicon e licenças adicionados. O README original do kit está em `assets/README-kit.md`.

## 3. Fidelidade visual

Reproduzidos: fundo profundo, hierarquia de três linguagens tipográficas, título editorial inclinado com REALIDADE em vermelho, colagem lateral, recortes, cromo, anotações flutuantes, linhas finas, CTAs, navegação numerada, galeria compacta, serviços em serifada, retrato em moldura inclinada, LAB e formulário escuro.

A comparação foi repetida com capturas reais. Foram corrigidos corte do título mobile, distorção da escultura, proporções do hero, altura para manter os CTAs livres, escala tipográfica, cabeçalho da galeria e título dos serviços. O indicador ativo passou por correção para seções alinhadas na mesma linha do desktop.

Não é uma cópia pixel a pixel: a imagem principal e os mockups do kit diferem dos detalhes do painel, as fontes exatas não foram fornecidas e o LAB/formulário possuem controles e informações acessíveis adicionais. A arte do Sobre está identificada como composição editorial, com retrato pessoal pendente. Não há foto aleatória apresentada como Renata nem métricas comerciais inventadas.

Comparação: `screenshots/comparison-final.jpg` e `screenshots/comparison-details.jpg`. Revisão completa: `../design-qa.md`.

## 4. Animações

Entrada coordenada da arte e das linhas do título, texto e CTAs; revelações por Intersection Observer; inclinação e zoom suave nos cards; setas, bordas e filtros com estados próprios. Parallax discreto do hero responde apenas a mouse, com requestAnimationFrame e limpeza de listeners.

O LAB possui modos Forma, Tipo e Composição, com movimento em CSS, pausa/reinício e descrição da competência demonstrada. A animação inicial é curta, sem renderizador 3D. No mobile, a sequência é mais rápida, a composição é reorganizada e o parallax de mouse não atua. `prefers-reduced-motion` desativa as animações e mantém todo o conteúdo acessível.

## 5. Funcionalidades

Funcionam: links e âncoras, menu mobile com Escape e ciclo de foco, indicador ativo, filtros reais, quatro estudos com navegação entre projetos, seleção de serviço no formulário, trajetória expansível, agrupamento de habilidades e experimentos interativos.

O formulário valida campos, associa erros, move o foco, mantém dados após falha e só confirma sucesso com resposta explícita do adaptador. Sem endpoint, a interface informa antecipadamente que o canal ainda não recebe mensagens. **Nenhum e-mail real foi enviado.** A integração depende de configuração externa descrita em `SETUP.md`.

Canais profissionais ficam ocultos enquanto não forem autorizados/configurados. Não há endereço residencial, mapa, preços, clientes ou redes sociais inventados. Política de privacidade e créditos refletem a implementação atual.

## 6. Testes e resultados

- `npm run build`: aprovado, incluindo TypeScript, bundles e seis páginas pré-renderizadas.
- `TEST_BASE_URL=http://127.0.0.1:4180 npm run test:e2e`: **35 verificações de interação aprovadas**, oito larguras e cinco auditorias axe sem violações detectadas. Sem erros de JavaScript/console ou recursos quebrados.
- Larguras: **320, 360, 390, 768, 1024, 1280, 1440 e 1920 px**. Sem rolagem horizontal indevida.
- `npm run test:contact`: **12 verificações aprovadas**, com requisições interceptadas. Inclui validação, origem, limites, honeypot, rate guard, falha do provedor e confirmação de envio.
- `npm run test:production`: seis rotas com conteúdo disponível sem JavaScript, hidratação sem avisos e layout mobile sem overflow.
- `node scripts/test-navigation.mjs`: seis verificações do indicador ativo, em desktop e mobile.
- `node scripts/capture-final.mjs`: geometria do título e CTAs nas oito larguras, com capturas atualizadas em três tamanhos.
- Navegação manual automatizada com Tab/Shift+Tab: ciclo de foco do menu verificado.
- `npm audit`: nenhuma vulnerabilidade reportada na consulta executada; resultado em `npm-audit.json`.

Lighthouse mobile no preview da produção: **88 desempenho / 100 acessibilidade / 100 boas práticas / 100 SEO** na medição isolada registrada. FCP 1,7 s, LCP 3,8 s, TBT 60 ms, CLS 0. As execuções variaram entre 82 e 88 em desempenho; não são métricas de campo nem garantia de pontuação em outra máquina. A primeira medição foi 83, com FCP 2,2 s. O LCP mobile ainda tem espaço para otimização.

Bundle principal: aproximadamente 198 kB, **68,8 kB gzip**. CSS principal: cerca de 43 kB, **9,2 kB gzip**. Rotas secundárias em chunks. Nenhum Three.js, GSAP, Pinia ou SDK de rastreamento foi necessário.

Relatórios: `browser-results.json`, `contact-results.json`, `production-results.json`, `navigation-results.json`, `hero-final-results.json`, `lighthouse-mobile.report.html` e JSON correspondente.

Não foram testados dispositivos físicos ou leitores de tela dedicados. Acessibilidade automatizada não equivale a certificação WCAG ou jurídica. Detalhes em `AUDIT.md`.

## 7. Capturas

- [Desktop — hero](screenshots/1440-hero.png)
- [Desktop — página completa](screenshots/1440-full.png)
- [Tablet](screenshots/768-full.png)
- [Mobile — hero](screenshots/390-hero.png)
- [Mobile — página completa](screenshots/390-full.png)
- [Menu mobile](screenshots/390-menu.png)
- [Estudo desktop](screenshots/1440-case.png)
- [Estudo mobile](screenshots/390-case.png)
- [Comparação com a referência](screenshots/comparison-final.jpg)

## 8. Pendências reais

1. Fornecer retrato pessoal autorizado, canais profissionais e confirmar licenças de publicação das artes.
2. Substituir mockups por telas reais e completar participação, tecnologias, processo e aprendizados dos projetos. Em 18/10, Renata confirmou: VERSARY concluído para o Desafios de Ideias; Café Aurora fictício do ChatGPT; Syntax em desenvolvimento com um colega. A arte de streetwear segue ilustrativa. Confirmar a classificação das habilidades.
3. Configurar endpoint e credenciais exclusivamente no servidor, domínio do remetente, destinatário e proteção distribuída contra abuso; testar envio real com destinatário autorizado.
4. Definir responsável, canal de direitos, operadores e retenção e atualizar a política antes de ativar coleta pública.
5. Escolher domínio/hospedagem, preencher `VITE_SITE_URL`, preparar HTTPS/DNS e avaliar custos do plano escolhido. Publicação exige autorização posterior.
6. Refinar LCP mobile e validar em dispositivos físicos/leitores de tela. Os Reels originais, se fornecidos, permitirão comparação específica de ritmo e transições.
