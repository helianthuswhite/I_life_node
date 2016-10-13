
var net = require('net');   
  
// 创建一个TCP服务器实例，调用listen函数开始监听指定端口  
// 传入net.createServer()的回调函数将作为”connection“事件的处理函数  
// 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的  
function createServer(HOST,PORT) {
    net.createServer(function(sock) {  
  
        // 我们获得一个连接 - 该连接自动关联一个socket对象  
        console.log('CONNECTED: ' +  
            sock.remoteAddress + ':' + sock.remotePort);  

        if(PORT == 12000) {
            // 为这个socket实例添加一个"data"事件处理函数  
            sock.on('data', function(data) {  
                console.log('DATA 12000' + sock.remoteAddress + ': ' + data);  
                // 回发该数据，客户端将收到来自服务端的数据  
                sock.write('You said "' + data + '"');  
            });  
        }else if(PORT == 13000) {
            // 为这个socket实例添加一个"data"事件处理函数  
            sock.on('data', function(data) {  
                console.log('DATA 13000' + sock.remoteAddress + ': ' + data);  
                // 回发该数据，客户端将收到来自服务端的数据  
                sock.write('You said "' + data + '"');  
            });  
        }
      
        // 为这个socket实例添加一个"close"事件处理函数  
        sock.on('close', function(data) {  
            console.log('CLOSED: ' +  
                sock.remoteAddress + ' ' + sock.remotePort);  
        });  
      
    }).listen(PORT, HOST);  

    console.log('Socket listen on ' + HOST + ':' + PORT);

}

exports.createServer = createServer;
  
