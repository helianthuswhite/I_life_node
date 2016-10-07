var http = require('http');

function epay(params){

	console.log(" COME IN"); 
	var params = JSON.stringify({ 
	"sign":"ExdYcut6LgrKGsHuAyoxFTMDuDYVmyFFu7GRHPRwB/DBwm6cyBe9Sr2rti1/SjWPcdXLoWIHWEJ9IFKPK+3ieKU/MkNqeh1opH/4MEM59W314jQL3/sPS+X8qsEInj7OsfXCfOKXJXTw+WeVBOBHep4SBIAkgLjvRYSg1/Bv7ck="});

	var options = { 
		host: '127.0.0.1', 
		port: 2333,
		path: '/upload',
		method: 'post',
		headers: {
		'Content-Type':'application/x-www-form-urlencoded',
		'Content-Length':params.length
	}};

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

	req.write(params + "\n");
	req.end();

}
exports.epay=epay;

