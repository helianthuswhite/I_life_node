var fs = require('fs');
var request = require("request");

function recognize(img,key,data_handler,err_handler) {
  var options = {
    uri:'https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses',
    method:'POST',
    headers: {
      'Content-Type':'application/octet-stream',
      'Content-Length': img.length,
      'Ocp-Apim-Subscription-Key':key
    },
    body:img
  };

  request(options, function(e, r1, res) {
    if (e) {
      console.log(e);
    } else {
      if(res) {
        res = JSON.parse(res);
        data_handler(JSON.stringify(res,null,4));
      } else {
        err_handler("response status code " + res.statusCode + "is not 200");
      }
    }

  });
}

var ms_face = function(filepath, key, data_handler, err_handler) {
  fs.readFile(filepath,function(err,data) {
    if(err) {
      err_handler(err);
    }
    recognize(data,key,data_handler,err_handler);
  });
};

ms_face('/Users/W_littlewhite/Documents/Git/I_life_node/Face_Recognition/test.jpeg','5cf998e7344e4045a9c2782e7e0d6499',
  function (data) {
    console.log(data);
  },function (err) {
    console.log(err);
  });