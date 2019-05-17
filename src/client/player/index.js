class Player {
  constructor() {
    // this.id = id;
    this.currentBag = 0;
    this.currentPiece = 0;
    this.currentPieceName = "";
    this.canHold = true;
    this.currentHoldPiece = "";
    this.firstHold = false;
    this.b2b = false;
    this.tspinRotate = false;
    this.combo = 0;
    this.linesSent = 0;
    this.incoming = [];
    this.boardPosition = [ [], [] ]; //2d array
    this.pressed = {}; //pressed keys
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
      this.incoming.push(lines);
  }
  getTotalIncoming() {
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
