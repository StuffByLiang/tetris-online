module.exports = function() {
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
};
