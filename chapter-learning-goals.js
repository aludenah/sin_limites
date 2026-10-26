/* Introducción común: objetivos y recorrido de lectura, sin modificar el avance. */
(function(global){
 'use strict';
 const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 const text=value=>typeof value==='string'?value.trim():'';
 const normalize=content=>content&&typeof content==='object'&&!Array.isArray(content)?content:{};
 function renderRoute(content={}){
  content=normalize(content);
  const stages=(Array.isArray(content.timeline)?content.timeline:[]).map(stage=>Array.isArray(stage)?{title:text(stage[0]),text:text(stage[1])}:{title:text(stage?.title),text:text(stage?.text)}).filter(stage=>stage.title&&stage.text);
  if(!stages.length)return '';
  const routeTitle=text(content.sequenceTitle)||'El recorrido que vamos a seguir',note=text(content.sequenceNote);
  return `<details class="chapter-learning-route"><summary>${escape(routeTitle)}</summary><ol>${stages.map(stage=>`<li><strong>${escape(stage.title)}</strong><p>${escape(stage.text)}</p></li>`).join('')}</ol>${note?`<p class="chapter-learning-note">${escape(note)}</p>`:''}</details>`;
 }
 function render(content={}){
  content=normalize(content);
  const goals=(Array.isArray(content.goals)?content.goals:[]).map(goal=>({title:text(goal?.title),text:text(goal?.text)})).filter(goal=>goal.title&&goal.text);
  if(!goals.length)return '';
  return `<section class="chapter-learning-goals" id="learning-goals" aria-labelledby="learning-goals-title"><p class="eyebrow">Antes de empezar</p><h2 id="learning-goals-title">¿Qué aprenderás?</h2><ul>${goals.map(goal=>`<li><strong>${escape(goal.title)}${/[.!?…]$/.test(goal.title)?'':'.'}</strong> ${escape(goal.text)}</li>`).join('')}</ul>${renderRoute(content)}</section>`;
 }
 global.ChapterLearningGoals=Object.freeze({render,renderRoute});
})(window);
