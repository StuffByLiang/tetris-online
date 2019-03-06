var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/boobs', function(req, res){
  res.send('<h1>Hello world</h1>');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

// socket client/server communication starts here

var useramount = 0;

// when user connects (basically opens the client)
io.on('connection', function(socket){
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

    io.emit('sendnudes', nudes);

  });

});
