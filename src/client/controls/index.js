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
  rotateHalf: 90,
  rotateHalf2: 65,

  onKeyDown: function(event) {
      window.dokeydown(event.keyCode);
  },

  onKeyUp: function(event) {
      window.dokeyup(event.keyCode);
  }
};

//single key press
window.dokeydown = function (e) {
  var game = window.game,
      player = window.game.player,
      move = "";

  // emit if it is a key
  switch (e) {
      case key.rotateLeft:
        var move = "rotateLeft";
        break;
      case key.rotateRightMac:
        var move = "rotateRight";
        break;
      case key.moveLeft:
        var move = "moveLeft";
        break;
      case key.hardDrop:
        var move = "hardDrop";
        break;
      case key.hold:
        var move = "hold";
        break;
      case key.rotateRight:
        var move = "rotateRight";
        break;
      case key.moveRight:
        var move = "moveRight";
        break;
      case key.softDrop:
        var move = "softDrop";
        break;
      case key.rotateHalf:
      case key.rotateHalf2:
        var move = "rotateHalf";
  }
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
    case "rotateHalf":
      if(player.isPressed("rotateHalf"))
        game.rotateHalf(player);
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
  player.pressed[move] = (new Date).getTime();
}

window.dokeyup = function(e) {
  var game = window.game,
      player = window.game.player,
      move = "";

  // emit if it is a key
  switch (e) {
      case key.rotateLeft:
        var move = "rotateLeft";
        break;
      case key.rotateRightMac:
        var move = "rotateRight";
        break;
      case key.moveLeft:
        var move = "moveLeft";
        break;
      case key.hardDrop:
        var move = "hardDrop";
        break;
      case key.hold:
        var move = "hold";
        break;
      case key.rotateRight:
        var move = "rotateRight";
        break;
      case key.moveRight:
        var move = "moveRight";
        break;
      case key.softDrop:
        var move = "softDrop";
        break;
      case key.rotateHalf:
      case key.rotateHalf2:
        var move = "rotateHalf";
  }
  delete player.pressed[move];
}
