'use strict';

window.LANGUAGE_SYLLABUS=[
  {number:1,title:'La comunicación',page:9},
  {number:2,title:'El lenguaje',page:16},
  {number:3,title:'Planos del lenguaje',page:21},
  {number:4,title:'La realidad lingüística del Perú',page:27},
  {number:5,title:'Historia de la lengua española',page:32},
  {number:6,title:'Fonología y Fonética',page:37},
  {number:7,title:'Uso de grafías',page:47},
  {number:8,title:'La sílaba',page:52},
  {number:9,title:'Uso de las letras mayúsculas y minúsculas',page:58},
  {number:10,title:'Acentuación escrita',page:68},
  {number:11,title:'La morfología',page:77},
  {number:12,title:'La semántica',page:87},
  {number:13,title:'Relaciones semánticas',page:94},
  {number:14,title:'Frase nominal',page:102},
  {number:15,title:'El sustantivo',page:108},
  {number:16,title:'Accidentes del sustantivo',page:113},
  {number:17,title:'El adjetivo',page:118},
  {number:18,title:'Determinantes',page:124},
  {number:19,title:'Pronombre',page:130},
  {number:20,title:'El verbo',page:136},
  {number:21,title:'Clasificación morfológica del verbo',page:145},
  {number:22,title:'Clasificación semántico-sintáctica del verbo',page:153},
  {number:23,title:'El adverbio',page:157},
  {number:24,title:'La preposición',page:163},
  {number:25,title:'La conjunción',page:168},
  {number:26,title:'Sintaxis',page:174},
  {number:27,title:'El sujeto',page:181},
  {number:28,title:'El predicado',page:186},
  {number:29,title:'Concordancia',page:195},
  {number:30,title:'Oración compuesta coordinada',page:202},
  {number:31,title:'Oración compuesta subordinada I',page:207},
  {number:32,title:'Oración compuesta subordinada II',page:212},
  {number:33,title:'Signos de puntuación',page:218},
  {number:34,title:'El texto',page:227}
];

const LANGUAGE_INTROS=[
  'Comprende la comunicación como una construcción situada de significado e identifica sus elementos, modalidades, interferencias y formas de retroalimentación.',
  'Explora el lenguaje como capacidad humana, reconoce las propiedades de las lenguas naturales y analiza las funciones que pueden concurrir en un mensaje.',
  'Distingue el sistema compartido de sus usos concretos y explica cómo las lenguas varían según el lugar, el grupo, la situación, la persona y el tiempo.',
  'Conoce la diversidad lingüística del Perú, diferencia lenguas y familias, y valora los derechos, la transmisión y la revitalización de sus 48 lenguas indígenas u originarias.',
  'Reconstruye la historia del español desde el latín hablado hasta una lengua pluricéntrica, atendiendo a los contactos, cambios y procesos sociales que la transformaron.',
  'Relaciona los sonidos concretos del habla con el sistema de contrastes de una lengua y comprende por qué fonemas, alófonos, grafemas y dígrafos no se corresponden uno a uno.'
];

window.LANGUAGE_CHAPTERS=window.LANGUAGE_SYLLABUS.slice(0,6).map((chapter,index)=>({
  number:chapter.number,
  title:chapter.title,
  intro:LANGUAGE_INTROS[index],
  progressId:'lenguaje-capitulo-'+String(chapter.number).padStart(2,'0'),
  legacySources:[],
  items:5,
  format:'reading',
  practiceCount:10,
  itemLabel:'problemas',
  assessmentFormat:'practice-10'
}));
