var https = require('https');
var fs = require('fs');

function recognize(img,key) {
    var options = {
        hostname:'api.projectoxford.ai',
        path:'/face/v1.0/detect?returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses',
        method:'POST',
        headers: {
            'Content-Type':'application/octet-stream',
            'Content-Length': img.length,
            'Ocp-Apim-Subscription-Key':key
        }
    };
    var req = https.request(options,function(res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data',function (chunk) {
            data += chunk;
        });
        res.on('end',function(){
            data = JSON.parse(data);
            console.log(JSON.stringify(data,null,4));
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

start('/Users/W_littlewhite/Documents/Git/I_life_node/Emotion_Recognition/test.jpg','5cf998e7344e4045a9c2782e7e0d6499');
