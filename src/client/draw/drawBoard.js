window.draw.drawBoard = function(canvas, boardPosition, width) {
    //draw board
    for(var y=2; y <= 21; y++) {// every row
        for(var x=0; x<= 9; x++) { //go through every block in the row
            if(boardPosition[x][y] !== 0){
                var color = draw.getPieceColor(boardPosition[x][y]);
                color = shadeColor(color, -0.15);
                draw.makeBlock(1 + x * width, 1 + y * width, 0, 0, color, canvas, width);
            }
        }
    }

}
