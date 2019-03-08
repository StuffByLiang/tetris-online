window.addEventListener('keyup', function(event) { key.onKeyUp(event); }, false);
window.addEventListener('keydown', function(event) { key.onKeyDown(event); }, false);

window.key = {
  pressed: {},

  left: 37,
  up: 38,
  right: 39,
  down: 40,
  control: 17,
  command: 91,
  space: 32,
  shift: 16,

  onKeyDown: function(event) {
      window.dokeydown(event.keyCode);
      this.pressed[event.keyCode] = (new Date).getTime(); //set it to milliseconds
  },

  onKeyUp: function(event) {
      window.dokeyup(event.keyCode);
      delete this.pressed[event.keyCode];
  }
};


//single key press
window.dokeydown = function (e) {
    // switch (e) {
    //     case key.control:
    //     case key.command:
    //     case key.left:
    //     case key.space:
    //     case key.shift:
    //     case key.up:
    //     case key.right:
    //     case key.down:
    //     case default:
    // }

    socket.emit("keydown", e);
}

window.dokeyup = function(e) {
  // switch (e) {
  //     case key.control:
  //     case key.command:
  //     case key.left:
  //     case key.space:
  //     case key.shift:
  //     case key.up:
  //     case key.right:
  //     case key.down:
  //     case default:
  // }

  socket.emit("keyup", e);
}
