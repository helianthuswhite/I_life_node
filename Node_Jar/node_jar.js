
//获取到创建进程的方法
const spawn = require('child_process').spawn;
const ls = spawn('java', ['-jar', '/Users/W_littlewhite/Documents/Git/Node_tools/Node_Jar/test.jar']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});