/**

登陆 百度bcs控制台中心 申请access key
https://console.bce.baidu.com/iam/#/iam/accesslist

**/
var ak = '729162badbc5401ea84641dec32edc07';
var sk = '98c544cfaa9c4a16bdee1cc0bccfcd33';
var ocr = require('baidu-ocr-api').create(ak,sk);

var startTime = (new Date()).getTime();

// 外部图片
ocr.scan({
  	url:__dirname + '/output.jpg', // 支持本地路径
  	type:'text',
}).then(function (result) {
	var endTime = (new Date()).getTime();
	console.log(result.results.words.toString().replace(/[^\u4e00-\u9fa5]/gi,""));
  	console.log(endTime - startTime);
}).catch(function (err) {
  	console.log('出错啦');
});