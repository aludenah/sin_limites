'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'..','activity-fullscreen.js'),'utf8');

// A small DOM fixture exercises event ancestry and replacement without a browser.
class Style{
 constructor(){this.values=new Map();}
 getPropertyValue(k){return this.values.get(k)||'';}
 setProperty(k,v){this.values.set(k,String(v));}
 removeProperty(k){this.values.delete(k);}
}
class Element{
 constructor(tag,doc){this.nodeType=1;this.tagName=tag.toUpperCase();this.ownerDocument=doc;this.attributes=new Map();this.children=[];this.parentElement=null;this.style=new Style();this.listeners=new Map();this._text='';this.hidden=false;this.scrollTop=0;
 const self=this;this.classList={contains:c=>self.className.split(/\s+/).includes(c),add(...cs){self.className=[...new Set([...self.className.split(/\s+/).filter(Boolean),...cs])].join(' ');},remove(...cs){self.className=self.className.split(/\s+/).filter(c=>!cs.includes(c)).join(' ');}};
 }
 get id(){return this.getAttribute('id')||'';}set id(v){this.setAttribute('id',v);}
 get className(){return this.getAttribute('class')||'';}set className(v){this.setAttribute('class',v);}
 get textContent(){return this._text+this.children.map(x=>x.textContent).join('');}set textContent(v){this._text=String(v);this.replaceChildren();}
 get firstChild(){return this.children[0]||null;}
 get isConnected(){let p=this;while(p){if(p.nodeType===9)return true;p=p.parentElement;}return false;}
 setAttribute(k,v){this.attributes.set(k,String(v));}getAttribute(k){return this.attributes.has(k)?this.attributes.get(k):null;}removeAttribute(k){this.attributes.delete(k);}
 appendChild(el){return this.insertBefore(el,null);}
 insertBefore(el,before){if(el.parentElement)el.parentElement.removeChild(el);const i=before?this.children.indexOf(before):-1;if(i<0)this.children.push(el);else this.children.splice(i,0,el);el.parentElement=this;return el;}
 removeChild(el){const i=this.children.indexOf(el);if(i>=0)this.children.splice(i,1);el.parentElement=null;return el;}
 replaceChildren(...xs){for(const c of this.children)c.parentElement=null;this.children=[];xs.forEach(x=>this.appendChild(x));}
 contains(el){if(!el)return false;return el===this||this.children.some(c=>c.contains(el));}
 matches(selector){return selector.split(',').some(raw=>{let s=raw.trim();if(!s)return false;if(s.includes(':not')){const match=s.match(/^(.*):not\(\[([^\]]+)\]\)$/);return match?this.matches(match[1])&&!this.attributes.has(match[2]):false;}if(s[0]==='#')return this.id===s.slice(1);if(s[0]==='.')return this.classList.contains(s.slice(1));const a=s.match(/^(\w+)?\[([^=\]]+)(?:="([^"]*)")?\]$/);if(a)return (!a[1]||this.tagName===a[1].toUpperCase())&&this.attributes.has(a[2])&&(a[3]===undefined||this.getAttribute(a[2])===a[3]);return this.tagName===s.toUpperCase();});}
 closest(selector){let e=this;while(e){if(e.matches?.(selector))return e;e=e.parentElement;}return null;}
 querySelectorAll(selector){const out=[];for(const c of this.children){if(c.matches(selector))out.push(c);out.push(...c.querySelectorAll(selector));}return out;}
 querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
 addEventListener(type,fn,options){let xs=this.listeners.get(type);if(!xs)this.listeners.set(type,xs=[]);xs.push({fn,capture:options===true||options?.capture===true});}
 removeEventListener(type,fn){this.listeners.set(type,(this.listeners.get(type)||[]).filter(x=>x.fn!==fn));}
 dispatchEvent(event){event.target||=this;const p=[];for(let x=this;x;x=x.parentElement)p.push(x);for(const x of [...p].reverse()){for(const l of x.listeners.get(event.type)||[])if(l.capture)l.fn(event);if(event.stopped)return;}for(const x of p){for(const l of x.listeners.get(event.type)||[])if(!l.capture)l.fn(event);if(event.stopped)return;}}
 focus(){this.ownerDocument.activeElement=this;}getClientRects(){return this.isConnected&&!this.hidden?[{}]:[];}
}
class TestEvent{constructor(type,options={}){this.type=type;Object.assign(this,options);}preventDefault(){this.prevented=true;}stopPropagation(){this.stopped=true;}}
function fixture(){
 const doc=new Element('document',null);doc.nodeType=9;doc.ownerDocument=doc;doc.readyState='complete';doc.documentElement=new Element('html',doc);doc.body=new Element('body',doc);doc.appendChild(doc.documentElement);doc.documentElement.appendChild(doc.body);doc.createElement=t=>new Element(t,doc);doc.getElementById=id=>doc.querySelector('#'+id);doc.activeElement=doc.body;doc.fullscreenElement=null;
 const observers=[];class Observer{constructor(cb){this.cb=cb;}observe(){observers.push(this);}disconnect(){const i=observers.indexOf(this);if(i>=0)observers.splice(i,1);}}
 const events=[];let currentScroll=null;const window={document:doc,MutationObserver:Observer,Event:TestEvent,queueMicrotask,Promise,scrollX:4,scrollY:310,dispatchEvent:e=>events.push(e.type),scrollTo:p=>currentScroll=p,getComputedStyle:()=>({backgroundColor:'rgb(244, 248, 252)'})};
 vm.runInNewContext(source,{window,console},{filename:'activity-fullscreen.js'});
 const make=(tag,attrs={},text='')=>{const e=doc.createElement(tag);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,v);e._text=text;return e;};
 const mount=(root,parent=doc.body)=>{parent.appendChild(root);window.ActivityFullscreen.refresh();return root;};
 const flush=async(target,addedNodes=[],removedNodes=[])=>{for(const o of [...observers])o.cb([{target,addedNodes,removedNodes}]);await Promise.resolve();};
 return {doc,window,api:window.ActivityFullscreen,make,mount,flush,events,scroll:()=>currentScroll};
}
async function checks(){
 const f=fixture(),{doc,api,make,mount,flush}=f;
 const chapter=mount(make('main',{id:'chapter-app'}));
 const activity=make('section',{id:'magnitude-game',role:'region','aria-label':'Juego de magnitudes'}),choice=make('button',{'data-action':'choose'},'Elegir');activity.appendChild(choice);mount(activity,chapter);
 doc.body.style.setProperty('overflow','clip');choice.focus();
 let sourceClicks=0;chapter.addEventListener('click',()=>sourceClicks++);
 activity.requestFullscreen=()=>Promise.reject(Error('Not allowed by browser'));
 assert.equal(activity.querySelectorAll('[data-activity-fullscreen-toggle]').length,1);
 await api.open(activity);
 assert.equal(activity.parentElement,chapter,'Opening never reparents or clones an activity');
 assert.equal(activity.getAttribute('role'),'dialog');assert.equal(activity.getAttribute('aria-modal'),'true');
 assert.equal(doc.documentElement.classList.contains('activity-fs-open'),true);
 assert.equal(activity.classList.contains('activity-fs-active'),true,'Native rejection leaves viewport mode active');
 assert.equal(doc.body.style.getPropertyValue('overflow'),'clip','No body inline state is overwritten');
 choice.dispatchEvent(new TestEvent('click'));assert.equal(sourceClicks,1,'Original delegated handlers still receive source controls');
 for(let i=0;i<5;i++)api.refresh();assert.equal(activity.querySelectorAll('[data-activity-fullscreen-toggle]').length,1,'Observer refresh does not duplicate controls');
 // A game changes its inner HTML for the next round while retaining its root.
 const oldChildren=[...activity.children],round=make('button',{'data-action':'next'},'Ronda 2');activity.replaceChildren(round);await flush(activity,[round],oldChildren);
 assert.equal(api.getState().element,activity);assert.equal(activity.classList.contains('activity-fs-active'),true);assert.equal(activity.querySelectorAll('[data-activity-fullscreen-toggle]').length,1);
 round.dispatchEvent(new TestEvent('click'));assert.equal(sourceClicks,2);
 // Full chapter rendering removes/recreates the selected root in one DOM batch.
 const replacement=make('section',{id:'magnitude-game',role:'region','aria-label':'Nueva ronda'});chapter.removeChild(activity);chapter.appendChild(replacement);await flush(chapter,[replacement],[activity]);
 assert.equal(api.getState().element,replacement,'A stable activity identity resumes full screen after replacement');assert.equal(replacement.parentElement,chapter);assert.equal(replacement.classList.contains('activity-fs-active'),true);assert.equal(activity.classList.contains('activity-fs-active'),false);
 doc.dispatchEvent(new TestEvent('keydown',{key:'Escape'}));assert.equal(api.getState(),null);assert.equal(doc.documentElement.classList.contains('activity-fs-open'),false);assert.equal(replacement.getAttribute('role'),'region');assert.equal(replacement.getAttribute('aria-modal'),null);assert.equal(doc.body.style.getPropertyValue('overflow'),'clip');assert.equal(f.scroll().top,310);
 // Capture only the injected button's event; it must not trigger source actions.
 const toggle=replacement.querySelector('[data-activity-fullscreen-toggle]');toggle.dispatchEvent(new TestEvent('click'));assert.equal(sourceClicks,2);assert.equal(api.getState().element,replacement);
 toggle.dispatchEvent(new TestEvent('click'));assert.equal(api.getState(),null);assert.equal(sourceClicks,2);
 // Native mode and browser exit use the same cleanup contract.
 const native=mount(make('section',{id:'induction-lab'}),chapter);native.requestFullscreen=async()=>{doc.fullscreenElement=native;doc.dispatchEvent(new TestEvent('fullscreenchange'));};doc.exitFullscreen=async()=>{doc.fullscreenElement=null;doc.dispatchEvent(new TestEvent('fullscreenchange'));};
 await api.open(native);assert.equal(api.getState().native,true);doc.fullscreenElement=null;doc.dispatchEvent(new TestEvent('fullscreenchange'));assert.equal(api.getState(),null);assert.equal(native.classList.contains('activity-fs-active'),false);
 // A vanished activity is not kept alive in an overlay or detached container.
 await api.open(replacement);chapter.removeChild(replacement);await flush(chapter,[],[replacement]);assert.equal(api.getState(),null);assert.equal(doc.documentElement.classList.contains('activity-fs-open'),false);
 // Practice has one control on the stable list container, rather than two nested controls.
 const list=make('div',{id:'activities-list'}),practice=make('div',{class:'unified-practice'});list.appendChild(practice);mount(list,chapter);assert.equal(list.querySelectorAll('[data-activity-fullscreen-toggle]').length,1);assert.equal(practice.querySelectorAll('[data-activity-fullscreen-toggle]').length,0);
 await api.open(list);const refreshed=make('div',{class:'unified-practice'}),old=[...list.children];list.replaceChildren(refreshed);await flush(list,[refreshed],old);assert.equal(api.getState().element,list);assert.equal(list.querySelectorAll('[data-activity-fullscreen-toggle]').length,1);api.close();
 // Native heart/wire tools stay independent and never receive another toolbar.
 for(const id of ['heart-lab','wire-field-lab']){const root=make('section',{id});root.appendChild(make('div',{class:'unified-practice'}));mount(root,chapter);assert.equal(root.querySelectorAll('[data-activity-fullscreen-toggle]').length,0);}
 const unrelated=mount(make('section',{class:'lab'}),chapter);assert.equal(unrelated.querySelectorAll('[data-activity-fullscreen-toggle]').length,0,'Generic instructional boxes are not mislabeled as vector activities');
 const vector=make('section',{class:'lab'});vector.appendChild(make('input',{id:'vector-ax'}));mount(vector,chapter);assert.equal(vector.querySelectorAll('[data-activity-fullscreen-toggle]').length,1);
 api.stop();assert.equal(api.getState(),null);assert.equal(doc.documentElement.classList.contains('activity-fs-open'),false);
 console.log('PASS: same-node full screen, native rejection fallback and native exit, Escape, preserved delegation/state, rerender transfer, removal cleanup, practice identity, no duplicate controls, and existing heart/wire exclusion.');
}
checks().catch(error=>{console.error(error);process.exitCode=1;});
