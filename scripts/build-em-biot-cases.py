from pathlib import Path
from html import escape

W,H=1200,900
navy='#173452';teal='#008f94';purple='#6b47be';blue='#1478b8';muted='#5c7186'
svg=[f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-labelledby="title desc">
<title id="title">Cuatro geometrías de conductor y su campo magnético</title>
<desc id="desc">Hilo largo, hilo semiinfinito, espira circular y arco de corriente. Las corrientes dibujadas producen campo saliente hacia el observador en P u O. Las distancias y radios corresponden a las fórmulas indicadas.</desc>
<defs>
 <linearGradient id="paper" x1="0%" y1="0%" x2="0%" y2="100%"><stop stop-color="#f8fcff"/><stop offset="1" stop-color="#eaf3fa"/></linearGradient>
 <linearGradient id="copper" x1="0%" y1="0%" x2="0%" y2="100%"><stop stop-color="#643619"/><stop offset=".13" stop-color="#c7763f"/><stop offset=".36" stop-color="#ffdaa5"/><stop offset=".52" stop-color="#df9257"/><stop offset=".81" stop-color="#a64c25"/><stop offset="1" stop-color="#5e2a13"/></linearGradient>
 <linearGradient id="tube" gradientUnits="userSpaceOnUse" x1="180" y1="575" x2="370" y2="775"><stop stop-color="#8d3f1b"/><stop offset=".28" stop-color="#ffd79e"/><stop offset=".49" stop-color="#c5743f"/><stop offset=".69" stop-color="#f7c387"/><stop offset="1" stop-color="#803817"/></linearGradient>
 <linearGradient id="arcTube" gradientUnits="userSpaceOnUse" x1="870" y1="580" x2="970" y2="780"><stop stop-color="#a6532a"/><stop offset=".26" stop-color="#ffdcaa"/><stop offset=".48" stop-color="#c87841"/><stop offset=".72" stop-color="#f0b575"/><stop offset="1" stop-color="#7b3319"/></linearGradient>
 <radialGradient id="cut"><stop stop-color="#ffdca7"/><stop offset=".65" stop-color="#ca7c46"/><stop offset="1" stop-color="#6e351b"/></radialGradient>
 <filter id="shadow" x="-20%" y="-50%" width="140%" height="220%"><feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#153149" flood-opacity=".14"/></filter>
 <marker id="current" markerWidth="8" markerHeight="8" refX="6.5" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="{blue}"/></marker>
</defs>
<rect width="1200" height="900" rx="28" fill="#f0f7fc"/>
<g font-family="Arial,sans-serif" fill="{navy}" stroke-linecap="round" stroke-linejoin="round">
<text x="42" y="49" font-size="29" font-weight="750">La forma del conductor determina el campo</text>
<text x="42" y="83" font-size="24" fill="{muted}">Identifica la geometría y el punto donde se calcula B.</text>''']

def panel(x,y,num,title,sub):
 svg.append(f'<rect x="{x}" y="{y}" width="555" height="350" rx="22" fill="white" stroke="#ccdeeb" stroke-width="1.5"/>')
 svg.append(f'<rect x="{x+21}" y="{y+22}" width="43" height="36" rx="10" fill="#e0f3f4"/><text x="{x+42.5}" y="{y+48}" text-anchor="middle" font-size="24" font-weight="800" fill="{teal}">{num}</text>')
 svg.append(f'<text x="{x+79}" y="{y+48}" font-size="29" font-weight="750">{escape(title)}</text>')
 svg.append(f'<text x="{x+24}" y="{y+83}" font-size="24" fill="{muted}">{escape(sub)}</text>')

def out(x,y,name):
 svg.append(f'<circle cx="{x}" cy="{y}" r="17" fill="#f0eaff" stroke="{purple}" stroke-width="2.5"/><circle cx="{x}" cy="{y}" r="5.8" fill="{purple}"/>')
 if name: svg.append(f'<text x="{x+30}" y="{y+9}" font-size="28" font-weight="700" fill="{purple}">B<tspan baseline-shift="sub" font-size="24">{name}</tspan></text>')

def formula(x,y,sub,numerator,denominator):
 svg.append(f'<rect x="{x}" y="{y}" width="507" height="65" rx="13" fill="#edf5fa"/>')
 svg.append(f'<text x="{x+153}" y="{y+41}" font-family="Arial,sans-serif" font-size="29" text-anchor="end">B{"ₚ" if sub=="P" else "ₒ"} =</text>')
 svg.append(f'<text x="{x+271}" y="{y+26}" font-family="Arial,sans-serif" font-size="27" text-anchor="middle">{numerator}</text><path d="M{x+205} {y+32}H{x+337}" stroke="{navy}" stroke-width="1.5"/><text x="{x+271}" y="{y+57}" font-family="Arial,sans-serif" font-size="27" text-anchor="middle">{denominator}</text>')

def current(path,x,y):
 svg.append(f'<path d="{path}" fill="none" stroke="{blue}" stroke-width="4.5" marker-end="url(#current)"/><text x="{x}" y="{y}" font-size="28" font-style="italic" font-weight="700" fill="{blue}">I</text>')

panel(30,110,'01','Conductor muy largo','Campo a distancia perpendicular d')
svg.append('<ellipse cx="312" cy="333" rx="236" ry="14" fill="#153149" opacity=".08"/>')
svg.append('<rect x="78" y="307" width="462" height="25" rx="12.5" fill="url(#copper)" filter="url(#shadow)"/><path d="M92 312H527" stroke="#ffe6c1" stroke-width="3" opacity=".7"/>')
svg.append(f'<path d="M72 319H50M547 319H568" stroke="{muted}" stroke-width="3" stroke-dasharray="3 7"/>')
svg.append(f'<path d="M286 249V319.5M286 306.5H299V319.5" fill="none" stroke="#7e94a8" stroke-width="2.5" stroke-dasharray="5 6"/><text x="312" y="285" font-size="27">d</text><text x="252" y="235" font-size="27" font-weight="700">P</text>')
out(286,231,'P');current('M183 352H345',354,363);formula(54,386,'P','μ₀ I','2πd')

panel(615,110,'02','Conductor semiinfinito','P está sobre la perpendicular al extremo')
svg.append('<ellipse cx="929" cy="333" rx="207" ry="14" fill="#153149" opacity=".08"/><rect x="733" y="307" width="386" height="25" rx="1" fill="url(#copper)" filter="url(#shadow)"/><ellipse cx="733" cy="319.5" rx="7" ry="12.5" fill="url(#cut)"/><path d="M746 312H1116" stroke="#ffe6c1" stroke-width="3" opacity=".7"/>')
svg.append(f'<path d="M1124 319H1153" stroke="{muted}" stroke-width="3" stroke-dasharray="3 7"/><text x="1117" y="298" font-size="27" fill="{muted}">∞</text>')
svg.append(f'<path d="M733 249V319.5M733 306.5H746V319.5" fill="none" stroke="#7e94a8" stroke-width="2.5" stroke-dasharray="5 6"/><text x="759" y="285" font-size="27">d</text><text x="697" y="236" font-size="27" font-weight="700">P</text>')
out(733,231,'P');current('M875 352H1021',1030,363);formula(639,386,'P','μ₀ I','4πd')

panel(30,485,'03','Espira circular','Campo en el centro O de la espira')
svg.append('<ellipse cx="274" cy="743" rx="108" ry="15" fill="#153149" opacity=".08"/><circle cx="270" cy="665" r="75" fill="none" stroke="#71351d" stroke-width="21"/><circle cx="270" cy="665" r="75" fill="none" stroke="url(#tube)" stroke-width="17" filter="url(#shadow)"/><path d="M200 640A73 73 0 0 1 292 595" fill="none" stroke="#ffe6c1" stroke-width="3" opacity=".8"/>')
svg.append(f'<path d="M270 665H345" fill="none" stroke="#768da2" stroke-width="2.5" stroke-dasharray="5 6"/><text x="312" y="650" font-size="27">R</text><text x="235" y="696" font-size="27" font-weight="700">O</text>')
out(270,665,'');current('M340 735A99 99 0 0 0 368 646',389,696);formula(54,758,'O','μ₀ I','2R')

panel(615,485,'04','Arco de corriente','Campo en el centro O del arco')
svg.append('<path d="M911 741A88 88 0 0 0 911 589" fill="none" stroke="#71351d" stroke-width="22"/><path d="M911 741A88 88 0 0 0 911 589" fill="none" stroke="url(#arcTube)" stroke-width="18" filter="url(#shadow)"/><path d="M917 731A84 84 0 0 0 922 608" fill="none" stroke="#ffe6c1" stroke-width="3" opacity=".8"/><circle cx="911" cy="741" r="8" fill="url(#cut)"/><circle cx="911" cy="589" r="8" fill="url(#cut)"/>')
svg.append(f'<path d="M867 665L911 589M867 665L911 741" fill="none" stroke="#8197a8" stroke-width="2.5" stroke-dasharray="5 6"/><path d="M888 701A42 42 0 0 0 888 629" fill="none" stroke="{teal}" stroke-width="3"/><text x="900" y="619" font-size="27">R</text><text x="927" y="676" font-size="28" fill="{teal}">θ</text><text x="829" y="697" font-size="27" font-weight="700">O</text>')
out(867,665,'');current('M927 751A105 105 0 0 0 970 629',992,697);formula(639,758,'O','μ₀ I θ','4πR')
svg.append(f'<text x="867" y="870" font-size="24" text-anchor="middle" fill="{muted}">Para el arco, θ se expresa en radianes.</text><text x="43" y="870" font-size="24" fill="{purple}">⊙ B sale hacia el observador</text></g></svg>')
p=Path(__file__).resolve().parents[1]/'assets/em-realistic/05-biot-casos.svg';p.write_text('\n'.join(svg));print(p)
