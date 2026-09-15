window.HISTORY_CAP1_SPRITE='';
(function(){
  const archivedSprite='https://raw.githubusercontent.com/aludenah/sin_limites/28a8813a87cd37f261e60a24c228dcf4b87e1ed7/assets/history-cap1-ai.js';
  function paint(root){
    if(!window.HISTORY_CAP1_SPRITE)return;
    const scope=root&&root.querySelectorAll?root:document;
    scope.querySelectorAll('.history-art,.art').forEach(el=>{
      if(el.dataset.aiImageFixed==='1')return;
      let index=0;
      for(let i=0;i<5;i++)if(el.classList.contains('art-'+i)||el.classList.contains('a'+i))index=i;
      el.dataset.aiImageFixed='1';
      el.style.backgroundImage='none';
      el.style.overflow='hidden';
      el.style.position='relative';
      const img=document.createElement('img');
      img.src=window.HISTORY_CAP1_SPRITE;
      img.alt=el.getAttribute('aria-label')||'Ilustración educativa creada con IA';
      img.style.cssText='display:block;width:100%;height:500%;max-width:none;object-fit:fill;transform:translateY(-'+(index*20)+'%);transform-origin:top left;';
      el.appendChild(img);
    });
  }
  async function loadSprite(){
    try{
      const res=await fetch(archivedSprite,{cache:'force-cache'});
      if(!res.ok)throw new Error('No se pudo recuperar el recurso visual');
      const text=await res.text();
      const match=text.match(/window\.HISTORY_CAP1_SPRITE='([^']+)'/);
      if(!match)throw new Error('No se encontró la imagen codificada');
      window.HISTORY_CAP1_SPRITE=match[1];
      document.documentElement.style.setProperty('--spr','url("'+match[1]+'")');
      document.documentElement.style.setProperty('--history-sprite','url("'+match[1]+'")');
      paint(document);
      const observer=new MutationObserver(mutations=>{
        for(const mutation of mutations){
          for(const node of mutation.addedNodes){
            if(node.nodeType===1){
              if(node.matches&&node.matches('.history-art,.art'))paint(node.parentNode||document);
              else paint(node);
            }
          }
        }
      });
      observer.observe(document.documentElement,{childList:true,subtree:true});
      setTimeout(()=>paint(document),500);
      setTimeout(()=>paint(document),1500);
    }catch(err){
      console.error('SIN LÍMITES · imágenes IA:',err);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadSprite,{once:true});
  else loadSprite();
})();
