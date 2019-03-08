window.game.checkLoss = function() {
  var check = false;
  for(var y = 0; y <= 1; y++){
      for(var x = 3; x <=6; x++){
          if(game.boardPosition[x][y] != 0){
              check = true;
          }
      }
  }

  return check;
}
