var https = require('https');
var fs = require('fs');

function recognize(img,key) {
    var options = {
        hostname:'api.projectoxford.ai',
        path:'/emotion/v1.0/recognize',
        method:'POST',
        headers: {
            'Content-Type':'application/octet-stream',
            'Content-Length': img.length,
            'Ocp-Apim-Subscription-Key':key
        }
    };
    console.log(options);
    var req = https.request(options,function(res) {
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

    req.write(img);
    req.end();
}

function start(imgPath,key) {
    fs.readFile(imgPath,function(err,data) {
        if(err) {
            console.log(err);
        }
        recognize(data,key);
    });
}

start('/Users/W_littlewhite/Documents/Git/I_life_node/Emotion_Recognition/test.jpg','a507fafe438643329b2dc3c2ed9e5f39');
