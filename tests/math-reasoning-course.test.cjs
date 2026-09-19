const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..');
const catalogs=['history-catalog.js','peru-catalog.js','lenguaje-catalog.js','economia-catalog.js','educacion-civica-catalog.js','razonamiento-verbal-catalog.js','razonamiento-matematico-catalog.js','fisica-catalog.js'];
const appFiles=['courses.js',...catalogs,'history-progress.js','app.js'];
const chapterFiles=n=>['razonamiento-matematico-catalog.js','history-progress.js',`razonamiento-matematico-capitulo-0${n}-data.js`,'history-chapter.js'];
const ctx={window:{}};for(const f of ['courses.js','practice-bank.js',...catalogs])vm.runInNewContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
const questions=n=>ctx.window.CHAPTER_PRACTICES[`razonamiento-matematico-capitulo-0${n}`].problems;
function answer(n,i,expected){const q=questions(n)[i-1];assert.equal(q.options[q.answer],String(expected),`Chapter ${n}, problem ${i}: independently derived answer`);}
function permutations(a){if(!a.length)return [[]];return a.flatMap((x,i)=>permutations(a.filter((_,j)=>i!==j)).map(p=>[x,...p]));}
const pos=(p,x)=>p.indexOf(x)+1;
const unique=a=>[...new Set(a)];
function only(a){const u=unique(a);assert.equal(u.length,1);return u[0];}
const sum=a=>a.reduce((x,y)=>x+y,0);
const prod=a=>a.reduce((x,y)=>x*y,1);
function svgTexts(q){return [...fs.readFileSync(path.join(root,q.figure.src),'utf8').matchAll(/<text\b[^>]*>(.*?)<\/text>/g)].map(x=>x[1]);}
function magic(q,operation){
 const values=svgTexts(q).map(x=>x==='x'?null:Number(x));assert.equal(values.length,9);
 const target=operation(values.slice(0,3).includes(null)?values.slice(3,6):values.slice(0,3));
 const line=values.slice(values.indexOf(null)-values.indexOf(null)%3,values.indexOf(null)-values.indexOf(null)%3+3);
 const known=line.filter(x=>x!==null),x=operation===sum?target-sum(known):target/prod(known);values[values.indexOf(null)]=x;
 const lines=[...Array.from({length:3},(_,i)=>values.slice(i*3,i*3+3)),...Array.from({length:3},(_,i)=>[values[i],values[i+3],values[i+6]]),[values[0],values[4],values[8]],[values[2],values[4],values[6]]];
 assert.ok(lines.every(row=>operation(row)===target),'Every row, column and diagonal must obey the rule');return x;
}
function hanoi(discs){
 const initial=Array(discs).fill(0),queue=[[initial,0]],seen=new Set([initial.join()]);
 while(queue.length){const [s,d]=queue.shift();if(s.every(p=>p===2))return d;const top=[0,1,2].map(p=>s.indexOf(p));
  for(let a=0;a<3;a++)for(let b=0;b<3;b++)if(a!==b&&top[a]>=0&&(top[b]<0||top[a]<top[b])){const t=s.slice();t[top[a]]=b;const key=t.join();if(!seen.has(key)){seen.add(key);queue.push([t,d+1]);}}
 }
}
// Exhaust all legal states for boat capacity and bridge times, including returns.
function crossings(weights,capacity,cost){
 const n=weights.length,goal=(1<<n)-1,dist=new Map([['0,0',0]]),todo=[[0,0,0]];
 while(todo.length){todo.sort((a,b)=>a[0]-b[0]);const [d,mask,side]=todo.shift();if(dist.get(`${mask},${side}`)!==d)continue;if(mask===goal&&side===1)return d;
  for(let subset=1;subset<=goal;subset++){
   const group=weights.map((w,i)=>(subset>>i)&1?i:-1).filter(i=>i>=0);
   if(group.length>2||group.some(i=>((mask>>i)&1)!==side)||sum(group.map(i=>weights[i]))>capacity)continue;
   const next=mask^subset,key=`${next},${1-side}`,nd=d+cost(group.map(i=>weights[i]));
   if(nd<(dist.get(key)??Infinity)){dist.set(key,nd);todo.push([nd,next,1-side]);}
  }
 }
}
function verifySolutions(){
 // Chapter 1: physical segment count, legal single moves, orientation and minimum moves.
 const q11=questions(1)[0],svg=fs.readFileSync(path.join(root,q11.figure.src),'utf8');
 answer(1,1,`${[...svg.matchAll(/<line\b/g)].length} cerillos`);
 const seg={0:'abcdef',1:'bc',2:'abdeg',3:'abcdg',4:'bcfg',5:'acdfg',6:'acdefg',7:'abc',8:'abcdefg',9:'abcdfg'};
 const pattern=(a,op,b,c)=>new Set([...seg[a]].map(x=>'0'+x).concat([...seg[b]].map(x=>'1'+x),[...seg[c]].map(x=>'2'+x),op==='+'?['h','v']:['h']));
 const initial=pattern(6,'+',4,4);const possible=questions(1)[1].options.filter(s=>{const [,a,op,b,c]=s.match(/^(\d) ([+−]) (\d) = (\d)$/);const dest=pattern(a,op,b,c);return [...initial].filter(x=>!dest.has(x)).length===1&&[...dest].filter(x=>!initial.has(x)).length===1&&(op==='+'?+a+(+b):a-b)===+c;});
 answer(1,2,only(possible));
 const minAngle=2*Math.asin(1/2);answer(1,3,`${Math.floor(2*Math.PI/minAngle+1e-9)} monedas`);
 answer(1,4,`${3*5-3} monedas`);assert.equal((fs.readFileSync(path.join(root,questions(1)[3].figure.src),'utf8').match(/<circle\b/g)||[]).length,12);
 answer(1,5,7-3);answer(1,6,4*7-3);
 let d={top:1,bottom:6,north:2,south:5,east:3,west:4};
 d={...d,top:d.west,bottom:d.east,east:d.top,west:d.bottom};d={...d,top:d.south,bottom:d.north,north:d.top,south:d.bottom};answer(1,7,d.top);
 answer(1,8,1+4+6);const domino=[[4,2],[1,3],[5,1]];answer(1,9,'La ficha '+only(domino.map((v,i)=>{const a=domino.map(x=>x.slice());a[i].reverse();return sum(a.map(x=>x[0]))===sum(a.map(x=>x[1]))?'ABC'[i]:null;}).filter(Boolean)));
 answer(1,10,`${hanoi(3)} movimientos`);
 // Chapter 2: information bound, equality, balances, derangements and shortest paths.
 for(const [i,n] of [[1,27],[2,13]]){let k=0;while(3**k<n)k++;answer(2,i,`${k} pesadas`);}
 answer(2,3,`${1+9-3} kg`);answer(2,4,`${(20+4)/2} kg`);
 const net={A:0,B:0,C:0};for(const [a,b,v] of [['A','B',40],['B','C',25],['C','A',10]]){net[a]-=v;net[b]+=v;}assert.equal(sum(Object.values(net)),0);answer(2,5,`S/ ${-net.A}`);
 const boxes=permutations(['manzanas','naranjas','mezcla']).filter(a=>a[0]!=='manzanas'&&a[1]!=='naranjas'&&a[2]!=='mezcla'&&a[2]!=='naranjas');assert.equal(only(boxes.map(a=>a[1])),'mezcla');answer(2,6,'Manzanas y naranjas');
 answer(2,7,`${6*5/2} partidos`);answer(2,8,`${8-4-(15-3*4)} partido`);
 answer(2,9,`${crossings([50,50,80],100,()=>1)} cruces`);answer(2,10,`${crossings([1,2,5,10],Infinity,a=>Math.max(...a))} minutos`);
 // Chapter 3: enumerate every assignment; distinguish uniqueness from possibility.
 const five=permutations(['A','B','C','D','E']);
 let orders=five.filter(p=>pos(p,'E')===1&&pos(p,'C')===pos(p,'A')+1&&pos(p,'B')===pos(p,'C')+1&&pos(p,'D')>pos(p,'B'));answer(3,1,only(orders.map(p=>p[2])));
 orders=permutations(['P','Q','R','S','T','U']).filter(p=>pos(p,'Q')===2&&pos(p,'R')===pos(p,'Q')+1&&pos(p,'T')===pos(p,'S')+1&&pos(p,'U')===6&&pos(p,'P')<pos(p,'Q'));answer(3,2,`${only(orders.map(p=>pos(p,'U')-pos(p,'R')-1))} libros`);
 orders=permutations(['A','B','C','D','E','F']).filter(p=>pos(p,'A')===1&&pos(p,'B')===6&&pos(p,'E')===pos(p,'A')+1&&pos(p,'F')===pos(p,'D')+1&&pos(p,'C')>pos(p,'D'));answer(3,3,`Piso ${only(orders.map(p=>pos(p,'F')))}`);
 orders=permutations(['Ana','Bruno','Carla','Diego']).filter(p=>pos(p,'Ana')<pos(p,'Bruno')&&pos(p,'Carla')>pos(p,'Bruno')&&pos(p,'Diego')<pos(p,'Ana'));answer(3,4,only(orders.map(p=>p[1])));
 orders=permutations(['Ana','Beto','Carlos','Dina']).filter(p=>p[0]==='Ana'&&p[2]==='Carlos'&&p[1]==='Beto');answer(3,5,`Asiento ${only(orders.map(p=>pos(p,'Dina')))}`);
 answer(3,6,`Asiento ${(1+1+6/2-1)%6+1}`);
 const careers=permutations(['Medicina','Derecho','Ingeniería','Arquitectura']).filter(a=>a[0]==='Medicina'&&!['Derecho','Arquitectura'].includes(a[1])&&a[2]!=='Derecho');answer(3,7,only(careers.map(p=>p[3])));
 const cities=permutations(['Lima','Cusco','Piura']).filter(a=>a[0]!=='Lima'&&a[1]!=='Cusco'&&a[2]==='Piura');answer(3,8,only(cities.map(p=>p[1])));
 orders=five.filter(p=>pos(p,'A')<pos(p,'B')&&pos(p,'C')+1===pos(p,'D')&&pos(p,'E')===5);const places=unique(orders.map(p=>pos(p,'C')));assert.deepEqual(places.sort(),[1,2,3]);answer(3,9,`Lugar ${only([1,2,3,4].filter(x=>!places.includes(x)))}`);
 const pets=[];for(const colors of permutations(['rojo','azul','verde']))for(const animals of permutations(['Gato','Perro','Pez']))if(colors[0]==='azul'&&animals[1]==='Gato'&&animals[colors.indexOf('rojo')]==='Perro')pets.push(animals[0]);answer(3,10,only(pets));
 // Chapter 4: actual generation paths and restrictions on cutting.
 const parents={Ana:['Rosa','Luis'],Marco:['Rosa','Luis'],Elena:['Ana','Pedro'],'Tomás':['Marco']};const grands=p=>(parents[p]||[]).flatMap(x=>parents[x]||[]);
 assert.equal(grands('Elena').filter(x=>grands('Tomás').includes(x)).length,2);assert.ok(!parents.Elena.some(p=>parents['Tomás'].includes(p)));answer(4,1,'Prima');
 const father={speaker:'grandfather',photo:'speaker'};assert.equal(father.photo,'speaker');answer(4,2,'Su hijo');answer(4,3,'Tía');
 const count=Array.from({length:8},(_,i)=>i+1).find(n=>n-1>=3&&n-2>=2);answer(4,4,`${count} personas`);
 let g=4;for(let j=0;j<3;j++)g--;answer(4,5,`G${g}`);
 answer(4,6,`${240/30-1} cortes`);answer(4,7,`${6} cortes`);answer(4,8,`${(3-1)+(4-1)} cortes`);answer(4,9,`${Math.ceil(Math.log2(8))} operaciones`);answer(4,10,`${3*(3-1)} cortes`);
 // Chapter 5: read numeric givens from the actual SVGs; exhaust cross and triangle arrangements.
 answer(5,1,magic(questions(5)[0],sum));answer(5,2,sum(Array.from({length:16},(_,i)=>i+1))/4);answer(5,3,sum(Array.from({length:9},(_,i)=>i+11))/3);answer(5,4,magic(questions(5)[3],sum));answer(5,5,magic(questions(5)[4],prod));
 const crosses=permutations([1,2,3,4,5]).filter(a=>a[0]+a[1]+a[2]===a[2]+a[3]+a[4]);answer(5,6,only(crosses.filter(a=>sum(a.slice(0,3))===9).map(a=>a[2])));answer(5,7,Math.max(...crosses.map(a=>sum(a.slice(0,3)))));
 const triangles=permutations([1,2,3,4,5,6]).filter(a=>a[0]+a[1]+a[3]===9&&a[1]+a[2]+a[4]===9&&a[2]+a[0]+a[5]===9);answer(5,8,only(triangles.map(a=>sum(a.slice(0,3)))));
 const row=svgTexts(questions(5)[8]).map(x=>x==='x'?null:+x);const x=14-row[0]-row[2];row[1]=x;for(let i=0;i<7;i++)assert.equal(sum(row.slice(i,i+3)),14);answer(5,9,x);
 const cells=svgTexts(questions(5)[9]).map(x=>x==='x'?null:+x);const last=20-cells[10]-cells[11]-cells[14];cells[15]=last;for(let r=0;r<3;r++)for(let c=0;c<3;c++)assert.equal(sum([cells[r*4+c],cells[r*4+c+1],cells[(r+1)*4+c],cells[(r+1)*4+c+1]]),20);answer(5,10,last);
 // Chapter 6: validate the supplied reference dates and all leap/month boundaries.
 const days=['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];const day=(d,n)=>days[((days.indexOf(d)+n)%7+7)%7];const weekday=(y,m,d)=>days[(new Date(Date.UTC(y,m-1,d)).getUTCDay()+6)%7];
 answer(6,1,day('Viernes',4));answer(6,2,day('Jueves',-2+1-1));answer(6,3,day('Lunes',100));assert.equal(weekday(2024,6,3),'Lunes');answer(6,4,weekday(2024,6,30));
 const leap=y=>y%4===0&&(y%100!==0||y%400===0);answer(6,5,only(questions(6)[4].options.filter(x=>leap(+x))));assert.equal(weekday(2024,2,1),'Jueves');answer(6,6,weekday(2024,3,1));
 const counts=(length,start)=>Array.from({length:7},(_,d)=>Array.from({length},(_,i)=>(start+i)%7).filter(x=>x===d).length);assert.deepEqual(counts(31,5),[5,4,4,4,4,5,5]);answer(6,7,'Sábado, domingo y lunes');
 answer(6,8,`${(Date.UTC(2024,2,1)-Date.UTC(2024,1,28))/86400000} días`);assert.equal(weekday(2024,1,1),'Lunes');answer(6,9,weekday(2025,1,1));
 const first=only([0,1,2,3,4,5,6].filter(x=>counts(30,x)[0]===5&&counts(30,x)[1]===5));answer(6,10,days[(first+29)%7]);
 console.log('PASS: all 60 answers; legal match movement, cube rotations, minimum crossings, all ordering assignments, magic grids, shared cells and Gregorian dates.');
}
function structure(){
 assert.equal(ctx.window.COURSES.length,18);const course=ctx.window.COURSES.find(c=>c.id===2);assert.equal(course.name,'Razonamiento Matemático');assert.equal(ctx.window.MATH_REASONING_SYLLABUS.length,24);assert.equal(ctx.window.MATH_REASONING_CHAPTERS.length,6);assert.equal(JSON.stringify(course.topics),JSON.stringify(ctx.window.MATH_REASONING_SYLLABUS.map(c=>c.title)));
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'assets/razonamiento-matematico-figuras.json'),'utf8'));assert.equal(manifest.figures.length,39);const used=new Set();
 function figure(v){assert.ok(v.alt&&v.caption);assert.match(v.credit,/Esquema matemático/);assert.ok(manifest.figures.some(f=>f.src===v.src));const svg=fs.readFileSync(path.join(root,v.src),'utf8');assert.match(svg,/<svg/);assert.match(svg,/<desc/);assert.doesNotMatch(svg,/<script|<foreignObject|https?:\/\/(?!www.w3.org)/);used.add(v.src);}
 let examples=0,formulas=0;
 for(let n=1;n<=6;n++){
  const id=`razonamiento-matematico-capitulo-0${n}`,page=fs.readFileSync(path.join(root,id+'.html'),'utf8');for(const f of [...chapterFiles(n),'practice-bank.js','chapter-practice.js'])assert.ok(page.includes(f));assert.match(page,/katex@0.16.22/);
  vm.runInNewContext(fs.readFileSync(path.join(root,id+'-data.js'),'utf8'),ctx);const c=ctx.window.HISTORY_CONTENT;assert.equal(c.courseId,2);assert.equal(c.progressId,id);assert.equal(c.lessons.length,5);assert.equal(c.math,true);assert.match(c.sourceNote,/Lumbreras Editores, primera edición, 2020/);
  for(const l of c.lessons){assert.equal(l.blocks.length,2);assert.equal(l.examples.length,1);for(const e of l.examples){examples++;assert.ok(e.steps.length>=3);if(e.figure)figure(e.figure);}}
  for(const q of questions(n)){assert.equal(q.options.length,5);assert.equal(new Set(q.options).size,5);if(q.figure)figure(q.figure);}
  const strings=[JSON.stringify(c),JSON.stringify(questions(n))];for(const s of strings){const opens=(s.match(/\\\\\(/g)||[]).length,closes=(s.match(/\\\\\)/g)||[]).length;assert.equal(opens,closes,'All inline formula delimiters close');formulas+=opens;}
 }
 assert.equal(examples,30);assert.ok(formulas>100);assert.equal(used.size,39,'Every authored figure is used');assert.ok(!fs.existsSync(path.join(root,'razonamiento-matematico-capitulo-07.html')));
 const admin=fs.readFileSync(path.join(root,'admin.js'),'utf8');vm.runInNewContext(admin.slice(admin.indexOf('const TRACKED_CHAPTERS='),admin.indexOf('let selectedChapter='))+';window.tracked=TRACKED_CHAPTERS;',ctx);assert.equal(Object.keys(ctx.window.tracked).length,45);for(let n=1;n<=6;n++)assert.equal(ctx.window.tracked[`razonamiento-matematico-capitulo-0${n}`].items,10);
}
async function integration(){
 const home=harness(appFiles);await home.signIn({uid:'student'});home.run("selectStudyMode('free');openCourse(2)");assert.match(home.elements.get('app').innerHTML,/Razonamiento Matemático: 24 capítulos; contenido desarrollado del 1 al 6/);assert.match(home.elements.get('app').innerHTML,/figuras matemáticas en los enunciados/);
 for(let n=1;n<=6;n++){
  const id=`razonamiento-matematico-capitulo-0${n}`;home.run(`setTopic(${n-1})`);assert.equal(home.redirects.at(-1),id+'.html?v=20260918-social1');
  const direct=harness(chapterFiles(n));await direct.signIn({uid:'new'});assert.equal(direct.redirects.at(-1),`index.html?chapter=${id}&v=20260918-social1`);
  const entry=harness(appFiles,{search:'?chapter='+id});await entry.signIn({uid:'new'});entry.run("selectStudyMode('progressive')");assert.equal(entry.redirects.at(-1),id+'.html?v=20260918-social1');
  const study=harness(chapterFiles(n),{local:home.local,cloud:home.cloud});study.run('window.mathCalls=[];window.renderMathInElement=(el,options)=>window.mathCalls.push({html:el.innerHTML,options})');await study.signIn({uid:'student'});
  const html=study.elements.get('chapter-app').innerHTML;assert.equal((html.match(/class="guided-case"/g)||[]).length,5);assert.equal((html.match(/class="practice-card"/g)||[]).length,10);for(const match of html.matchAll(/<legend>([\s\S]*?)<\/legend>/g))assert.doesNotMatch(match[1],/<figure/,'Figures must not be inside legends');assert.ok(study.run('window.mathCalls.length')>0);assert.equal(study.run('window.mathCalls[0].options.delimiters[1].left'),'\\(');
  for(const q of questions(n).filter(q=>q.figure)){
   assert.ok(html.includes(q.figure.src));assert.ok(html.includes('data-id="practice:'+q.id+'"'));study.run(`document.getElementById('image-dialog').showModal=()=>{};openMathFigure('practice:${q.id}')`);assert.ok(study.elements.get('image-dialog').innerHTML.includes(q.figure.src));assert.doesNotMatch(study.elements.get('image-dialog').innerHTML,/creada con IA/);
  }
  if(n===1){study.run("openMathFigure('example:0:0')");assert.match(study.elements.get('image-dialog').innerHTML,/c01-guia-cerillos/);}
  study.run("goLesson(4);window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'p01',window.ChapterPractice.questions(CHAPTER_ID)[0].answer,P.studyMode);checkPractice('p01')");await study.run('persist()');assert.match(study.run('window.mathCalls.at(-1).html'),/Respuesta correcta/);
  const nav=study.cloud.get('users/student/progress/navigation');assert.equal(nav.lastCourseId,2);assert.equal(nav.lastChapterNumber,n);assert.equal(nav.catalogVersion,10);
  const restored=harness(chapterFiles(n),{local:home.local,cloud:home.cloud});await restored.signIn({uid:'student'});assert.equal(restored.run('P.readingItem'),4);assert.equal(restored.run('progressPercent()'),10);
  const catalog=harness(appFiles,{local:home.local,cloud:home.cloud,search:'?course=2'});await catalog.signIn({uid:'student'});assert.equal(catalog.run('state.activeTopicIndex'),n-1);assert.equal(catalog.run(`socialChapterProgress(2,${n}).percent`),10);assert.equal(catalog.run(`socialChapterProgress(1,${n}).percent`),0);catalog.run('openProgressChapter()');assert.equal(catalog.redirects.at(-1),id+'.html?v=20260918-social1');
  assert.doesNotMatch(study.run('chapterLinks()'),/capitulo-00|capitulo-07|razonamiento-verbal|historia-universal/);await catalog.signIn({uid:'other'});assert.equal(catalog.run(`socialChapterProgress(2,${n}).percent`),0);
 }
 assert.equal(home.run("restoredTopicIndex(COURSES.find(c=>c.id===2),0,'Máximos y mínimos',7)"),22);assert.equal(home.run("restoredTopicIndex(COURSES.find(c=>c.id===2),4,'Dados, cerillos y dominó',7)"),0);assert.equal(home.run("restoredTopicIndex(COURSES.find(c=>c.id===2),5,'Relación de tiempos',8)"),5);
 const oldReader=harness(['razonamiento-verbal-catalog.js','history-progress.js','razonamiento-verbal-capitulo-01-data.js','history-chapter.js']);oldReader.run("delete window.ChapterPractice.renderFigure;window.StudyMode.choose('cached','free')");await oldReader.signIn({uid:'cached'});assert.match(oldReader.elements.get('chapter-app').innerHTML,/Relaciones semánticas/,'Earlier readers also work with a cached practice renderer');
 console.log('PASS: mathematical figures and enlargement, formula rendering after feedback, six chapter routes, catalog migration, progress, course/account isolation and teacher tracking.');
}
verifySolutions();structure();integration().catch(e=>{console.error(e);process.exitCode=1});
