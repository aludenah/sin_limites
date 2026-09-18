const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..'),id='fisica-capitulo-15';
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const catalogs=['history-catalog.js','peru-catalog.js','lenguaje-catalog.js','economia-catalog.js','educacion-civica-catalog.js','razonamiento-verbal-catalog.js','razonamiento-matematico-catalog.js','fisica-catalog.js'];
const appFiles=['courses.js',...catalogs,'history-progress.js','app.js'];
const interactionFiles=[id+'-electrones-modelo.js',id+'-electrones.js',id+'-interactivo.js'];
const chapterFiles=['fisica-catalog.js','history-progress.js',id+'-data.js',...interactionFiles,'history-chapter.js'];
const ctx={window:{}};for(const f of ['courses.js','practice-bank.js',...catalogs,id+'-data.js',...interactionFiles])vm.runInNewContext(read(f),ctx);
const content=ctx.window.HISTORY_CONTENT,questions=ctx.window.CHAPTER_PRACTICES[id].problems;
const figures=JSON.parse(read('assets/fisica-capitulo-15-figuras.json')).figures;
const sourceFigures=JSON.parse(read('assets/fisica-capitulo-15-originales.json')).figures;
const lineFigures=JSON.parse(read('assets/fisica-capitulo-15-lineales.json')).figures;
const figure=name=>figures.find(f=>f.src.endsWith('/'+name+'.svg'));
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8*Math.max(1,Math.abs(b)),`${a} != ${b}`);
const chosen=n=>questions[n-1].options[questions[n-1].answer];
const value=(n,expected)=>assert.equal(chosen(n),expected,`Independently checked answer ${n}`);
const math=s=>'\\('+s+'\\)';
const texts=src=>[...read(src).matchAll(/<text\b[^>]*>(.*?)<\/text>/g)].map(x=>x[1]);

// Modified nodal analysis, independent of the step-by-step solution text.
// Short-circuit wires merge nodes; source-current unknowns include absorbing sources.
function solve(model){
 const all=new Set([model.ground,...model.resistors.flatMap(r=>[r.a,r.b]),...model.sources.flatMap(e=>[e.positive,e.negative])]);
 const parent=Object.fromEntries([...all].map(x=>[x,x]));
 const rep=x=>parent[x]===x?x:(parent[x]=rep(parent[x]));
 for(const [a,b] of model.wires||[])parent[rep(a)]=rep(b);
 const ground=rep(model.ground),nodes=[...new Set([...all].map(rep))].filter(x=>x!==ground),n=nodes.length,N=n+model.sources.length;
 const ix=x=>nodes.indexOf(rep(x)),a=Array.from({length:N},()=>Array(N+1).fill(0));
 const stamp=(r,c,v)=>{if(r>=0&&c>=0)a[r][c]+=v;};
 for(const r of model.resistors){const i=ix(r.a),j=ix(r.b),g=1/r.ohms;stamp(i,i,g);stamp(j,j,g);stamp(i,j,-g);stamp(j,i,-g);}
 model.sources.forEach((e,k)=>{const i=ix(e.positive),j=ix(e.negative),z=n+k;stamp(i,z,1);stamp(j,z,-1);stamp(z,i,1);stamp(z,j,-1);a[z][N]=e.volts;});
 for(let c=0;c<N;c++){
  let p=c;for(let r=c+1;r<N;r++)if(Math.abs(a[r][c])>Math.abs(a[p][c]))p=r;
  assert.ok(Math.abs(a[p][c])>1e-12,'Circuit must have a unique DC solution');[a[p],a[c]]=[a[c],a[p]];
  const divisor=a[c][c];for(let j=c;j<=N;j++)a[c][j]/=divisor;
  for(let r=0;r<N;r++)if(r!==c){const m=a[r][c];for(let j=c;j<=N;j++)a[r][j]-=m*a[c][j];}
 }
 const x=a.map(r=>r[N]),V=Object.fromEntries([...all].map(node=>[node,ix(node)<0?0:x[ix(node)]]));
 const currents=Object.fromEntries(model.resistors.map(r=>[r.id,(V[r.a]-V[r.b])/r.ohms]));
 model.sources.forEach((e,k)=>{currents[e.id]=x[n+k];near(V[e.positive]-V[e.negative],e.volts);});
 const kcl=Object.fromEntries([...new Set([...all].map(rep))].map(node=>[node,0]));
 for(const r of model.resistors){kcl[rep(r.a)]+=currents[r.id];kcl[rep(r.b)]-=currents[r.id];}
 for(const e of model.sources){kcl[rep(e.positive)]+=currents[e.id];kcl[rep(e.negative)]-=currents[e.id];}
 for(const balance of Object.values(kcl))near(balance,0);
 const resistorPower=model.resistors.reduce((s,r)=>s+currents[r.id]**2*r.ohms,0);
 const sourcePower=model.sources.reduce((s,e)=>s+e.volts*currents[e.id],0);near(resistorPower+sourcePower,0);
 return {V,currents,resistorPower};
}

function physics(){
 near(.8*2*60/1.6e-19,6e20);value(1,math('6{,}0\\times10^{20}'));
 const graph=figure('p02-corriente-tiempo').model.points;
 const charge=graph.slice(1).reduce((s,p,i)=>s+(p[0]-graph[i][0])*(p[1]+graph[i][1])/2,0);near(charge,20);value(2,math('20\\,\\mathrm C'));
 const points=figure('p03-voltaje-corriente').model.points,R=(points[2][1]-points[1][1])/(points[2][0]-points[1][0]);near(R,6);near(15/R,2.5);value(3,math('2{,}5\\,\\mathrm A'));
 const rho=2e-8,volume=5*.50e-6,finalArea=volume/10;near(rho*10/finalArea,.8);value(4,math('0{,}80\\,\\Omega'));
 const results={};
 for(const f of figures.filter(f=>f.model?.resistors)){
  results[path.basename(f.src,'.svg')]=solve(f.model);
  const labels=texts(f.src);for(const r of f.model.resistors)assert.ok(labels.includes(`${r.ohms} Ω`));
  for(const e of f.model.sources)assert.ok(labels.includes(`${e.volts} V`));
  assert.equal(labels.filter(x=>x==='+').length,f.model.sources.length,'Every source displays polarity');
 }
 let s=results['p05-circuito-mixto'];near(s.currents.R2,2);near(s.currents.Rs,3);near(s.V.A,6);value(5,math('2\\,\\mathrm A'));
 s=results['p06-instrumentos-y-puente'];near(s.currents.R9,0);near(-s.currents.E,2);near(s.V.Y-s.V.B,12);value(6,math('2\\,\\mathrm A')+' y '+math('12\\,\\mathrm V'));
 for(const name of ['p07-lampara','guia-lampara']){
  const m=figure(name).model,I=m.ratedWatts/m.ratedVolts,V=m.supply-m.ratedVolts,expected=name.startsWith('p07')?[24,6]:[60,.6];
  near(V/I,expected[0]);near(V*I,expected[1]);near(m.supply*I,m.ratedWatts+V*I);
 }
 value(7,math('24\\,\\Omega')+' y '+math('6\\,\\mathrm W'));
 near((1200/1000*45/60+60/1000*5)*20*.6,14.4);value(8,'S/ 14,40');
 s=results['p09-fuentes-opuestas'];near(s.currents.R1,1.5);near(s.currents.E2*6,9);near(s.resistorPower,18);value(9,math('1{,}5\\,\\mathrm A')+', horario');
 s=results['p10-tres-ramas'];near(s.V.A,8);near(s.currents.R2,2/3);near(s.currents.E1,-2);near(s.currents.E2*6,4);near(s.resistorPower,20);value(10,math('\\dfrac{2}{3}\\,\\mathrm A')+', de A hacia B');
 near(results['guia-asociacion-mixta'].currents.R2,2);near(results['guia-asociacion-mixta'].currents.Rs,3);
 near(results['guia-fuentes-opuestas'].currents.R1,2);near(results['guia-fuentes-opuestas'].currents.R2*3,6);
 near(results['guia-nodos'].V.A,9.6);near(results['guia-nodos'].currents.R2,.8);near(1.6e-8*10/(2e-6),.08);
 console.log('PASS: ten answers, seven circuit models, all-node current balance, source polarity, shorted resistor, absorbed/delivered power, graph areas and units.');
}

function structure(){
 const course=ctx.window.COURSES.find(c=>c.id===16);assert.equal(course.topics.length,18);assert.match(course.topics[14],/Electrodinámica/);
 assert.deepEqual(Array.from(ctx.window.PHYSICS_CHAPTERS,c=>c.number),[15]);assert.equal(ctx.window.PHYSICS_CHAPTERS[0].topicIndex,14);
 assert.equal(content.number,15);assert.equal(content.courseId,16);assert.equal(content.math,true);assert.equal(content.lessons.length,5);
 assert.equal(content.lessons.reduce((n,l)=>n+l.examples.length,0),10);assert.match(content.sourceNote,/capítulo XV: Electrodinámica, pp\. 217–228/);
 assert.deepEqual(Array.from(content.lessons.flatMap(l=>l.examples),e=>e.number),[1,2,3,4,5,6,7,8,9,10]);
 assert.equal(questions.length,10);for(const q of questions){assert.equal(q.options.length,5);assert.equal(new Set(q.options).size,5);assert.ok((q.solution.match(/<li>/g)||[]).length>=4);}
 const used=questions.map(q=>q.figure).filter(Boolean);
 assert.equal(used.length,8);assert.equal(new Set(used.map(f=>f.src)).size,8);
 for(const f of used){assert.ok(f.alt&&f.caption);assert.equal(f.credit,'Diagrama físico · SIN LÍMITES');assert.ok(figures.some(x=>x.src===f.src));assert.match(read(f.src),/<desc/);assert.doesNotMatch(read(f.src),/<script|<foreignObject/);}
 const redrawn=content.lessons.flatMap(l=>[...l.blocks.flatMap(b=>b.figures||[]),...l.examples.flatMap(e=>[e.figure,...e.solutionFigures||[]].filter(Boolean))]);
 assert.equal(redrawn.length,37);assert.equal(new Set(redrawn.map(f=>f.src)).size,37);
 const digest=src=>require('node:crypto').createHash('sha256').update(fs.readFileSync(path.join(root,src))).digest('hex');
 for(const f of redrawn){
  const vector=lineFigures.find(x=>x.src===f.src);assert.ok(vector);
  const source=sourceFigures.find(x=>x.id===vector.id);assert.ok(source);
  assert.ok(f.alt&&f.caption&&f.credit.includes('Lumbreras'));assert.equal(f.redrawn,true);
  assert.equal(vector.sourceSrc,source.src);assert.equal(vector.sourceSha256,source.sha256);
  assert.equal(digest(source.src),source.sha256,'Original remains available for source comparison');
  assert.equal(digest(f.src),vector.sha256,'Published vector matches its manifest');
  assert.equal(f.width,vector.width);assert.equal(f.height,vector.height);
  const svg=read(f.src);assert.match(svg,/<desc/);assert.match(svg,/<rect id="background"[^>]*fill="#ffffff"/);
  assert.doesNotMatch(svg,/<script|<foreignObject|<image\b|data:image/);
 }
 const commands=new Set(['mathrm','Delta','times','cdot','cdots','rho','Omega','prime','sum','varepsilon','dfrac','text','left','right','qquad']);let count=0;
 function formulas(v){
  if(Array.isArray(v))return v.forEach(formulas);if(v&&typeof v==='object')return Object.values(v).forEach(formulas);if(typeof v!=='string')return;
  assert.equal((v.match(/\\\(/g)||[]).length,(v.match(/\\\)/g)||[]).length,'Formula delimiters close');
  assert.equal((v.match(/\\\[/g)||[]).length,(v.match(/\\\]/g)||[]).length,'Display formula delimiters close');
  for(const match of v.matchAll(/\\[\[(]([\s\S]*?)\\[\])]/g)){
   count++;let depth=0;for(const ch of match[1]){if(ch==='{')depth++;if(ch==='}')depth--;assert.ok(depth>=0);}assert.equal(depth,0,'Formula braces balance');
   for(const c of match[1].matchAll(/\\([a-zA-Z]+)/g))assert.ok(commands.has(c[1]),`Review formula command ${c[1]}`);
  }
 }
 formulas(content);formulas(questions);assert.ok(count>100);
 const html=read(id+'.html');for(const file of [...chapterFiles,'practice-bank.js','chapter-practice.js'])assert.ok(html.includes(file));assert.match(html,/katex@0.16.22/);
 assert.deepEqual(fs.readdirSync(root).filter(f=>/^fisica-capitulo-\d+\.html$/.test(f)).sort(),['fisica-capitulo-01.html','fisica-capitulo-02.html',id+'.html']);
 const admin=read('admin.js');vm.runInNewContext(admin.slice(admin.indexOf('const TRACKED_CHAPTERS='),admin.indexOf('let selectedChapter='))+';window.tracked=TRACKED_CHAPTERS;',ctx);
 assert.equal(Object.keys(ctx.window.tracked).length,45);assert.equal(ctx.window.tracked[id].items,10);assert.match(ctx.window.tracked[id].label,/Capítulo 15/);
}

function circuitInteraction(){
 const widget=ctx.window.ChapterInteractions;
 const block=content.lessons[0].blocks.find(b=>b.id==='fis15-movimiento');
 assert.equal(block.interactive,'simple-circuit');assert.equal(block.figures.length,2,'Both reference images remain');
 assert.equal(widget.render('unknown'),'');
 const initial=widget.render(block.interactive);
 assert.match(initial,/data-state="open"/);assert.match(initial,/Circuito abierto · foco apagado/);
 const photos=[...initial.matchAll(/<image\b[^>]*\bhref="(assets\/fisica-capitulo-15\/realistas\/[^"\s]+)"[^>]*>/g)];
 const photoNames=['bateria','foco-apagado','foco-encendido','interruptor-abierto','interruptor-cerrado'];
 assert.deepEqual(photos.map(match=>match[1]).sort(),photoNames.map(name=>`assets/fisica-capitulo-15/realistas/${name}.webp`).sort(),'All five local photo assets render exactly once');
 for(const match of photos)assert.ok(fs.existsSync(path.join(__dirname,'..',match[1])),`Photo asset exists: ${match[1]}`);
 for(const name of ['foco-apagado','interruptor-abierto'])assert.match(photos.find(match=>match[1].endsWith(`/${name}.webp`))[0],/class="[^"]*\bcircuit-photo-off\b/,'Both open-state photos are available immediately');
 for(const name of ['foco-encendido','interruptor-cerrado'])assert.match(photos.find(match=>match[1].endsWith(`/${name}.webp`))[0],/class="[^"]*\bcircuit-photo-on\b/,'Both closed-state photos are available before the first click');
 assert.equal((initial.match(/role="switch" aria-checked="false"/g)||[]).length,2,'Both controls start open and are native buttons');
 const fields=Object.fromEntries(['[data-circuit-status]','[data-circuit-explanation]','[data-circuit-desc]'].map(s=>[s,{textContent:''}]));
 const root={dataset:{},querySelector:s=>fields[s],querySelectorAll:()=>switches};
 const control=action=>({dataset:{action},disabled:false,attributes:{},label:{},closest:()=>root,setAttribute(k,v){this.attributes[k]=v;},querySelector(){return this.label;}});
 const switches=[control('toggle-simple-circuit'),control('toggle-simple-circuit')],motion=control('circuit-motion');
 fields['[data-action="circuit-motion"]']=motion;
 assert.equal(widget.handleClick(control('math-figure')),false,'Other chapter actions pass through');
 assert.equal(widget.handleClick(switches[0]),true);assert.equal(root.dataset.state,'closed');
 assert.match(fields['[data-circuit-status]'].textContent,/foco encendido/);assert.equal(motion.disabled,false);
 for(const button of switches){assert.equal(button.attributes['aria-checked'],'true');assert.equal(button.label.textContent,'Abrir interruptor');}
 widget.handleClick(motion);assert.equal(root.dataset.motion,'paused');assert.equal(root.dataset.state,'closed','Pausing the animation does not open the circuit');
 assert.match(widget.render('simple-circuit'),/data-state="closed" data-motion="paused"/,'A chapter re-render preserves circuit state');
 widget.handleClick(switches[1]);assert.equal(root.dataset.state,'open');assert.equal(motion.disabled,true);
 assert.match(fields['[data-circuit-desc]'].textContent,/foco apagado/);
 assert.equal(widget.handleClick(motion),false,'Movement cannot start in an open circuit');
 widget.handleClick(switches[0]);widget.handleClick(motion);assert.equal(root.dataset.motion,'running');
 widget.handleClick(switches[1]);
 for(const button of switches)assert.equal(button.attributes['aria-checked'],'false');
 console.log('PASS: circuit opens/closes from both controls, bulb and accessible status agree, movement pauses independently, and state survives chapter re-rendering.');
}

async function integration(){
 const home=harness(appFiles);await home.signIn({uid:'student'});home.run("selectStudyMode('free');openCourse(16)");
 assert.match(home.elements.get('app').innerHTML,/capítulo 15, Electrodinámica/);
 const redirectCount=home.redirects.length;home.run('setTopic(1)');assert.equal(home.redirects.length,redirectCount,'PDF chapter II is distinct from the vectors review');
 for(const [topic,number] of [[14,'15']]){home.run(`setTopic(${topic})`);assert.equal(home.redirects.at(-1),`fisica-capitulo-${number}.html?v=20260918-catalog9`);}
 const direct=harness(chapterFiles);await direct.signIn({uid:'new'});assert.equal(direct.redirects.at(-1),`index.html?chapter=${id}&v=20260918-social1`);
 const entry=harness(appFiles,{search:'?chapter='+id});await entry.signIn({uid:'new'});entry.run("selectStudyMode('progressive')");assert.equal(entry.redirects.at(-1),id+'.html?v=20260918-catalog9');
 const study=harness(chapterFiles,{local:home.local,cloud:home.cloud});study.run('window.mathCalls=[];window.renderMathInElement=(el,options)=>window.mathCalls.push({html:el.innerHTML,options})');await study.signIn({uid:'student'});
 const html=study.elements.get('chapter-app').innerHTML;assert.match(html,/Física · Capítulo 15/);assert.equal((html.match(/class="guided-case"/g)||[]).length,10);assert.equal((html.match(/class="practice-card"/g)||[]).length,10);
 const section=study.run("theoryBlock(LESSONS[0].blocks.find(b=>b.id==='fis15-movimiento'))");
 assert.match(section,/data-circuit-demo/);assert.equal((html.match(/data-circuit-demo/g)||[]).length,1);
 assert.ok(section.indexOf('data-circuit-demo')>section.indexOf('corriente-interruptor-cerrado.svg'),'The simulation follows the two existing illustrations');
 assert.equal((html.match(/data-electron-demo/g)||[]).length,1);
 assert.ok(html.indexOf('data-electron-demo')<html.indexOf('<h3>1.1.'),'Electron animation appears before subsection 1.1');
 assert.ok(study.run('window.mathCalls.length')>0);assert.equal(study.run('window.mathCalls[0].options.delimiters[1].left'),'\\(');
 for(const q of questions.filter(q=>q.figure)){assert.ok(html.includes(q.figure.src));study.run(`document.getElementById('image-dialog').showModal=()=>{};openMathFigure('practice:${q.id}')`);assert.ok(study.elements.get('image-dialog').innerHTML.includes(q.figure.src));assert.doesNotMatch(study.elements.get('image-dialog').innerHTML,/creada con IA/);}
 const sourceButtons=[...html.matchAll(/data-id="((?:theory|example|solution):[^"]+)"/g)].map(m=>m[1]);assert.equal(sourceButtons.length,37);
 for(const key of sourceButtons){study.run(`openMathFigure('${key}')`);assert.match(study.elements.get('image-dialog').innerHTML,/lineales\//);assert.match(study.elements.get('image-dialog').innerHTML,/Redibujo lineal/);assert.match(study.elements.get('image-dialog').innerHTML,/Lumbreras/);}
 study.run("goLesson(4);window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'p01',window.ChapterPractice.questions(CHAPTER_ID)[0].answer,P.studyMode);checkPractice('p01')");await study.run('persist()');assert.match(study.run('window.mathCalls.at(-1).html'),/Respuesta correcta/);
 const nav=home.cloud.get('users/student/progress/navigation');assert.equal(nav.lastCourseId,16);assert.equal(nav.lastChapterNumber,15);assert.equal(nav.lastTopicIndex,14);
 const restored=harness(chapterFiles,{local:home.local,cloud:home.cloud});await restored.signIn({uid:'student'});assert.equal(restored.run('P.readingItem'),4);assert.equal(restored.run('progressPercent()'),10);
 const catalog=harness(appFiles,{local:home.local,cloud:home.cloud,search:'?course=16'});await catalog.signIn({uid:'student'});assert.equal(catalog.run('state.activeTopicIndex'),14);assert.equal(catalog.run('activePhysicsNumber()'),15);assert.equal(catalog.run('physicsChapterProgress(15).percent'),10);assert.equal(catalog.run('physicsChapterProgress(1).percent'),0);assert.equal(catalog.run('physicsChapterProgress(2).percent'),0);
 assert.match(catalog.run('renderProgressPanel()'),/Electrodinámica/);catalog.run('openProgressChapter()');assert.equal(catalog.redirects.at(-1),id+'.html?v=20260918-catalog9');
 const offline=harness(chapterFiles,{local:home.local});offline.setOffline(true);await offline.signIn({uid:'student'});assert.equal(offline.run('progressPercent()'),10);
 await catalog.signIn({uid:'other'});assert.equal(catalog.run('physicsChapterProgress(15).percent'),0);assert.doesNotMatch(study.run('chapterLinks()'),/capitulo-14|capitulo-16/);
 console.log('PASS: PDF chapter 15 maps to the existing electrodynamics topic; direct entry, diagrams, math integration, grading, resume, offline progress, account isolation and teacher reporting.');
}
physics();structure();circuitInteraction();integration().catch(e=>{console.error(e);process.exitCode=1});
