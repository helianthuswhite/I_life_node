// 加入node-opencv库
var cv = require('opencv');

try {
  //打开摄像头
  var camera = new cv.VideoCapture(0);
  // 创建新的窗体
  var window = new cv.NamedWindow('Video', 0); 
  // 创建定时器，获取每一帧图像
  var timer = setInterval(function() {
    camera.read(function(err, im) {
      if (err) throw err;
      // 如果图像存在就显示图像
      if (im.size()[0] > 0 && im.size()[1] > 0){
        window.show(im);
      }
      // 获取窗体下的按键
      var codeKey = window.blockingWaitKey(20);

      console.log(codeKey);
      // 如果按下回车键就保存图像，如果是ESC键就退出
      if (codeKey == 13) {
        im.save('./Node_Opencv/camera.jpg');
        console.log('图像以保存!');
      } else if (codeKey == 27) {
        console.log('即将退出程序!');
        // 清除定时器并杀死所有进程
        clearInterval(timer);
        process.abort();
      }
    });
  },20);
  
} catch (e){
  console.log("Couldn't start camera:", e)
}

