window.game.losingGray = function() {
  for(var y = 0; y <= 21; y++){
      for(var x = 0; x <=9; x++){
          if(game.boardPosition[x][y] != 0){
              game.boardPosition[x][y] = 8;
          }
      }
  }
  game.drawBoard();
}
