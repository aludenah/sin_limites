'use strict';
window.BIOLOGY_SYLLABUS = (window.COURSES?.find(c=>c.id===18)?.topics || [
  'Biología, método científico y seres vivos','Niveles de organización, virus y biomoléculas',
  'Teoría celular y célula procariota','Célula eucariota, organelas y núcleo','Tejidos vegetales',
  'Tejidos animales','Nutrición autótrofa y heterótrofa','Fotosíntesis y respiración celular',
  'Intercambio gaseoso y sistema respiratorio','Sistema digestivo','Circulación y transporte',
  'Sistema linfático','Excreción y sistema urinario','Sistema inmunológico e inmunidad',
  'Coordinación química y sistema endocrino','Sistema nervioso y órganos de los sentidos',
  'Reproducción, mitosis y meiosis','Reproducción vegetal, animal y humana',
  'Genética mendeliana y alelos múltiples','Genética del sexo, mutaciones y bioética',
  'Origen de la vida, evolución y evolución humana','Reino Animal',
  'Reino Plantae, salud e higiene','Ecología, recursos naturales y desarrollo sostenible'
]).map((title,index)=>({number:index+1,title}));
window.BIOLOGY_CHAPTERS = [{number:11,title:'Circulación y transporte',intro:'Explora el corazón en 3D y sigue el recorrido de la sangre.',progressId:'biologia-capitulo-11',legacySources:[],items:6,format:'reading',practiceCount:10,itemLabel:'problemas',assessmentFormat:'practice-10'}];
