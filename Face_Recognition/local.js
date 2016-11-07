var https = require('https');
var fs = require('fs');

const chinese = {
    "0":"零","1":"一","2":"二","3":"三","4":"四","5":"五","6":"六","7":"七",
    "8":"八","9":"九","10":"十","11":"十一","12":"十二","13":"十三","14":"十四",
    "15":"十五","16":"十六","17":"十七","18":"十八","19":"十九","20":"二十",
    "21":"二十一","22":"二十二","23":"二十三","24":"二十四","25":"二十五",
    "26":"二十六","27":"二十七","28":"二十八","29":"二十九","30":"三十","31":"三十一",
    "32":"三十二","33":"三十三","34":"三十四","35":"三十五","36":"三十六","37":"三十七",
    "38":"三十八","39":"三十九","40":"四十","41":"四十一","42":"四十二","43":"四十三",
    "44":"四十四","45":"四十五","46":"四十六","47":"四十七","48":"四十八","49":"四十九",
    "50":"五十","51":"五十一","52":"五十二","53":"五十三","54":"五十四","55":"五十五",
    "56":"五十六","57":"五十七","58":"五十八","59":"五十九","60":"六十","61":"六十一",
    "62":"六十二","63":"六十三","64":"六十四","65":"六十五","66":"六十六","67":"六十七",
    "68":"六十八","69":"六十九","70":"七十","71":"七十一","72":"七十二","73":"七十三",
    "74":"七十四","75":"七十五","76":"七十六","77":"七十七","78":"七十八","79":"七十九",
    "80":"八十"

};

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
            fs.writeFile(__dirname + '/log.txt',JSON.stringify(data,null,4)
                ,function(err) {
                if(err) console.log(err);
            });
            var gender = '';
            var glasses = '';
            var emoji = '';

            if (data[0].faceAttributes.gender == 'male') {
                gender = '男士';
            }else {
                gender = '女士';
            }
            if (data[0].faceAttributes.glasses != 'NoGlasses' ) {
                glasses = '他戴着眼镜，';
            }
            if (data[0].faceAttributes.smile > 0.5) {
                emoji = '看起来他笑的开心的。';
            }else {
                emoji = '看起来他好像不是那么开心。';
            }
            if(Math.floor(data[0].faceAttributes.age) > 80) {
                data[0].faceAttributes.age = 80;
            }

            var result = '有' + chinese[data.length] + '个人正在看着你，其中一个是看上去' 
                + chinese[Math.floor(data[0].faceAttributes.age)] + '岁左右的' + gender 
                + '，' + glasses + emoji;

            for (var i = 1; i < data.length; i++) {
                if (data[i].faceAttributes.gender == 'male') {
                    gender = '男士';
                }else {
                    gender = '女士';
                }
                if (data[i].faceAttributes.glasses != 'NoGlasses' ) {
                    glasses = '他戴着眼镜，';
                }
                if (data[i].faceAttributes.smile > 0.5) {
                    emoji = '看上去挺开心的。';
                }else {
                    emoji = '看上去好像不是那么开心。';
                }
                if(Math.floor(data[i].faceAttributes.age) > 80) {
                    data[i].faceAttributes.age = 80;
                }

                result = result + '还有看上去' + chinese[Math.floor(data[i].faceAttributes.age)]
                    + '岁左右的' + gender + ',' + glasses + emoji;

            } 
            console.log(result);
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
