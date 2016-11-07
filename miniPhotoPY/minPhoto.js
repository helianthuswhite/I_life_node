var sharp = require('sharp');

sharp(__dirname + '/p2.jpg')
	.resize(1000, 800)
	.toFile(__dirname + '/output.jpg', function(err) {
	    if (err) {
	    	console.log(err);
	    }
	});