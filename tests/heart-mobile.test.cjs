const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {pathToFileURL}=require('node:url');
const root=path.join(__dirname,'..');

// Expose closure functions in this test's VM only; the shipped viewer has no test API.
function harness(){
  const source=fs.readFileSync(path.join(root,'heart-3d.js'),'utf8').replace(
    'global.ChapterInteractions={render,mount,unmount};',
    'global.ChapterInteractions={render,mount,unmount};global.__heartTest={draw,release3D,showFallback,initialize3D,updateMaterials,unmount,prefersLightMode,setImports:value=>{imports=Promise.resolve(value);},setCurrent:value=>{current=value;}};'
  );
  let nextFrame=0;
  const pending=new Map(),nodes=new Map(),buttons=[{disabled:false}];
  const node=selector=>{
    if(!nodes.has(selector))nodes.set(selector,{style:{},hidden:false,textContent:'',innerHTML:'',setAttribute(){},replaceChildren(){}});
    return nodes.get(selector);
  };
  const context={window:{console:{info(){}},navigator:{},innerWidth:400},console:{info(){}},AbortController,
    performance:{now:()=>0},setTimeout,clearTimeout,
    requestAnimationFrame:fn=>{pending.set(++nextFrame,fn);return nextFrame;},
    cancelAnimationFrame:id=>pending.delete(id),
    fetch:()=>{throw new Error('Unexpected fetch');}
  };
  vm.runInNewContext(source,context,{filename:'heart-3d.js'});
  function active(overrides={}){
    return Object.assign({disposed:false,fallback:false,attempt:1,frame:0,visible:true,
      host:{isConnected:true},light:false,lastFrame:-Infinity,dirty:0,flow:false,flowDirty:false,
      rotate:false,transition:null,interacting:false,scene:null,renderer:null,controls:null,camera:null,
      selected:null,meshes:[],materials:[],meshByPart:new Map(),partCenters:new Map(),beads:[],
      controller:new AbortController(),loadController:new AbortController(),renderController:new AbortController(),
      renderCleanups:[],q:node,all:()=>buttons,flowStart:0},overrides);
  }
  return {api:context.window.__heartTest,context,active,nodes,pending,buttons};
}
const deferred=()=>{let resolve,reject;const promise=new Promise((yes,no)=>{resolve=yes;reject=no;});return {promise,resolve,reject};};
const tick=()=>new Promise(resolve=>setImmediate(resolve));

function renderScheduling(){
  const h=harness();let renders=0,updates=0,beadMoves=0;
  const a=h.active({dirty:2,flow:true,renderer:{render(){renders++;}},scene:{},camera:{},
    controls:{update(){updates++;}},beads:[{length:100,path:{getPointAtLength:u=>({x:u,y:u})},bead:{setAttribute(){beadMoves++;}}}]});
  for(let t=0;t<=1000;t+=20)h.api.draw(a,t);
  assert.equal(renders,2,'A stationary heart renders only its two invalidated frames while the SVG flows');
  assert.equal(updates,2,'Static SVG animation must not update OrbitControls');
  assert.ok(beadMoves>20,'The independent SVG flow keeps moving');

  let lightRenders=0;const renderedAt=[];
  const light=h.active({light:true,rotate:true,renderer:{render(){lightRenders++;renderedAt.push(light.lastFrame);}},
    scene:{},camera:{},controls:{update(){}}});
  for(let t=0;t<1000;t+=10)h.api.draw(light,t);
  assert.ok(lightRenders<=31&&lightRenders>=24,'Light mode limits continuous rendering to at most 30 fps');
  for(let i=1;i<renderedAt.length;i++)assert.ok(renderedAt[i]-renderedAt[i-1]>=1000/30-1);
}

function releaseAndFallback(){
  const h=harness(),counts={cleanup:0,resize:0,controls:0,geometry:0,material:0,renderer:0,context:0,remove:0};
  const geometry={dispose(){counts.geometry++;}},material={dispose(){counts.material++;}};
  const a=h.active({transition:{start:0},interacting:true,
    renderCleanups:[()=>counts.cleanup++],resizeObserver:{disconnect(){counts.resize++;}},
    controls:{dispose(){counts.controls++;}},
    scene:{traverse:fn=>fn({geometry,material})},
    renderer:{dispose(){counts.renderer++;},forceContextLoss(){counts.context++;},domElement:{remove(){counts.remove++;}}},
    meshes:[{}],meshByPart:new Map([['right-atrium',[{}]]]),partCenters:new Map([['right-atrium',{}]])});
  const load=a.loadController,events=a.renderController;
  h.api.release3D(a);
  assert.equal(load.signal.aborted,true);assert.equal(events.signal.aborted,true);
  assert.deepEqual(counts,{cleanup:1,resize:1,controls:1,geometry:1,material:1,renderer:1,context:1,remove:1});
  assert.equal(a.attempt,2);assert.equal(a.transition,null);assert.equal(a.interacting,false);
  assert.equal(a.renderer,null);assert.equal(a.controls,null);assert.equal(a.resizeObserver,null);
  assert.equal(a.meshes.length,0);assert.equal(a.meshByPart.size,0);assert.equal(a.partCenters.size,0);
  h.api.release3D(a);
  assert.equal(counts.renderer,1,'Repeated cleanup cannot dispose an old renderer again');

  const b=h.active({dirty:2,transition:{start:0,from:{},to:{}},controls:{dispose(){}},flow:true});
  h.api.showFallback(b,{message:'context lost',bhReason:'context'});
  assert.equal(b.fallback,true);assert.equal(b.transition,null);assert.equal(b.controls,null);
  assert.match(h.nodes.get('[data-bh-error-message]').textContent,/liberar recursos/);
  assert.doesNotThrow(()=>h.api.draw(b,100),'Fallback during a camera transition must keep the SVG and controls usable');
  assert.equal(h.buttons[0].disabled,true);
}

async function staleLoadAttempts(){
  // Supersede a fetch that ignores abort. Its eventual bytes cannot be parsed or attached.
  {
    const h=harness(),download=deferred();let parses=0;
    h.api.setImports({GLTFLoader:class {parseAsync(){parses++;throw new Error('Stale bytes parsed');}}});
    h.context.fetch=()=>download.promise;
    const a=h.active(),loading=h.api.initialize3D(a,1);await tick();
    h.api.release3D(a);download.resolve({ok:true,arrayBuffer:async()=>new ArrayBuffer(0)});await loading;
    assert.equal(parses,0);assert.equal(a.model,null);assert.equal(a.renderer,null);
  }
  // A parse already in flight must dispose its late geometry after reinitialization.
  {
    const h=harness(),parsed=deferred();let disposal=0,renderers=0;
    h.api.setImports({THREE:{WebGLRenderer:class {constructor(){renderers++;}}},
      GLTFLoader:class {parseAsync(){return parsed.promise;}}});
    h.context.fetch=async()=>({ok:true,arrayBuffer:async()=>new ArrayBuffer(0)});
    const a=h.active(),loading=h.api.initialize3D(a,1);await tick();
    h.api.release3D(a);
    parsed.resolve({scene:{traverse:fn=>fn({geometry:{dispose(){disposal++;}}})}});await loading;
    assert.equal(disposal,1);assert.equal(renderers,0);assert.equal(a.model,null);
  }
  // Unmount aborts an in-flight load and prevents a late model from crossing chapter/account boundaries.
  {
    const h=harness(),parsed=deferred();let disposal=0;
    h.api.setImports({GLTFLoader:class {parseAsync(){return parsed.promise;}}});
    h.context.fetch=async()=>({ok:true,arrayBuffer:async()=>new ArrayBuffer(0)});
    const a=h.active();h.api.setCurrent(a);
    const loading=h.api.initialize3D(a,1);await tick();h.api.unmount();
    parsed.resolve({scene:{traverse:fn=>fn({geometry:{dispose(){disposal++;}}})}});await loading;
    assert.equal(a.disposed,true);assert.equal(a.controller.signal.aborted,true);
    assert.equal(a.loadController.signal.aborted,true);assert.equal(disposal,1);assert.equal(a.model,null);
  }
}

async function actualBundleAndAnatomy(){
  const bundle=await import(pathToFileURL(path.join(root,'vendor/heart-three-160.mjs')).href);
  assert.equal(bundle.THREE.REVISION,'160');
  const bytes=fs.readFileSync(path.join(root,'assets/biologia-corazon.glb'));
  const parsed=await new bundle.GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'');
  const names=[];let triangles=0;
  parsed.scene.traverse(object=>{
    if(!object.isMesh)return;names.push(object.name);
    triangles+=(object.geometry.index?.count||object.geometry.attributes.position.count)/3;
    assert.ok(object.geometry.attributes.position.count>0);
  });
  const expected=['right-atrium','left-atrium','ventricular-wall','right-ventricle','left-ventricle','ascending-aorta','aortic-arch','pulmonary-trunk','superior-vena-cava','left-coronary','right-coronary'];
  assert.deepEqual(names.sort(),expected.sort());assert.ok(triangles>90000&&triangles<100000);
  parsed.scene.traverse(object=>{object.geometry?.dispose();for(const material of object.material?(Array.isArray(object.material)?object.material:[object.material]):[])material.dispose();});
}

async function successfulInitialization(){
  // Exercise the real GLTF loader, model traversal, geometry bounds, materials,
  // visibility and camera math. Only GPU access and browser controls are stubbed.
  const bundle=await import(pathToFileURL(path.join(root,'vendor/heart-three-160.mjs')).href);
  const bytes=fs.readFileSync(path.join(root,'assets/biologia-corazon.glb'));
  for(const light of [true,false]){
    const h=harness(),canvasHost=h.active().q('[data-bh-canvas]');
    Object.assign(canvasHost,{clientWidth:375,clientHeight:415,children:[],appendChild(child){this.children.push(child);}});
    h.context.window.devicePixelRatio=3;
    let resizeCallback;
    h.context.ResizeObserver=class {
      constructor(callback){resizeCallback=callback;}
      observe(){}
      disconnect(){}
    };
    class Canvas extends EventTarget {
      constructor(){super();this.attributes={};this.clientWidth=375;this.clientHeight=415;this.style={};}
      setAttribute(name,value){this.attributes[name]=value;}
      remove(){this.removed=true;}
    }
    class Renderer {
      constructor(options){this.options=options;this.domElement=new Canvas();this.renders=0;}
      setPixelRatio(ratio){this.ratio=ratio;}
      setSize(width,height){this.width=width;this.height=height;}
      render(){this.renders++;}
      dispose(){this.disposed=true;}
      forceContextLoss(){}
    }
    class Controls extends EventTarget {
      constructor(camera){super();this.camera=camera;this.target=new bundle.THREE.Vector3();}
      update(){this.camera.lookAt(this.target);}
      dispose(){this.disposed=true;}
    }
    h.api.setImports({THREE:{...bundle.THREE,WebGLRenderer:Renderer},GLTFLoader:bundle.GLTFLoader,OrbitControls:Controls});
    h.context.fetch=async()=>({ok:true,arrayBuffer:async()=>bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength)});
    const a=h.active({light,view:'external',tab:'explore'});
    a.renderListen=(target,event,listener)=>{
      target.addEventListener(event,listener,{signal:a.renderController.signal});
      a.renderCleanups.push(()=>target.removeEventListener(event,listener));
    };
    await h.api.initialize3D(a,a.attempt);
    assert.equal(a.meshes.length,11);assert.equal(a.meshByPart.size,11);assert.equal(a.partCenters.size,11);
    assert.equal(canvasHost.children.length,1);assert.equal(a.renderer.options.antialias,!light);
    assert.equal(a.renderer.options.stencil,false);
    assert.equal(a.q('[data-bh-loading]').hidden,true);
    assert.equal(a.q('[data-bh-status]').textContent,light?'Modelo 3D · modo ligero':'Modelo anatómico 3D');
    assert.equal(h.buttons[0].disabled,false,'Model controls are enabled after successful initialization');
    assert.equal(a.q('[data-bh-action="isolate"]').disabled,true,'Isolation requires a selected structure');
    assert.ok(a.renderer.ratio<=(light?1:1.7));
    const originalColors=a.materials.map(material=>material.color.clone());
    for(let i=0;i<a.meshes.length;i++){
      const material=a.meshes[i].material;
      assert.equal(light?material.isMeshPhongMaterial:material.isMeshStandardMaterial,true);
      assert.ok(material.color.equals(originalColors[i]),'Both profiles preserve original anatomy colors');
      assert.equal(material.forceSinglePass,true);
      assert.equal(material.side,bundle.THREE.DoubleSide);
    }
    assert.equal(a.meshByPart.get('ventricular-wall')[0].visible,true);
    assert.equal(a.meshByPart.get('right-ventricle')[0].visible,false);
    assert.equal(a.meshByPart.get('left-ventricle')[0].visible,false);
    a.view='internal';a.selected='left-atrium';h.api.updateMaterials(a);
    assert.equal(a.meshByPart.get('ventricular-wall')[0].visible,false);
    assert.equal(a.meshByPart.get('right-ventricle')[0].visible,true);
    assert.equal(a.meshByPart.get('left-ventricle')[0].visible,true);
    for(const mesh of a.meshes){
      const selected=mesh.userData.bhPart==='left-atrium',material=mesh.material;
      assert.equal(material.transparent,!light&&!selected);
      assert.equal(material.opacity,(!light&&!selected) ? .24 : 1);
      assert.equal(material.depthWrite,light||selected);
    }
    // Large tablet: cap actual backing-buffer area, not just devicePixelRatio.
    canvasHost.clientWidth=1200;canvasHost.clientHeight=1000;resizeCallback();
    assert.ok(a.renderer.ratio<=(light?1:1.7));
    assert.ok(a.renderer.width*a.renderer.height*a.renderer.ratio**2<=(light?500000:1500000)+.0001);
    const renderer=a.renderer;
    h.api.draw(a,0);assert.equal(renderer.renders,1);
    h.api.release3D(a);assert.equal(renderer.disposed,true);assert.equal(renderer.domElement.removed,true);
  }
}

async function main(){
  renderScheduling();releaseAndFallback();await staleLoadAttempts();await actualBundleAndAnatomy();await successfulInitialization();
  console.log('PASS: independent SVG/3D rendering, mobile frame cap, complete cleanup, context-loss fallback, stale loads/unmount isolation, actual GLB parsing and full light/standard initialization with all 11 structures and real materials/camera math.');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
