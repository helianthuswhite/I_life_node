//引入express框架
var express = require('express');
var app = express();
var formidable = require('formidable');
var fs = require('fs');

var Imagename = '/1.jpg';

app.get('/',function (req,res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/upload', function(req, res) {

  	var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = __dirname;	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 4 * 1024 * 1024;   //文件大小

	form.parse(req, function(err, fields, files) {
		if (err) {
			console.log(err);
		}
		console.log("parsing done");
		// var types = files.upload.name.split('.'); //将文件名以.分隔，取得数组最后一项作为文件后缀名。

	    fs.rename(files.upload.path, __dirname + Imagename,function(){
	    	res.send('上传成功');
	    });

	});
});

//服务器启动
var server = app.listen(2333,function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('应用实例，访问地址为http://%s:%s',host,port);
});