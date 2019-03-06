window.game.newGame = function() {
  if(game.checkLoss() || !begin) {
    begin = true;
    if(game.piece) {
      //if game piece exists
      clearInterval(game.piece.interval);
      game.piece = null;
    }

    player = new playerObject();

    record.startTime = (new Date).getTime(); //set the time in which game starts

    game.bag.currentBag = [];

    game.bag.new();

    for(var x = -1; x <= 10; x++) {// every row
      game.boardPosition[x] = [];
        for(var y = -1; y<= 22; y++) { //go through every block in the row
            game.boardPosition[x][y] = 0;

            //outside boundary set to 1
            if(x == -1 || x == 10 || y == -1 || y == 22){
                game.boardPosition[x][y] = 1;
            }
        }
    }

    game.spawnPiece();
    game.piece.update();
    game.drawQueue();
    game.drawHold();
  }
}
