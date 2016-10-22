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
            // console.log(JSON.stringify(data,null,4));
            // console.log(data[1]);
            var gender = '';
            var glasses = '';
            var emoji = '';
            if (data[1].faceAttributes.gender == 'male') {
                gender = '男士';
            }else {
                gender = '女士';
            }
            if (data[1].faceAttributes.glasses != 'NoGlasses' ) {
                glasses = '他戴着眼镜，';
            }
            if (data[1].faceAttributes.smile > 0.5) {
                emoji = '看起来他笑的开心的。';
            }else {
                emoji = '看起来他好像不是那么开心。';
            }
            console.log('有' + data.length + '个人正在看着你，其中一个是看上去' 
                + Math.floor(data[1].faceAttributes.age) + '左右的' + gender 
                + '，' + glasses + emoji);
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

start('/Users/W_littlewhite/Documents/Git/I_life_node/Face_Recognition/test.jpeg','5cf998e7344e4045a9c2782e7e0d6499');
