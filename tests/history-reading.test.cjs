// Shared practice contract replaces the former lesson controls and final exam.
const {testChapters}=require('./practice-ten.test.cjs');
testChapters(["historia-universal-presentacion-01"]).catch(error=>{console.error(error);process.exitCode=1;});
