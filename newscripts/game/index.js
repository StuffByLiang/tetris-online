var Piece = require('./piece/');
var Send = require('./send/');

class Game {
  constructor(io) {
    this.io = io;
    this.players = [];
    this.bag = [];

    //this.send = new Send();
  }
  getPlayer(id) {
    return this.players[id];
  }
  start(player) {
    if(this.checkLoss(player) || !player.begin) {
      player.begin = true;
      if(player.piece) {
        //if game piece exists
        clearInterval(player.piece.interval);
        player.piece = null;
      }

      // player = new playerObject();
      //
      // record.startTime = (new Date).getTime(); //set the time in which game starts

      this.spawnPiece(player);
      // game.drawQueue();
      // game.drawHold();
    }
  }
  checkLoss(player) {
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
  moveLeft(player) {

  }
  rotateRight(player) {

  }
  moveRight(player) {

  }
  softDrop(player) {

  }
  rotateLeft(player) {
    if(!player.isPressed("rotateLeft")) {
      if(player.piece.canRotate(-1)) {

        player.player.piece.rotationLimit++; //lock down rotation limit
        clearTimeout(player.piece.lockDownTimer);
        player.piece.lockDownTimer = false;

        player.piece.angle--;
        if(player.piece.angle < 0){
            player.piece.angle = 3;
        }

        player.tspinRotate = true; //detect rotate

        player.piece.lockdown();

        player.ghost.update();
        player.piece.update();
        player.drawBoard();
      }
    }
  }
  hardDrop(player) {

  }
  spawnPiece(player) {
      //spawn a piece from the currentPiece position in the currentBag

      // check if a new bag needs to be created, if so, then create it
      if(this.bag[player.currentBag + 1] == undefined)
        this.newBag();

      console.log(this.bag); // debug

      var bagPieces = this.bag[player.currentBag].split(',');

      player.currentPieceName = bagPieces[player.currentPiece]; //set currentPieceName

      player.currentPiece++;

      if (player.currentPiece >= 7){
          player.currentPiece = 0;
          player.currentBag++;
      }

      //this sets the rotations and color of the specific piece
      var color, rotations;
      rotations = this.getPieceRotation(player.currentPieceName);
      color = this.getPieceNumber(player.currentPieceName);

      player.piece = new Piece(player, 3, -1, player.currentPieceName, color, rotations); //create piece

      //set gravity if down is pressed
      if(player.pressed["softDrop"] > 0) {
          //check if no collision down and if so, set soft drop
          if(!player.piece.checkCollision(1)){
              clearInterval(player.piece.interval);
              player.piece.interval = setInterval(player.piece.gravityInterval.bind(player), settings.gravity);
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
      if(!player.canHold && !player.firstHold) {
          player.firstHold = true;
      }else{
          player.canHold = true;
      }

  }
  hold(player) {
      //for the first time shift is pressed
      if(player.canHold){
          if(!player.firstHold){
              //set canShift = false until a new piece is spawned
              player.canHold = false;
              player.currentHoldPiece = player.currentPieceName;

              //clear current piece settings
              clearInterval(this.piece.interval);
              clearTimeout(this.piece.lockDownTimer);
              this.piece.lockDownTimer = false;

              //spawn a new piece
              this.spawnPiece();

              this.drawHold(player.currentHoldPiece);
              this.drawQueue();

          }else {
              //set canShift = false until a new piece is spawned
              player.canHold = false;

              player.currentHoldPiece = [player.currentPieceName, player.currentPieceName =   player.currentHoldPiece][0]; //swap two variables

              //clear current piece settings
              clearInterval(this.piece.interval);
              clearTimeout(this.piece.lockDownTimer);
              this.piece.lockDownTimer = false;

              this.drawHold(player.currentHoldPiece);

              //now spawn piece

              //this sets the rotations and color of the specific piece
              var rotations = game.getPieceRotation(player.currentPieceName);
              var color = game.getPieceNumber(player.currentPieceName);

              this.piece = new this.pieceObject(3, -1, player.currentPieceName, color, rotations); //create piece
              color = game.getPieceColor(color);
              this.ghost = new this.ghostObject(color); //create ghost

              //set gravity if down is pressed

              if(key.pressed[key.down] > 0) {
                  //check if no collision down and if so, set soft drop
                  if(!game.piece.checkCollision(1)){
                      clearInterval(game.piece.interval);
                      game.piece.interval = setInterval(game.piece.gravityInterval, 75);
                  }
              }

              //move down instantly if its free
              if(!this.piece.checkCollision(1)){
                  this.piece.y++;

                  //reset lockdown timer and rotation limit if reach a new lowest line
                  if(this.piece.y > this.piece.lowestLine){
                      this.piece.lowestLine = this.piece.y;
                      this.rotationLimit = 0;
                      clearTimeout(this.piece.lockDownTimer);
                  }
              }

              game.ghost.update();
              game.piece.update();
              game.drawBoard();

          }
      }
  }
  clearLines(player) {
      var cleared = 0;

      var tspin = game.checkTspin(player);
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
      }

      game.sendLines(player, cleared, tspin); //send line function which also recognizes line clears

      player.tspinRotate = false; //reset tspin
  }
  checkTspin(player) {
      if(player.currentPieceName == "T"){
          var corner = [false, false, false, false];
          //check if last sucesssful movement is not a rotate
          if(!player.tspinRotate){
              return "not";
          }

          //top left
          if(player.boardPosition[game.piece.x + 0][game.piece.y + 1]){
              var i = 0 - game.piece.angle;
              if(i < 0){
                  i = 4 + i;
              }
              corner[i] = true;
          }
          //top right
          if(player.boardPosition[game.piece.x + 2][game.piece.y + 1]){
              var i = 1 - game.piece.angle;
              if(i < 0){
                  i = 4 + i;
              }
              corner[i] = true;
          }
          //bottom right
          if(player.boardPosition[game.piece.x + 2][game.piece.y + 3]){
              var i = 2 - game.piece.angle;
              if(i < 0){
                  i = 4 + i;
              }
              corner[i] = true;
          }
          //bottom left
          if(player.boardPosition[game.piece.x + 0][game.piece.y + 3]){
              var i = 3 - game.piece.angle;
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
  sendLines(player, cleared, tspin) {
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
      document.getElementById("line").innerHTML = "Combo: " + player.combo.toString() + "<BR>";

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
              document.getElementById("line").innerHTML += "PERFECT CLEAR!!!!!!!!!!!!!<BR>";
              player.b2b = false;
          }
      }

      //check if perfect clear has not been done
      if(linesSent <= 5){

          //calculate back to backs
          if(player.b2b == true && cleared == 4){
              linesSent += 6;
              document.getElementById("line").innerHTML += "Back to back TETRIS!!!<BR>";
          }else if(player.b2b == true && tspin != "not"){
             switch(tspin){
              case "mini":
                      linesSent += 2;
                      document.getElementById("line").innerHTML += "Back to back T-spin mini!!!<BR>";
                  break;
              case "tspin":
                  switch(cleared){
                      case 1:
                          linesSent += 3;
                          document.getElementById("line").innerHTML += "Back to back T-spin single!!!<BR>";
                          break;
                      case 2:
                          linesSent += 6;
                          document.getElementById("line").innerHTML += "Back to back T-spin double!!!<BR>";
                          break;
                      case 3:
                          linesSent += 9;
                          document.getElementById("line").innerHTML += "Back to back T-spin triple!!!<BR>";
                          break;
                  }
                  break;
              }
          }else{

              //send lines depending on lines cleared
              switch(cleared){
                  case 1:
                      player.b2b = false;
                      document.getElementById("line").innerHTML += "single<BR>";
                      break;
                  case 2:
                      linesSent += 1;
                      player.b2b = false;
                      document.getElementById("line").innerHTML += "double!<BR>";
                      break;
                  case 3:
                      linesSent += 2;
                      player.b2b = false;
                      document.getElementById("line").innerHTML += "Triple!!<BR>";
                      break;
                  case 4:
                      linesSent += 4;
                      document.getElementById("line").innerHTML += "Tetris!!!!!<BR>";
                      player.b2b = true;
                      break;
              }

              //send lines depending on tspin
              switch(tspin){
                  case "mini":
                      if(cleared > 0){
                          linesSent += 1;
                          player.b2b = true;
                      }
                      document.getElementById("line").innerHTML += "T-spin mini<BR>";
                      break;
                  case "tspin":
                      switch(cleared){
                          case 1:
                              linesSent += 2;
                              document.getElementById("line").innerHTML += "T-spin single!<BR>";
                              break;
                          case 2:
                              linesSent += 3;
                              document.getElementById("line").innerHTML += "T-spin double!!!<BR>";
                              break;
                          case 3:
                              linesSent += 4;
                              document.getElementById("line").innerHTML += "T-spin triple!!!!!<BR>";
                              break;
                      }
                      player.b2b = true;
                      break;
              }
          }
      }

      player.linesSent += linesSent;

      if(cleared > 0){
          record.recordLinesSent(linesSent); //record lines sent
      }

      document.getElementById("line").innerHTML += "lines sent: " + linesSent + "<br>";
      document.getElementById("line").innerHTML += "total lines sent: " + player.linesSent;
  }

  // bag
  newBag() {
    var bagLength = this.bag.length;

    this.bag[bagLength] = ["S", "Z", "I", "T", "J", "L", "O"]; //all pieces
    this.shuffleBag(this.bag[bagLength]); //shuffle bag
    this.bag[bagLength] = this.bag[bagLength].join(','); //shuffle bag
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
  draw(player) {
    // console.log(player);
    var data = {
      id: player.id,
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
      boardPosition: player.boardPosition
    }
    this.io.emit("update", data);
  }
}
module.exports = Game;
