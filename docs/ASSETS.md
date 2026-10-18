# Recursos, fontes e direitos

## Origem preservada

- Layout aprovado: JPG anexado `1000015671.jpg`, convertido sem redesenho para `references/verso-aprovado.png` (1215 × 1280).
- Oito PNGs originais: `assets/originais/`.
- Manifesto original e guia do kit: `assets/manifest.json`, `assets/README-kit.md`, `PROMPT_CODEX.md`.
- WebPs fornecidos, inclusive `-mobile`, preservados em `public/images/`.
- Derivadas adicionais `-480.webp` e `-960.webp`: redimensionamento proporcional Lanczos, WebP qualidade 78. O canal alfa da escultura foi preservado.
- `verso-social.jpg`: peça de compartilhamento derivada da arte autorizada para esta implementação e tipografia VERSO*. Não é uma captura da interface.
- `favicon.png`: asterisco tipográfico da identidade, sem uso de marca externa.

| Recurso | Uso real |
| --- | --- |
| hero-editorial | Colagem do hero, em camada independente do texto HTML. |
| escultura-cromada | Detalhe dos serviços e experimento de forma no LAB. |
| retrato-editorial | Sobre, com legenda explícita de arte editorial e retrato pessoal pendente. |
| projeto-versary | Card, destaque e estudo conceitual VERSARY. |
| projeto-cafe-aurora | Card e estudo conceitual de identidade. |
| projeto-streetwear | Card e estudo de e-commerce; associação ao nome Syntax Studio a confirmar. |
| olho-editorial | Card do laboratório e experimento de composição. |
| textura-editorial | Link flutuante do hero e textura discreta de contato. |

A fornecedora do kit alerta que os materiais não comprovam autoria dos projetos, funcionamento de produtos nem identidade da pessoa fotografada. A implementação mantém essas distinções. A licença de publicação e a origem das artes precisam ser confirmadas pela responsável antes de uso público. Os dois Reels, um retrato pessoal identificado, modelos 3D e screenshots reais dos produtos não foram disponibilizados. Não foram substituídos por fotos aleatórias.

## Dependências visuais

Barlow Condensed (300, 600, 700), Cormorant Garamond (500 normal/itálico) e IBM Plex Mono (400) são carregadas localmente e distribuídas sob SIL OFL 1.1. Não há chamadas ao Google Fonts. Os ícones são Phosphor Icons, MIT. Cópias de licenças estão em `public/licenses/` e seguem para a saída de produção. Vue e Vue Router: MIT, também preservadas nesse diretório.

Nenhuma imagem nova foi gerada por IA durante esta implementação. O objeto cromado é uma imagem 2D com alfa, animada com CSS; não é apresentado como uma cena WebGL ou uma rotação 3D verdadeira.
