window.draw = {
    queueCanvas : document.getElementById("queueCanvas"),
    holdCanvas : document.getElementById("holdCanvas"),
    playerIncomingCanvas : document.getElementById("playerIncomingCanvas"),
    makeBlock : function(x, y, xPos, yPos, color, canvasType) {
        /*draw
        argument 0 = x
        argument 1 = y
        argument 2 = xPos
        argument 3 = yPos
        argument 4 = color
        argument 5 = canvasType
        */
        var ctx = canvasType.getContext("2d");

        ctx.fillStyle = color;

        //darken the color if it is not part of the current piece in the tetrisBoard.canvas
        if(canvasType == tetrisBoard.canvas){
            if(xPos > 0 || yPos > 0){
                ctx.globalAlpha = 0.9; //set transparity if ghost piece
            }
            for(var i = 0; i <= 3; i++) {

                if (!((x - 1 ) / 24 == game.piece.oldX[i]) || !((y - 1 ) / 24 == game.piece.oldY[i])){
                    ctx.fillStyle = shadeColor(color, -0.15);


                }else {
                    //break out of loop once matched
                    ctx.fillStyle = color;
                    break;
                }
            }
        }

        ctx.fillRect(x + xPos*24, y + yPos*24, 24, 24);

        ctx.beginPath();
        ctx.rect(x + xPos*24, y + yPos*24, 24, 24);
        ctx.stroke();

        ctx.globalAlpha = 1; //return to normal
    },
    drawS : function(x, y, canvasType) {
        //draw S
        this.makeBlock(x, y, 2, 1, "#69BE28", canvasType);
        this.makeBlock(x, y, 1, 1, "#69BE28", canvasType);
        this.makeBlock(x, y, 1, 2, "#69BE28", canvasType);
        this.makeBlock(x, y, 0, 2, "#69BE28", canvasType);
    },
    drawZ : function(x, y, canvasType) {
        //draw Z
        this.makeBlock(x, y, 0, 1, "#ED2939", canvasType);
        this.makeBlock(x, y, 1, 1, "#ED2939", canvasType);
        this.makeBlock(x, y, 1, 2, "#ED2939", canvasType);
        this.makeBlock(x, y, 2, 2, "#ED2939", canvasType);
    },
    drawI : function(x, y, canvasType) {
        //draw I
        this.makeBlock(x, y, 0, 1, "#009FDA", canvasType);
        this.makeBlock(x, y, 1, 1, "#009FDA", canvasType);
        this.makeBlock(x, y, 2, 1, "#009FDA", canvasType);
        this.makeBlock(x, y, 3, 1, "#009FDA", canvasType);
    },
    drawT : function(x, y, canvasType) {
        //draw T
        this.makeBlock(x, y, 1, 1, "#952D98", canvasType);
        this.makeBlock(x, y, 0, 2, "#952D98", canvasType);
        this.makeBlock(x, y, 1, 2, "#952D98", canvasType);
        this.makeBlock(x, y, 2, 2, "#952D98", canvasType);
    },
    drawJ : function(x, y, canvasType) {
        //draw L
        this.makeBlock(x, y, 0, 1, "#0065BD", canvasType);
        this.makeBlock(x, y, 0, 2, "#0065BD", canvasType);
        this.makeBlock(x, y, 1, 2, "#0065BD", canvasType);
        this.makeBlock(x, y, 2, 2, "#0065BD", canvasType);
    },
    drawL : function(x, y, canvasType) {
        //draw L
        this.makeBlock(x, y, 2, 1, "#FF7900", canvasType);
        this.makeBlock(x, y, 0, 2, "#FF7900", canvasType);
        this.makeBlock(x, y, 1, 2, "#FF7900", canvasType);
        this.makeBlock(x, y, 2, 2, "#FF7900", canvasType);
    },
    drawO : function(x, y, canvasType) {
        //draw O
        this.makeBlock(x, y, 1, 1, "#FECB00", canvasType);
        this.makeBlock(x, y, 1, 2, "#FECB00", canvasType);
        this.makeBlock(x, y, 2, 1, "#FECB00", canvasType);
        this.makeBlock(x, y, 2, 2, "#FECB00", canvasType);
    },
    clearCanvas : function(canvasType) {
        var ctx = canvasType.getContext("2d");
        ctx.clearRect(0,0, canvasType.width, canvasType.height);
    },
    drawPlayerIncoming : function() {
        draw.clearCanvas(draw.playerIncomingCanvas);

        var ctx = draw.playerIncomingCanvas.getContext("2d");

        ctx.fillStyle = 'red';

        var totalIncoming = player.getTotalIncoming();

        if(totalIncoming > 22) {
            ctx.fillRect(0, 1, 4, draw.playerIncomingCanvas.height);
        } else {
            ctx.fillRect(0, 1 + draw.playerIncomingCanvas.height - (totalIncoming * 24), 4, 1 + draw.playerIncomingCanvas.height - (totalIncoming * 24));
        }

    },
};
