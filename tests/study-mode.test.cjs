// The shared suite checks both modes, gap-safe unlocks and retained achievements.
const {testChapters,testModel}=require('./practice-ten.test.cjs');
testModel();
testChapters(['historia-universal-presentacion-01','fisica-capitulo-02']).catch(error=>{console.error(error);process.exitCode=1;});
