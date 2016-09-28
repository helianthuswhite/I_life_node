
var tinify = require("tinify");

tinify.key = "1L9r-00wvxnXV4vMINuxS7VQMWcn3Pua";

const IMAGE_URL = 'images/img.png';
const IMAGE_MIN_URL = 'images/img_min.png';

var TinyImage = {
	execute:function (image_in_url,image_out_url,callback) {
		console.log('开始压缩');
		var source = tinify.fromFile(__dirname + '/' +image_in_url);
		source.toFile(__dirname + '/' + image_out_url,function () {
			console.log('结束压缩');
			callback(__dirname + '/' + image_out_url);
		});		
	}
}

module.exports = TinyImage;

TinyImage.execute(IMAGE_URL,IMAGE_MIN_URL);