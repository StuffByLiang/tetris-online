window.game.addGarbage = function(linesSent) {
    var random = Math.floor(Math.random() * 10)  // get random number from 0-9
    //move every row up

    for(var y = 0; y <= 20; y++) {
        for(var x = 0; x <= 9; x++) {
            //copy the row from one below it (unless its the very top row, then clear all of that)
            game.boardPosition[x][y] = game.boardPosition[x][y + linesSent];
        }
    }

    for(var y = 0; y< linesSent; y++){
    	for(var x = 0; x<= 9; x++){
          game.boardPosition[x][21-y] = 8;
        }
      game.boardPosition[random][21-y] = 0;
    }

    game.ghost.update(); //update these pieces
    game.piece.update(); //update these pieces
    game.drawBoard(); // update the board
}
