
var path = require('path');
var fs = require('fs');
var http = require('http');
 
function postFile(fileKeyValue, req) {

  	var boundaryKey = Math.random().toString(16);
  	var enddata = '\r\n----' + boundaryKey + '--';
 
   	var content = "\r\n----" + boundaryKey + "\r\n" + 
	   	"Content-Type: application/octet-stream\r\n" + 
	   	"Content-Disposition: form-data; name=\"" + fileKeyValue.name +
	   	"\"; filename=\"" + path.basename(fileKeyValue.url) + 
	   	"\"\r\n" + "Content-Transfer-Encoding: binary\r\n\r\n";

   	var contentBinary = new Buffer(content, 'utf-8');

   	var file = {
   		contentBinary: contentBinary, 
   		filePath: fileKeyValue.url
   	}

   	var contentLength = 0; 

	var stat = fs.statSync(file.filePath);

   	contentLength += file.contentBinary.length;

   	contentLength += stat.size;
 
  	req.setHeader('Content-Type', 'multipart/form-data; boundary=--' + boundaryKey);
  	req.setHeader('Content-Length', contentLength + Buffer.byteLength(enddata));

  	console.log(file);

	var doOneFile = function(){

	   	req.write(file.contentBinary);

	   	var fileStream = fs.createReadStream(file.filePath, {bufferSize : 4 * 1024});
	   	
	   	fileStream.pipe(req, {end: false});
	   	
	   	fileStream.on('end', function() {
	      	req.end(enddata);
	   	});

	    req.end(enddata);
	}      
}
 
var files = {
 	name: "image", 
 	url: "/Users/W_littlewhite/Downloads/2.jpg"
}

var options = { 
 	host: "localhost", 
 	port: "2333" , 
 	method: "POST", 
 	path: "/upload"
}
 
var req = http.request(options, function(res){
 	console.log('STATUS: ' + res.statusCode);
 	console.log('HEADERS: ' + JSON.stringify(res.headers));
 	res.on("data", function(chunk){
  		console.log("BODY:" + chunk);
 	});
});
 
req.on('error', function(e){
 	console.log('problem with request:' + e.message);
 	console.log(e);
});

postFile(files, req);

console.log("done");