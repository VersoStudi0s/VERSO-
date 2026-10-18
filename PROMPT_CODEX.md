# Complemento ao prompt principal do Codex — VERSO* assets

O site VERSO* já possui uma referência de layout aprovada, assim como o kit de imagens abaixo. **Não redesenhe a identidade visual nem substitua os arquivos por imagens aleatórias.**

## Arquivos disponíveis

Todos os recursos WebP já estão em `public/images/`:

- `hero-editorial.webp`: composição principal do hero.
- `escultura-cromada.webp`: objeto cromado com fundo transparente.
- `retrato-editorial.webp`: composição editorial secundária, para seção Sobre ou variações.
- `projeto-cafe-aurora.webp`: mockup de café / identidade visual.
- `projeto-versary.webp`: notebook com dashboard / estudo de caso VERSARY.
- `olho-editorial.webp`: detalhe gráfico para o Lab ou o hero.
- `textura-editorial.webp`: textura de suporte para fundos locais.
- `projeto-streetwear.webp`: card de projeto de e-commerce/identidade streetwear.

Há versões menores `*-mobile.webp` e os PNGs originais em `assets/originais/`.
O mapeamento está em `src/data/versoAssets.ts`, com metadados em `assets/manifest.json`.

## Exigências de implementação

1. Integre cada imagem na seção correspondente do site. Diferencie **arte já composta** de assets isolados: a arte do hero e o retrato já incluem muitos efeitos; a escultura cromada é um asset transparente independente.
2. Crie camadas reais de HTML/CSS para textos, botões, labels e navegação. Não transforme imagens prontas em prints de telas interativas.
3. Em desktop, aproxime a composição aprovada: tipografia editorial à esquerda e arte expressiva à direita, quando aplicável. Use recortes e sobreposições cuidadosas, sem perder legibilidade.
4. Em mobile, reorganize os elementos, preservando a pessoa retratada e o texto. Evite `object-fit: cover` sem verificar os cortes.
5. Animar a escultura cromada com transformações, parallax suave e estados de movimento reduzido. Não afirmar rotação 3D real a partir de PNG/WebP.
6. Otimize o carregamento, identifique o LCP e carregue os recursos necessários com a prioridade certa.
7. Use as imagens de projetos como **mockups ilustrativos** até confirmar autoria, nome e conteúdo. Não chame a pessoa retratada de Renata sem confirmação.
8. Verifique os resultados em 390px, 768px e 1440px. Compare screenshots com o mockup aprovado, corrigindo espaçamentos, tipografia e composição.
9. Não substitua as imagens por gradientes, ícones genéricos ou fotos de banco sem motivo.
10. Faça relatório objetivo com caminhos realmente usados, seções implementadas, testes feitos e pendências reais.

Comece examinando o repositório e a referência de layout aprovada, depois mapeie a estrutura das seções. Implemente e teste.
