//引入express框架
var express = require('express');
var app = express();
var upload = require('./upload');

var filepath = '/Users/W_littlewhite/Downloads/zhangxu.mp3';

app.get('/',function (req,res) {
	upload.upload(filepath)
});

app.post('/', function(req, res) {
	upload.upload(filepath);
});

//服务器启动
var server = app.listen(21000,function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('应用实例，访问地址为http://%s:%s',host,port);
});