window.draw.drawQueue = function(pieces) {
    //draw queue (4)
    draw.clearCanvas(draw.queueCanvas);
    for(var i = 0; i <= 3; i++) {
        //draw the piece
        switch(pieces[i]) {
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
    }

}
