//引入express框架
var express = require('express');
var app = express();
var formidable = require('formidable');

app.get('/',function (req,res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/upload', function(req, res) {

  	var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = __dirname;	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

	form.parse(req, function(err, fields, files) {

	    // if (err) {
	    //   res.locals.error = err;
	    //   return;		
	    // }  

	    // var newPath = form.uploadDir + '.jpg';

	    // console.log(newPath);
	    // fs.renameSync(files.fulAvatar.path, newPath);  //重命名
	});

  	res.send('上传成功');
});

//服务器启动
var server = app.listen(2333,function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('应用实例，访问地址为http://%s:%s',host,port);
});