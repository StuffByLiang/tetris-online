var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

//include game classes
var Game = require('./src/server/game/');
var Player = require('./src/server/player/');

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
  console.log(game.players)

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
    delete game.players[socket.id]; //remove from game.players
    console.log('user disconnected: ' + useramount);
    io.emit("deletePlayer", socket.id); //tell everyone to remove this player
  });


  socket.on('update', function(data) {
    socket.broadcast.emit('updatePlayer', data);
  });

  socket.on('linesSent', function(data) {
    var player;

    do {
      player = game.getRandomPlayer();
    } while(player.id == socket.id && useramount > 1)

    socket.broadcast.to(player.id).emit('recieveLines', data);
  })

  socket.on('message', function(data) {
    socket.broadcast.emit('message', data);
  })

});
