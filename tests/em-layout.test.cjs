'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..');
const css=fs.readFileSync(path.join(root,'fisica-capitulo-17.css'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
const rules=[];
function parse(text,conditions=[]){
 let cursor=0;
 while(cursor<text.length){
  const open=text.indexOf('{',cursor);if(open<0)break;
  const header=text.slice(cursor,open).trim();let end=open+1,depth=1;
  for(;end<text.length&&depth;end++){if(text[end]==='{')depth++;else if(text[end]==='}')depth--;}
  const body=text.slice(open+1,end-1);
  if(header.startsWith('@media'))parse(body,[...conditions,header]);
  else if(!header.startsWith('@')){
   const declarations=Object.fromEntries(body.split(';').filter(s=>s.trim()).map(s=>{const p=s.indexOf(':');return [s.slice(0,p).trim(),s.slice(p+1).trim()];}));
   for(const selector of header.split(','))rules.push({selector:selector.trim(),conditions,declarations});
  }
  cursor=end;
 }
}
parse(css);
const applies=(condition,width)=>{
 const max=condition.match(/max-width\s*:\s*(\d+)px/),min=condition.match(/min-width\s*:\s*(\d+)px/);
 return (!max||width<=Number(max[1]))&&(!min||width>=Number(min[1]));
};
function style(selector,width){return Object.assign({},...rules.filter(r=>r.selector===selector&&r.conditions.every(c=>applies(c,width))).map(r=>r.declarations));}
const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'fisica-capitulo-17-data.js'),'utf8'),context);
assert.equal(context.window.ELECTROMAGNETISM_CONTENT.lessons.length,13);
// The original jump was caused by a different geometry when a laboratory node appeared.
const geometry=new Set(['width','min-width','max-width','padding','gap','grid-template-columns']);
for(const r of rules){
 if(!/\.(?:wrap|layout|sidebar|article)\b/.test(r.selector))continue;
 if(/:has\(/.test(r.selector))assert.ok(!Object.keys(r.declarations).some(k=>geometry.has(k)),`Layout must not depend on the selected activity: ${r.selector}`);
}
for(const width of [390,768,1024,1366,1536,1920]){
 assert.equal(style('.wrap',width)['max-width'],'1440px','Theory, laboratories and practice share a single page width');
 assert.equal(style('.layout',width)['grid-template-columns'],width<=850?'minmax(0,1fr)':'220px minmax(0,1fr)');
 assert.equal(style('.article',width).padding,width<=520?'20px 16px':width<=850?'24px':'30px');
 assert.equal(style('.content table',width)['table-layout'],'fixed');
 assert.equal(style('.content table',width)['white-space'],'normal');
 assert.equal(style('.content .table-scroll',width).overflow,'visible','Descriptions must wrap instead of requiring a horizontal table scroller');
 assert.equal(style('.content td',width)['overflow-wrap'],'anywhere');
 assert.equal(style('.em-property-grid',width)['grid-template-columns'],width<=600?'minmax(0,1fr)':'repeat(2,minmax(0,1fr))');
 assert.equal(style('.em-realistic-figure img',width).height,'auto','Show complete visual assets without cropping');
}
console.log('PASS: all 13 topics keep one page geometry, responsive property cards, wrapped tables and complete illustrations.');
