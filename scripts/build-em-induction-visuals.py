from pathlib import Path
from io import BytesIO
import base64,math
from html import escape
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/em-realistic'
NAVY='#173452';TEAL='#008f94';PURPLE='#7150bc';MUTED='#5c7186';BLUE='#207bd0';RED='#e04b55';GOLD='#e2a13a'
W,H=1200,760

def photo(name,x,y,w,h):
 p=OUT/name
 if not p.exists():p=p.with_suffix('.webp')
 im=Image.open(p).convert('RGBA');buf=BytesIO();im.save(buf,format='WEBP',quality=86,method=6)
 b=base64.b64encode(buf.getvalue()).decode()
 return f'<image x="{x}" y="{y}" width="{w}" height="{h}" href="data:image/webp;base64,{b}" preserveAspectRatio="xMidYMid meet"/>'
def text(x,y,t,size=25,color=NAVY,weight=500,anchor='start'):
 return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{weight}" text-anchor="{anchor}">{escape(t)}</text>'
def arrow(x1,y1,x2,y2,color=TEAL,width=5):
 a=math.atan2(y2-y1,x2-x1);L=15;P=7
 p1=(x2-L*math.cos(a)+P*math.sin(a),y2-L*math.sin(a)-P*math.cos(a));p2=(x2-L*math.cos(a)-P*math.sin(a),y2-L*math.sin(a)+P*math.cos(a))
 return f'<path d="M{x1} {y1}L{x2} {y2}" stroke="{color}" stroke-width="{width}" fill="none" stroke-linecap="round"/><path d="M{x2} {y2}L{p1[0]:.2f} {p1[1]:.2f}L{p2[0]:.2f} {p2[1]:.2f}Z" fill="{color}"/>'
def box(x,y,w,h,fill='white',stroke='#cedfeb',r=22):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="1.5"/>'
def start(title,subtitle,desc):
 return [f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc><defs><linearGradient id="metal" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#77909e"/><stop offset=".22" stop-color="#e9f5fa"/><stop offset=".45" stop-color="#8da5b1"/><stop offset=".67" stop-color="#f5fdff"/><stop offset="1" stop-color="#5a7483"/></linearGradient><linearGradient id="copper" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#713718"/><stop offset=".22" stop-color="#edac6c"/><stop offset=".46" stop-color="#ffe1b1"/><stop offset=".7" stop-color="#ce763e"/><stop offset="1" stop-color="#723214"/></linearGradient><radialGradient id="glow"><stop stop-color="#f8fcff"/><stop offset="1" stop-color="#eaf3fa"/></radialGradient></defs><rect width="1200" height="760" rx="28" fill="#f1f7fc"/><g font-family="Arial,sans-serif" stroke-linecap="round" stroke-linejoin="round">''',text(40,52,title,32,NAVY,750),text(40,91,subtitle,24,MUTED)]
def finish(parts,name):
 parts.append('</g></svg>');p=OUT/name;p.write_text('\n'.join(parts));print(p)
def circled(x,y,symbol,color=BLUE,r=18):
 return f'<circle cx="{x}" cy="{y}" r="{r}" fill="white" stroke="{color}" stroke-width="2.4"/>'+ (f'<circle cx="{x}" cy="{y}" r="5" fill="{color}"/>' if symbol=='out' else f'<path d="M{x-7} {y-7}L{x+7} {y+7}M{x+7} {y-7}L{x-7} {y+7}" stroke="{color}" stroke-width="2.8"/>')

# 09. A physical magnet–coil apparatus, with exact change-versus-no-change comparison.
s=start('Del movimiento a la inducción','El movimiento relativo puede cambiar el flujo que atraviesa la bobina.','Imán, bobina de cobre y galvanómetro. Un imán quieto mantiene el flujo constante; al acercarlo o alejarlo, el flujo cambia y puede aparecer fem inducida.')
s += [box(30,124,730,584),photo('photo-induction.png',45,225,700,410),text(64,168,'IMÁN · BOBINA · GALVANÓMETRO',23,TEAL,750),arrow(155,213,300,213,GOLD),text(227,193,'Movimiento',24,NAVY,650,'middle')]
s += [box(785,124,385,277),text(812,167,'Imán en reposo',28,NAVY,750),text(812,209,'Flujo constante',25,TEAL,650),text(812,251,'La aguja permanece en cero.',23,MUTED),'<path d="M864 330A70 70 0 0 1 1004 330" fill="#f5f8fc" stroke="#abc1d2" stroke-width="3"/>',arrow(934,328,934,273,TEAL,4),text(934,368,'0',25,NAVY,650,'middle')]
s += [box(785,421,385,287,'#e9f5f4','#c0e1dc'),text(812,464,'Imán en movimiento',28,NAVY,750),text(812,506,'El flujo varía',25,TEAL,650),text(812,547,'Puede aparecer una fem.',23,MUTED),'<path d="M864 637A70 70 0 0 1 1004 637" fill="white" stroke="#abc1d2" stroke-width="3"/>',arrow(934,636,973,588,TEAL,4),text(934,676,'Desviación',23,MUTED,500,'middle')]
finish(s,'09-induccion.svg')

# 10. Keep the apparatus realistic, but define the angle with the normal exactly.
s=start('Flujo magnético: importa la orientación','El ángulo θ se mide entre B y la normal a la superficie.','Una espira de cobre realista y una representación geométrica. La normal es perpendicular al plano de la espira. Las líneas paralelas del campo uniforme no se cruzan.')
s += [box(30,124,550,584),photo('photo-flux-coil.png',76,171,456,483),text(305,678,'Superficie limitada por una espira',23,MUTED,500,'middle')]
s += [box(605,124,565,584),text(635,168,'GEOMETRÍA DEL FLUJO',23,TEAL,750)]
s += ['<path d="M690 509L987 509L1092 390L795 390Z" fill="#e4eef6" fill-opacity=".8" stroke="#a9bfd0" stroke-width="2"/>','<ellipse cx="890" cy="450" rx="147" ry="54" fill="#fff4dd" fill-opacity=".45" stroke="url(#copper)" stroke-width="13"/>']
for x in [765,845,925]:s += [arrow(x,565,x+132,301,TEAL,3.5)]
s += [arrow(890,450,890,235,BLUE,5),text(906,244,'n',29,BLUE,750),text(906,274,'normal',23,BLUE),arrow(890,450,1017,196,TEAL,5),text(1030,211,'B',30,TEAL,750),'<path d="M890 363A87 87 0 0 1 929 372" stroke="#dc9635" stroke-width="4" fill="none"/>',text(910,349,'θ',31,GOLD,750),text(978,487,'A',31,NAVY,650),text(890,629,'Φ = BA cos θ',36,NAVY,750,'middle'),text(890,674,'θ se mide con la normal, no con el plano.',23,MUTED,500,'middle')]
finish(s,'10-flujo.svg')

# 11. Source graph, with the original units/data and no extrapolation.
s=start('Faraday: del cambio de flujo a la corriente','Ejemplo del material: sigue los ejes, el intervalo y las unidades.','El flujo pasa de100Wb a500Wb entre2s y10s. Su cambio es400Wb en8s. Una resistencia de200ohmios conduce0,25A; la fem media tiene magnitud50V.')
s += [box(30,124,466,584),photo('photo-flux-coil.png',79,182,368,367),text(263,585,'Espira conductora',28,NAVY,750,'middle'),text(263,632,'R = 200 Ω',33,TEAL,750,'middle'),text(263,676,'I = |ξ| / R',28,NAVY,650,'middle'),box(520,124,650,584)]
x0,y0=635,532;s += [arrow(x0,y0,1130,y0,NAVY,3),arrow(x0,y0,x0,187,NAVY,3),text(614,178,'Φ (Wb)',25,NAVY,650,'middle'),text(1130,566,'t (s)',24,NAVY,650,'end')]
mapx=lambda t:x0+t*39;mapy=lambda ph:y0-ph*.52
for t in [2,10]:s += [text(mapx(t),565,str(t),23,MUTED,500,'middle')]
for ph in [100,500]:s += [text(x0-15,mapy(ph)+8,str(ph),23,MUTED,500,'end')]
s += [f'<path d="M{mapx(2)} {y0}V{mapy(100)}H{x0}M{mapx(10)} {y0}V{mapy(500)}H{x0}" fill="none" stroke="#9eb7c9" stroke-width="2" stroke-dasharray="6 7"/>',f'<path d="M{mapx(2)} {mapy(100)}L{mapx(10)} {mapy(500)}" fill="none" stroke="{TEAL}" stroke-width="6"/>']
for t,ph in [(2,100),(10,500)]:s += [f'<circle cx="{mapx(t)}" cy="{mapy(ph)}" r="7" fill="{TEAL}" stroke="white" stroke-width="3"/>']
s += [text(845,173,'ΔΦ = 500 − 100 = 400 Wb',26,TEAL,750,'middle'),text(845,610,'Δt = 10 − 2 = 8 s',25,MUTED,650,'middle'),text(845,651,'|ξ| = 400 / 8 = 50 V',29,NAVY,750,'middle'),text(845,688,'I = 50 / 200 = 0,25 A',29,PURPLE,750,'middle')]
finish(s,'11-faraday.svg')

# 12. Exact current sense in the source moving-bar example; hardware remains 3D.
s=start('Lenz: la respuesta se opone al cambio','La barra avanza hacia la derecha y aumenta el flujo entrante.','Campo externo entrante, barra conductora moviéndose a la derecha y corriente inducida antihoraria. La corriente produce un campo saliente que se opone al aumento del flujo entrante.')
s += [box(30,124,755,584),text(65,170,'CIRCUITO CON BARRA MÓVIL',23,TEAL,750)]
for y in [240,538]:s += [f'<rect x="144" y="{y-9}" width="543" height="18" rx="8" fill="url(#metal)" stroke="#607c8e" stroke-width="1.4"/>']
s += ['<rect x="145" y="231" width="18" height="316" rx="8" fill="url(#metal)" stroke="#607c8e" stroke-width="1.4"/>']
for x in [225,305,385,465,545,625]:
 for y in [293,383,473]:s += [circled(x,y,'in',BLUE,14)]
# The generated straight copper rod is placed by its physical central-axis coordinates.
s += [photo('photo-wire.png',400,193,250,394),arrow(526,338,662,338,GOLD,5),text(683,347,'v',31,GOLD,750),arrow(446,216,256,216,TEAL,5),arrow(127,289,127,483,TEAL,5),arrow(231,562,437,562,TEAL,5),arrow(544,492,544,407,TEAL,5),text(331,606,'I inducida: antihoraria',28,TEAL,750,'middle')]
s += [box(810,124,360,277),text(836,168,'1. Cambia el flujo',28,NAVY,750),circled(854,217,'in',BLUE,17),text(886,226,'B externo entra',23,BLUE,650),text(836,271,'Al aumentar el área,',24,MUTED),text(836,306,'aumenta el flujo entrante.',24,MUTED),arrow(840,356,925,356,GOLD,4),text(944,365,'v',27,GOLD,750)]
s += [box(810,421,360,287,'#f2eefd','#d7cbee'),text(836,465,'2. Se opone al aumento',26,NAVY,750),circled(856,516,'out',PURPLE,18),text(890,525,'B inducido sale',24,PURPLE,650),text(836,572,'La mano derecha da',24,MUTED),text(836,608,'corriente antihoraria.',24,MUTED),text(990,669,'⊙',50,PURPLE,750,'middle')]
finish(s,'12-lenz.svg')

# 13. The generator has a vertical rotation axis, perpendicular to the horizontal B.
s=start('Generador: movimiento que produce electricidad','La bobina gira dentro del campo y el flujo varía durante la vuelta.','Generador realista con eje vertical de giro y campo horizontal entre poloN rojo y poloS azul. El eje de giro es perpendicular al campo. Un trabajo mecánico externo hace girar la bobina y produce una fem alterna.')
s += [box(30,124,742,584),photo('photo-generator.png',55,160,690,512)]
s += [text(211,212,'N',30,RED,750,'middle'),text(533,212,'S',30,BLUE,750,'middle'),arrow(333,336,441,336,TEAL,5),text(386,313,'B',28,TEAL,750,'middle'),text(168,679,'Entrada de energía mecánica',24,MUTED,650)]
s += [box(795,124,375,584),text(823,170,'TRES IDEAS CONECTADAS',23,TEAL,750)]
for y,n,label in [(232,'1','La bobina gira'),(320,'2','Cambia el flujo'),(408,'3','Aparece una fem alterna')]:
 s += [f'<circle cx="848" cy="{y}" r="23" fill="#dff2f3"/>',text(848,y+8,n,25,TEAL,750,'middle'),text(884,y+8,label,23,NAVY,650)]
s += ['<path d="M833 565H1137M833 492V638" stroke="#adc1d1" stroke-width="2"/>',text(819,486,'ξ',28,PURPLE,750),text(1140,592,'t',25,MUTED,600)]
pts=[(842+i*2.8,565-54*math.sin(i/100*math.tau*1.5)) for i in range(101)]
s += ['<path d="M'+'L'.join(f'{x:.2f} {y:.2f}' for x,y in pts)+f'" stroke="{PURPLE}" stroke-width="4.5" fill="none"/>',text(982,683,'Trabajo mecánico → energía eléctrica',21,MUTED,500,'middle')]
finish(s,'13-generador.svg')
