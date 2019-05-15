window.draw.drawHold = function(piece) {
    //draw hold (1)
    draw.clearCanvas(draw.holdCanvas, 24);

    switch(piece) {
        case 'S':
            draw.drawS(1, 1, draw.holdCanvas, 24);
            break;
        case 'Z':
            draw.drawZ(1, 1, draw.holdCanvas, 24);
            break;
        case 'I':
            draw.drawI(1, 1, draw.holdCanvas, 24);
            break;
        case 'T':
            draw.drawT(1, 1, draw.holdCanvas, 24);
            break;
        case 'J':
            draw.drawJ(1, 1, draw.holdCanvas, 24);
            break;
        case 'L':
            draw.drawL(1, 1, draw.holdCanvas, 24);
            break;
        case 'O':
            draw.drawO(1, 1, draw.holdCanvas, 24);
            break;
        case '':
          break;
        default:
            console.log("no such piece available");
    }

}
