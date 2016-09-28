
var tinify = require("tinify");
var fs = require("fs");

tinify.key = "1L9r-00wvxnXV4vMINuxS7VQMWcn3Pua";

var source = tinify.fromFile("/Users/W_littlewhite/Documents/Git/Node_tools/Baidu_OCR/camera.png");
source.toFile("/Users/W_littlewhite/Documents/Git/Node_tools/Baidu_OCR/camera_min.png");