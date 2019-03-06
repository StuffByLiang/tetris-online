window.game.drawQueue = function() {
    //draw queue (4)
    draw.clearCanvas(draw.queueCanvas);

    var playerCurrentPiece = player.currentPiece;
    var playerCurrentBag = player.currentBag;

    for(var i = 0; i <= 3; i++) {
        //reset current piece/bag if currentPiece reaches the end of the bag

        var bagPieces = game.bag.currentBag[playerCurrentBag].split(','); //get current bag pieces

        //draw the piece
        switch(bagPieces[playerCurrentPiece]) {
            case 'S':
                draw.drawS(1, i*96 + 1, draw.queueCanvas);
                break;
            case 'Z':
                draw.drawZ(1, i*96 + 1, draw.queueCanvas);
                break;
            case 'I':
                draw.drawI(1, i*96 + 1, draw.queueCanvas);
                break;
            case 'T':
                draw.drawT(1, i*96 + 1, draw.queueCanvas);
                break;
            case 'J':
                draw.drawJ(1, i*96 + 1, draw.queueCanvas);
                break;
            case 'L':
                draw.drawL(1, i*96 + 1, draw.queueCanvas);
                break;
            case 'O':
                draw.drawO(1, i*96 + 1, draw.queueCanvas);
                break;
            default:
            console.log("no such piece available");
        }

        playerCurrentPiece++; //increment currentPiece;

        if (playerCurrentPiece >= 7){
            playerCurrentPiece = 0;
            playerCurrentBag++;
            if(game.bag.currentBag[player.currentBag + 1] == undefined)
            game.bag.new();
        }

    }

}
