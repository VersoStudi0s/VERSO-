# VERSO* — Kit de imagens para implementação

Este pacote organiza as 8 imagens fornecidas para o portfólio **VERSO* — Editorial Rebelde 2.0**.

## Estrutura

- `assets/originais/`: arquivos PNG fornecidos, sem qualquer edição visual.
- `public/images/`: variantes WebP otimizadas no tamanho original e versões menores `-mobile` (sem cortes).
- `src/data/versoAssets.ts`: mapeamento opcional de URLs para Vue/TypeScript.
- `assets/manifest.json`: informações e orientações por imagem.
- `PROMPT_CODEX.md`: instruções específicas para o Codex.

## Mapeamento e papéis visuais

| Arquivo | Uso principal | Cuidados |
| --- | --- | --- |
| `hero-editorial` | Hero da homepage | Já contém recortes e objeto cromado; evite duplicar esses elementos sem intenção. |
| `escultura-cromada` | Detalhe flutuante no hero, laboratório | Possui canal alfa transparente; não achatar em preto. |
| `retrato-editorial` | Sobre / variação do hero | Não atribuir a identidade da pessoa da foto à autora sem confirmação. |
| `projeto-cafe-aurora` | Capa de projeto de identidade | Confirmar a realidade do trabalho antes de alegar que foi executado. |
| `projeto-versary` | Card e capa de estudo de caso | É um mockup estilizado, não uma evidência de funcionalidades existentes. |
| `olho-editorial` | Overlay e Lab | Texto informativo não deve ficar coberto. |
| `textura-editorial` | Fundo de apoio entre seções | Usar seletivamente para manter contraste e hierarquia. |
| `projeto-streetwear` | Projeto de e-commerce | Confirmar nome/identidade corretos do projeto. |

## Como integrar

1. Copie a pasta `public/images/` para a pasta `public/images/` da aplicação Vue/Vite.
2. Opcionalmente copie `src/data/versoAssets.ts` para a pasta equivalente no projeto.
3. Use URLs absolutas a partir de `/images/`, por exemplo: `<img src="/images/hero-editorial.webp" alt="Arte editorial em vermelho e preto">`.
4. Para telas menores, configure `<picture>` com `srcset="/images/hero-editorial-mobile.webp"` em `<source media="(max-width: 767px)">`.
5. Preserve a composição e a legibilidade: use `object-fit: cover` apenas quando o corte não remover conteúdo visual importante; prefira `contain` ou ajustes finos para artes complexas.
6. Aplique `loading="lazy"` nas imagens abaixo da primeira dobra, e evite lazy loading do elemento LCP (hero) quando necessário.
7. Use `alt=""` para figuras apenas decorativas. Use descrições contextualizadas para imagens informativas.

## Observações essenciais

- Este kit contém imagens estáticas e **não contém** modelos 3D ou vídeos. A escultura cromada pode ser animada como camada 2D; para rotação 3D verdadeira, será necessário um modelo 3D.
- O kit não comprova autoria de projetos nem identidade da pessoa representada. Validar antes de publicar.
- O visual editorial de cada imagem já inclui sombras, luzes, recortes e texturas. Não reproduza efeitos redundantes automaticamente em CSS.
- As imagens foram convertidas para WebP para desempenho; os originais PNG permanecem disponíveis para comparação.
- Compare a implementação também com a **referência de layout VERSO* aprovada**, que é separada deste pacote.
