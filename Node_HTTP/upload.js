var http = require('http');
var fs = require('fs');

function upload(args){
    var boundaryKey = '----' + new Date().getTime();
    var options = {
        host:'192.168.1.247',//远端服务器域名
        port:2333,//远端服务器端口号
        method:'POST',
        path:'/upload',//上传服务路径
        headers:{
            'Content-Type':'multipart/form-data; boundary=' + boundaryKey,
            'Connection':'keep-alive'
        }
    };
    var req = http.request(options,function(res){
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('body: ' + chunk);
        });
        res.on('end',function(){
            console.log('res end.');
        });
    });
    req.write(
        '--' + boundaryKey + '\r\n' +
        'Content-Disposition: form-data; name="upload"; filename="image.jpg"\r\n' +
        'Content-Type: application/x-jpg\r\n\r\n'
    );
    //设置1M的缓冲区
    var fileStream = fs.createReadStream(args,{bufferSize:1024 * 1024});
    fileStream.pipe(req,{end:false});
    fileStream.on('end',function(){
        req.end('\r\n--' + boundaryKey + '--');
    });
}

exports.upload = upload;