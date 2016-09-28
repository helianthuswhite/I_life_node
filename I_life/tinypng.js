
var tinify = require("tinify");

tinify.key = "1L9r-00wvxnXV4vMINuxS7VQMWcn3Pua";

var TinyImage = {
	execute:function (image_in_url,image_out_url) {
		var source = tinify.fromFile(image_in_url);
		source.toFile(image_out_url);	
	}
}

module.exports = TinyImage;