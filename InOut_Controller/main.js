
var fs = require('fs');

function getProtocol(proto) {
    if (proto === 'http') {
        return require('http');
    } else {
        return require('https');
    }
}

function createServer(proto,hostname,path,port,data,keys) {
    var options = {
        hostname:hostname,
        path:path,
        port:port,
        method:'POST',
        headers: {
            'Content-Type':'application/octet-stream',
            'Content-Length': data.length,
        }
    };
    if (keys != ''&& keys != undefined) {
        options.headers[keys.split(':')[0]] = keys.split(':')[1];
    }

    var req = getProtocol(proto).request(options,function(res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data',function (chunk) {
            data += chunk;
        });
        res.on('end',function(){
            data = JSON.parse(data);
            console.log(data);
        });
    });

    req.write(data);
    req.end();
}

function start(url,port,filepath,keys) {
    var proto = url.split(':')[0];
    var hostname = url.split('//')[1].split('/')[0];
    var path = url.split(hostname)[1];
    fs.readFile(filepath,function(err,data) {
        if(err) {
            console.log(err);
        }
        createServer(proto,hostname,path,port,data,keys);
    });

}

start('https://api.projectoxford.ai/emotion/v1.0/recognize','',
    '/Users/W_littlewhite/Documents/Git/I_life_node/Emotion_Recognition/test.jpg',
    'Ocp-Apim-Subscription-Key:a507fafe438643329b2dc3c2ed9e5f39');
