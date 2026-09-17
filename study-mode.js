(function(global){
  'use strict';
  const memory=new Map(),queues=new Map();
  const valid=mode=>mode==='free'||mode==='progressive';
  const key=uid=>'sin-limites:'+uid+':study-mode';
  function read(uid){
    if(!uid)return null;
    let saved=null;
    try{saved=JSON.parse(global.localStorage.getItem(key(uid))||'null');}catch{}
    if(!valid(saved?.mode))saved=null;
    const cached=memory.get(uid);
    return cached&&(!saved||cached.updatedMs>saved.updatedMs)?cached:saved;
  }
  function remember(uid,value){
    memory.set(uid,value);
    try{global.localStorage.setItem(key(uid),JSON.stringify(value));}catch{}
    return value.mode;
  }
  function choose(uid,mode){
    if(!uid||!valid(mode))return null;
    return remember(uid,{mode,updatedMs:Math.max(Date.now(),(read(uid)?.updatedMs||0)+1)});
  }
  function save(uid,db){
    const value=read(uid);if(!value||!db)return Promise.resolve(false);
    const pending=(queues.get(uid)||Promise.resolve()).catch(()=>{}).then(async()=>{
      try{
        await db.collection('users').doc(uid).collection('progress').doc('navigation').set({studyMode:value.mode,studyModeUpdatedMs:value.updatedMs},{merge:true});
        return true;
      }catch{return false;}
    });
    queues.set(uid,pending);return pending;
  }
  async function load(uid,db){
    if(!uid)return null;
    try{
      const snap=await db.collection('users').doc(uid).collection('progress').doc('navigation').get();
      const data=snap.exists?snap.data():{};
      const remote=valid(data?.studyMode)?{mode:data.studyMode,updatedMs:Math.max(0,Number(data.studyModeUpdatedMs)||0)}:null;
      const local=read(uid);
      if(remote&&(!local||remote.updatedMs>local.updatedMs))remember(uid,remote);
      else if(local&&(!remote||local.updatedMs>remote.updatedMs))save(uid,db);
    }catch{}
    return read(uid)?.mode||null;
  }
  async function requireChoice(uid,db,chapter,isCurrent=()=>true){
    const mode=read(uid)?.mode||await load(uid,db);
    if(!isCurrent())return false;
    if(mode)return true;
    global.location.replace('index.html?chapter='+encodeURIComponent(chapter)+'&v=20260918-language1');
    return false;
  }
  global.StudyMode={valid,get:uid=>read(uid)?.mode||null,choose,save,load,requireChoice,key};
})(window);
