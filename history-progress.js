// Keep the previous curriculum's records intact. Only equivalent lessons migrate.
window.HistoryProgress=(()=>{
  const list=value=>Array.isArray(value)?value:[];
  const union=(a,b)=>[...new Set([...list(a),...list(b)])];
  const maxMap=(a={},b={})=>Object.fromEntries([...new Set([...Object.keys(a),...Object.keys(b)])].map(k=>[k,Math.max(Number(a[k])||0,Number(b[k])||0)]));
  const mergeQuiz=(a={},b={})=>Object.fromEntries([...new Set([...Object.keys(a),...Object.keys(b)])].map(k=>[k,{...a[k],...b[k]}]));
  function merge(a={},b={}){
    const newer=Number(b.updatedMs||0)>Number(a.updatedMs||0)?b:a;
    const older=newer===a?b:a;
    return {...older,...newer,completedItems:union(a.completedItems,b.completedItems),
      attempts:maxMap(a.attempts,b.attempts),itemScores:maxMap(a.itemScores,b.itemScores),
      quizAnswers:mergeQuiz(older.quizAnswers,newer.quizAnswers),quizResults:mergeQuiz(older.quizResults,newer.quizResults),
      practiceMastered:union(a.practiceMastered,b.practiceMastered),
      examBest:Math.max(Number(a.examBest)||0,Number(b.examBest)||0),
      examAttempts:Math.max(Number(a.examAttempts)||0,Number(b.examAttempts)||0)};
  }
  function project(source,data={}){
    if(source.sameAssessment)return {...data};
    const p={completedItems:[],attempts:{},itemScores:{},quizAnswers:{},quizResults:{},updatedMs:0};
    for(const [oldIndex,newIndex] of source.items){
      if(list(data.completedItems).includes(oldIndex))p.completedItems.push(newIndex);
      for(const field of ['attempts','itemScores']){
        const value=data[field]?.['item_'+(oldIndex+1)];
        if(value!=null)p[field]['item_'+(newIndex+1)]=value;
      }
      for(const field of ['quizAnswers','quizResults']){
        const answers=data[field]?.[oldIndex];
        if(answers)p[field][newIndex]=Object.fromEntries(Object.entries(answers).map(([id,value])=>[id.replace(/^u\d+/, 'u'+(newIndex+1)),value]));
      }
    }
    return p;
  }
  function combine(meta,current={},records={}){
    let p={...current};
    for(const source of meta.legacySources||[])p=merge(p,project(source,records[source.id]||{}));
    const completedItems=union(p.completedItems,[]).filter(i=>Number.isInteger(i)&&i>=0&&i<meta.items).sort((a,b)=>a-b);
    const examBest=Math.min(10,Math.max(0,Number(p.examBest)||0));
    let unlockedItem=0;while(unlockedItem<meta.items&&completedItems.includes(unlockedItem))unlockedItem++;
    const hasExam=meta.number>1;
    return {...p,completedItems,examBest,unlockedItem:Math.min(unlockedItem,meta.items-1),
      percent:Math.round((completedItems.length+(hasExam&&examBest>=7?1:0))/(meta.items+(hasExam?1:0))*100),
      chapterCompleted:completedItems.length===meta.items&&(!hasExam||examBest>=7)};
  }
  function ids(meta){return [...new Set([meta.progressId,...(meta.legacySources||[]).map(s=>s.id)])];}
  return {merge,combine,ids};
})();
