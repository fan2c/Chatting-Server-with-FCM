require("console-stamp")(console);

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 4000;

var redis = require('redis');
var Sidekiq = require('sidekiq');
var redisClient = redis.createClient(6379, '127.0.0.1');
var sidekiq = new Sidekiq(redisClient);

// Setting for firebase
var admin = require('firebase-admin');
var request = require('request');
var API_KEY = "";

// Fetch the firebase account key JSON file contents
var serviceAccount = require("./PokeSearch-d354202aa019.json");

// Initialize the app with a firebase account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ""
});
var rootRef = admin.database().ref();


//Initialzie the chatting server using socket.io
server.listen(port, function () {
  console.log('Socket-IO server listening at port %d', port);
});

var sockets = {};

io.on('connection', function (socket) {
  console.log('new connection');

  socket.on('add user', function (senderId) {
    console.log('add user', senderId);
    socket.sid = senderId;
    sockets[socket.sid] = socket;
  });

  socket.on('new message', function (data) {
    console.log('new message', data);

    if (!sockets[data.receiverId]) {
      console.log(data.receiverId, 'not online');
    } else {
      sockets[data.receiverId].emit('new message', {
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message
      });
    }

    saveMessage(data.chatRoomId, data.senderId, data.message);
    sendNotification(data.receiverId, data.message);
  });

  socket.on('disconnect', function () {
    console.log(socket.sid, 'disconnected');
    delete sockets[socket.sid];
  });
});

//Save the message data
function saveMessage(cid, uid, msg) {
  var options = {
    queue: 'default'
  };
  sidekiq.enqueue("ChatWorker", [cid, uid, msg], options);
}

//Send notification by Firebase Cloud Messageing
function sendNotification(userid, message) {
  request({
    url: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type' :' application/json',
      'Authorization': 'key='+API_KEY
    },
    body: JSON.stringify({
      notification: {
        title: "You have a new message!",
        body: message
      },
      to : '/topics/'+userid
    })
  });
}

//Test sendNotification function
//sendNotification("pxf", "message");
