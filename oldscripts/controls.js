//automatic key press
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
  },

  moveLeft: function() {
    //check if no collision left
        if(key.pressed[key.left] > 0) {
            if(!game.piece.checkCollision(2)){
                player.tspinRotate = false; //not tspin if moved

                game.piece.lockdown();

                game.piece.x--;
                game.ghost.update();
                game.piece.update();
                game.drawBoard();
            }
            this.canMoveLeft = setTimeout(key.moveLeft, settings.arr);
        }
  },

  moveRight: function() {
    //check if no collision right
        if(key.pressed[key.right] > 0) {
            if(!game.piece.checkCollision(0)){
                player.tspinRotate = false; //not tspin if moved

                game.piece.lockdown();

                game.piece.x++;
                game.ghost.update();
                game.piece.update();
                game.drawBoard();
            }
            this.canMoveRight = setTimeout(key.moveRight, settings.arr);
        }
  },
};


//single key press

window.dokeydown = function (e) {
    switch (e) {
        case key.control:
        //control
        case key.command:
        //command
            if(key.pressed[key.control] == undefined && key.pressed[key.command] === undefined ) {
                if(game.piece.canRotate(-1)) {

                    game.piece.rotationLimit++; //lock down rotation limit
                    clearTimeout(game.piece.lockDownTimer);
                    game.piece.lockDownTimer = false;

                    game.piece.angle--;
                    if(game.piece.angle < 0){
                        game.piece.angle = 3;
                    }

                    player.tspinRotate = true; //detect rotate

                    game.piece.lockdown();

                    game.ghost.update();
                    game.piece.update();
                    game.drawBoard();
                }
            }
        break;
        case key.left:
        //left
            if(key.pressed[key.left] === undefined){
                key.canMoveLeft = setTimeout(key.moveLeft, settings.das);
                //check if no collision left
                if(!game.piece.checkCollision(2)){
                    game.piece.rotationLimit++; //lock down rotation limit
                    clearTimeout(game.piece.lockDownTimer);
                    game.piece.lockDownTimer = false;

                    player.tspinRotate = false; //clear tspin rotate, not tpsin if move left/right

                    game.piece.lockdown();

                    game.piece.x--;
                    game.ghost.update();
                    game.piece.update();
                    game.drawBoard();
                }
                delete key.pressed[key.right];
            }
        break;
        case key.space:
            if(key.pressed[key.space] === undefined){
            //spacebar

                //check if no collision left
                while(!game.piece.checkCollision(1)) {
                    player.tspinRotate = false; //reset tspin
                    game.piece.y++;
                }
                game.ghost.update();
                game.piece.update();
                game.drawBoard();
                game.piece.die();
            }
        break;
        case key.shift:
        //shift
            if(key.pressed[key.shift] === undefined) {
                player.tspinRotate = false; //not tspin if new piece comes
                game.hold();
            }
        break;
        case key.up:
            if(key.pressed[key.up] === undefined) {
                if(game.piece.canRotate(1)) {

                    game.piece.rotationLimit++; //lock down rotation limit
                    clearTimeout(game.piece.lockDownTimer);
                    game.piece.lockDownTimer = false;

                    game.piece.angle++;
                    if(game.piece.angle > 3){
                        game.piece.angle = 0;
                    }

                    player.tspinRotate = true; //detect rotate

                    game.piece.lockdown();

                    game.ghost.update();
                    game.piece.update();
                    game.drawBoard();
                }
            }
            break;
        case key.right:
            //check if no collision right
            if(key.pressed[key.right] === undefined){
                key.canMoveRight = setTimeout(key.moveRight, settings.das);
                if(!game.piece.checkCollision(0)){
                    game.piece.rotationLimit++; //lock down rotation limit
                    clearTimeout(game.piece.lockDownTimer);
                    game.piece.lockDownTimer = false;

                    player.tspinRotate = false; //not tspin if move right

                    game.piece.lockdown();

                    game.piece.x++;
                    game.ghost.update();
                    game.piece.update();
                    game.drawBoard();
                }
                delete key.pressed[key.left];
            }
            break;
        case key.down:
            if(key.pressed[key.down] === undefined) {
                //check if no collision down
                if(!game.piece.checkCollision(1)){
                    clearInterval(game.piece.interval);
                    game.piece.interval = setInterval(game.piece.gravityInterval, settings.gravity);

                    game.piece.y++;

                    //reset lockdown timer and rotation limit if reach a new lowest line
                    if(game.piece.y > game.piece.lowestLine){
                        game.piece.lowestLine = game.piece.y;
                        game.piece.rotationLimit = 0;
                        clearTimeout(game.piece.lockDownTimer);
                        game.piece.lockDownTimer = false;
                    }

                    player.tspinRotate = false; //not tspin if move down

                    game.piece.lockdown();

                    game.ghost.update();
                    game.piece.update();
                    game.drawBoard();
                }
            }
        break;
    }
}

window.dokeyup = function(e) {
    switch (e) {
        case key.down:
            clearInterval(game.piece.interval);

            game.piece.interval = setInterval(game.piece.gravityInterval, 1000);
            break;
        case key.left:
            clearTimeout(key.canMoveLeft);
            break;
        case key.right:
            clearTimeout(key.canMoveRight);
            break;

    }
}
