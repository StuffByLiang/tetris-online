import { Ghost } from '../ghost/'

class Piece {
  constructor(player, x, y, pieceName, color, rotations) {
      //create a new object in game
      this.player = player;
      this.x = x;
      this.y = y;
      this.pieceName = pieceName;
      this.color = color;
      this.angle = 0;
      this.oldX = [0, 0, 0, 0];
      this.oldY = [0, 0, 0, 0];
      this.rotations = rotations;

      this.lowestLine = 0;
      this.rotationLimit = 0;

      this.interval = setInterval(this.doGravity.bind(this), settings.gravity);
      this.lockDownTimer = false;

      var color = game.getPieceColor(color);
      this.ghost = new Ghost(player, this, color);
  }
  update() {
      //update this piece and draw it
      this.ghost.update();
      game.draw();
  }
  doGravity() {
    console.log("lol")
    var {player} = this;
      //check if no collision down
      if(!this.checkCollision(1)){
          this.y++; //move down

          //if settings.gravity is 0 (instadrop) do a while loop here and down button is pressed
          while(settings.softDrop==0 && !this.checkCollision(1) && player.isPressed('softDrop')) {
            this.y++;
          }

          //reset lockdown timer and rotation limit if reach a new lowest line
          if(this.y > this.lowestLine){
              this.lowestLine = this.y;
              this.rotationLimit = 0;
              clearTimeout(this.lockDownTimer);
              this.lockDownTimer = false;
          }

          this.player.tspinRotate = false; //reset tspin
      }

      this.lockdown();
      this.update()
  }
  draw() {
    //get current angle and positions
    var myRotations = this.rotations[this.angle].split('|');

    for(var i = 0; i <= 3; i++) {
        var xx, yy, coordinates;

        coordinates = myRotations[i].split(',');
        xx = Number(coordinates[0]); //x pos of the block
        yy = Number(coordinates[1]); //y pos of the block

        color = game.getPieceColor(this.color);

        draw.makeBlock(1 + (this.x) * 24, 1 + (this.y) * 24, xx, yy, color, tetrisBoard.canvas);
    }
    game.drawBoard();
  }
  lockdown(direction) {
      //initiate lockdown
      if(this.checkCollision(1)){
          if(this.rotationLimit > 15){
              this.die();
          }else if(!this.lockDownTimer){
              this.lockDownTimer = setTimeout(this.die.bind(this), 500);
          }
      }else{
          clearTimeout(this.lockDownTimer);
          this.lockDownTimer = false;
      }
  }
  die() {
      if(this.checkCollision(1)){
          //this function activates when it hits the ground
          clearInterval(this.interval);
          clearTimeout(this.lockDownTimer);
          this.lockDownTimer = false;

          var myRotations = this.rotations[this.angle].split('|');
          for(var i = 0; i <= 3; i++) {
              var xx, yy, coordinates;
              coordinates = myRotations[i].split(',');
              xx = Number(coordinates[0]);
              yy = Number(coordinates[1]);

              this.player.boardPosition[this.x + xx][this.y + yy] = this.color; //set that position in the board to that color

          }

          game.clearLines();

          game.recordBoardPosition();

          if(game.checkLoss()) {
            game.loss();
          } else {
            game.spawnPiece();
          }
      }
  }
  checkCollision(direction) {
      //check collision 0 = left 1 = down 2 = right 3 = up

      //get current angle and positions
      var myRotations = this.rotations[this.angle].split('|');

      //now check collision
      for(var i=0; i <= 3; i++) {
          //direction we are checking
          var xChange = 0;
          var yChange = 0;

          var coordinates = myRotations[i].split(',');
          var xx = Number(coordinates[0]); //x pos of the block
          var yy = Number(coordinates[1]); //y pos of the block


          switch(direction) {
              case 0:
                  xChange = 1;
                  break;
              case 1:
                  yChange = 1;
                  break;
              case 2:
                  xChange = -1;
                  break;
              case 3:
                  yChange = -1;
                  break;
              default:
                  console.log("no such direction");

          }

          //first check if x or y is past border, return true if it is
          if(this.x + xx + xChange < 0 ||
             this.x + xx + xChange > 9 ||
             this.y + yy + yChange < 0 ||
             this.y + yy + yChange > 21) {

              return true;
          }

          //then check if the block is free near the piece, return true if there is collision
          if(this.player.boardPosition[this.x + xx + xChange][this.y + yy + yChange] !== 0){
              return true;
          }


      }

      return false;

  }
  canRotate(direction) {
      //check rotation -1 = counter clockwise 1 rotate 180 = 2
      var futureRotation, myRotations;

      futureRotation = this.angle + direction;

      if(futureRotation < 0){
          futureRotation += 4;
      }
      if(futureRotation > 3){
          futureRotation -= 4;
      }

      //now check rotation

      //5 tests for the J, L, S, T, Z pieces
      for(var ii = 0; ii <= 4; ii++) {

          var xChange, yChange;

          // I PIECE
          if(this.player.currentPieceName === "I") {
              //this if statement checks the database for the position y
              if((this.angle === 0 && direction === 1)||(this.angle === 3 && direction === -1)||(this.angle === 1 && direction === -1)||(this.angle === 2 && direction === 1)) {
                  switch(ii) {
                      case 0:
                          xChange = 0;
                          yChange = 0;
                          break;
                      case 1:
                          xChange = -2;
                          yChange = 0;
                          break;
                      case 2:
                          xChange = 1;
                          yChange = 0;
                          break;
                      case 3:
                          xChange = -2;
                          yChange = 1;
                          break;
                      case 4:
                          xChange = 1;
                          yChange = -2;
                  }
              }

              //data is reveresed in some wall kick data
              if((this.angle === 1 && direction === -1)||(this.angle === 2 && direction === 1)) {
                  xChange *= -1;
                  yChange *= -1;
              }

              if((this.angle === 1 && direction === 1)||(this.angle === 0 && direction === -1)||(this.angle === 2 && direction === -1)||(this.angle === 3 && direction === 1)) {
                  switch(ii) {
                      case 0:
                          xChange = 0;
                          yChange = 0;
                          break;
                      case 1:
                          xChange = -1;
                          yChange = 0;
                          break;
                      case 2:
                          xChange = 2;
                          yChange = 0;
                          break;
                      case 3:
                          xChange = -1;
                          yChange = -2;
                          break;
                      case 4:
                          xChange = 2;
                          yChange = 1;
                  }
              }

              //data is reveresed in some wall kick data
              if((this.angle === 2 && direction === -1)||(this.angle === 3 && direction === 1)) {
                  xChange *= -1;
                  yChange *= -1;
              }
          }
          else {//all other pieces

              //check wall kick data and set positions to test for
              if((this.angle === 0 && direction === 1)||(this.angle === 2 && direction === -1)||(this.angle === 1 && direction === -1)||(this.angle === 1 && direction === 1)) {
                  switch(ii) {
                      case 0:
                          xChange = 0;
                          yChange = 0;
                          break;
                      case 1:
                          xChange = -1;
                          yChange = 0;
                          break;
                      case 2:
                          xChange = -1;
                          yChange = -1;
                          break;
                      case 3:
                          xChange = -2;
                          yChange = 2;
                          break;
                      case 4:
                          xChange = -1;
                          yChange = 2;
                  }
              }

              //data is reveresed in some wall kick data
              if((this.angle === 1 && direction === -1)||(this.angle === 1 && direction === 1)) {
                  xChange *= -1;
                  yChange *= -1;
              }

              if((this.angle === 2 && direction === 1)||(this.angle === 0 && direction === -1)||(this.angle === 3 && direction === -1)||(this.angle === 3 && direction === 1)) {
                  switch(ii) {
                      case 0:
                          xChange = 0;
                          yChange = 0;
                          break;
                      case 1:
                          xChange = 1;
                          yChange = 0;
                          break;
                      case 2:
                          xChange = 1;
                          yChange = -1;
                          break;
                      case 3:
                          xChange = 0;
                          yChange = 2;
                          break;
                      case 4:
                          xChange = 1;
                          yChange = 2;
                  }
              }

              //data is reveresed in some wall kick data
              if((this.angle === 3 && direction === -1)||(this.angle === 3 && direction === 1)) {
                  xChange *= -1;
                  yChange *= -1;
              }
          }

          var test = 0; //this variable increments when a block is free
          var myRotations = this.rotations[futureRotation].split('|');
          //test for the four pieces
          for(var i=0; i <= 3; i++) {
              var coordinates = myRotations[i].split(',');

              var xx = Number(coordinates[0]); //x pos of the block
              var yy = Number(coordinates[1]); //y pos of the block

              //check if the block will be outside the board
              if(this.x + xx + xChange < 0 ||
                 this.x + xx + xChange > 9 ||
                 this.y + yy + yChange < 0 ||
                 this.y + yy + yChange > 21) {

                 break;
              }


              //check if the block is free near the piece, return true if there is collision
              if(this.player.boardPosition[this.x + xx + xChange][this.y + yy + yChange] === 0){

                  test++;

                  if(test == 4){ //if all blocks are free

                      //return a coordinate
                      this.x += xChange;
                      this.y += yChange;
                      return true;
                  }
              }

          }
      }

      return false;
  }

}

export {Piece}
