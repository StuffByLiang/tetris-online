var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

//include game classes
var Game = require('./src/server/game/');
var Player = require('./src/server/player/');

app.use(express.static(path.join(__dirname,'public'))); //this code allows us to access anything in the public folder

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
  var connectedPlayers = [];
  for(var id in game.players) {
    if(id != socket.id) {
      //if id of player doesnt match the one that just joined, add it to connectedPlayers
      connectedPlayers.push(id);
    }
  }
  socket.emit('newPlayer', connectedPlayers) //send to the client that just joined a list of all connected players
  //tell the client whether a current game has started
  socket.emit('gameInfo', game.started);
  socket.emit('env', {
    port: process.env.PORT,
    b2bTSD: process.env.b2bTSD == "true" ? true : false,
    modifiers: process.env.modifiers == "true" ? true : false,
  });

  socket.on('start', () => {
    game.started = true;
    io.emit('start');
  })

  socket.on('ready', () => {
    game.players[socket.id] = new Player(socket.id);
    console.log(game.players)

    socket.broadcast.emit('newPlayer', [socket.id]); //send to everyone else that a new player has joined

    // everything here will be custom events
    useramount++;
    console.log('a user connected: ' + useramount);
  });

  socket.on('disconnect', function(){
    // when user disconnects and is in the game
    if(game.players[socket.id]) {
      useramount--;
      delete game.players[socket.id]; //remove from game.players
      console.log('user disconnected: ' + useramount);
      io.emit("deletePlayer", socket.id); //tell everyone to remove this player

      checkGameRestartable();
    }
  });


  socket.on('update', function(data) {
    socket.broadcast.emit('updatePlayer', data);
  });

  socket.on('linesSent', function(data) {
    if(!game.started) return;
    var player;

    do {
      player = game.getRandomPlayer();
    } while(player.id == socket.id && useramount > 1 && player.alive)

    socket.broadcast.to(player.id).emit('recieveLines', data);
  })

  socket.on('message', function(data) {
    socket.broadcast.emit('message', data);
  })

  socket.on('died', () => {
    if(!game.started) return;
    console.log(game.getTotalAlive())
    socket.emit('place', game.getTotalAlive());

    game.players[socket.id].alive = false;

    //if one person remaining, send to the last guy that he is in first place
    if(game.getTotalAlive() == 1) {
        var winnerId;
        game.iterate(player=> {
          if(player.alive) {
            winnerId = player.id;
          }
        })
        socket.broadcast.to(winnerId).emit('place', 1);
    }

    checkGameRestartable();
  })
  socket.on('b2bTSD', (num) => {
    socket.broadcast.emit('b2bTSD', {
      num: num,
      id: socket.id
    }); // tell everyone else the num of b2b TSD they have
  })

});

function checkGameRestartable() {
  console.log(game.getTotalAlive())
  // if(process.env.b2bTSD == "true") {
  //   if(game.getTotalAlive() == 0) {
  //     game.reset();
  //     useramount = 0;
  //   }
  //   return;
  // }
  if(game.getTotalAlive() <= 1) {
    game.reset();
    useramount = 0;
  }
}
