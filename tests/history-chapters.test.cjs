// Shared practice contract replaces the former lesson controls and final exam.
const {testChapters}=require('./practice-ten.test.cjs');
testChapters(["historia-universal-pdf-02", "historia-universal-pdf-03", "historia-universal-pdf-04", "historia-universal-pdf-05", "historia-universal-pdf-06"]).catch(error=>{console.error(error);process.exitCode=1;});
