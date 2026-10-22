#!/usr/bin/env python3
"""Render source-faithful electromagnetic diagrams over new realistic apparatus.
Raster inputs are generated physical specimens. Scientific geometry is SVG code.
"""
from pathlib import Path
from io import BytesIO
import argparse, base64, html, math
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/em-realistic'
INK='#14334d'; BLUE='#2163c4'; TEAL='#0a9e91'; RED='#e3435c'; GOLD='#e7a426'; COPPER='#b96b32'

def txt(x,y,s,size=25,color=INK,weight=500,anchor='start'):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{weight}" text-anchor="{anchor}">{html.escape(s)}</text>'

def arr(x1,y1,x2,y2,color=TEAL,width=6):
    a=math.atan2(y2-y1,x2-x1); L=17; w=8
    pts=[(x2,y2),(x2-L*math.cos(a)+w*math.sin(a),y2-L*math.sin(a)-w*math.cos(a)),(x2-L*math.cos(a)-w*math.sin(a),y2-L*math.sin(a)+w*math.cos(a))]
    return f'<path d="M{x1} {y1}L{x2} {y2}" stroke="{color}" stroke-width="{width}" stroke-linecap="round"/><polygon points="'+ ' '.join(f'{x:.2f},{y:.2f}' for x,y in pts)+f'" fill="{color}"/>'

def cross(x,y,r=8,color=BLUE,opacity=1):
    d=r*.62
    return f'<g fill="none" stroke="{color}" stroke-width="2.6" opacity="{opacity}"><circle cx="{x}" cy="{y}" r="{r}"/><path d="M{x-d} {y-d}L{x+d} {y+d}M{x+d} {y-d}L{x-d} {y+d}"/></g>'

def field_grid(x0,y0,cols,rows,dx=65,dy=65):
    return ''.join(cross(x0+i*dx,y0+j*dy,7,BLUE,.34) for i in range(cols) for j in range(rows))

def photo(name,x,y,w,h,rotate=0):
    p=OUT/name
    if not p.exists(): p=p.with_suffix('.webp')
    if not p.exists(): raise FileNotFoundError(p)
    im=Image.open(p).convert('RGBA'); buf=BytesIO();im.save(buf,format='WEBP',quality=85,method=6)
    b64=base64.b64encode(buf.getvalue()).decode()
    elem=f'<image x="{x}" y="{y}" width="{w}" height="{h}" preserveAspectRatio="xMidYMid meet" href="data:image/webp;base64,{b64}"/>'
    if rotate:
        elem=f'<g transform="rotate({rotate} {x+w/2} {y+h/2})">{elem}</g>'
    return elem

def pill(x,y,w,s,color=TEAL):
    return f'<rect x="{x}" y="{y}" width="{w}" height="43" rx="12" fill="{color}" fill-opacity=".09"/>'+txt(x+w/2,y+29,s,24,color,700,'middle')

def frame(n,title,desc,body,footer):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700" role="img" aria-labelledby="title desc">
<title id="title">{html.escape(title)}</title><desc id="desc">{html.escape(desc)}</desc>
<defs>
 <linearGradient id="bg" x2="1" y2="1"><stop stop-color="#f9fcff"/><stop offset="1" stop-color="#eaf3fa"/></linearGradient>
 <linearGradient id="copper" x2="0" y2="1"><stop stop-color="#9d4f24"/><stop offset=".25" stop-color="#f5c497"/><stop offset=".48" stop-color="#d48850"/><stop offset=".61" stop-color="#f9d5b3"/><stop offset="1" stop-color="#87411f"/></linearGradient>
 <linearGradient id="rodCopper" gradientUnits="userSpaceOnUse" x1="0" y1="326" x2="0" y2="355"><stop stop-color="#9d4f24"/><stop offset=".25" stop-color="#f5c497"/><stop offset=".48" stop-color="#d48850"/><stop offset=".61" stop-color="#f9d5b3"/><stop offset="1" stop-color="#87411f"/></linearGradient>
 <radialGradient id="gold"><stop stop-color="#ffefb6"/><stop offset=".5" stop-color="#f5bf45"/><stop offset="1" stop-color="#c7790b"/></radialGradient>
 <linearGradient id="glass" x2="1" y2="1"><stop stop-color="#effcfe"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#d6eff7"/></linearGradient>
 <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="8" stdDeviation="9" flood-color="#173650" flood-opacity=".08"/></filter>
</defs>
<rect width="1200" height="700" rx="24" fill="url(#bg)"/>
<g font-family="Arial,DejaVu Sans,sans-serif" stroke-linejoin="round">
{txt(38,50,f'{n:02d} · '+title,32,INK,700)}
<path d="M38 70H1162" stroke="#cddfe9"/>
<rect x="32" y="97" width="618" height="490" rx="22" fill="#fff" stroke="#dce8ef" filter="url(#shadow)"/>
<rect x="674" y="97" width="494" height="490" rx="22" fill="#fff" stroke="#dce8ef" filter="url(#shadow)"/>
{body}
<rect x="32" y="614" width="1136" height="58" rx="16" fill="#14334d"/>
{txt(600,651,footer,24,'#fff',600,'middle')}
</g></svg>'''

def compass(cx,cy,angle=0):
    # Bearing measured clockwise from geographic/magnetic north on the dial.
    out=f'<circle cx="{cx}" cy="{cy}" r="80" fill="url(#glass)" stroke="#a6b7c5" stroke-width="5"/><circle cx="{cx}" cy="{cy}" r="70" fill="#fff" stroke="#dce8ee"/>'
    for a in range(0,360,30):
        th=math.radians(a); r1=62 if a%90 else 56
        out+=f'<path d="M{cx+r1*math.sin(th):.2f} {cy-r1*math.cos(th):.2f}L{cx+67*math.sin(th):.2f} {cy-67*math.cos(th):.2f}" stroke="#8399ab" stroke-width="2"/>'
    out+=f'<g transform="rotate({angle} {cx} {cy})"><path d="M{cx} {cy-58}L{cx-12} {cy}H{cx+12}Z" fill="{RED}"/><path d="M{cx} {cy+58}L{cx-12} {cy}H{cx+12}Z" fill="#557da7"/></g><circle cx="{cx}" cy="{cy}" r="9" fill="#d5a34d" stroke="#9b783c"/>'
    out+=txt(cx,cy-96,'N',25,INK,700,'middle')
    return out

def oersted():
    body=txt(61,140,'Montaje experimental',26,INK,700)
    body+=photo('photo-oersted.png',46,162,590,345)
    body+=pill(112,519,450,'Alambre + brújula + circuito')
    body+=txt(704,140,'Desviación de la brújula',26,INK,700)
    body+=compass(802,310,0)+compass(1040,310,34)
    body+=pill(716,429,172,'I = 0',BLUE)+pill(948,429,184,'I ≠ 0',TEAL)
    body+=txt(802,511,'Sin desviación',24,INK,500,'middle')+txt(1040,511,'Con desviación',24,TEAL,600,'middle')
    body+=txt(920,553,'La aguja responde al campo total.',24,INK,500,'middle')
    return frame(3,'Experiencia de Oersted','Aparato realista y comparación de la orientación de una brújula antes y durante el paso de corriente.',body,'Una corriente eléctrica genera un campo magnético alrededor del conductor.')

def conductor():
    body=txt(61,140,'Conductor de cobre',26,INK,700)
    # A transverse plane in perspective: back halves lie behind the real wire.
    for rx,ry in [(82,28),(122,42),(162,56)]:
        body+=f'<path d="M{341-rx} 350 A{rx} {ry} 0 0 1 {341+rx} 350" fill="none" stroke="{TEAL}" stroke-width="3" opacity=".55"/>'
    body+=photo('photo-wire.png',205,157,272,383)
    for rx,ry in [(82,28),(122,42),(162,56)]:
        body+=f'<path d="M{341+rx} 350 A{rx} {ry} 0 0 1 {341-rx} 350" fill="none" stroke="{TEAL}" stroke-width="3.5" opacity=".9"/>'
        body+=arr(330,350+ry,352,350+ry,TEAL,3.5)
    body+=arr(525,475,525,220,GOLD,8)+txt(551,246,'I',34,COPPER,700)
    body+=txt(700,140,'Vista axial desde +z',26,INK,700)
    cx,cy=920,350
    for r in [77,125,174]:
        body+=f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{TEAL}" stroke-width="3.5" opacity="{.95-(r/500)}"/>'
        for deg in [35,155,275]:
            a=math.radians(deg);x=cx+r*math.cos(a);y=cy-r*math.sin(a);tx,ty=-math.sin(a),-math.cos(a)
            body+=arr(x-tx*9,y-ty*9,x+tx*9,y+ty*9,TEAL,3.5)
    body+=f'<circle cx="{cx}" cy="{cy}" r="28" fill="url(#copper)" stroke="#8f502e" stroke-width="2"/><circle cx="{cx}" cy="{cy}" r="10" fill="#fff3de"/>'
    body+=txt(cx,cy+8,'•',29,INK,700,'middle')
    body+=pill(780,539,280,'I saliente · ⊙',COPPER)
    body+=txt(342,566,'El hilo coincide con el eje z.',24,INK,500,'middle')
    return frame(4,'Campo de un conductor rectilíneo','Varilla de cobre y vista axial con tres circunferencias concéntricas de campo, sin cruces, de sentido antihorario para corriente saliente.',body,'Mano derecha: pulgar en el sentido de I y dedos en el sentido de B.')

def charge():
    body=txt(61,140,'Regla de la palma izquierda',26,INK,700)
    # Corrected left palm: vertical fingers and left thumb rotated clockwise:
    # fingers point right and thumb points upward, as in the source construction.
    body+=photo('photo-hand.png',180,110,330,495,90)
    body+=arr(525,343,610,343,TEAL,7)+txt(582,319,'v',30,TEAL,700)
    body+=arr(355,226,355,160,RED,7)+txt(380,183,'F',30,RED,700)
    body+=cross(290,380,20,BLUE)+txt(240,422,'B entra',25,BLUE,700)
    body+=txt(342,559,'Orienta la mano según v y B.',24,INK,500,'middle')
    body+=txt(707,140,'Caso de una carga positiva',26,INK,700)
    body+=field_grid(747,229,6,4,68,70)
    body+=f'<circle cx="880" cy="379" r="25" fill="url(#gold)" stroke="#be7b0d" stroke-width="2"/>'+txt(880,390,'+',32,INK,700,'middle')
    body+=arr(909,379,1108,379,TEAL,7)+txt(1085,354,'v',31,TEAL,700)
    body+=arr(880,349,880,193,RED,7)+txt(906,212,'F',31,RED,700)
    body+=pill(750,519,361,'q < 0: se invierte la fuerza',BLUE)
    return frame(6,'Fuerza magnética sobre una partícula','Nueva mano realista en la disposición de la palma izquierda: dedos a la derecha, pulgar hacia arriba, campo entrante. Diagrama exacto de una carga positiva con velocidad derecha y fuerza arriba.',body,'F, v y B son perpendiculares entre sí en el caso mostrado.')

def wireforce():
    body=txt(61,140,'Conductor en un campo externo',26,INK,700)
    body+=photo('photo-force-wire.png',53,157,580,362)
    body+=txt(342,558,'Montaje físico de laboratorio',24,INK,500,'middle')
    body+=txt(707,140,'Diagrama de fuerzas',26,INK,700)
    body+=field_grid(748,222,6,5,69,64)
    body+=f'<path d="M777 341H1117" stroke="#93502a" stroke-width="28" stroke-linecap="round"/><path d="M777 341H1117" stroke="url(#rodCopper)" stroke-width="24" stroke-linecap="round"/>'
    body+=f'<path d="M790 340V210M1104 340V210" stroke="#a2b6c4" stroke-width="3"/>'
    body+=arr(1052,295,829,295,GOLD,6)+txt(931,275,'I',29,COPPER,700,'middle')
    body+=arr(790,290,790,179,TEAL,6)+txt(754,187,'T',27,TEAL,700)
    body+=arr(1104,290,1104,179,TEAL,6)+txt(1124,187,'T',27,TEAL,700)
    body+=arr(947,357,947,494,RED,7)+txt(969,490,'Fmag',25,RED,700)
    body+=arr(1005,357,1005,429,INK,5)+txt(1025,428,'mg',24,INK,700)
    body+=f'<path d="M947 341H1005V357" stroke="#708b9c" stroke-width="1.7" stroke-dasharray="4 5" fill="none"/>'
    body+=pill(739,532,388,'B entrante · ⊗',BLUE)
    return frame(7,'Fuerza magnética sobre conductores','Montaje realista y diagrama de una barra con corriente hacia la izquierda y campo entrante. La fuerza magnética y el peso apuntan hacia abajo; las tensiones apuntan hacia arriba.',body,'En un tramo recto uniforme, Fmag actúa en el punto medio.')

def trajectory():
    body=txt(61,140,'Cámara de partículas',26,INK,700)
    body+=photo('photo-particle-chamber.png',45,173,590,345)
    body+=txt(342,555,'Vista del aparato de laboratorio',24,INK,500,'middle')
    body+=txt(705,140,'Vista del recorrido: B entrante',25,INK,700)
    body+=field_grid(729,205,6,4,73,72)
    body+=f'<path d="M1100 431 A180 180 0 0 0 740 431" fill="none" stroke="#8de4da" stroke-width="18" opacity=".3"/><path d="M1100 431 A180 180 0 0 0 740 431" fill="none" stroke="{TEAL}" stroke-width="6" stroke-linecap="round"/>'
    a=math.radians(43);x=920+180*math.cos(a);y=431-180*math.sin(a);tx,ty=-math.sin(a),-math.cos(a)
    body+=arr(x-12*tx,y-12*ty,x+12*tx,y+12*ty,TEAL,5)
    body+=f'<path d="M740 431H1100" stroke="#7897a9" stroke-width="2" stroke-dasharray="7 7"/><circle cx="920" cy="431" r="5" fill="{INK}"/>'
    body+=arr(920,431,920,264,GOLD,4)+txt(943,356,'R',28,COPPER,700)
    body+=f'<circle cx="1100" cy="431" r="17" fill="url(#gold)" stroke="#c58b23"/>'+txt(1100,438,'+',24,INK,700,'middle')
    body+=f'<circle cx="740" cy="431" r="8" fill="{TEAL}"/>'+txt(1100,471,'A',29,INK,700,'middle')+txt(740,471,'C',29,INK,700,'middle')
    body+=arr(1131,421,1131,311,TEAL,6)+txt(1140,307,'v',26,TEAL,700)
    body+=arr(1082,431,992,431,RED,6)+txt(1031,412,'F',28,RED,700,'middle')
    body+=pill(804,526,258,'R = AC / 2',COPPER)
    return frame(8,'Movimiento circular en un campo magnético','Cámara realista y trayectoria semicircular superior de una carga positiva: entra por A a la derecha con velocidad arriba, campo entrante y fuerza hacia la izquierda; sale por C a la izquierda.',body,'La fuerza magnética es centrípeta: cambia la dirección de la velocidad.')

BUILDERS={'03-oersted.svg':oersted,'04-conductor.svg':conductor,'06-fuerza-carga.svg':charge,'07-fuerza-conductor.svg':wireforce,'08-trayectoria.svg':trajectory}
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--only',nargs='*');args=parser.parse_args()
    OUT.mkdir(exist_ok=True,parents=True)
    for name,builder in BUILDERS.items():
        if args.only and name not in args.only:continue
        try:svg=builder()
        except FileNotFoundError as exc:print('WAIT',name,exc);continue
        (OUT/name).write_text(svg)
        print('WROTE',name,len(svg))
