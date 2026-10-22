#!/usr/bin/env python3
"""Compose realistic apparatus photography with exact, code-defined physics geometry."""
from pathlib import Path
import base64, io, json, math
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/em-realistic'
NAVY='#173550';TEAL='#087f8c';FIELD='#009b8f';PURPLE='#754fc1';COPPER='#cb7d43'

def photo(name):
 p=OUT/name
 if not p.exists():p=p.with_suffix('.webp')
 im=Image.open(p)
 buf=io.BytesIO();im.save(buf,format='WEBP',quality=88,method=6)
 return 'data:image/webp;base64,'+base64.b64encode(buf.getvalue()).decode()

MAGNET=photo('photo-magnet.png')
WIRE=photo('photo-wire.png')

def defs():
 return f'''<defs><linearGradient id="paper" x2="0" y2="1"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#eaf5fb"/></linearGradient><linearGradient id="copper" x2="1"><stop stop-color="#5c2c12"/><stop offset=".2" stop-color="#c77937"/><stop offset=".46" stop-color="#ffe1a6"/><stop offset=".6" stop-color="#f2ab68"/><stop offset="1" stop-color="#71391a"/></linearGradient><linearGradient id="red" x2="0" y2="1"><stop stop-color="#ff685a"/><stop offset=".4" stop-color="#d82e34"/><stop offset="1" stop-color="#9b192b"/></linearGradient><linearGradient id="blue" x2="0" y2="1"><stop stop-color="#4c9dec"/><stop offset=".45" stop-color="#2360ac"/><stop offset="1" stop-color="#123b7b"/></linearGradient><marker id="arrow-field" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="9" markerHeight="9" orient="auto"><path d="M1 1L11 6L1 11L4 6Z" fill="{FIELD}"/></marker><marker id="arrow-teal" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="8" markerHeight="8" orient="auto"><path d="M1 1L11 6L1 11Z" fill="{TEAL}"/></marker><marker id="arrow-purple" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="8" markerHeight="8" orient="auto"><path d="M1 1L11 6L1 11Z" fill="{PURPLE}"/></marker><image id="magnet-photo" href="{MAGNET}" x="0" y="0" width="2079" height="756"/></defs>'''

def svg(title,desc,body,height=760,extra=''):
 return f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="{height}" viewBox="0 0 1200 {height}" role="img" aria-labelledby="title desc"><title id="title">{title}</title><desc id="desc">{desc}</desc>{defs()}{extra}<rect width="1200" height="{height}" rx="28" fill="url(#paper)"/><g font-family="Inter,Arial,sans-serif" fill="{NAVY}">{body}</g></svg>'''

def txt(x,y,s,size=30,weight=500,fill=NAVY,anchor='start'):
 return f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}">{s}</text>'

def magnet(x,y,w,h,flip=False):
 # Display the physical bar, omitting only transparent padding in its source viewport.
 inner='<use href="#magnet-photo"/>'
 if flip:inner='<g transform="translate(2080 0) scale(-1 1)">'+inner+'</g>'
 return f'<svg x="{x}" y="{y}" width="{w}" height="{h}" viewBox="70 215 1950 310" preserveAspectRatio="none">{inner}</svg>'

def pole_labels(x,y,w,h,flip=False,size=48):
 return txt(x+w*.25,y+h*.66,'S' if flip else 'N',size,800,'white','middle')+txt(x+w*.75,y+h*.66,'N' if flip else 'S',size,800,'white','middle')

def bar_pair(y,attract):
 title='Polos opuestos: atracción' if attract else 'Polos iguales: repulsión'
 col='#dcf4ee' if attract else '#fff0e8'
 x1,x2,w,h=78,702,420,76
 s=f'<rect x="35" y="{y}" width="1130" height="216" rx="22" fill="white" stroke="#d5e4ec" stroke-width="2"/>'
 s+=f'<rect x="56" y="{y+20}" width="1088" height="54" rx="14" fill="{col}"/>'+txt(80,y+57,title,32,750)
 my=y+94;s+=magnet(x1,my,w,h)+magnet(x2,my,w,h,not attract)+pole_labels(x1,my,w,h)+pole_labels(x2,my,w,h,not attract)
 if attract:
  arrows=[(520,575),(680,625)]
 else:
  arrows=[(575,520),(625,680)]
 for start,end in arrows:
  s+=f'<path d="M{start} {my+36}H{end}" fill="none" stroke="{TEAL}" stroke-width="7" stroke-linecap="round" marker-end="url(#arrow-teal)"/>'
 return s

body=bar_pair(32,True)+bar_pair(272,False)
body+='<rect x="35" y="512" width="1130" height="216" rx="22" fill="white" stroke="#d5e4ec" stroke-width="2"/>'
body+=txt(80,565,'Cada fragmento conserva ambos polos',32,750)
body+=magnet(200,598,330,64)+pole_labels(200,598,330,64,size=43)+magnet(670,598,330,64)+pole_labels(670,598,330,64,size=43)
body+=txt(600,704,'Dos fragmentos → dos imanes, cada uno con N y S',27,500,NAVY,'middle')
(OUT/'01-imanes.svg').write_text(svg('Propiedades de imanes reales','Imanes de barra con acabado metálico y pintura roja y azul: atracción entre S y N, repulsión entre S y S y fragmentos con ambos polos.',body))

# Two opposite virtual poles inside the physical magnet. Their streamlines are unique
# integral curves. RK4 steps are small relative to the visible inter-line spacing.
N=(255.,356.);S=(945.,356.)
def field(p):
 nx,ny=p[0]-N[0],p[1]-N[1];sx,sy=p[0]-S[0],p[1]-S[1]
 nr=math.hypot(nx,ny);sr=math.hypot(sx,sy)
 return (nx/nr**3-sx/sr**3,ny/nr**3-sy/sr**3)
def unit(p):
 x,y=field(p);v=math.hypot(x,y);return x/v,y/v

def trace(angle,step=2.):
 rad=math.radians(angle);p=(N[0]+20*math.cos(rad),N[1]-20*math.sin(rad));pts=[p]
 for i in range(1800):
  x,y=p;k1=unit(p);k2=unit((x+step*k1[0]/2,y+step*k1[1]/2));k3=unit((x+step*k2[0]/2,y+step*k2[1]/2));k4=unit((x+step*k3[0],y+step*k3[1]));p=(x+step*(k1[0]+2*k2[0]+2*k3[0]+k4[0])/6,y+step*(k1[1]+2*k2[1]+2*k3[1]+k4[1])/6);pts.append(p)
  if math.hypot(p[0]-S[0],p[1]-S[1])<=20:break
 else:raise RuntimeError('A field line did not return to the south pole')
 return [[round(x,4),round(y,4)] for x,y in pts]

angles=[19,27,35,43,51]
upper=[trace(a) for a in angles]
lines=upper+[[[x,round(2*N[1]-y,4)] for x,y in ps] for ps in upper]
geom={'model':'two-opposite-virtual-poles','north':list(N),'south':list(S),'maskRect':[223,305,978,408],'anglesDegrees':angles,'polylines':lines}
(OUT/'02-field-geometry.json').write_text(json.dumps(geom,separators=(',',':')))
body=txt(52,54,'Un campo continuo, sin cruces',34,750)+txt(52,91,'Las flechas indican el sentido del campo magnético.',25,500,'#516c80')
body+='<g clip-path="url(#outside-magnet)">'
for i,ps in enumerate(lines):
 path='M'+'L'.join(f'{x},{y}' for x,y in ps)
 body+=f'<path data-field-index="{i}" d="{path}" fill="none" stroke="{FIELD}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'
 # One centered arrow per path; all use the local computed tangent.
 mid=len(ps)//2;pa,pb=ps[mid-5],ps[mid+5]
 body+=f'<path d="M{pa[0]},{pa[1]}L{pb[0]},{pb[1]}" fill="none" stroke="{FIELD}" stroke-width="4" marker-end="url(#arrow-field)"/>'
body+='</g>'+magnet(220,302,760,112)+pole_labels(220,302,760,112,size=54)
body+='<rect x="52" y="654" width="1096" height="82" rx="18" fill="white" stroke="#d2e3e8" stroke-width="2"/>'
body+=txt(80,704,'Exterior: N → S',29,750,FIELD)+txt(465,704,'Interior: S → N',29,750,'#2c5685')
body+='<path d="M1060 694H960" stroke="#2c5685" stroke-width="5" marker-end="url(#arrow-teal)"/>'
extra='<defs><clipPath id="outside-magnet"><path d="M0 0H1200V760H0Z M223 305H978V408H223Z" clip-rule="evenodd" fill-rule="evenodd"/></clipPath></defs>'
(OUT/'02-campo.svg').write_text(svg('Campo de un imán sin intersecciones','Imán realista N rojo a la izquierda y S azul a la derecha. Diez líneas de campo calculadas rodean el imán sin cruzarse; fuera van de N a S y dentro continúan de S a N.',body,extra=extra))

# Finite conductor: the photograph contains no physics geometry. All vectors,
# construction lines and angles are defined here in the same image coordinates.
P=(955,415);T=(430,155);D=(430,650);foot=(430,415)
body=txt(52,54,'Campo de un conductor rectilíneo finito',34,750)
body+=txt(52,92,'Geometría de la ley de Biot–Savart–Laplace',25,500,'#516c80')
body+=f'<image href="{WIRE}" x="245" y="128" width="370" height="555"/>'
body+=f'<g fill="none" stroke="#518498" stroke-width="3" stroke-dasharray="10 9"><path d="M{T[0]} {T[1]}L{P[0]} {P[1]}L{D[0]} {D[1]}"/><path d="M{foot[0]} {foot[1]}H{P[0]}"/></g>'
body+=f'<path d="M430 437H452V415" fill="none" stroke="#518498" stroke-width="3"/>'
body+=f'<path d="M325 548V270" stroke="{TEAL}" stroke-width="7" stroke-linecap="round" marker-end="url(#arrow-teal)"/>'+txt(290,410,'I',40,750,TEAL)
body+=txt(690,398,'d',34,650,TEAL,'middle')
for name,end,up in [('α',T,True),('β',D,False)]:
 r=93;dx=end[0]-P[0];dy=end[1]-P[1];den=math.hypot(dx,dy);ex=P[0]+r*dx/den;ey=P[1]+r*dy/den
 body+=f'<path d="M{P[0]-r} {P[1]}A{r} {r} 0 0 {1 if up else 0} {ex:.3f} {ey:.3f}" fill="none" stroke="{PURPLE}" stroke-width="3"/>'
 body+=txt(824,388 if up else 469,name,34,650,PURPLE)
body+=f'<circle cx="955" cy="415" r="25" fill="white" stroke="{PURPLE}" stroke-width="3"/><path d="M943 403L967 427M967 403L943 427" stroke="{PURPLE}" stroke-width="4" stroke-linecap="round"/>'
body+=txt(955,363,'P',34,750,NAVY,'middle')+txt(1004,426,'Bₚ',34,750,PURPLE)
body+='<rect x="52" y="699" width="1096" height="50" rx="14" fill="#e4f0f4"/>'
body+=txt(600,733,'d es perpendicular al conductor · α y β se miden desde esa perpendicular',25,600,NAVY,'middle')
(OUT/'05-biot.svg').write_text(svg('Ley de Biot-Savart-Laplace: geometría de un conductor finito','Conductor de cobre realista con corriente ascendente. P está a su derecha; el campo en P entra en la pantalla. La distancia d es perpendicular; alfa y beta se miden en P respecto a esa perpendicular.',body))
print('Built realistic magnets, nonintersecting field lines and finite-wire geometry')
