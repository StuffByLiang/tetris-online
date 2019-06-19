import { Piece } from '../piece/'
import { Player } from '../player/'

class Game {
  constructor(io) {
    this.io = io;
    this.player = null;
    this.bag = [];
    this.id = null;
    this.randomModiferInterval = null;

    this.modifiers = null;

    //this.send = new Send();
  }
  start() {
    this.reset();
    this.player = new Player();

    var {player} = this;

    if(!player.begin) {
      player.begin = true;

      // player = new playerObject();W
      player.startTime = (new Date).getTime(); //set the time in which game starts

      this.spawnPiece();
    }
  }
  reset() {
    if(this.player != null) {
      $('#otherPlayerCanvas').html("");

      var {player} = this;

      this.bag = []
      //if game piece exists
      clearInterval(player.piece.interval);
      player.piece = null;
    }

    if(settings.myNameIsMeidy) {
      game.meidy();
      clearInterval(settings.meidy);
      settings.meidy = setInterval(function() {
        game.meidy()
      }, 20000);
    }

    //reset modifiers
    if(env.modifiers) {
      settings.gravity = 1000;
      clearInterval(this.randomModifierInterval);
      this.randomModiferInterval = setInterval(this.applyRandomModifier.bind(this), 7 * 1000);
    }

    //reset modifiers
    this.modifiers = {
      increaseGravity: false,
      randomColor: false,
      disableGhost: false,
      cheeseGarbage: false,
      oneGarbage: false,
      noHardDrop: false,
      noHold: false,
      level: 1
    };

  }
  checkLoss() {
    //returns true or false if the dude lost or not
    var { player } = this;
    var check = false;
    for(var y = 0; y <= 1; y++){
        for(var x = 3; x <=6; x++){
            if(player.boardPosition[x][y] != 0){
                check = true;
            }
        }
    }

    return check;
  }
  loss() {
    console.log("YOU FUCKING LOST");
    socket.emit('died');
    game.losingGray();
    this.player.begin=false;
    $('.note').show();
  }
  //actions
  moveLeft() {
    var { player } = this;

    player.canMoveLeft = setTimeout(this.doMoveLeft.bind(this) , settings.das);
    //check if no collision left
    if(!player.piece.checkCollision(2)){
        player.piece.rotationLimit++; //lock down rotation limit
        clearTimeout(player.piece.lockDownTimer);
        player.piece.lockDownTimer = false;

        player.tspinRotate = false; //clear tspin rotate, not tpsin if move left/right

        player.piece.lockdown();

        player.piece.x--;
        player.piece.update();
    }
    delete player.pressed["moveRight"];
  }
  doMoveLeft() {
    var { player } = this;

    if(player.pressed["moveLeft"] > 0) {
        if(!player.piece.checkCollision(2)){
            player.tspinRotate = false; //not tspin if moved

            player.piece.lockdown();

            player.piece.x--;
            player.piece.update();
        }
        player.canMoveLeft = setTimeout(this.doMoveLeft.bind(this), settings.arr);
    }
  }
  rotateRight() {
    var { player } = this;

    if(player.piece.canRotate(1)) {

        player.piece.rotationLimit++; //lock down rotation limit
        clearTimeout(player.piece.lockDownTimer);
        player.piece.lockDownTimer = false;

        player.piece.angle++;
        if(player.piece.angle > 3){
            player.piece.angle = 0;
        }

        player.tspinRotate = true; //detect rotate

        player.piece.lockdown();

        player.piece.update();
    }
  }
  moveRight() {
    var { player } = this;

    player.canMoveRight = setTimeout(this.doMoveRight.bind(this) , settings.das);
    //check if no collision left
    if(!player.piece.checkCollision(0)){
        player.piece.rotationLimit++; //lock down rotation limit
        clearTimeout(player.piece.lockDownTimer);
        player.piece.lockDownTimer = false;

        player.tspinRotate = false; //clear tspin rotate, not tpsin if move left/right

        player.piece.lockdown();

        player.piece.x++;
        player.piece.update();
    }
    delete player.pressed["moveLeft"];
  }
  doMoveRight() {
    var { player } = this;

    if(player.pressed["moveRight"] > 0) {
        if(!player.piece.checkCollision(0)){
            player.tspinRotate = false; //not tspin if moved

            player.piece.lockdown();

            player.piece.x++;
            player.piece.update();
        }
        player.canMoveRight = setTimeout(this.doMoveRight.bind(this), settings.arr);
    }
  }
  softDrop() {
    var { player } = this;

    //check if no collision down
    if(!player.piece.checkCollision(1)){
        clearInterval(player.piece.interval);
        player.piece.interval = setInterval(player.piece.doGravity.bind(player.piece), settings.softDrop);

        player.piece.y++;

        //reset lockdown timer and rotation limit if reach a new lowest line
        if(player.piece.y > player.piece.lowestLine){
            player.piece.lowestLine = player.piece.y;
            player.piece.rotationLimit = 0;
            clearTimeout(player.piece.lockDownTimer);
            player.piece.lockDownTimer = false;
        }

        player.tspinRotate = false; //not tspin if move down

        player.piece.lockdown();

        player.piece.update();
    }
  }
  rotateLeft() {
    var { player } = this;

    if(player.piece.canRotate(-1)) {

        player.piece.rotationLimit++; //lock down rotation limit
        clearTimeout(player.piece.lockDownTimer);
        player.piece.lockDownTimer = false;

        player.piece.angle--;
        if(player.piece.angle < 0){
            player.piece.angle = 3;
        }

        player.tspinRotate = true; //detect rotate

        player.piece.lockdown();

        player.piece.update();
    }
  }
  rotateHalf() {
    var { player } = this;

    if(player.piece.canRotate(2)) {

        player.piece.rotationLimit++; //lock down rotation limit
        clearTimeout(player.piece.lockDownTimer);
        player.piece.lockDownTimer = false;

        player.piece.angle +=2 ;
        if(player.piece.angle > 3){
            player.piece.angle -= 4;
        }

        player.tspinRotate = true; //detect rotate

        player.piece.lockdown();

        player.piece.update();
    }
  }
  hardDrop() {
    if(this.checkLoss() || this.modifiers.noHardDrop) {
      return;
    }
    var { player } = this;

    //check if no collision left
    while(!player.piece.checkCollision(1)) {
        player.tspinRotate = false; //reset tspin
        player.piece.y++;
    }
    player.piece.update();
    player.piece.die();
  }
  spawnPiece(hold) {
      if(this.checkLoss()) {
        return;
      }

      var { player } = this;


      //spawn a piece
      if(hold === undefined) {
        // check if a new bag needs to be created, if so, then create it
        if(this.bag[player.currentBag + 1] == undefined)
          this.newBag();

        // console.log(this.bag); // debug

        var bagPieces = this.bag[player.currentBag].split(',');

        player.currentPieceName = bagPieces[player.currentPiece]; //set currentPieceName

        player.currentPiece++;

        if (player.currentPiece >= 7){
            player.currentPiece = 0;
            player.currentBag++;
        }
      }

      //this sets the rotations and color of the specific piece
      var color, rotations;
      rotations = this.getPieceRotation(player.currentPieceName);
      color = this.getPieceNumber(player.currentPieceName);

      if(this.modifiers.randomColor) color = this.random(1,7);

      player.piece = new Piece(player, 3, -1, player.currentPieceName, color, rotations); //create piece

      //set gravity if down is pressed
      if(player.pressed["softDrop"] > 0) {
          //check if no collision down and if so, set soft drop
          if(!player.piece.checkCollision(1)){
              clearInterval(player.piece.interval);
              player.piece.interval = setInterval(player.piece.doGravity.bind(player.piece), settings.softDrop);
          }
      }

      //move down instantly if its free
      if(!player.piece.checkCollision(1)){
          player.piece.y++;

          //reset lockdown timer and rotation limit if reach a new lowest line
          if(player.piece.y > player.piece.lowestLine){
              player.piece.lowestLine = player.piece.y;
              player.rotationLimit = 0;
              clearTimeout(player.piece.lockDownTimer);
          }
      }

      player.piece.update();
      // game.drawBoard();

      //set canHold = true because new piece has spawned
      if(hold === undefined)
        if(!player.canHold && !player.hasHold) {
            player.hasHold = true;
        }else{
            player.canHold = true;
        }

  }
  hold() {
    var { player } = this;
    console.log(player);
      //for the first time shift is pressed
      if(player.canHold){
          if(!player.hasHold){
              //set canShift = false until a new piece is spawned
              player.canHold = false;
              player.currentHoldPiece = player.currentPieceName;

              //clear current piece settings
              clearInterval(player.piece.interval);
              clearTimeout(player.piece.lockDownTimer);
              player.piece.lockDownTimer = false;

              //spawn a new piece
              this.spawnPiece();

          }else {
              //set canShift = false until a new piece is spawned
              player.canHold = false;

              player.currentHoldPiece = [player.currentPieceName, player.currentPieceName = player.currentHoldPiece][0]; //swap two variables

              //clear current piece settings
              clearInterval(player.piece.interval);
              clearTimeout(player.piece.lockDownTimer);
              player.piece.lockDownTimer = false;

              // this.drawHold(player.currentHoldPiece);

              //now spawn piece

              this.spawnPiece("hold");
          }
      }
  }
  clearLines() {
    var { player } = this;
      var cleared = 0;

      var tspin = game.checkTspin();
      //clear lines

      //loop through rows, starting from the bottom
      for(var y = 21; y >= 0; y--) {
          var check = 0;//this variable checks for blocks that are filled in the row
          for(var x = 0; x <= 9; x++) {
              if(player.boardPosition[x][y] !== 0){
                  check++;
              }
          }

          //if entire row is filled
          if(check == 10){
              cleared++;

              //clear the row
              for(x = 0; x <= 9; x++) {
                  if(player.boardPosition[x][y] !== 0){
                     player.boardPosition[x][y] = 0;
                  }
              }
              for(var yy = y; yy >= 0; yy--) {
                  for(var xx = 0; xx <= 9; xx++) {
                      //copy the row from one above (unless its the very top row, then clear all of that)
                      if(yy!=0){
                          player.boardPosition[xx][yy] = player.boardPosition[xx][yy - 1];
                      }else{
                          player.boardPosition[xx][yy] = 0;
                      }
                  }
              }
              y++; //restart at this row beause row has collapsed
          }
      }

      //combo
      if(cleared > 0){
          player.combo++;
      }else{
          player.combo = 0;
          game.applyGarbage(); //apply garbage if no lines have been sent
      }

      game.linesSent(cleared, tspin); //send line function which also recognizes line clears

      player.tspinRotate = false; //reset tspin
  }
  checkTspin() {
    var { player } = this;
      if(player.currentPieceName == "T"){
          var corner = [false, false, false, false];
          //check if last sucesssful movement is not a rotate
          if(!player.tspinRotate){
              return "not";
          }

          //top left
          if(player.boardPosition[player.piece.x + 0][player.piece.y + 1]){
              var i = 0 - player.piece.angle;
              if(i < 0){
                  i = 4 + i;
              }
              corner[i] = true;
          }
          //top right
          if(player.boardPosition[player.piece.x + 2][player.piece.y + 1]){
              var i = 1 - player.piece.angle;
              if(i < 0){
                  i = 4 + i;
              }
              corner[i] = true;
          }
          //bottom right
          if(player.boardPosition[player.piece.x + 2][player.piece.y + 3]){
              var i = 2 - player.piece.angle;
              if(i < 0){
                  i = 4 + i;
              }
              corner[i] = true;
          }
          //bottom left
          if(player.boardPosition[player.piece.x + 0][player.piece.y + 3]){
              var i = 3 - player.piece.angle;
              corner[i] = true;
          }

          //corner 0 and 1 are the ones near the point, corners 2 and 3 are the base

          if(corner[0] && corner[1] && (corner[2] || corner[3])){
              return "tspin";
          }

          if(corner[2] && corner[3] && (corner[1] || corner[0])){
              return "mini";
          }

          return "not";
      }
      return "not";
  }
  linesSent(cleared, tspin) {
    var { player } = this

    var b2bTSD = false;

      var message = "";
      var linesSent = 0;
      //send combo lines
      switch(player.combo){
          case 0:
          case 1:
              break;
          case 2:
          case 3:
          case 4:
              linesSent += 1;
              break;
          case 5:
          case 6:
              linesSent += 2;
              break;
          case 7:
          case 8:
              linesSent += 3;
              break;
          case 9:
          case 10:
          case 11:
              linesSent += 4;
              break;
          case 12:
          default:
              linesSent += 5;
      }
      message = "Combo: " + player.combo.toString() + "<BR>";

      //detect perfect clear
      for(var y = 21; y >= 18; y--) {
          var check = 0; //blocks in a row
          for(var x = 0; x <= 9; x++) {
              if(player.boardPosition[x][y] != ""){
                  check++;
              }
          }
          //if row is not empty or entirely filled
          if(!(check == 0 || check == 10)){
              break;
          }else if(y == 18){
              linesSent += 10;
              message += "PERFECT CLEAR!!!!!!!!!!!!!<BR>";
              player.b2b = false;
          }
      }

      //check if perfect clear has not been done
      if(linesSent <= 5){

          //calculate back to backs
          if(player.b2b == true && cleared == 4){
              linesSent += 5;
              message += "Back to back TETRIS!!!<BR>";
          }else if(player.b2b == true && tspin != "not"){
            if(tspin == "mini" && cleared < 2) {
              linesSent += 1;
              message += "Back to back T-spin mini!!!<BR>";
            } else if(tspin == "tspin" || tspin == "mini") {
              switch(cleared){
                  case 1:
                      linesSent += 3;
                      message += "Back to back T-spin single!!!<BR>";
                      break;
                  case 2:
                      linesSent += 5;
                      message += "Back to back T-spin double!!!<BR>";
                      if(env.b2bTSD) {
                        b2bTSD = true;
                      }

                      break;
                  case 3:
                      linesSent += 7;
                      message += "Back to back T-spin triple!!!<BR>";
                      break;
              }
            }
          }else{

              //send lines depending on lines cleared
              switch(cleared){
                  case 1:
                      player.b2b = false;
                      message += "single<BR>";
                      break;
                  case 2:
                      linesSent += 1;
                      player.b2b = false;
                      message += "double!<BR>";
                      break;
                  case 3:
                      linesSent += 2;
                      player.b2b = false;
                      message += "Triple!!<BR>";
                      break;
                  case 4:
                      linesSent += 4;
                      message += "Tetris!!!!!<BR>";
                      player.b2b = true;
                      break;
              }

              //send lines depending on tspin
              if(tspin == "mini" && cleared < 2) {
                if(cleared > 0){
                    linesSent += 0;
                    player.b2b = true;
                }
                message += "T-spin mini<BR>";
              } else if(tspin =="tspin" || tspin == "mini") {
                switch(cleared){
                    case 1:
                        linesSent += 2;
                        message += "T-spin single!<BR>";
                        break;
                    case 2:
                        linesSent += 3;
                        message += "T-spin double!!!<BR>";
                        if(env.b2bTSD) b2bTSD = true;
                        break;
                    case 3:
                        linesSent += 4;
                        message += "T-spin triple!!!!!<BR>";
                        break;
                }
                player.b2b = true;
              }
          }
      }

      if(linesSent > 1 && settings.handicap) {
        linesSent = 1;
      }
      if(linesSent >= 1 && settings.myNameIsMeidy) {
        linesSent *= 4;
        if(linesSent > 10) linesSent = 10;
      }

      player.linesSent += linesSent;

      if(env.b2bTSD) {
        linesSent = 0;
        if(cleared>0 && !b2bTSD) {
          this.loss();
          return;
        } else if(b2bTSD) {
          player.stats.b2bTSD++;
          socket.emit('b2bTSD', player.stats.b2bTSD);
          linesSent = 3;
        }
        message += "Total Back to Back Tspin Doubles: " + player.stats.b2bTSD + "<br>";
      }

      if(cleared > 0){
          game.recordLinesSent(linesSent); //record lines sent
      }

      message += "lines sent: " + linesSent + "<br>";
      message += "total lines sent: " + player.linesSent;

      var data = {
        message: message
      }

      linesSent = player.reduceGarbage(linesSent);

      console.log(linesSent)
      if(linesSent > 0) {
        socket.emit('linesSent', linesSent);
      }

      // this.io.to(player.id).emit("linesSent", data);

      this.clearMessage();
      this.writeMessage(message);

      // //actually send lines
      // this.iterate(otherPlayer => {
      //   //send to player if not self
      //   if(otherPlayer.id != player.id && linesSent > 0)
      //     otherPlayer.addToIncoming(linesSent);
      // });
  }
  losingGray() {
    var {player} = game;

    for(var y = 0; y <= 21; y++){
        for(var x = 0; x <=9; x++){
            if(player.boardPosition[x][y] != 0){
                player.boardPosition[x][y] = 8;
            }
        }
    }
    game.draw();
  }
  clean() {
    var { player } = this;
    // when need to delete, we need to clear all intervals
    clearInterval(player.piece.interval);
  }
  //message
  writeMessage(message) {
    document.getElementById("line").innerHTML += message;

    //write modifiers
    var {increaseGravity, randomColor, disableGhost, cheeseGarbage, oneGarbage, noHardDrop, noHold, randomBag} = this.modifiers;
    var modifiers = "";

    if(increaseGravity) modifiers += "Gravity Increased, "
    if(randomColor) modifiers += "Random Color, "
    if(disableGhost) modifiers += "Ghost Disabled, "
    if(cheeseGarbage) modifiers += "Cheese Garbage, "
    if(oneGarbage) modifiers += "One Solid Garbage Per Line, "
    if(noHardDrop) modifiers += "No Hard Drop, "
    if(noHold) modifiers += "No Hold, "
    if(randomBag) modifiers += "Random Pieces, "


    document.getElementById("line").innerHTML += "<br> Modifiers: " + modifiers;
  }
  clearMessage() {
    document.getElementById("line").innerHTML = "";
  }
  //bag
  newBag() {
    if (!this.modifiers.randomBag){
      //this is the regular bag
      var bagLength = this.bag.length;

      this.bag[bagLength] = ["S", "Z", "I", "T", "J", "L", "O"]; //all pieces
      this.shuffleBag(this.bag[bagLength]); //shuffle bag
      this.bag[bagLength] = this.bag[bagLength].join(',');
    }
    else if (this.modifiers.randomBag) {
      //this is no 7-piece bag
      var bagLength = this.bag.length;

      this.bag[bagLength] = []; //blank array of pieces
      while (this.bag[bagLength].length < 7){
        var ranPiece = this.random(1,7);
        this.bag[bagLength].push(this.getPieceLetter(ranPiece));
      }
      this.bag[bagLength] = this.bag[bagLength].join(',');
    }
  }
  shuffleBag(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  //other functions
  getPieceNumber(pieceName) {
    switch(pieceName) {
        case 'S':
            return 1;
        case 'Z':
            return 2;
        case 'I':
            return 3;
        case 'T':
            return 4;
        case 'J':
            return 5;
        case 'L':
            return 6;
        case 'O':
            return 7;
        default:
          console.log("no such piece available");
    }
  }
  getPieceLetter(pieceNumber) {
    switch(pieceNumber) {
        case 1:
            return 'S';
        case 2:
            return 'Z';
        case 3:
            return 'I';
        case 4:
            return 'T';
        case 5:
            return 'J';
        case 6:
            return 'L';
        case 7:
            return 'O';
        default:
          console.log("no such piece available");
    }
  }
  getPieceRotation(pieceName) {
    switch(pieceName) {
        case 'S':
            return [
              '1,1|2,1|0,2|1,2',
              '1,1|1,2|2,2|2,3',
              '1,2|2,2|0,3|1,3',
              '0,1|0,2|1,2|1,3'
            ];
        case 'Z':
            return [
              '0,1|1,1|1,2|2,2',
              '2,1|1,2|2,2|1,3',
              '0,2|1,2|1,3|2,3',
              '1,1|0,2|1,2|0,3'
            ];
        case 'I':
            return [
              '0,1|1,1|2,1|3,1',
              '2,0|2,1|2,2|2,3',
              '0,2|1,2|2,2|3,2',
              '1,0|1,1|1,2|1,3'
            ];
        case 'T':
            return [
              '1,1|0,2|1,2|2,2',
              '1,1|1,2|2,2|1,3',
              '0,2|1,2|2,2|1,3',
              '1,1|0,2|1,2|1,3'
            ];
        case 'J':
            return [
              '0,1|0,2|1,2|2,2',
              '1,1|2,1|1,2|1,3',
              '0,2|1,2|2,2|2,3',
              '1,1|1,2|0,3|1,3'
            ];
        case 'L':
            return [
              '2,1|0,2|1,2|2,2',
              '1,1|2,3|1,2|1,3',
              '0,2|1,2|2,2|0,3',
              '1,1|1,2|0,1|1,3'
            ];
        case 'O':
            return [
              '1,1|1,2|2,1|2,2',
              '1,1|1,2|2,1|2,2',
              '1,1|1,2|2,1|2,2',
              '1,1|1,2|2,1|2,2'
            ];
        default:
          console.log("no such piece available");
    }
  }
  shadeColor(color, percent) {
      var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
      return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  }
  getPieceColor(piece) {

    // if(this.modifiers.randomColor) {
    //   piece = 8; // sets ghost piece to gray
    // }

    switch(piece){
        case 1:
            return "#69BE28";
        case 2:
            return "#ED2939";
        case 3:
            return "#009FDA";
        case 4:
            return "#952D98";
        case 5:
            return "#0065BD";
        case 6:
            return "#FF7900";
        case 7:
            return "#FECB00";
        case 8:
            return "#696969";
    }
  }
  //draw
  draw() {
    // console.log(player);
    var { player } = this;

    var queue = [],
        playerCurrentPiece = player.currentPiece,
        playerCurrentBag = player.currentBag;

    for(var i=0; i<4; i++) {
      //get the next 4 pieces in the bag
      var bagPieces = this.bag[playerCurrentBag].split(','); //get current bag pieces

      queue.push(bagPieces[playerCurrentPiece])

      playerCurrentPiece++; //increment currentPiece;

      //if at the end of the current bag, go to the next bag
      if (playerCurrentPiece >= 7){
          playerCurrentPiece = 0;
          playerCurrentBag++;
      }
    }

    var data = {
      id: this.id,
      ghost: {
        y: player.piece.ghost.y,
        color: player.piece.ghost.color
      },
      piece: {
        rotation: player.piece.rotations[player.piece.angle],
        x: player.piece.x,
        y: player.piece.y,
        color: player.piece.color
      },
      boardPosition: player.boardPosition,
      hold: player.currentHoldPiece,
      queue: queue,
      incoming: player.getTotalIncoming()
    }

    socket.emit("update", data);

    draw.clearCanvas(draw.boardCanvas);
    draw.drawGrid(draw.boardCanvas, 24);

    //ghost piece
    var myRotations = data.piece.rotation.split('|');
    draw.clearCanvas(draw.boardCanvas);

    if(!this.modifiers.disableGhost)
    for(var i = 0; i <= 3; i++) {
        var xx, yy, coordinates;

        coordinates = myRotations[i].split(',');
        xx = Number(coordinates[0]); //x pos of the block
        yy = Number(coordinates[1]); //y pos of the block

        draw.makeBlock(1 + (data.piece.x) * 24, 1 + (data.ghost.y) * 24, xx, yy, data.ghost.color, draw.boardCanvas, 24);
    }


    //draw pieces
    myRotations = data.piece.rotation.split('|');
    for(var i = 0; i <= 3; i++) {
        var xx, yy, coordinates, color;

        coordinates = myRotations[i].split(',');
        xx = Number(coordinates[0]); //x pos of the block
        yy = Number(coordinates[1]); //y pos of the block

        color = draw.getPieceColor(data.piece.color);

        draw.makeBlock(1 + (data.piece.x) * 24, 1 + (data.piece.y) * 24, xx, yy, color, draw.boardCanvas, 24);
    }

    draw.drawBoard(draw.boardCanvas, data.boardPosition, 24);

    draw.drawHold(data.hold);
    draw.drawQueue(data.queue);
    draw.drawIncoming(data.incoming)
  }
  //record
  recordBoardPosition() {
    var { player } = this;

      //record board
      var tempstring = "";
      var time = 0;

      //get position
      for(var y=0; y <= 21; y++) {// every row
          for(var x=0; x<= 9; x++) { //go through every block in the row)
              if(player.boardPosition[x][y] > 0){ //if there is a block
                  tempstring += player.boardPosition[x][y];
              }
              tempstring += ".";
          }
      }

      //get time interval

      time = (new Date).getTime() - player.startTime;

      tempstring += "," + time + "|";

      player.boardPositionRecord += tempstring;
  }
  recordLinesSent(lines) {
    var { player } = this;

      //record board
      var tempstring = "";
      var time = 0;

      tempstring += lines.toString() + ',';

      //get time interval

      time = (new Date).getTime() - player.startTime;

      tempstring +=  time + "|";

      player.linesSentRecord += tempstring;
  }
  //garbage
  addGarbage(linesSent) {
    var { player } = this;

      var random = this.random(0,9);  // get random number from 0-9
      //move every row up

      for(var y = 0; y <= 20; y++) {
          for(var x = 0; x <= 9; x++) {
              //copy the row from one below it (unless its the very top row, then clear all of that)
              player.boardPosition[x][y] = player.boardPosition[x][y + linesSent];
          }
      }

      for(var y = 0; y< linesSent; y++){
        if(this.modifiers.cheeseGarbage) random = this.random(0, 9); //if cheeseGarbage modifier is true, set random each line
        if(settings.myNameIsMeidy) random = settings.random;

        if(!this.modifiers.oneGarbage){
          //this is normal one
           for(var x = 0; x<= 9; x++){
            player.boardPosition[x][21-y] = 8; //sets it to be full
          }
          //on the bottom row, remove a random block
          player.boardPosition[random][21-y] = 0;
        }

        else {
          for(var x = 0; x<= 9; x++){
            player.boardPosition[x][21-y] = 0; //sets it to be empty
          }
          //on the bottom row, add a random block
          player.boardPosition[random][21-y] = 8;
        }
      }
      player.piece.update();
  }
  applyGarbage() {
    var { player } = this;

    if(player.incoming.length === undefined) {
      return;
    }

    for(var lines of player.incoming) {
      game.addGarbage(lines);
    }

    player.incoming = [];
  }
  applyRandomModifier() {
    console.log('Applied Random Modifer');

    var random;

    if(this.modifiers.level == 1) {
      random = this.random(1, 8);
      switch(random) {
        case 1:
          //change gravity to be faster
          settings.gravity = 100;
          this.modifiers.increaseGravity = true;
          break;
        case 2:
          //get random colors for each pieces
          this.modifiers.randomColor = true;
          break;
        case 3:
          //disable ghost piece
          this.modifiers.disableGhost = true;
          break;
        case 4:
          this.modifiers.cheeseGarbage = true;
          break;
        case 5:
          this.modifiers.oneGarbage = true;
          break;
        case 6:
          this.modifiers.noHardDrop = true;
          break;
        case 7:
          this.modifiers.noHold = true;
          break;
        case 8:
          this.modifierse.randomBag = true;
          break;
      }
    }

    if(this.modifiers.level == 2) {
      random = this.random(1, 1);
      switch(random) {
        case 1:
          this.modifiers.randomBag = true;
          break;
      }
    }

    if(this.modifiers.level == 3) {
      random = this.random(1, 1);
      switch(random) {
        case 1:
          this.modifiers.noHardDrop = true;
          break;
      }
    }

    if(this.modifiers.level == 4) {
      random = this.random(1, 1);
      switch(random) {
        case 1:
          this.modifiers.oneGarbage = true;
          break;
      }
    }

    // this.modifiers.level++;
  }
  random(min, max) {
    //gives a random integer from min to max
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  meidy() {
    settings.random = game.random(0, 9);
  }
}

export { Game }
