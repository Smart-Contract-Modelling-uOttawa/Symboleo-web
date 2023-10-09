const JavaCaller = require('java-caller');


const java = JavaCaller({
    jar: './server/ca.uottawa.csmlab.symboleo.ide-1.0.0-SNAPSHOT-ls.jar'
});
const { status, stdout, stderr } = java.run();
console.log(status)
console.log(stdout)
console.log(stderr)