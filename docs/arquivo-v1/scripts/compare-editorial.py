"""Compose existing screenshots for human QA; never used as a website asset."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parent.parent
output = root / 'docs/screenshots/editorial'
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 18)
reference = Image.open(root / 'references/verso-aprovado.png')


def compare(items, name, width):
    images = []
    for label, image in items:
        image = image.convert('RGB')
        image = image.resize((width, round(image.height * width / image.width)))
        images.append((label, image))
    canvas = Image.new('RGB', (width * len(images) + 24 * (len(images) + 1),
                              max(image.height for _, image in images) + 72), (24, 23, 26))
    draw = ImageDraw.Draw(canvas)
    for index, (label, image) in enumerate(images):
        x = 24 + index * (width + 24)
        draw.text((x, 20), label, font=font, fill='#f7f0eb')
        canvas.paste(image, (x, 56))
    canvas.save(output / name, quality=91)


compare([('Referência aprovada · recorte', reference.crop((13, 13, 841, 566))),
         ('Implementação · 1440 px', Image.open(output / '1440-after-inicio.png'))],
        'reference-hero-comparison.jpg', 828)
for size in (1440, 390):
    compare([('Antes · etapa comercial', Image.open(output / f'{size}-before-hero.png')),
             ('Depois · reconstrução editorial', Image.open(output / f'{size}-after-hero.png'))],
            f'{size}-before-after.jpg', 720 if size == 1440 else 390)
regions = {
    'projetos': (14, 581, 543, 917),
    'servicos': (963, 581, 1203, 918),
    'sobre': (14, 931, 508, 1259),
    'lab': (521, 931, 913, 1126),
    'contato': (926, 931, 1204, 1259),
}
for section, box in regions.items():
    after = Image.open(output / f'1440-after-{section}.png')
    compare([('Antes · ' + section, Image.open(output / f'1440-before-{section}.png')),
             ('Depois · ' + section, after)], f'comparison-{section}.jpg', 650)
    compare([('Referência · ' + section, reference.crop(box)),
             ('Implementação · ' + section, after)], f'reference-{section}-comparison.jpg', 600)
