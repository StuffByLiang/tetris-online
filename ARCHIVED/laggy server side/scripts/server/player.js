module.exports = function(id) {
    this.id = id;
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

    //sets up boardPosition
    for(var x = -1; x <= 10; x++) {// every row
      this.boardPosition[x] = [];
        for(var y = -1; y<= 22; y++) { //go through every block in the row
            this.boardPosition[x][y] = 1;

            //outside boundary set to 1
            if(x == -1 || x == 10 || y == -1 || y == 22){
                this.boardPosition[x][y] = 1;
            }
        }
    }

    this.addToIncoming = function(lines) {
        this.incoming.push(lines);
        draw.drawPlayerIncoming(); //editme
    };

    this.getTotalIncoming = function() {
      var total=0;

      for(number of this.incoming) {
        total += number;
      }

      return total;
    };

};
