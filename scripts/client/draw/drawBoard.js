window.draw.drawBoard = function() {
    //draw board
    for(var y=0; y <= 21; y++) {// every row
        for(var x=0; x<= 9; x++) { //go through every block in the row
            if(boardPosition[id][x][y] !== 0){
                var color = draw.getPieceColor(boardPosition[id][x][y]);
                draw.makeBlock(1 + x * 24, 1 + (y) * 24, 0, 0, color, draw.boardCanvas);
            }
        }
    }

}
