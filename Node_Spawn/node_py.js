
//获取到创建进程的方法
const spawn = require('child_process').spawn;
const word = '呵呵呵你妈个比';
const ls = spawn('python', ['/Users/W_littlewhite/Documents/Git/I_life_node/Node_Spawn/wordToVoice.py',word]);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});