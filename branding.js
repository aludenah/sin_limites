(() => {
  const replacements = new Map([
    ['Academia Virtual · Admisión 2026-II', 'Academia Virtual'],
    ['Temario estructurado para la Prueba General de Admisión 2026-II', 'Temario estructurado para tu ruta de estudio']
  ]);

  function applyBranding(){
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
      const current=node.nodeValue;
      if(replacements.has(current)) node.nodeValue=replacements.get(current);
    }
  }

  applyBranding();
  new MutationObserver(applyBranding).observe(document.body,{childList:true,subtree:true});
})();
