'use strict';
window.GEOMETRY_SYLLABUS=(window.COURSES?.find(c=>c.id===4)?.topics||[
  "Segmentos y ángulos",
  "Triángulos y congruencia",
  "Desigualdades geométricas",
  "Rectas perpendiculares y paralelas",
  "Mediatriz y bisectriz",
  "Cuadriláteros, paralelogramos, trapecios y polígonos",
  "Circunferencia y ángulos en la circunferencia",
  "Circunferencias inscritas y circunscritas",
  "Puntos notables del triángulo",
  "Teorema de Tales",
  "Criterios de semejanza",
  "Teorema de Pitágoras",
  "Teoremas de la bisectriz y la mediana",
  "Relaciones métricas en triángulo y circunferencia",
  "Áreas de triángulos, cuadriláteros y polígonos",
  "Longitud de circunferencia, círculo y sector circular",
  "Poliedros convexos y regulares",
  "Prismas y troncos de prisma",
  "Pirámides y troncos de pirámide",
  "Cilindro, cono y troncos",
  "Esfera: áreas y volúmenes",
  "Geometría analítica: distancia entre dos puntos",
  "Ecuación de la recta y posiciones relativas",
  "Circunferencia, parábola y elipse"
]).map((title,index)=>({number:index+1,title}));
window.GEOMETRY_CHAPTERS=[
  {
    number:1,title:'Segmentos y ángulos',
    intro:'Reconoce los elementos de las figuras, opera con segmentos y relaciona ángulos entre paralelas.',
    progressId:'geometria-capitulo-01',legacySources:[],items:8,format:'reading',practiceCount:10,itemLabel:'problemas',assessmentFormat:'practice-10'
  },
  {
    "number": 17,
    "title": "Poliedros convexos y regulares",
    "intro": "Explora caras, aristas y vértices, despliega sólidos y descubre las figuras que aparecen al cortarlos con un plano.",
    "progressId": "geometria-capitulo-17",
    "legacySources": [],
    "items": 6,
    "format": "reading",
    "practiceCount": 10,
    "itemLabel": "problemas",
    "assessmentFormat": "practice-10"
  }
];
