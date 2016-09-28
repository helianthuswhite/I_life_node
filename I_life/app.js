
var Camera = require('./camera');
var BaiduOCR = require('./baidu-ocr');
var TinyImage = require('./tinypng');
var cv = require('opencv');

//调用拍照服务
Camera.run();

console.log(image);
// image.save('./test.png');