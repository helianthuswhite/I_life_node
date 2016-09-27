
var cv = require('opencv');

try {
  var camera = new cv.VideoCapture(0);
  var window = new cv.NamedWindow('Video', 0); 
  
  var timer = setInterval(function() {
    camera.read(function(err, im) {
      if (err) throw err;
      console.log(im.size());

      if (im.size()[0] > 0 && im.size()[1] > 0){
        window.show(im);
      }

      if (window.blockingWaitKey(20) == 27) {
        im.save('./Node_Opencv/camera.jpg');
        console.log('图像以保存');
        clearInterval(timer);
        return;
      }

    });
  },20);
  
} catch (e){
  console.log("Couldn't start camera:", e)
}

