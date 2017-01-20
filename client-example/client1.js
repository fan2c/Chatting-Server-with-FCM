var io = require('socket.io-client');

var socketServer = 'http://localhost:4000';
//var socketServer = 'http://192.168.50.10:4000';
var options = {transports: ['websocket'], forceNew: true};

var socket = io(socketServer, options);

var chatRoomId = 1;
var senderId = 4;
var receiverId = 3;
var message = "ping";

socket.on('connect', function() {
  console.log('connected to socket.io server');
});

socket.on('disconnect', function() {
  console.log('disconnected from socket.io server');
});

socket.on('new message', function(data) {
  console.log('new message', JSON.stringify(data));
});


socket.emit('add user', senderId);

setTimeout(function() {
  socket.emit('new message', {
    chatRoomId: chatRoomId,
    senderId: senderId,
    receiverId: receiverId,
    message: message
  });
}, 6000);
