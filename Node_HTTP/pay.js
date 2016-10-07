var http = require('http');
var fs = require('fs');

function epay(params){

	var boundaryKey = '----' + new Date().getTime();

	var options = { 
		host: '127.0.0.1', 
		port: 2333,
		path: '/upload',
		method: 'post',
		headers: {
			'Content-Type':'multipart/form-data; boundary=' + boundaryKey,
			'Content-Length':params.length,
			'Connection':'keep-alive'
		}
	};

	//使用http 发送
	var req = http.request(options, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));

		//设置字符编码
		res.setEncoding('utf8');

		//返回数据流
		var _data="";

		//数据
		res.on('data', function (chunk) {
			_data+=chunk;
			console.log('BODY: ' + chunk);
		});

		// 结束回调
		res.on('end', function(){
			console.log("REBOAK:",_data)
		});

		//错误回调 // 这个必须有。 不然会有不少 麻烦
		req.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});

	});

	req.write(
        '–' + boundaryKey + '\r\n' +
        'Content-Disposition: form-data; name="upload"; filename="'+ params +'"\r\n' +
        'Content-Type: application/x-jpg\r\n\r\n'
    );

	//设置1M的缓冲区
	console.log(params);
    var fileStream = fs.createReadStream(params,{bufferSize:1024 * 1024});

    fileStream.pipe(req,{end:false});

    fileStream.on('end',function(){

        req.end('\r\n–' + boundaryKey + '–');

    });

}
exports.epay=epay;

