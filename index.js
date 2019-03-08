var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var game = require('./scripts/server/index.js');
var playerObject = require('./scripts/server/player.js');

var players = []; //server players

app.use(express.static(path.join(__dirname,'public'))); //this code allows us to access anything in the public folder

app.get('/boobs', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

// socket client/server communication starts here

var useramount = 0;

// when user connects (basically opens the client)
io.on('connection', function(socket){
  players[socket.id] = new playerObject();
  console.log(players);

  // everything here will be custom events
  useramount++;
  console.log('a user connected: ' + useramount);

  socket.on('disconnect', function(){
    // when user disconnects
    useramount--;
    console.log('user disconnected: ' + useramount);
  });

  socket.on("sendnudes", function(nudes) {
    console.log('message: ' + nudes)

    socket.broadcast.emit('sendnudes', nudes);
  });

  socket.on("keydown", function(key) {
    console.log("keydown:" + key);
  });

  socket.on("keyup", function(key) {
    console.log("keyup:" + key);
  });

});
