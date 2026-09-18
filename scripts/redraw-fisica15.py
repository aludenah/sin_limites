#!/usr/bin/env python3
"""Rebuild the 37 chapter XV figures as precise, self-contained SVG line art.

Source crops remain in originales/ for comparison. Coordinates, labels, source
plate orientations and circuit connections follow those crops. No image tracing,
embedded bitmaps, external fonts or generated imagery are used.
Run from any directory: python scripts/redraw-fisica15.py
"""
from pathlib import Path
import hashlib
import html
import json
import math

ROOT = Path(__file__).resolve().parents[1]
SOURCE = json.loads((ROOT / 'assets/fisica-capitulo-15-originales.json').read_text())
SOURCES = {f['id']: f for f in SOURCE['figures']}
OUT = ROOT / 'assets/fisica-capitulo-15/lineales'
INK = '#172630'
FIGURES = []


class Drawing:
    def __init__(self, name, width, height):
        self.name, self.w, self.h = name, width, height
        self.parts, self.labels, self.components = [], [], []
        self.model = {}

    def add(self, s):
        self.parts.append(s)

    def line(self, x1, y1, x2, y2, dashed=False, thin=False):
        attrs = (' stroke-dasharray="7 7"' if dashed else '') + (' stroke-width="1.6"' if thin else '')
        self.add(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}"{attrs}/>')

    def poly(self, points, **kwargs):
        attrs = ' stroke-dasharray="7 7"' if kwargs.get('dashed') else ''
        self.add('<polyline points="' + ' '.join(f'{x},{y}' for x, y in points) + f'"{attrs}/>')

    def path(self, d, **kwargs):
        attrs = ' stroke-dasharray="7 7"' if kwargs.get('dashed') else ''
        fill = kwargs.get('fill', 'none')
        self.add(f'<path d="{d}" fill="{fill}"{attrs}/>')

    def rect(self, x, y, w, h, fill='none', dashed=False, radius=0):
        attrs = ' stroke-dasharray="7 7"' if dashed else ''
        self.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}"{attrs}/>')

    def circle(self, x, y, r, fill='#ffffff'):
        self.add(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}"/>')

    def ellipse(self, x, y, rx, ry, dashed=False):
        attrs = ' stroke-dasharray="7 7"' if dashed else ''
        self.add(f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}"{attrs}/>')

    def dot(self, x, y):
        self.circle(x, y, 4, INK)

    def text(self, x, y, value, size=27, anchor='middle', bold=False):
        self.labels.append(value)
        weight = ' font-weight="600"' if bold else ''
        label = html.escape(value).replace('_eq', '<tspan font-size="70%" baseline-shift="sub">eq</tspan>')
        self.add(f'<text x="{x}" y="{y}" fill="{INK}" stroke="none" font-family="DejaVu Sans,Arial,sans-serif" font-size="{size}" text-anchor="{anchor}"{weight}>{label}</text>')

    def lines(self, x, y, values, size=25, leading=32, anchor='middle'):
        for i, value in enumerate(values):
            self.text(x, y + i * leading, value, size, anchor)

    def arrow(self, x1, y1, x2, y2, size=10, both=False, thin=False):
        self.line(x1, y1, x2, y2, thin=thin)
        def head(x, y, dx, dy):
            length = math.hypot(dx, dy)
            ux, uy = dx / length, dy / length
            a = (x - size * ux + size * .42 * uy, y - size * uy - size * .42 * ux)
            b = (x - size * ux - size * .42 * uy, y - size * uy + size * .42 * ux)
            self.add(f'<path d="M{x},{y} L{a[0]:.2f},{a[1]:.2f} L{b[0]:.2f},{b[1]:.2f} Z" fill="{INK}" stroke="none"/>')
        head(x2, y2, x2-x1, y2-y1)
        if both:
            head(x1, y1, x1-x2, y1-y2)

    def resistor(self, x1, y1, x2, y2, label=None, label_at=None):
        dx, dy = x2-x1, y2-y1
        length = math.hypot(dx, dy)
        ux, uy = dx/length, dy/length
        body = min(86, length*.65)
        start = (length-body)/2
        positions = [(0, 0), (start, 0)]
        positions += [(start + body*(i+.5)/10, 11*(-1 if i%2==0 else 1)) for i in range(10)]
        positions += [(start+body, 0), (length, 0)]
        self.poly([(round(x1+a*ux-b*uy, 2), round(y1+a*uy+b*ux, 2)) for a,b in positions])
        if label:
            tx, ty = label_at or ((x1+x2)/2, (y1+y2)/2-29)
            self.text(tx, ty, label)
        self.components.append({'type':'resistor', 'label':label, 'ports':[[x1,y1],[x2,y2]]})

    def cell(self, x1, y1, x2, y2, label=None, positive='start', signs=True, label_at=None):
        dx, dy = x2-x1, y2-y1
        length=math.hypot(dx,dy)
        ux,uy=dx/length,dy/length
        cx,cy=(x1+x2)/2,(y1+y2)/2
        self.line(x1,y1,cx-7*ux,cy-7*uy)
        self.line(cx+7*ux,cy+7*uy,x2,y2)
        for p in [-1,1]:
            isplus = (p==-1) == (positive=='start')
            half = 27 if isplus else 14
            px,py=cx+p*7*ux,cy+p*7*uy
            self.line(px+half*uy,py-half*ux,px-half*uy,py+half*ux)
        if signs:
            if abs(dx)>abs(dy):
                self.text(cx-30,cy-38,'+' if positive=='start' else '−',23)
                self.text(cx+30,cy-38,'−' if positive=='start' else '+',23)
            else:
                self.text(cx+42,cy-22,'+' if positive=='start' else '−',23)
                self.text(cx+42,cy+38,'−' if positive=='start' else '+',23)
        if label:
            tx,ty=label_at or ((cx,cy+57) if abs(dx)>abs(dy) else (cx-58,cy+9))
            self.text(tx,ty,label)
        self.components.append({'type':'source','label':label,'ports':[[x1,y1],[x2,y2]],'positivePort':0 if positive=='start' else 1})

    def instrument(self, x1,y1,x2,y2,letter):
        cx,cy=(x1+x2)/2,(y1+y2)/2
        length=math.hypot(x2-x1,y2-y1)
        ux,uy=(x2-x1)/length,(y2-y1)/length
        r=27
        self.line(x1,y1,cx-r*ux,cy-r*uy)
        self.line(cx+r*ux,cy+r*uy,x2,y2)
        self.circle(cx,cy,r)
        self.text(cx,cy+10,letter,29)
        self.components.append({'type':'instrument','label':letter,'ports':[[x1,y1],[x2,y2]]})

    def bulb(self, cx, cy, lit=False):
        self.path(f'M{cx-17},{cy+25} C{cx-17},{cy+9} {cx-31},{cy+3} {cx-31},{cy-17} A31,31 0 0 1 {cx+31},{cy-17} C{cx+31},{cy+3} {cx+17},{cy+9} {cx+17},{cy+25}')
        self.poly([(cx-14,cy+25),(cx-14,cy+42),(cx+14,cy+42),(cx+14,cy+25),(cx-14,cy+25)])
        for j in [29,35]: self.line(cx-14,cy+j,cx+14,cy+j,thin=True)
        self.poly([(cx-7,cy+24),(cx-12,cy-12),(cx,cy-2),(cx+12,cy-12),(cx+7,cy+24)])
        if lit:
            for a in range(0,360,30):
                r=math.radians(a)
                if math.sin(r)>.75: continue
                self.line(cx+43*math.cos(r),cy-15+43*math.sin(r),cx+58*math.cos(r),cy-15+58*math.sin(r),thin=True)

    def battery(self, cx, y, label='BATERÍA', label_size=23):
        self.rect(cx-76,y,152,67,radius=3)
        self.rect(cx-62,y-12,19,12)
        self.rect(cx+43,y-12,19,12)
        self.text(cx-93,y-20,'+',27)
        self.text(cx+93,y-20,'−',27)
        self.text(cx,y+42,label,label_size)

    def switch(self,x1,y1,x2,y2,closed=False):
        dx,dy=x2-x1,y2-y1
        if closed: self.line(x1,y1,x2,y2)
        else: self.line(x1,y1,x1+dx*.85+dy*.55,y1+dy*.85-dx*.55)
        self.circle(x1,y1,4)
        self.circle(x2,y2,4)

    def equivalence(self,x,y):
        self.arrow(x-23,y,x+23,y,both=True,size=9)

    def save(self):
        source=SOURCES[self.name]
        title=source['caption'].split(' · p.')[0]
        desc=source['alt'].replace('Gráfica original','Gráfica').replace('Circuito original','Circuito').replace('etiquetas originales','etiquetas del PDF')
        svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" viewBox="0 0 {self.w} {self.h}" role="img" aria-labelledby="title desc">
<title id="title">{html.escape(title)}</title>
<desc id="desc">{html.escape(desc)} Redibujo lineal sobre fondo blanco, basado en la página {source['printedPage']} del PDF proporcionado.</desc>
<defs>
  <pattern id="hatch" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M-3,3 L3,-3 M0,12 L12,0 M9,15 L15,9" fill="none" stroke="{INK}" stroke-width="1"/></pattern>
  <pattern id="hatch2" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M0,0 L16,16" fill="none" stroke="{INK}" stroke-width="1"/></pattern>
</defs>
<rect id="background" width="{self.w}" height="{self.h}" fill="#ffffff"/>
<g fill="none" stroke="{INK}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
<style>text{{fill:{INK};stroke:none;font-family:'DejaVu Sans',Arial,sans-serif}}</style>
'''+'\n'.join(self.parts)+'\n</g>\n</svg>\n'
        dest=OUT/(self.name+'.svg')
        dest.write_text(svg)
        FIGURES.append({
            'id':self.name,'src':str(dest.relative_to(ROOT)), 'width':self.w,'height':self.h,
            'caption':source['caption'],'alt':desc,
            'credit':'Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)',
            'original':False,'redrawn':True,'sourceSrc':source['src'],'sourceSha256':source['sha256'],
            'pdfPage':source['pdfPage'],'printedPage':source['printedPage'],
            'sha256':hashlib.sha256(svg.encode()).hexdigest(),
            'labels':self.labels,'components':self.components, 'model':self.model,
        })


def current_switch(closed):
    d=Drawing('corriente-interruptor-'+('cerrado' if closed else 'abierto'),860,395)
    # Battery terminals connect separately through the switch and lamp.
    d.battery(235,283)
    d.poly([(183,271),(183,244),(80,244),(80,204)])
    d.switch(80,158,80,204,closed)
    d.poly([(80,158),(80,133),(210,133)])
    d.bulb(235,91,closed)
    d.line(210,133,221,133)
    d.poly([(249,133),(406,133),(406,244),(287,244),(287,271)])
    d.lines(235,181,['Foco encendido' if closed else 'Foco apagado'],24)
    d.dot(406,172)
    d.line(409,172,525,112,thin=True)
    d.line(409,172,525,231,thin=True)
    d.circle(627,170,113)
    if closed:
        for x,y in [(572,215),(622,229),(674,210)]:
            d.circle(x,y,11)
            d.text(x,y+5,'−',18)
            d.arrow(x,y-18,x,y-93,size=9)
        d.arrow(714,112,714,224)
        d.text(763,181,'E',30)
        d.lines(628,328,['Movimiento orientado','de los electrones'],25)
    else:
        for x,y,dx,dy in [(574,122,29,-12),(643,99,14,29),(685,147,-27,13),(679,216,-29,-17),(610,226,-23,-24),(574,177,25,8),(627,158,11,29)]:
            d.circle(x,y,10)
            d.text(x,y+5,'−',17)
            d.arrow(x+dx*.45,y+dy*.45,x+dx,y+dy,size=7)
        d.lines(628,328,['Movimiento desordenado','de los electrones'],25)
    d.save()


def current_direction():
    d=Drawing('sentido-corriente',890,335)
    d.text(449,43,'Corriente convencional',26)
    d.arrow(619,66,284,66)
    d.ellipse(224,163,18,57)
    d.line(224,106,670,106)
    d.line(224,220,670,220)
    d.path('M670,106 C696,106 696,220 670,220')
    d.lines(109,130,['Menor','potencial','(−)'],24)
    d.lines(787,130,['Mayor','potencial','(+)'],24)
    d.arrow(466,132,314,132)
    d.text(291,140,'E',28)
    for x,y in [(284,176),(453,190)]:
        d.circle(x,y,10)
        d.text(x,y+5,'−',18)
        d.poly([(x+15,y),(x+45,y-9),(x+63,y+6),(x+90,y-3)])
        d.arrow(x+90,y-3,x+134,y-3,size=8)
    d.arrow(284,253,619,253)
    d.lines(449,289,['Corriente de electrones (real)'],25)
    d.save()


def area_graph():
    d=Drawing('area-corriente-tiempo',750,350)
    d.arrow(92,285,92,44)
    d.arrow(92,285,463,285)
    d.text(54,41,'I (A)',26)
    d.text(490,313,'t (s)',26)
    d.path('M180,285 L180,162 C218,105 278,165 334,93 L334,285 Z',fill='url(#hatch)')
    d.path('M112,196 C134,177 153,178 180,162 C218,105 278,165 334,93 C348,80 359,62 370,51')
    for x,y,t in [(180,162,'t₁'),(334,93,'t₂')]:
        d.line(x,y,x,285,dashed=True)
        d.text(x,321,t,28)
    d.rect(231,193,56,42,fill='#ffffff',radius=4)
    d.text(259,223,'A',29)
    d.rect(526,133,179,67,radius=8)
    d.text(615,177,'A = |Q|',28)
    d.save()


def application_graph(areas=False):
    d=Drawing('aplicacion-02-'+('areas' if areas else 'grafica'),850,410)
    x=lambda t:100+450*t
    y=lambda i:330-285*i
    d.arrow(100,330,100,33)
    d.arrow(100,330,790,330)
    d.text(61,37,'I (A)',26)
    d.text(790,378,'t (s)',25)
    d.text(82,363,'0',24)
    if areas:
        d.path(f'M{x(.1)},{y(0)} L{x(.1)},{y(.7)} L{x(.2)},{y(.9)} L{x(.2)},{y(0)} Z',fill='url(#hatch)')
        d.rect(x(.2),y(.9),x(1.4)-x(.2),y(0)-y(.9),fill='url(#hatch2)')
        # Keep the area labels readable without painting a gray background.
        for xx,yy,label in [(168,257,'A₁'),(456,215,'A₂')]:
            d.add(f'<rect x="{xx-20}" y="{yy-26}" width="40" height="34" fill="#ffffff" stroke="none"/>')
            d.text(xx,yy,label,26)
    d.poly([(x(0),y(.5)),(x(.2),y(.9)),(x(1.4),y(.9))])
    for i in ([.5,.7,.9] if areas else [.5,.9]):
        d.text(79,y(i)+8,str(i).replace('.',','),24,'end')
        end=x(.1) if i==.7 else x(.2) if i==.9 else 100
        if end>100:d.line(100,y(i),end,y(i),dashed=True,thin=True)
    for t,i in ([(.1,.7),(.2,.9),(1.4,.9)] if areas else [(.2,.9),(1.4,.9)]):
        d.line(x(t),y(i),x(t),330,dashed=True,thin=True)
        d.text(x(t),363,str(t).replace('.',','),23)
    d.model={'points':[[0,.5],[.2,.9],[1.4,.9]],'axes':{'x':'t (s)','y':'I (A)'},'linearScale':True}
    if areas:d.model['areas']=[{'label':'A₁','from':.1,'to':.2},{'label':'A₂','from':.2,'to':1.4}]
    d.save()


def resistivity():
    d=Drawing('resistividad',710,260)
    d.line(206,57,593,57)
    d.line(206,46,206,68)
    d.line(593,46,593,68)
    d.add('<rect x="378" y="36" width="40" height="38" fill="#ffffff" stroke="none"/>')
    d.text(398,66,'L',30)
    d.ellipse(206,160,24,60)
    d.line(206,100,593,100)
    d.line(206,220,593,220)
    d.path('M593,100 C627,100 627,220 593,220')
    d.path('M593,100 C560,100 560,220 593,220',dashed=True)
    d.poly([(117,100),(117,160),(177,160)])
    d.arrow(158,160,197,160,size=8)
    d.text(117,88,'A',30)
    d.text(266,171,'ρ',33)
    d.save()


def resistor_symbols():
    d=Drawing('simbolos-resistores',710,270)
    d.resistor(80,77,414,77)
    d.resistor(80,196,414,196)
    d.arrow(196,245,302,144)
    d.lines(550,68,['Resistor','fijo'],25)
    d.lines(550,186,['Resistor','variable'],25)
    d.save()


def ohm():
    d=Drawing('ley-ohm',830,380)
    d.battery(205,265)
    d.poly([(153,253),(153,220),(66,220),(66,134),(191,134)])
    d.bulb(205,92,True)
    d.poly([(219,134),(343,134),(343,220),(257,220),(257,253)])
    d.arrow(44,208,44,149)
    d.text(28,184,'I',26)
    d.equivalence(417,174)
    d.resistor(507,105,751,105,'R')
    d.line(507,105,507,278)
    d.line(751,105,751,278)
    d.cell(507,278,751,278,'V')
    d.arrow(484,234,484,166)
    d.text(466,204,'I',26)
    d.save()


def application_four(hot):
    name='aplicacion-04-'+('caliente' if hot else 'frio')
    d=Drawing(name,780,375)
    resistance=100 if hot else 20
    current='I₂' if hot else 'I₁'
    d.resistor(83,91,385,91,f'{resistance} Ω')
    d.line(83,91,83,287)
    d.line(385,91,385,287)
    d.cell(83,287,385,287,'120 V',signs=False)
    d.poly([(116,197),(116,132),(177,132)])
    d.arrow(177,132,260,132)
    d.text(234,173,current,29)
    d.text(567,162,f'{current} = 120 / {resistance}',28)
    d.text(567,237,f'{current} = '+('1,2 A' if hot else '6 A'),31)
    d.save()


def series_connection():
    d=Drawing('serie-conexion',750,185)
    d.poly([(65,135),(65,95),(102,95)])
    for n,(a,b) in enumerate([(102,284),(284,466),(466,648)],1):d.resistor(a,95,b,95,f'R{chr(8320+n)}')
    d.poly([(648,95),(685,95),(685,135)])
    d.dot(65,135)
    d.dot(685,135)
    d.save()


def series_equivalent():
    d=Drawing('serie-equivalente',930,390)
    for n,(a,b) in enumerate([(55,225),(225,395),(395,565)],1):
        k=chr(8320+n)
        d.resistor(a,117,b,117,'R'+k,label_at=((a+b)/2,84))
        d.arrow(a+5,49,a+74,49,size=8)
        d.text(a+39,35,'I'+k,24)
        d.text((a+b)/2,168,'+  V'+k+'  −',25)
    d.line(55,117,55,287)
    d.line(565,117,565,287)
    d.cell(55,287,565,287,'V',signs=False)
    d.arrow(83,263,83,201)
    d.text(108,241,'I',26)
    d.equivalence(624,194)
    d.resistor(698,117,866,117,'R_eq')
    d.text(741,168,'+',25)
    d.text(823,168,'−',25)
    d.line(698,117,698,287)
    d.line(866,117,866,287)
    d.cell(698,287,866,287,'V',signs=False)
    d.arrow(725,263,725,201)
    d.text(750,241,'I',26)
    d.save()


def parallel_connection():
    d=Drawing('paralelo-conexion',850,350)
    d.line(83,181,176,181)
    d.line(494,181,587,181)
    for n,y in enumerate([81,181,281],1):
        d.resistor(176,y,494,y,'R'+chr(8320+n))
    d.line(176,81,176,281)
    d.line(494,81,494,281)
    for x in [83,176,494,587]:d.dot(x,181)
    d.text(83,215,'a',27)
    d.text(587,215,'b',27)
    d.lines(721,160,['a y b:','terminales','comunes'],24)
    d.save()


def parallel_equivalent():
    d=Drawing('paralelo-equivalente',900,515)
    for n,y in enumerate([91,211,331],1):
        k=chr(8320+n)
        d.resistor(92,y,440,y,'R'+k)
        d.arrow(108,y-20,181,y-20,size=8)
        d.text(141,y-35,'I'+k,24)
        d.text(266,y+45,'+  V'+k+'  −',25)
    d.line(92,91,92,436)
    d.line(440,91,440,436)
    d.cell(92,436,440,436,'V',signs=False)
    for y in [211,331]:
        d.dot(92,y)
        d.dot(440,y)
    d.arrow(62,418,62,363)
    d.text(43,398,'I',27)
    d.equivalence(536,261)
    d.resistor(636,211,810,211,'R_eq')
    d.line(636,211,636,436)
    d.line(810,211,810,436)
    d.cell(636,436,810,436,'V',signs=False)
    d.arrow(664,416,664,352)
    d.text(687,391,'I',27)
    d.save()


def application_five(stage):
    d=Drawing('aplicacion-05-'+stage,820 if stage=='paralelo' else 660,415)
    left,right=274,579
    d.line(93,108,left,108)
    d.dot(93,108)
    d.text(67,117,'A',28)
    d.dot(93,318)
    d.text(67,327,'B',28)
    d.resistor(93,318,336,318,'3 Ω',label_at=(206,365))
    d.resistor(336,318,right,318,'4 Ω',label_at=(457,365))
    if stage=='serie':
        d.resistor(left,108,right,108,'1 Ω')
        d.rect(132,42,484,344,dashed=True,radius=22)
    else:
        d.resistor(left,108,right,108,'2 Ω')
        d.resistor(left,201,right,201,'2 Ω')
        d.line(left,108,left,201)
        d.dot(left,108)
        d.dot(right,201)
        if stage=='paralelo':
            d.rect(347,48,156,182,dashed=True,radius=20)
            d.poly([(503,56),(550,30),(677,30)])
            d.text(692,92,'R_eq =',25)
            d.text(692,137,'2 × 2',25)
            d.line(650,149,734,149,thin=True)
            d.text(692,181,'2 + 2',25)
            d.text(692,226,'= 1 Ω',25)
    d.line(right,108,right,318)
    d.save()


def circuit_components():
    d=Drawing('circuito-componentes',830,305)
    d.poly([(102,191),(66,191),(66,64),(754,64),(754,191),(674,191)])
    d.rect(102,169,141,48,radius=12)
    d.line(130,169,130,217)
    d.text(103,155,'+',26)
    d.text(241,155,'−',26)
    d.line(243,191,369,191)
    d.switch(369,191,446,191,False)
    # The book shows the switch lever while it is being closed.
    d.path('M397,123 Q443,115 455,160')
    d.arrow(452,150,455,166,size=8)
    d.line(446,191,646,191)
    d.bulb(660,149,True)
    d.text(172,263,'Fuente',25)
    d.text(408,263,'Interruptor',25)
    d.text(663,263,'Foco',25)
    d.save()


def circuit_representation():
    d=Drawing('circuito-representacion',790,290)
    d.poly([(73,211),(73,65),(713,65),(713,211),(641,211)])
    d.cell(73,211,287,211,signs=False)
    d.line(287,211,354,211)
    d.switch(354,211,414,211,False)
    d.line(414,211,468,211)
    d.resistor(468,211,641,211)
    d.lines(396,124,['Trayectoria','cerrada'],26)
    d.path('M372,172 Q401,170 412,195')
    d.arrow(408,187,413,199,size=7)
    d.arrow(739,89,739,154)
    d.text(760,129,'I',27)
    d.save()


def instruments():
    d=Drawing('amperimetro',690,200)
    d.instrument(69,103,347,103,'A')
    d.resistor(347,103,621,103,'R')
    d.dot(69,103)
    d.dot(621,103)
    d.arrow(82,63,151,63)
    d.text(115,43,'I',27)
    d.text(208,174,'Amperímetro',25)
    d.save()

    d=Drawing('amperimetro-ideal',730,145)
    d.instrument(53,73,304,73,'A')
    for x in [53,304]:d.dot(x,73)
    d.equivalence(364,73)
    d.line(432,73,677,73)
    d.save()

    d=Drawing('voltimetro',770,315)
    d.line(61,221,212,221)
    d.resistor(212,221,558,221,'R')
    d.line(558,221,709,221)
    for x in [212,558]:
        d.line(x,221,x,96)
        d.dot(x,221)
    d.instrument(212,96,558,96,'V')
    d.text(385,46,'Voltímetro',25)
    d.text(212,270,'A',28)
    d.text(558,270,'B',28)
    d.arrow(76,188,155,188)
    d.text(113,172,'I',27)
    d.save()

    d=Drawing('voltimetro-ideal',810,215)
    d.poly([(64,151),(64,80),(98,80)])
    d.instrument(98,80,282,80,'V')
    d.poly([(282,80),(315,80),(315,151)])
    for x in [64,315]:d.dot(x,151)
    d.equivalence(400,89)
    d.poly([(489,151),(489,80),(580,80)])
    d.poly([(643,80),(746,80),(746,151)])
    d.circle(580,80,3)
    d.circle(643,80,3)
    for x in [489,746]:d.dot(x,151)
    d.save()


def kirchhoff():
    d=Drawing('kirchhoff-circuito',625,615)
    L,R,T,M,B=139,480,95,301,507
    for y,label in [(T,'R₁'),(M,'R₃'),(B,'R₅')]:d.resistor(L,y,R,y,label,label_at=(309,y-30 if y!=B else y+48))
    d.cell(L,T,L,M,'V₀',signs=False)
    d.cell(L,M,L,B,'V₁',signs=False)
    d.resistor(R,T,R,M,'R₂',label_at=(535,204))
    d.resistor(R,M,R,B,'R₄',label_at=(535,410))
    for x,y,label in [(L,T,'M'),(L,M,'A'),(L,B,'N'),(R,T,'B'),(R,M,'C'),(R,B,'D')]:
        d.dot(x,y)
        d.text(x+(-29 if x==L else 30),y+10,label,27)
    d.arrow(450,227,450,283)
    d.text(421,266,'I₁',25)
    d.arrow(382,326,453,326)
    d.text(408,365,'I₂',25)
    d.arrow(450,354,450,406)
    d.text(421,397,'I₃',25)
    d.save()


def power():
    d=Drawing('potencia-fuente',590,440)
    d.resistor(105,141,485,141,'R',label_at=(295,103))
    d.poly([(105,141),(105,274),(243,274),(243,301)])
    d.poly([(485,141),(485,274),(347,274),(347,301)])
    d.battery(295,313)
    d.text(295,286,'V',29)
    d.arrow(75,254,75,184)
    d.text(52,225,'I',28)
    for x,sgn in [(248,-1),(337,1)]:
        d.poly([(x,120),(x+sgn*10,107),(x+sgn*5,94),(x+sgn*19,81),(x+sgn*16,68)])
        d.arrow(x+sgn*16,68,x+sgn*24,52,size=8)
    d.save()

    d=Drawing('potencia-resistor',550,180)
    d.resistor(57,102,493,102,'R')
    d.dot(57,102)
    d.dot(493,102)
    d.arrow(83,69,178,69)
    d.text(131,47,'I',27)
    d.save()


def application_six(currents=False):
    d=Drawing('aplicacion-06-'+('corrientes' if currents else 'circuito'),760,430)
    L,M,R,T,B=123,430,642,81,321
    d.line(L,T,R,T)
    # Retain the PDF's lower long plate (the problem does not give epsilon).
    d.cell(L,T,L,B,'ε',positive='end',signs=False)
    d.resistor(L,B,M,B,'2 Ω',label_at=(265,370))
    d.line(M,B,R,B)
    d.resistor(M,T,M,B,'8 Ω',label_at=(372,209))
    d.resistor(R,T,R,B,'4 Ω',label_at=(703,209))
    for x,y in [(M,T),(M,B),(R,T),(R,B)]:d.dot(x,y)
    d.text(R+25,T-15,'A',28)
    d.text(R+25,B+34,'B',28)
    if currents:
        d.arrow(452,236,452,296)
        d.text(482,278,'I₁',26)
        d.arrow(614,298,518,298)
        d.text(563,279,'I₂',26)
        d.arrow(398,298,329,298)
        d.text(362,278,'I',26)
        d.poly([(430,339),(430,375),(467,375)])
        d.text(478,383,'Nodo',24,'start')
    d.save()


def application_seven(instruments=True):
    name='aplicacion-07-'+('instrumentos' if instruments else 'recorrido')
    d=Drawing(name,880,405)
    L,R,T,B=143,770,158,324
    d.cell(L,T,L,B,'12 V',signs=not instruments,label_at=(73,250))
    d.line(L,B,R,B)
    d.resistor(L,T,376,T,'2 Ω',label_at=(260,205 if instruments else 117))
    d.cell(376,T,504,T,'2 V',signs=False,label_at=(440,111))
    d.resistor(504,T,R,T,'3 Ω',label_at=(637,117))
    if instruments:
        d.instrument(R,T,R,B,'A')
        d.line(L,T,L,64)
        d.line(376,T,376,64)
        d.instrument(L,64,376,64,'V')
        d.dot(L,T)
        d.dot(376,T)
    else:
        d.line(R,T,R,B)
        for x,label in [(172,'A'),(347,'B')]:
            d.dot(x,T)
            d.text(x,202,label,26)
        d.text(172,130,'+',24)
        d.text(347,130,'−',24)
        d.text(555,143,'+',24)
        d.text(719,143,'−',24)
        d.arrow(211,277,211,225)
        d.text(237,260,'I',26)
        d.arrow(734,298,661,298)
        d.text(648,307,'I',26)
        d.dot(L,B)
        d.text(L-17,B+40,'M',26)
    d.save()


def application_eight():
    d=Drawing('aplicacion-08-circuito',730,350)
    d.resistor(83,109,365,109,'2 Ω')
    d.resistor(365,109,647,109,'16 Ω')
    d.text(506,166,'+  48 V  −',27)
    d.line(83,109,83,264)
    d.line(647,109,647,264)
    d.cell(83,264,647,264,'ε',signs=False)
    d.save()


def application_nine(polarities=False):
    d=Drawing('aplicacion-09-'+('polaridades' if polarities else 'ramal'),930,260)
    y=141
    d.resistor(93,y,303,y,'5 Ω',label_at=(198,197))
    d.cell(303,y,450,y,'12 V',positive='end',signs=polarities,label_at=(376,75))
    d.resistor(450,y,647,y,'2 Ω',label_at=(548,197))
    d.cell(647,y,807,y,'8 V',signs=polarities,label_at=(727,75))
    d.line(807,y,850,y)
    for x,label in [(93,'a'),(850,'b')]:
        d.dot(x,y)
        d.text(x-24 if x==93 else x+24,y+8,label,28)
    if not polarities:
        for xa,xb in [(93,29),(850,914)]:
            d.line(xa,y,xb,60,dashed=True)
            d.line(xa,y,xb,222,dashed=True)
    else:
        for x,label in [(158,'+'),(240,'−'),(505,'+'),(591,'−')]:d.text(x,113,label,24)
    d.arrow(110,84,181,84)
    d.text(142,61,'I',26)
    d.save()


def application_ten(stage):
    d=Drawing('aplicacion-10-'+stage,780,390)
    L,R,T,B=143,623,91,299
    d.cell(L,T,L,B,'V',signs=False)
    if stage=='equivalente':
        R=510
        d.line(L,T,R,T)
        d.line(L,B,R,B)
        d.resistor(R,T,R,B,'15 Ω = R_eq',label_at=(634,204))
        d.poly([(178,158),(178,120),(260,120)])
        d.arrow(260,120,334,120)
        d.text(362,129,'I',27)
    else:
        d.resistor(L,T,405 if stage=='instrumentos' else 433,T,'4 Ω')
        if stage=='instrumentos':
            d.instrument(405,T,535,T,'A')
            d.line(535,T,R,T)
        else:d.line(433,T,R,T)
        d.resistor(R,T,R,B,'6 Ω',label_at=(685,205))
        d.resistor(L,B,R,B,'5 Ω',label_at=(383,349))
        if stage=='instrumentos':
            d.instrument(559,T,559,B,'V')
            d.dot(559,T)
            d.dot(559,B)
        else:
            for y,label in [(T,'a'),(B,'b')]:
                d.dot(R,y)
                d.text(R+29,y+9,label,26)
            d.arrow(441,128,537,128)
            d.text(488,168,'I',27)
    d.save()


def main():
    OUT.mkdir(parents=True,exist_ok=True)
    current_switch(False)
    current_switch(True)
    current_direction()
    area_graph()
    application_graph(False)
    application_graph(True)
    resistivity()
    resistor_symbols()
    ohm()
    application_four(False)
    application_four(True)
    series_connection()
    series_equivalent()
    parallel_connection()
    parallel_equivalent()
    for stage in ['circuito','paralelo','serie']:application_five(stage)
    circuit_components()
    circuit_representation()
    instruments()
    kirchhoff()
    power()
    application_six(False)
    application_six(True)
    application_seven(True)
    application_seven(False)
    application_eight()
    application_nine(False)
    application_nine(True)
    for stage in ['instrumentos','sin-instrumentos','equivalente']:application_ten(stage)
    assert [f['id'] for f in FIGURES]==[f['id'] for f in SOURCE['figures']]
    manifest={'source':SOURCE['source'],'style':{'background':'#ffffff','stroke':INK,'format':'svg','rasterImages':False},'figures':FIGURES}
    (ROOT/'assets/fisica-capitulo-15-lineales.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    # Change figure assets and attribution only. Keep the chapter's prose,
    # equations, ten worked examples, practice bank and progress identifiers.
    datafile=ROOT/'fisica-capitulo-15-data.js'
    raw=datafile.read_text()
    content=json.loads(raw[raw.index('=')+1:].rstrip().removesuffix(';'))
    by_id={f['id']:f for f in FIGURES}
    count=0
    def replace(value):
        nonlocal count
        if isinstance(value,list):
            for item in value:replace(item)
        elif isinstance(value,dict):
            if value.get('src','').startswith('assets/fisica-capitulo-15/'):
                key=Path(value['src']).stem
                if key in by_id:
                    f=by_id[key]
                    for field in ['src','width','height','caption','alt','credit','original','redrawn']:value[field]=f[field]
                    count+=1
            for item in value.values():replace(item)
    replace(content)
    assert count==37
    content['version']=3
    content['sourceNote']=content['sourceNote'].replace('gráficos originales extraídos de esas páginas','gráficos redibujados en estilo lineal sobre fondo blanco a partir de esas páginas')
    datafile.write_text("'use strict';\nwindow.HISTORY_CONTENT="+json.dumps(content,ensure_ascii=False,indent=2)+';\n')
    print(f'Rebuilt {len(FIGURES)} SVG figures and updated chapter references.')


if __name__=='__main__':
    main()
