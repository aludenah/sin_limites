const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../fisica-capitulo-01-audio.js'),'utf8');
function harness(supported=true){
  const listeners={},events={},spoken=[],saved={};let cancelled=0;
  const voice={voiceURI:'es-pe-test',lang:'es-PE',name:'Español del Perú'};
  const synth={getVoices:()=>[voice],cancel:()=>cancelled++,speak:u=>spoken.push(u),addEventListener:(name,fn)=>events[name]=fn};
  function Utterance(text){this.text=text;}
  const w={addEventListener:(name,fn)=>events[name]=fn};if(supported){w.speechSynthesis=synth;w.SpeechSynthesisUtterance=Utterance;}
  const context={window:w,document:{querySelector:()=>null,addEventListener:(name,fn)=>listeners[name]=fn},localStorage:{getItem:()=>null,setItem:(key,value)=>saved[key]=value}};
  vm.runInNewContext(source,context);
  const click=action=>listeners.click({target:{closest:()=>({dataset:{audio:action},disabled:false})}});
  const setting=(name,value)=>listeners.change({target:{dataset:{audioSetting:name},value}});
  return {audio:w.TheoryAudio,click,setting,spoken,events,cancelled:()=>cancelled,saved,voice};
}
const h=harness();h.audio.setLesson(0);
assert.equal(h.spoken.length,0,'Never autoplay');
h.click('play');
assert.equal(h.spoken.length,1);
assert.match(h.spoken[0].text,/Magnitudes y unidades/);
assert.equal(h.spoken[0].lang,'es-PE');assert.equal(h.spoken[0].voice,h.voice);
h.click('play');assert.equal(h.spoken.length,1,'Repeated play cannot overlap');
const first=h.spoken[0];h.click('pause');first.onend();
assert.equal(h.spoken.length,1,'A cancelled utterance cannot advance playback');
assert.match(h.audio.panel(),/▶ Reanudar/);
h.click('play');assert.equal(h.spoken[1].text,first.text,'Resume repeats the current phrase');
h.spoken[1].onend();assert.equal(h.spoken.length,3);
const pending=h.spoken[2];h.audio.setLesson(1);pending.onend();
assert.equal(h.spoken.length,3,'Changing lessons cancels the old chain');
h.click('play');assert.match(h.spoken.at(-1).text,/Fórmulas dimensionales/);
const current=h.spoken.at(-1);h.setting('rate','0.8');
assert.equal(h.spoken.at(-1).rate,0.8);assert.equal(h.spoken.at(-1).text,current.text);
current.onerror();assert.match(h.audio.panel(),/Escuchando…/,'Stale errors must not interrupt a newer voice');
h.click('stop');const count=h.spoken.length;h.spoken.at(-1).onend();assert.equal(h.spoken.length,count);
h.audio.setLesson(5);h.click('play');h.spoken.at(-1).onerror();assert.match(h.audio.panel(),/No se pudo iniciar la voz/);
h.click('play');assert.match(h.spoken.at(-1).text,/Cálculo de exponentes/);
h.events.pagehide();const before=h.spoken.length;h.spoken.at(-1).onend();assert.equal(h.spoken.length,before);
h.audio.setLesson(null);h.click('play');assert.equal(h.spoken.length,before,'No reading outside theory');
for(let topic=0;topic<6;topic++){
  h.audio.setLesson(topic);h.click('play');let n=0;
  while(!h.audio.panel().includes('Lectura finalizada.')){
    const u=h.spoken.at(-1);assert.ok(u.text.length<=240);assert.ok(!/[\\{}\[\]]/.test(u.text));u.onend();assert.ok(++n<200);
  }
}
const unsupported=harness(false);unsupported.audio.setLesson(0);unsupported.click('play');
assert.equal(unsupported.spoken.length,0);assert.match(unsupported.audio.panel(),/no está disponible/);
console.log('PASS: no autoplay, Spanish voices, pause/resume, speed, stale callbacks, lesson changes, all six narrations, page exit and unsupported browsers.');
