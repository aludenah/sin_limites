(() => {
  const ADMIN_EMAILS=['alexludenah@gmail.com'];
  let adminEnabled=false;

  function isAdmin(user){
    return Boolean(user&&ADMIN_EMAILS.includes(String(user.email||'').toLowerCase()));
  }

  function syncAdminButton(){
    const existing=document.getElementById('admin-panel-link');
    if(!adminEnabled){
      if(existing)existing.remove();
      return;
    }
    if(existing)return;
    const link=document.createElement('a');
    link.id='admin-panel-link';
    link.href='admin.html';
    link.className='fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-2xl bg-red-600 px-4 py-3 text-sm font-extrabold text-white shadow-xl shadow-red-950/20 hover:bg-red-700 transition';
    link.innerHTML='<span aria-hidden="true">▦</span><span>Panel docente</span>';
    document.body.appendChild(link);
  }

  auth.onAuthStateChanged(user=>{
    adminEnabled=isAdmin(user);
    syncAdminButton();
  });

  new MutationObserver(syncAdminButton).observe(document.body,{childList:true,subtree:true});
})();
