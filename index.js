var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

//include game classes
var Game = require('./newscripts/game/');
var Player = require('./newscripts/player/');

app.use(express.static(path.join(__dirname,'public'))); //this code allows us to access anything in the public folder

app.get('/boobs', function(req, res){
  res.send('<h1>Hello world</h1>');
});

require('dotenv').config()
var port = process.env.PORT || '3000';

http.listen(port, function(){
  console.log('listening on *:' + port);
});

// socket client/server communication starts here

var useramount = 0;

global.settings = {
    arr : 0,
    das : 120,
    gravity : 10
};

global.game = new Game(io);

// when user connects (basically opens the client)
io.on('connection', function(socket){
  game.players[socket.id] = new Player(socket.id);

  // debug
  // console.log(game.players);

  // start Game
  game.start( game.players[socket.id] );

  socket.broadcast.emit('newPlayer', [socket.id]); //send to everyone else that a new player has joined

  var connectedPlayers = [];
  for(var id in game.players) {
    if(id != socket.id) {
      //if id of player doesnt match the one that just joined, add it to connectedPlayers
      connectedPlayers.push(id);
    }
  }
  socket.emit('newPlayer', connectedPlayers) //send to the client that just joined a list of all connected players

  // everything here will be custom events
  useramount++;
  console.log('a user connected: ' + useramount);

  socket.on('disconnect', function(){
    // when user disconnects
    useramount--;
    game.clean(game.getPlayer(socket.id));
    delete game.players[socket.id]; //remove from game.players
    console.log('user disconnected: ' + useramount);
    io.emit("deletePlayer", socket.id); //tell everyone to remove this player
  });
  socket.on("keydown", function(move) {
    if(["moveLeft", "rotateRight", "moveRight", "softDrop", "rotateLeft", "rotateRightMac", "hardDrop", "hold"].includes(move)) {
      // if an acceptable move (to prevent client hacking etc)
      // console.log("keydown:" + move); //debugging

      var player = game.getPlayer(socket.id);

      switch (move) {
        case "moveLeft":
          if(player.isPressed("moveLeft"))
            game.moveLeft(player);
          break;
        case "rotateRight":
          if(player.isPressed("rotateRight"))
            game.rotateRight(player);
          break;
        case "moveRight":
          if(player.isPressed("moveRight"))
            game.moveRight(player);
          break;
        case "softDrop":
          if(player.isPressed("softDrop"))
            game.softDrop(player);
          break;
        case "rotateLeft":
          if(player.isPressed("rotateLeft"))
            game.rotateLeft(player);
          break;
        case "hardDrop":
          if(player.isPressed("hardDrop"))
            game.hardDrop(player);
          break;
        case "hold":
          if(player.isPressed("hold")) {
              player.tspinRotate = false; //not tspin if new piece comes
              game.hold(player);
          }
          break;
      }
      game.players[socket.id].pressed[move] = (new Date).getTime();
    }
  });
  socket.on("keyup", function(move) {
    if(["moveLeft", "rotateRight", "moveRight", "softDrop", "rotateLeft", "rotateRightMac", "hardDrop", "hold"].includes(move)) {
      // if an acceptable move (to prevent client hacking etc)
      // console.log("keyup:" + move); //debugging

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
