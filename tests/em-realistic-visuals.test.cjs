'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {spawnSync}=require('node:child_process');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const context={window:{}};
vm.runInNewContext(read('fisica-capitulo-17-data.js'),context);
const lessons=JSON.parse(JSON.stringify(context.window.ELECTROMAGNETISM_CONTENT.lessons));
assert.equal(lessons.length,13,'The review covers every topic in the chapter');
const visuals=lessons.flatMap(lesson=>lesson.visuals||[]);
assert.equal(visuals.length,14,'All thirteen topics have a visual, including both Biot-Savart panels');
assert.equal(new Set(visuals.map(v=>v.src)).size,14,'Different topics must not silently point to a duplicate illustration');
const ids=new Set();
for(const lesson of lessons){
 assert.ok(Array.isArray(lesson.visuals)&&lesson.visuals.length>0,'Missing illustration in '+lesson.title);
 assert.doesNotMatch(lesson.body,/assets\/em-pdf\/teoria-|data:image\/png/i,'The revised theory cannot retain cropped textbook images');
 const figures=[...lesson.body.matchAll(/<figure\b[^>]*>([\s\S]*?)<\/figure>/g)].map(m=>m[1]);
 assert.equal(figures.length,lesson.visuals.length,'Visual metadata and visible figures must agree in '+lesson.title);
 for(const [i,v] of lesson.visuals.entries()){
  assert.match(v.src,/^assets\/em-realistic\/[a-z0-9-]+\.svg$/);
  assert.ok(fs.existsSync(path.join(root,v.src)),'Missing published visual '+v.src);
  assert.ok(v.alt.trim().length>=40,'The illustration needs a useful text description');
  assert.ok(v.caption.trim().length>=15,'The illustration needs an explanatory caption');
  assert.ok(Number.isFinite(v.width)&&v.width>0&&Number.isFinite(v.height)&&v.height>0);
  const id=`theory:${lesson.id}:${i}`;
  assert.ok(!ids.has(id));ids.add(id);
  const figure=figures[i];
  assert.ok(figure.includes(`src="${v.src}"`),'The displayed image must be the registered visual');
  assert.equal((figure.match(/<img\b/g)||[]).length,1,'Each figure presents one complete illustration');
  assert.equal((figure.match(/data-action="math-figure"/g)||[]).length,1,'Each visual has one functioning zoom control');
  assert.ok(figure.includes(`data-id="${id}"`),'The zoom control must identify this exact lesson and image');
  assert.match(figure,/<figcaption>[\s\S]+<\/figcaption>/);
 }
}
const first=lessons[0];
assert.equal((first.body.match(/class="em-property-grid"/g)||[]).length,1);
const cards=[...first.body.matchAll(/<article class="em-property-card">([\s\S]*?)<\/article>/g)].map(m=>m[1]);
assert.equal(cards.length,4,'The initial properties are four readable cards');
assert.doesNotMatch(first.body,/<table\b/i,'The original sideways property table has been removed');
for(const card of cards){assert.match(card,/class="em-property-icon"/);assert.match(card,/<h[34]>[^<]+<\/h[34]>/);assert.match(card,/<p>[^<]{30,}<\/p>/);}
// Parse each actual SVG, not only its filename, and verify that it is a complete,
// self-contained vector asset. Generated equipment textures are WebP; scanned PNG
// textbook crops are deliberately excluded from these revised theory illustrations.
const xmlCheck=spawnSync(process.env.CODEX_PRIMARY_RUNTIME_PYTHON||'python3',['-c',String.raw`
import json,sys,xml.etree.ElementTree as ET
from pathlib import Path
root=Path(sys.argv[1]);ns='{http://www.w3.org/2000/svg}'
for visual in json.load(sys.stdin):
 p=root/visual['src'];s=p.read_text();e=ET.fromstring(s)
 assert e.tag==ns+'svg', str(p)+' is not an SVG root'
 box=list(map(float,e.attrib['viewBox'].split()))
 assert len(box)==4 and box[2]>0 and box[3]>0, str(p)+' has no valid viewBox'
 assert box[2]==visual['width'] and box[3]==visual['height'], str(p)+' metadata would distort its aspect ratio'
 title=e.find(ns+'title')
 assert title is not None and len(''.join(title.itertext()).strip())>8, str(p)+' lacks a descriptive title'
 assert 'assets/em-pdf' not in s and 'data:image/png' not in s.lower(), str(p)+' retains an old textbook raster'
 for image in e.iter(ns+'image'):
  href=image.attrib.get('href') or image.attrib.get('{http://www.w3.org/1999/xlink}href','')
  assert href.startswith('data:image/webp;base64,'), str(p)+' contains an unresolved image dependency'
print('SVG XML, viewBoxes, accessible titles and self-contained equipment textures verified.')
`,root],{input:JSON.stringify(visuals),encoding:'utf8'});
assert.equal(xmlCheck.status,0,xmlCheck.stderr||xmlCheck.stdout);

async function viewerIntegration(){
 const h=harness(['fisica-capitulo-17-practice.js','fisica-capitulo-17-data.js','fisica-capitulo-17.js']);
 h.run("window.StudyMode.choose('visual-review','free')");await h.signIn({uid:'visual-review'});
 h.run("window.figureOpens=0;document.getElementById('em-figure-dialog').showModal=()=>{window.figureOpens++}");
 for(const [index,lesson] of lessons.entries()){
  h.run(`goLesson(${index})`);const rendered=h.elements.get('chapter-app').innerHTML;
  for(const [i,v] of lesson.visuals.entries()){
   const id=`theory:${lesson.id}:${i}`;
   assert.ok(rendered.includes(`data-id="${id}"`),'The chapter renderer must retain the visible zoom control');
   h.run(`openFigure(${JSON.stringify(id)})`);
   const dialog=h.elements.get('em-figure-dialog').innerHTML;
   assert.ok(dialog.includes(`src="${v.src}"`),'The viewer opened the wrong diagram for '+id);
   assert.match(dialog,/data-action="close-figure"/,'The enlarged image must have a close control');
  }
 }
 assert.equal(h.run('window.figureOpens'),14,'Every registered theory figure opens in the actual chapter viewer');
 h.run("openFigure('theory:unknown-topic:0')");
 assert.equal(h.run('window.figureOpens'),14,'A stale image identifier must not open a different diagram');
}
viewerIntegration().then(()=>console.log('PASS: all 13 topics use 14 complete new visuals, accessible descriptions and captions, correct image-viewer routing, and four readable property cards.')).catch(error=>{console.error(error);process.exitCode=1;});
