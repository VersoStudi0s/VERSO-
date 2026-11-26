"""Original, editable vector layouts for VERSO concept studies. No external imagery."""
from pathlib import Path
from html import escape
out = Path(__file__).resolve().parent.parent / 'public/images/studies'

def rect(x,y,w,h,c,r=0,stroke='none'):
 return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{c}" stroke="{stroke}"/>'
def txt(x,y,t,size=20,c='#f4f1ec',font='Arial',weight=400,extra=''):
 return f'<text x="{x}" y="{y}" font-family="{font}" font-size="{size}" font-weight="{weight}" fill="{c}" {extra}>{escape(str(t).replace("↗", "").replace("→", ""))}</text>'
def line(x,y,x2,y2,c='#34363b',width=1):
 return f'<path d="M{x} {y}H{x2}" stroke="{c}" stroke-width="{width}"/>' if y==y2 else f'<path d="M{x} {y}L{x2} {y2}" stroke="{c}" stroke-width="{width}"/>'
def wrap(content,bg,name):
 return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="1100" viewBox="0 0 1500 1100"><title>{name} — estudo visual conceitual</title><defs><filter id="shadow" x="-30%" y="-30%" width="180%" height="180%"><feDropShadow dx="0" dy="22" stdDeviation="22" flood-color="#141414" flood-opacity=".16"/></filter><linearGradient id="paper"><stop stop-color="#e3d7bf"/><stop offset=".45" stop-color="#f5ecdb"/><stop offset="1" stop-color="#d5c9b0"/></linearGradient><linearGradient id="bottle"><stop stop-color="#ddd8c7"/><stop offset=".2" stop-color="#faf5e9"/><stop offset=".65" stop-color="#eee7d8"/><stop offset="1" stop-color="#c8c3b2"/></linearGradient></defs>{rect(0,0,1500,1100,bg)}{content}</svg>'''
def save(name,content,bg,title):
 (out/f'{name}.svg').write_text(wrap(content,bg,title))
def eyebrow(title,ink):
 return txt(70,65,title,15,ink,'Arial',500,'letter-spacing="3"')+txt(1430,65,'VERSO* / CONCEPT STUDIES',13,ink,'Arial',400,'text-anchor="end" letter-spacing="2"')
def dashboard():
 s=rect(0,0,1190,740,'#181b20',12)+rect(0,0,190,740,'#111419',12)+txt(25,49,'VERSARY',24,'#f4f1ec','Arial',700)+txt(25,78,'INDUSTRIAL WORKSPACE',8,'#939ba5',extra='letter-spacing="1.5"')
 for i,t in enumerate(['Visão geral','Ordens de produção','Equipamentos','Equipe','Relatórios']):
  y=132+i*52
  if i==0:s+=rect(14,y-25,162,40,'#34303a',5)
  s+=rect(28,y-13,12,12,'none',2,'#d77a83' if i==0 else '#79818c')+txt(52,y,t,12,'#f1eeee' if i==0 else '#99a1ab')
 s+=txt(25,696,'AMBIENTE DEMONSTRATIVO',8,'#939ba5')+txt(225,49,'Visão geral da operação',25,weight=600)+txt(225,78,'Um resumo para orientar a próxima decisão.',11,'#a7afb9')+rect(972,27,182,37,'#23272f',5)+txt(988,51,'Semana 12  /  Dados fictícios',10,'#d5d8de')
 for i,(label,value,note) in enumerate([('Ordens em andamento','24','Visão consolidada'),('Eficiência operacional','86%','Dado demonstrativo'),('Equipamentos ativos','18 / 20','Status do turno')]):
  x=225+i*312;s+=rect(x,109,292,130,'#23272e',7)+txt(x+20,139,label,12,'#aeb5bd')+txt(x+20,186,value,38,weight=600)+txt(x+20,215,note,10,'#b6b9c0')
 s+=rect(225,260,611,255,'#20242a',7)+txt(247,292,'Ritmo de produção',16,weight=500)+txt(247,313,'UNIDADES POR DIA · SIMULAÇÃO',8,'#a0a7b0')
 for y in [350,397,444]:s+=line(260,y,810,y,'#363b43')
 for i,h in enumerate([65,90,72,120,105,137,110]):
  x=285+i*72;s+=rect(x,467-h,26,h,'#dc5967',3)+rect(x+29,467-h*.72,15,h*.72,'#535b68',2)+txt(x,491,['SEG','TER','QUA','QUI','SEX','SÁB','DOM'][i],9,'#b8bec8')
 s+=rect(854,260,307,255,'#20242a',7)+txt(878,292,'Distribuição das ordens',15)+f'<circle cx="1006" cy="399" r="65" fill="none" stroke="#39404b" stroke-width="20"/><circle cx="1006" cy="399" r="65" fill="none" stroke="#dc5967" stroke-width="20" stroke-dasharray="270 410" transform="rotate(-90 1006 399)"/>'+txt(1006,405,'24',30,extra='text-anchor="middle"')+txt(1006,428,'EM ANDAMENTO',8,'#b8bec8',extra='text-anchor="middle"')
 s+=rect(225,535,936,171,'#20242a',7)+txt(248,569,'Ordens recentes',16)+txt(1040,569,'Ver todas →',11,'#f0939b')
 for i,(n,p,status) in enumerate([('OP–024','Linha de montagem A','Em produção'),('OP–023','Usinagem / lote 08','Em revisão'),('OP–022','Linha de montagem B','Concluída')]):
  y=603+i*34;s+=line(245,y-17,1142,y-17,'#343941')+txt(250,y,n,11)+txt(405,y,p,11,'#a9b0bb')+txt(770,y,'Turno 01',10,'#a9b0bb')+txt(1000,y,status,10,'#f0a0a6')
 return s
s=eyebrow('01 / SISTEMAS QUE ORGANIZAM', '#c6c6ca')+txt(75,160,'Clareza para operar.',64,'#f4f1ec','Arial',600)
s+='<g transform="translate(123 245)" filter="url(#shadow)">'+rect(-14,-14,1218,770,'#44454a',18)+dashboard()+'</g>'
s+=f'<path d="M72 1000H1428L1360 1035H140Z" fill="#727278"/>'+line(600,1009,900,1009,'#424248',4)+txt(75,1070,'DASHBOARD / UI CONCEPT',12,'#bdbdc4',extra='letter-spacing="2"')+txt(1425,1070,'DADOS FICTÍCIOS',12,'#bdbdc4',extra='text-anchor="end" letter-spacing="2"')
save('versary',s,'#24262b','VERSARY')
s=eyebrow('VERSARY / INTERFACE EM FOCO','#373a40')+'<g transform="translate(75 160) scale(1.13)">'+dashboard()+'</g>'+txt(75,1050,'HIERARQUIA   /   CONTRASTE   /   LEITURA DE DADOS',18,'#373a40',extra='letter-spacing="2"')
save('versary-detail',s,'#e5e5e0','VERSARY · interface')

# Café Aurora: packaging dieline-inspired mockups, printed menu, disciplined brand.
s=eyebrow('02 / IDENTIDADE PARA UM NOVO RITUAL','#562e2b')+txt(75,205,'Café Aurora',100,'#502b29','Georgia')+txt(80,249,'TEMPO PARA UM BOM CAFÉ.',16,'#754d43',extra='letter-spacing="5"')
s+='<g transform="translate(930 295) rotate(7)" filter="url(#shadow)">'+rect(0,0,410,620,'#fcf6e9')+txt(38,64,'Aurora',48,'#502b29','Georgia')+line(38,97,370,97,'#ab9780')+txt(38,136,'CAFÉS & ENCONTROS',13,'#502b29',extra='letter-spacing="2"')
for i,(a,b) in enumerate([('Espresso','8'),('Cappuccino','14'),('Coado da casa','12'),('Latte','16'),('Pão de queijo','9')]):
 y=204+i*60;s+=txt(38,y,a,18,'#502b29','Georgia')+txt(368,y,b,16,'#502b29',extra='text-anchor="end"')+line(38,y+20,370,y+20,'#dfd4c3')
s+=txt(38,565,'CARDÁPIO CONCEITUAL',10,'#826954',extra='letter-spacing="2"')+'</g>'
s+='<g transform="translate(130 345) rotate(-5)" filter="url(#shadow)"><path d="M25 0H390L415 65L400 535H0L10 65Z" fill="url(#paper)"/>'+line(25,32,390,32,'#b4a38a',3)+rect(35,98,345,350,'#6c302e')+txt(207,176,'Café',32,'#f4e6cd','Georgia',extra='text-anchor="middle"')+txt(207,233,'Aurora',61,'#f4e6cd','Georgia',extra='text-anchor="middle"')+f'<path d="M112 294A95 95 0 0 1 302 294" stroke="#d7b47b" stroke-width="2" fill="none"/>'+line(96,294,318,294,'#d7b47b',2)+txt(207,340,'ORIGEM & RITUAL',12,'#f4e6cd',extra='text-anchor="middle" letter-spacing="3"')+txt(207,388,'CAFÉ EM GRÃOS  /  250 g',12,'#f4e6cd',extra='text-anchor="middle"')+txt(207,493,'ESTUDO DE EMBALAGEM',10,'#755f49',extra='text-anchor="middle" letter-spacing="2"')+'</g>'
s+='<g transform="translate(587 582) rotate(8)" filter="url(#shadow)"><path d="M0 30H280L246 362Q139 386 35 362Z" fill="#f3e7d0"/>'+rect(-10,0,300,42,'#422c29',12)+rect(-2,-15,285,27,'#60413b',8)+f'<path d="M15 147H267L256 282H29Z" fill="#6c302e"/>'+txt(141,217,'Aurora',42,'#f3e7d0','Georgia',extra='text-anchor="middle"')+'</g>'
s+=txt(75,1048,'BRANDING  /  EMBALAGEM  /  CARDÁPIO',15,'#754d43',extra='letter-spacing="2"')
save('cafe-aurora',s,'#dfd3bf','Café Aurora')
s=eyebrow('CAFÉ AURORA / SISTEMA VISUAL','#f1e5cf')+txt(750,380,'Aurora',210,'#f1e5cf','Georgia',extra='text-anchor="middle"')+txt(750,450,'UM RITUAL, TODOS OS DIAS.',22,'#f1e5cf',extra='text-anchor="middle" letter-spacing="5"')
for i,(color,label) in enumerate([('#f1e5cf','CREME'),('#d5af74','DOURADO'),('#a86549','TERRA'),('#462827','CAFÉ')]):
 x=100+i*330;s+=rect(x,620,310,220,color)+txt(x,884,label,13,'#f1e5cf',extra='letter-spacing="3"')
s+=txt(100,1000,'Tipografia clássica. Um símbolo de amanhecer. Aplicações cotidianas.',24,'#f1e5cf','Georgia')
save('cafe-aurora-detail',s,'#6c302e','Café Aurora · sistema visual')

# Syntax: designed retail interface with original garment silhouettes.
def shirt(x,y,scale=1,color='#282a2c'):
 return f'<g transform="translate({x} {y}) scale({scale})"><path d="M77 20L120 0Q150 42 180 0L223 20L295 103L240 145L214 111V330H86V111L60 145L5 103Z" fill="{color}" stroke="#66686a" stroke-width="2"/><path d="M120 0Q150 62 180 0M90 300H210M25 95L65 127M235 127L275 95" fill="none" stroke="#737577" stroke-width="2"/><text x="150" y="143" text-anchor="middle" fill="#c8cacb" font-family="Arial" font-size="13" letter-spacing="2">SYNTAX</text></g>'
def syntax():
 s=rect(0,0,1320,800,'#efeee9')+txt(36,62,'SYNTAX',37,'#141618','Arial',700)+txt(580,58,'SHOP     COLEÇÕES     SOBRE',13,'#141618')+txt(1200,58,'BAG (0)',13,'#141618')+line(35,90,1285,90,'#bbbdb8')
 s+=rect(35,115,740,480,'#c9cac4')+txt(70,162,'DROP 001 / UNIFORME URBANO',13,'#202222',extra='letter-spacing="2"')+txt(70,295,'EVERY',100,'#242628','Arial',800)+txt(70,390,'DAY.',100,'#242628','Arial',800)+txt(70,530,'Peças essenciais. Identidade própria.',16,'#303234')+shirt(400,201,1.05,'#252729')
 s+=txt(820,158,'NOVOS ESSENCIAIS',14,'#252729',extra='letter-spacing="2"')+rect(820,184,465,265,'#deded6')+shirt(940,206,.64,'#bcb7a6')+txt(820,486,'Oversized / Stone',25,'#202222')+txt(820,517,'Algodão · Modelagem ampla',13,'#65665f')+rect(820,549,465,46,'#202222')+txt(1052,578,'EXPLORAR A COLEÇÃO  ↗',12,'#f2f1eb',extra='text-anchor="middle" letter-spacing="2"')
 s+=txt(35,685,'LESS NOISE.',73,'#242628','Arial',800)+txt(35,752,'MORE IDENTITY.',73,'#242628','Arial',800)+txt(835,710,'DIREÇÃO CONCEITUAL DE E-COMMERCE',11,'#55574f')+txt(835,744,'Catálogo + produto + linguagem editorial',15,'#55574f')
 return s
s=eyebrow('03 / INDEPENDENT BY DESIGN','#dedfdb')+'<g transform="translate(90 170)" filter="url(#shadow)">'+syntax()+'</g>'+txt(90,1045,'SYNTAX STUDIO  /  WEB DESIGN & ART DIRECTION',15,'#dedfdb',extra='letter-spacing="2"')
save('syntax-studio',s,'#343b3c','Syntax Studio')
s=eyebrow('SYNTAX / PÁGINA DE PRODUTO','#303332')+rect(75,155,760,790,'#d2d3cb')+shirt(210,240,1.65)+txt(925,255,'SYNTAX',36,'#242628',weight=700)+txt(925,345,'Daily tee.',58,'#242628',weight=600)+txt(925,390,'01 / GRAPHITE',17,'#61665e',extra='letter-spacing="3"')+line(925,440,1430,440,'#b8bdb3')+txt(925,492,'Essencial na forma.',25,'#242628')+txt(925,529,'Livre na combinação.',25,'#242628')
for i,a in enumerate(['P','M','G','GG']):s+=rect(925+i*105,610,85,65,'#242628' if i==1 else 'none',0,'#989f94')+txt(968+i*105,652,a,19,'#f4f2eb' if i==1 else '#242628',extra='text-anchor="middle"')
s+=rect(925,740,505,65,'#242628')+txt(1177,780,'SELECIONAR PEÇA  ↗',15,'#f4f2eb',extra='text-anchor="middle" letter-spacing="2"')+txt(925,880,'INTERFACE CONCEITUAL',12,'#61665e',extra='letter-spacing="2"')
save('syntax-studio-detail',s,'#eeefe8','Syntax Studio · produto')

# Pulse: typography-led digital landing, no surreal imagery.
def pulse():
 s=rect(0,0,1300,810,'#eeece6')+txt(40,65,'pulse↗',45,'#171719','Arial',700)+txt(770,58,'TRABALHOS     ESTÚDIO',13,'#171719')+rect(1065,27,195,48,'#171719')+txt(1162,57,'VAMOS CONVERSAR',11,'#eeece6',extra='text-anchor="middle"')+line(40,100,1260,100,'#c4c0b7')+txt(45,166,'ESTÚDIO INDEPENDENTE / DESIGN & TECNOLOGIA',12,'#55544f',extra='letter-spacing="2"')+txt(40,337,'MAKE IT',164,'#171719','Arial',800)+txt(40,502,'MOVE.',164,'#171719','Arial',800)+txt(50,580,'Ideias em movimento. Experiências com intenção.',22,'#41413d')+rect(45,628,270,55,'#e54858')+txt(180,662,'CONHEÇA O ESTÚDIO  ↗',12,'#171719',extra='text-anchor="middle" letter-spacing="1"')
 for i in range(8):
  s+=f'<rect x="{850+i*20}" y="{210+i*20}" width="{330-i*40}" height="{330-i*40}" fill="none" stroke="#e54858" stroke-width="10" transform="rotate({i*6} 1015 375)"/>'
 s+=line(40,740,1260,740,'#c4c0b7')+txt(45,782,'ESTRATÉGIA',12,'#55544f')+txt(440,782,'DESIGN DIGITAL',12,'#55544f')+txt(895,782,'DESENVOLVIMENTO',12,'#55544f')
 return s
s=eyebrow('04 / DIGITAL EXPERIENCES, WITH A PULSE','#151517')+'<g transform="translate(100 150)" filter="url(#shadow)">'+pulse()+'</g>'+txt(100,1048,'LANDING PAGE  /  MOTION  /  FRONT-END CONCEPT',15,'#151517',extra='letter-spacing="2"')
save('pulse-lab',s,'#db6470','Pulse Lab')
s=eyebrow('PULSE LAB / ESTUDO DE RITMO','#f4f0e8')+txt(90,270,'PAUSA.',155,'#f4f0e8','Arial',800)+txt(90,435,'RITMO.',155,'#e54858','Arial',800)+txt(90,600,'AÇÃO.',155,'#f4f0e8','Arial',800)
for i,h in enumerate([70,160,110,280,180,350,220,130]):s+=rect(90+i*165,990-h,120,h,'#e54858' if i%2==0 else '#46464c')
s+=txt(90,1050,'MOVIMENTO COMO HIERARQUIA — NÃO COMO DISTRAÇÃO.',16,'#c4c1c0',extra='letter-spacing="2"')
save('pulse-lab-detail',s,'#19191d','Pulse Lab · movimento')

# Numa: minimal product system, deliberately original vector product mockups.
def bottle(x,y,scale=1):
 return f'<g transform="translate({x} {y}) scale({scale})" filter="url(#shadow)">'+rect(22,0,160,80,'#c1bba9',8)+rect(0,65,204,405,'url(#bottle)',23)+txt(102,200,'numa',49,'#515947','Georgia',extra='text-anchor="middle"')+line(32,228,172,228,'#b2b8a8')+txt(102,270,'DAILY RITUAL',11,'#515947',extra='text-anchor="middle" letter-spacing="2"')+txt(102,301,'CREME FACIAL',10,'#515947',extra='text-anchor="middle" letter-spacing="1"')+txt(102,416,'50 ml',10,'#515947',extra='text-anchor="middle"')+'</g>'
s=eyebrow('05 / O ESSENCIAL, COM INTENÇÃO','#4d5747')+txt(90,220,'numa',140,'#4d5747','Georgia')+txt(93,266,'SKIN, SIMPLY.',17,'#4d5747',extra='letter-spacing="5"')
s+='<g transform="translate(930 280) rotate(5)" filter="url(#shadow)">'+rect(0,0,300,610,'#a9b09d')+f'<path d="M300 0L350 32V590L300 610Z" fill="#89967e"/>'+txt(150,190,'numa',70,'#f3f0e5','Georgia',extra='text-anchor="middle"')+txt(150,247,'DAILY RITUAL',13,'#263123',extra='text-anchor="middle" letter-spacing="3"')+line(45,295,255,295,'#7f8a73')+txt(150,349,'CUIDADO ESSENCIAL',11,'#263123',extra='text-anchor="middle" letter-spacing="2"')+txt(150,540,'ESTUDO DE EMBALAGEM',10,'#263123',extra='text-anchor="middle"')+'</g>'
s+=bottle(605,370,1.25)+bottle(280,590,.78)+txt(90,1035,'BRAND SYSTEM  /  PACKAGING  /  DIGITAL',15,'#4d5747',extra='letter-spacing="2"')
save('numa-skin',s,'#e8e6db','Numa Skin')
s=eyebrow('NUMA SKIN / EXPERIÊNCIA DIGITAL','#4d5747')+rect(75,135,1350,845,'#f7f6ee')+txt(115,215,'numa',58,'#4d5747','Georgia')+txt(850,200,'ROTINA     ESSENCIAIS     A MARCA',13,'#4d5747')+txt(1270,200,'BAG (0)',13,'#4d5747')+line(115,250,1385,250,'#d5d8cc')+txt(130,410,'Menos passos.',78,'#4d5747','Georgia')+txt(130,500,'Mais presença.',78,'#4d5747','Georgia')+txt(135,572,'Um conceito de cuidado que começa pelo essencial.',19,'#606b58')+rect(135,630,330,58,'#4d5747')+txt(300,666,'DESCUBRA O RITUAL  ↗',13,'#f7f6ee',extra='text-anchor="middle" letter-spacing="2"')+rect(890,295,490,560,'#e5e8dc')+bottle(1030,350,.95)+txt(135,874,'IDENTIDADE COESA, DA EMBALAGEM À INTERFACE.',12,'#606b58',extra='letter-spacing="2"')
save('numa-skin-detail',s,'#bac3ad','Numa Skin · e-commerce')
# Original typographic poster for About, replaces the fictitious person.
s=eyebrow('RENATA / DESIGN & DESENVOLVIMENTO','#f4eee5')+txt(70,485,'R',475,'#f4eee5','Georgia')+txt(560,485,'*',290,'#f4eee5','Georgia')+line(75,580,1425,580,'#f4eee5')+txt(75,690,'PENSAR.',91,'#f4eee5','Arial',700)+txt(75,795,'DESENHAR.',91,'#f4eee5','Arial',700)+txt(75,900,'CONSTRUIR.',91,'#f4eee5','Arial',700)+txt(75,1030,'UMA PRÁTICA EM CONSTANTE CONSTRUÇÃO.',18,'#f4eee5',extra='letter-spacing="3"')
save('renata',s,'#8c2e3d','Renata · manifesto tipográfico')
save('lab-grid',eyebrow('ESTUDO DE COMPOSIÇÃO','#242427')+''.join(rect(95+i*325,180+j*265,295,235,['#dd5361','#202024','#c9c7c0','#eae8e1'][(i+j)%4]) for j in range(3) for i in range(4))+txt(95,1050,'FORMA / RITMO / CONTRASTE',22,'#242427',extra='letter-spacing="4"'),'#f2eee5','LAB · composição')
print('Created 12 original SVG studies.')
