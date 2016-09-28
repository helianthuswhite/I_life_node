
var Camera = require('./camera');
var BaiduOCR = require('./baidu-ocr');
var TinyImage = require('./tinypng');

const IMAGE_URL = 'images/img.png';
const IMAGE_MIN_URL = 'images/img_min.png';

var callback = function () {
	TinyImage.execute(IMAGE_URL,IMAGE_MIN_URL,BaiduOCR.recognize);
}

//调用拍照服务
Camera.run(IMAGE_URL,callback);
