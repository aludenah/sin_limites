'use strict';
window.CHEMISTRY_SYLLABUS=(window.COURSES?.find(c=>c.id===17)?.topics||[
  "Química, método científico y Sistema Internacional",
  "Materia: mezclas, sustancias y estados de agregación",
  "Propiedades y fenómenos de la materia",
  "Estructura atómica e isótopos",
  "Modelos atómicos",
  "Números cuánticos y configuración electrónica",
  "Tabla periódica y propiedades periódicas",
  "Enlace químico y fuerzas intermoleculares",
  "Nomenclatura y funciones inorgánicas",
  "Reacciones químicas y ecuaciones",
  "Reacciones redox y métodos de balanceo",
  "Mol, masa molar y leyes ponderales",
  "Cálculos estequiométricos",
  "Reactivo limitante, pureza y rendimiento",
  "Estado gaseoso y leyes de los gases",
  "Estados líquido y sólido",
  "Soluciones, concentración y diluciones",
  "Ácidos, bases, neutralización y pH",
  "Cinética química",
  "Equilibrio químico y Le Chatelier",
  "Electroquímica: pilas y electrólisis",
  "Química orgánica: carbono e hidrocarburos",
  "Compuestos oxigenados y nitrogenados",
  "Recursos naturales, ambiente y potabilización del agua"
]).map((title,index)=>({number:index+1,title}));
window.CHEMISTRY_CHAPTERS=[{number:18,title:'Ácidos, bases, neutralización y pH',intro:'Experimenta gota a gota, interpreta la curva de pH y observa las partículas de una neutralización.',progressId:'quimica-capitulo-18',legacySources:[],items:6,format:'reading',practiceCount:10,itemLabel:'problemas',assessmentFormat:'practice-10'}];
