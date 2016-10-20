
var server = require('./server');

var HOST = '127.0.0.1';
var PORT_1 = 20000;
var PORT_2 = 13000;
var PORT_3 = 14000;

server.createServer(HOST,PORT_1);
server.createServer(HOST,PORT_2);
server.createServer(HOST,PORT_3);