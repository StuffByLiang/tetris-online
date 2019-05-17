class Player {
  constructor() {
    // this.id = id;
    this.currentBag = 0; // the Current 7 piece bag that the player is on
    this.currentPiece = 0; // the current piece in the bag that the player is on. ranges from 0-6
    this.currentPieceName = ""; // piece Letter, eg L, J, S, Z, I, O
    this.canHold = true; // Can the player hold?
    this.currentHoldPiece = ""; // What piece is in hold?
    this.hasHold = false; // does the player have a hold currently?
    this.b2b = false; // true if player has done a tetris/tspin
    this.tspinRotate = false; // true if a tspin rotate has been done to aid in checking for tspins
    this.combo = 0; // consecutive lines cleared. reset to 0.
    this.linesSent = 0; // total lines sent in the game
    this.incoming = []; // array of incoming lines
    this.boardPosition = [ [], [] ]; //2d array of board position.
    this.pressed = {}; //pressed keys

    // unused
    this.begin = false;
    this.startTime = 0;
    this.linesSentRecord = "";
    this.boardPositionRecord = "";

    this.stats = {
      b2bTSD: 0
    }

    //sets up boardPosition
    for(var x = -1; x <= 10; x++) {// every row
      this.boardPosition[x] = [];
        for(var y = -1; y<= 22; y++) { //go through every block in the row
            this.boardPosition[x][y] = 0;

            //outside boundary set to 1
            if(x == -1 || x == 10 || y == -1 || y == 22){
                this.boardPosition[x][y] = 1;
            }
        }
    }
  }
  isPressed(move) {
    // returns if the key correlated to the move is currently being pressed
    return this.pressed[move] === undefined ? false: true;
  }
  addToIncoming(lines) {
      //add number of lines to incoming lines
      this.incoming.push(lines);
  }
  getTotalIncoming() {
    //get total amount of incoming lines
    if(this.incoming.length === undefined) {
      return;
    }

    var total=0;

    for(var number of this.incoming) {
      total += number;
    }

    return total;
  }
  reduceGarbage(linesSent) {
    //this is to cancel garbage
    var {player} = game;
  	for (var i = 0; i < player.incoming.length; i++){
  		if (linesSent > player.incoming[i]){
  			linesSent -= player.incoming[i];
  			player.incoming.shift();
        i--;
      } else if (linesSent < player.incoming[i]){
  			player.incoming[i] -= linesSent;
  			linesSent = 0;
  		}
  	}
    return linesSent;
  }
}
export { Player }
