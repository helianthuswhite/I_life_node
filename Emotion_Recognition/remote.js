var https = require('https');

function start(imgUrl,key) {
    var body = {
        'url':imgUrl
    };
    var options = {
        hostname:'api.projectoxford.ai',
        path:'/emotion/v1.0/recognize',
        method:'POST',
        headers: {
            'Content-Type':'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(body)),
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
            console.log(data);
        });
    });

    req.write(JSON.stringify(body));
    req.end();
}

start('https://portalstoragewuprod2.azureedge.net/emotion/recognition1.jpg','a507fafe438643329b2dc3c2ed9e5f39');
