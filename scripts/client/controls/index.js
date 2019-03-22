window.addEventListener('keyup', function(event) { key.onKeyUp(event); }, false);
window.addEventListener('keydown', function(event) { key.onKeyDown(event); }, false);

window.key = {
  moveLeft: 37,
  rotateRight: 38,
  moveRight: 39,
  softDrop: 40,
  rotateLeft: 17,
  rotateRightMac: 91, // for macs
  hardDrop: 32,
  hold: 16,

  onKeyDown: function(event) {
      window.dokeydown(event.keyCode);
  },

  onKeyUp: function(event) {
      window.dokeyup(event.keyCode);
  }
};

//single key press
window.dokeydown = function (e) {
    // emit if a key
    switch (e) {
        case key.rotateLeft:
          socket.emit("keydown", "rotateLeft");
          break;
        case key.rotateRightMac:
          socket.emit("keydown", "rotateRight");
          break;
        case key.moveLeft:
          socket.emit("keydown", "moveLeft");
          break;
        case key.hardDrop:
          socket.emit("keydown", "hardDrop");
          break;
        case key.hold:
          socket.emit("keydown", "hold");
          break;
        case key.rotateRight:
          socket.emit("keydown", "rotateRight");
          break;
        case key.moveRight:
          socket.emit("keydown", "moveRight");
          break;
        case key.softDrop:
          socket.emit("keydown", "softDrop");
    }
}

window.dokeyup = function(e) {
  // emit if it is a key
  switch (e) {
      case key.rotateLeft:
        socket.emit("keyup", "rotateLeft");
        break;
      case key.rotateRightMac:
        socket.emit("keyup", "rotateRight");
        break;
      case key.moveLeft:
        socket.emit("keyup", "moveLeft");
        break;
      case key.hardDrop:
        socket.emit("keyup", "hardDrop");
        break;
      case key.hold:
        socket.emit("keyup", "hold");
        break;
      case key.rotateRight:
        socket.emit("keyup", "rotateRight");
        break;
      case key.moveRight:
        socket.emit("keyup", "moveRight");
        break;
      case key.softDrop:
        socket.emit("keyup", "softDrop");
  }
}
