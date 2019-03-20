var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

//include game classes
var Game = require('./newscripts/game/');
var Player = require('./newscripts/player/');
var Piece = require('./newscripts/game/piece/');
var Ghost = require('./newscripts/game/ghost/');

app.use(express.static(path.join(__dirname,'public'))); //this code allows us to access anything in the public folder

app.get('/boobs', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

// socket client/server communication starts here

var useramount = 0;
var game = new Game();

// when user connects (basically opens the client)
io.on('connection', function(socket){
  game.players[socket.id] = new Player(socket.id);

  // debug
  console.log(game.players);

  // start Game
  game.start( game.players[socket.id] );
  io.emit('newPlayer', game.players[socket.id]);

  // everything here will be custom events
  useramount++;
  console.log('a user connected: ' + useramount);

  socket.on('disconnect', function(){
    // when user disconnects
    useramount--;
    console.log('user disconnected: ' + useramount);
  });

  socket.on("keydown", function(move) {
    if(["moveLeft", "rotateRight", "moveRight", "softDrop", "rotateLeft", "rotateRightMac", "hardDrop", "hold"].includes(move)) {
      // if an acceptable move (to prevent client hacking etc)
      console.log("keydown:" + move); //debugging

      var player = game.getPlayer(socket.id);

      switch (move) {
        case "moveLeft":
          game.moveLeft(player);
          break;
        case "rotateRight":
          game.rotateRight(player);
          break;
        case "moveRight":
          game.moveRight(player);
          break;
        case "softDrop":
          game.softDrop(player);
          break;
        case "rotateLeft":
          game.rotateLeft(player);
          break;
        case "hardDrop":
          game.hardDrop(player);
          break;
        case "hold":
          game.hold(player);
          break;
      }
      game.players[socket.id].pressed[move] = (new Date).getTime();
    }
  });

  socket.on("keyup", function(move) {
    if(["moveLeft", "rotateRight", "moveRight", "softDrop", "rotateLeft", "rotateRightMac", "hardDrop", "hold"].includes(move)) {
      // if an acceptable move (to prevent client hacking etc)
      console.log("keyup:" + move); //debugging

      var player = game.getPlayer(socket.id);

      switch (move) {
        case "moveLeft":
          break;
        case "rotateRight":
          break;
        case "moveRight":
          break;
        case "softDrop":
          break;
        case "rotateLeft":
          break;
        case "hardDrop":
          break;
        case "hold":
          break;
      }
      delete game.players[socket.id].pressed[move];
    }
  });

});
