'use strict';
window.ChapterPractice=(()=>{
 const sets=window.CHAPTER_PRACTICES;
 const has=id=>Boolean(sets[id]);
 const questions=id=>sets[id]?.problems||[];
 const valid=(q,a)=>Number.isInteger(a)&&a>=0&&a<q.options.length;
 const list=a=>Array.isArray(a)?a:[];
 const unique=(a,b)=>[...new Set([...list(a),...list(b)])];
 const count=n=>Math.max(0,Math.floor(Number(n)||0));
 const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
 function previous(q,data){
  const s=q.source||{};let answer,result,mastered=false,attempts=0;
  if(s.kind==='practice'){answer=data.practiceAnswers?.[s.id];result=data.practiceResults?.[s.id];mastered=list(data.practiceMastered).includes(s.id);}
  if(s.kind==='quiz'){answer=data.quizAnswers?.[s.lesson]?.[s.id];result=data.quizResults?.[s.lesson]?.[s.id];mastered=list(data.completedItems).includes(s.lesson);attempts=count(data.attempts?.['item_'+(s.lesson+1)]);}
  if(s.kind==='exam'){answer=data.examDraft?.[s.id];result=data.examResult?.answers?.[s.id];}
  if(s.kind==='reading'){answer=data.answers?.[s.id];result=data.results?.[s.id];mastered=list(data.completedItems).includes(s.index);attempts=count(data.attempts?.['item_'+(s.index+1)]);}
  return {answer,result,mastered:mastered||result===q.answer,attempts:Math.max(attempts,valid(q,result)?1:0)};
 }
 function normalize(id,data={}){
  const saved=data.practice10?.version===1?data.practice10:{};
  const p={version:1,answers:{},results:{},mastered:[],attempts:{}};
  for(const q of questions(id)){
   const old=previous(q,data),answer=valid(q,saved.answers?.[q.id])?saved.answers[q.id]:old.answer,result=valid(q,saved.results?.[q.id])?saved.results[q.id]:old.result;
   if(valid(q,answer))p.answers[q.id]=answer;
   if(valid(q,result))p.results[q.id]=result;
   if(list(saved.mastered).includes(q.id)||old.mastered||result===q.answer)p.mastered.push(q.id);
   p.attempts[q.id]=Math.max(count(saved.attempts?.[q.id]),old.attempts);
  }
  return p;
 }
 function maxMap(a={},b={}){return Object.fromEntries([...new Set([...Object.keys(a),...Object.keys(b)])].map(k=>[k,Math.max(count(a[k]),count(b[k]))]));}
 function merge(id,a={},b={}){
  const newer=Number(b.updatedMs||0)>Number(a.updatedMs||0)?b:a,older=newer===a?b:a;
  const x=normalize(id,older),y=normalize(id,newer);
  return {...older,...newer,completedItems:unique(a.completedItems,b.completedItems),visitedSlides:unique(a.visitedSlides,b.visitedSlides),practiceMastered:unique(a.practiceMastered,b.practiceMastered),attempts:maxMap(a.attempts,b.attempts),itemScores:maxMap(a.itemScores,b.itemScores),examBest:Math.max(count(a.examBest),count(b.examBest)),examAttempts:Math.max(count(a.examAttempts),count(b.examAttempts)),practice10:{version:1,answers:{...x.answers,...y.answers},results:{...x.results,...y.results},mastered:unique(x.mastered,y.mastered),attempts:maxMap(x.attempts,y.attempts)}};
 }
 function limit(id,p){let n=0;const qs=questions(id);while(n<qs.length&&p.mastered.includes(qs[n].id))n++;return Math.min(n,qs.length-1);}
 function canOpen(id,p,index,mode){return Number.isInteger(index)&&index>=0&&index<questions(id).length&&(mode==='free'||index<=limit(id,p));}
 function summary(id,data={}){const p=normalize(id,data),total=questions(id).length,completed=p.mastered.length;return {assessmentFormat:'practice-10',practiceTotal:total,practiceCompleted:completed,percent:total?Math.round(100*completed/total):0,chapterCompleted:total>0&&completed===total,unlockedItem:limit(id,p)};}
 function choose(id,p,problemId,value,mode){const i=questions(id).findIndex(q=>q.id===problemId),q=questions(id)[i];if(!q||!canOpen(id,p,i,mode)||!valid(q,value))return false;p.answers[q.id]=value;return true;}
 function check(id,p,problemId,mode){
  const i=questions(id).findIndex(q=>q.id===problemId),q=questions(id)[i];
  if(!q||!canOpen(id,p,i,mode))return 'locked';
  const answer=p.answers[q.id];if(!valid(q,answer))return 'missing';
  if(p.results[q.id]===answer)return 'unchanged';
  p.results[q.id]=answer;p.attempts[q.id]=count(p.attempts[q.id])+1;
  if(answer===q.answer&&!p.mastered.includes(q.id))p.mastered.push(q.id);
  return 'graded';
 }
 function renderFigure(v,id){
  if(!v)return '';
  const width=Number(v.width)||760,height=Number(v.height)||400;
  return `<figure class="math-figure" style="--figure-width:${width}px"><button type="button" class="math-figure-button" data-action="math-figure" data-id="${esc(id)}" aria-label="Ampliar figura: ${esc(v.caption)}"><img src="${esc(v.src)}" alt="${esc(v.alt)}" width="${width}" height="${height}" loading="lazy" decoding="async"><span>Ampliar figura ⊕</span></button><figcaption>${esc(v.caption)}</figcaption></figure>`;
 }
 function render(id,p,mode,notice=''){
  const qs=questions(id);
  return `<div class="unified-practice"><header class="practice-intro"><h2>Práctica del capítulo</h2><p>Resuelve los 10 problemas y comprueba cada respuesta para ver su explicación. Puedes volver a intentarlo; tus aciertos se conservan.</p><p class="practice-total"><strong>${p.mastered.length} de 10</strong> problemas resueltos correctamente.</p>${notice?`<p class="practice-notice" role="alert">${esc(notice)}</p>`:''}</header>${qs.map((q,i)=>{
   const done=p.mastered.includes(q.id),available=canOpen(id,p,i,mode),answered=valid(q,p.results[q.id]),right=p.results[q.id]===q.answer;
   const heading=`<header class="practice-heading"><span class="practice-number">${String(i+1).padStart(2,'0')}</span><div><h3>Problema ${i+1}</h3>${q.topic||q.level?`<p>${esc(q.topic||q.level)}</p>`:''}</div>${done?'<span class="practice-done">Resuelto</span>':''}</header>`;
   if(!available)return `<section class="practice-card is-locked" id="practice-${q.id}" aria-label="Problema ${i+1}, pendiente de habilitar">${heading}<p>Resuelve correctamente el problema anterior para continuar.</p></section>`;
   return `<section class="practice-card" id="practice-${q.id}">${heading}<fieldset><legend>${q.prompt}</legend>${renderFigure(q.figure,'practice:'+q.id)}${q.statements?`<ul class="practice-statements">${q.statements.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`:''}<div class="practice-options">${q.options.map((option,n)=>`<label><input type="radio" name="practice10-${q.id}" data-group="practice10" data-question="${q.id}" value="${n}" ${p.answers[q.id]===n?'checked':''}><span><b>${String.fromCharCode(65+n)}.</b> ${option}</span></label>`).join('')}</div></fieldset><button class="practice-check" data-action="check-practice10" data-id="${q.id}">Comprobar respuesta</button>${answered?`<div class="practice-feedback ${right?'is-correct':''}" id="practice-feedback-${q.id}" role="status" tabindex="-1"><strong>${right?'Respuesta correcta':'Revisa tu respuesta'} · Alternativa ${String.fromCharCode(65+q.answer)}</strong><div>${q.solution}</div></div>`:''}${done?'<p class="practice-retained">Tu acierto se conserva aunque vuelvas a responder.</p>':''}</section>`;
  }).join('')}</div>`;
 }
 return {has,questions,normalize,merge,summary,limit,canOpen,choose,check,render,renderFigure};
})();
