window.draw = {
    queueCanvas : document.getElementById("queueCanvas"),
    holdCanvas : document.getElementById("holdCanvas"),
    boardCanvas : document.getElementById("boardCanvas"),
    playerIncomingCanvas : document.getElementById("playerIncomingCanvas"),
    makeBlock : function(x, y, xPos, yPos, color, canvasType, width) {
        /*draw
        argument 0 = x
        argument 1 = y
        argument 2 = xPos
        argument 3 = yPos
        argument 4 = color
        argument 5 = canvasType
        argument 6 = width
        */
        if(canvasType != draw.holdCanvas && canvasType != draw.queueCanvas) {
            yPos-=2; // draw everything 2 blocks up if part of the board to hide the top 2 blocks
        }

        var ctx = canvasType.getContext("2d");

        ctx.fillStyle = color;

        //darken the color if it is not part of the current piece
        // if(canvasType == draw.boardCanvas){
        //     if(xPos > 0 || yPos > 0){
        //         ctx.globalAlpha = 0.9; //set transparity of ghost piece
        //     }
        //     for(var i = 0; i <= 3; i++) {
        //
        //         if (!((x - 1 ) / width == game.piece.oldX[i]) || !((y - 1 ) / width == game.piece.oldY[i])){
        //             ctx.fillStyle = shadeColor(color, -0.15);
        //
        //
        //         }else {
        //             //break out of loop once matched
        //             ctx.fillStyle = color;
        //             break;
        //         }
        //     }
        // }

        ctx.fillRect(x + xPos*width, y + yPos*width, width, width);

        ctx.beginPath();
        ctx.rect(x + xPos*width, y + yPos*width, width, width);
        ctx.stroke();

        ctx.globalAlpha = 1; //return to normal
    },
    drawS : function(x, y, canvasType, width) {
        //draw S
        this.makeBlock(x, y, 2, 1, "#69BE28", canvasType, width);
        this.makeBlock(x, y, 1, 1, "#69BE28", canvasType, width);
        this.makeBlock(x, y, 1, 2, "#69BE28", canvasType, width);
        this.makeBlock(x, y, 0, 2, "#69BE28", canvasType, width);
    },
    drawZ : function(x, y, canvasType, width) {
        //draw Z
        this.makeBlock(x, y, 0, 1, "#ED2939", canvasType, width);
        this.makeBlock(x, y, 1, 1, "#ED2939", canvasType, width);
        this.makeBlock(x, y, 1, 2, "#ED2939", canvasType, width);
        this.makeBlock(x, y, 2, 2, "#ED2939", canvasType, width);
    },
    drawI : function(x, y, canvasType, width) {
        //draw I
        this.makeBlock(x, y, 0, 1, "#009FDA", canvasType, width);
        this.makeBlock(x, y, 1, 1, "#009FDA", canvasType, width);
        this.makeBlock(x, y, 2, 1, "#009FDA", canvasType, width);
        this.makeBlock(x, y, 3, 1, "#009FDA", canvasType, width);
    },
    drawT : function(x, y, canvasType, width) {
        //draw T
        this.makeBlock(x, y, 1, 1, "#952D98", canvasType, width);
        this.makeBlock(x, y, 0, 2, "#952D98", canvasType, width);
        this.makeBlock(x, y, 1, 2, "#952D98", canvasType, width);
        this.makeBlock(x, y, 2, 2, "#952D98", canvasType, width);
    },
    drawJ : function(x, y, canvasType, width) {
        //draw L
        this.makeBlock(x, y, 0, 1, "#0065BD", canvasType, width);
        this.makeBlock(x, y, 0, 2, "#0065BD", canvasType, width);
        this.makeBlock(x, y, 1, 2, "#0065BD", canvasType, width);
        this.makeBlock(x, y, 2, 2, "#0065BD", canvasType, width);
    },
    drawL : function(x, y, canvasType, width) {
        //draw L
        this.makeBlock(x, y, 2, 1, "#FF7900", canvasType, width);
        this.makeBlock(x, y, 0, 2, "#FF7900", canvasType, width);
        this.makeBlock(x, y, 1, 2, "#FF7900", canvasType, width);
        this.makeBlock(x, y, 2, 2, "#FF7900", canvasType, width);
    },
    drawO : function(x, y, canvasType, width) {
        //draw O
        this.makeBlock(x, y, 1, 1, "#FECB00", canvasType, width);
        this.makeBlock(x, y, 1, 2, "#FECB00", canvasType, width);
        this.makeBlock(x, y, 2, 1, "#FECB00", canvasType, width);
        this.makeBlock(x, y, 2, 2, "#FECB00", canvasType, width);
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
            ctx.fillRect(0, 1 + draw.playerIncomingCanvas.height - (totalIncoming * width), 4, 1 + draw.playerIncomingCanvas.height - (totalIncoming * width));
        }

    },
    drawGrid : function(canvas, width) {
        //set canvas height/width
        this.blockWidth = width; //set the block width to 20px
        canvas.width = 10 * this.blockWidth + 2; //10 blocks wide * the width of the block
        canvas.height = 20 * this.blockWidth + 2; // 22 blocks wide * the width of the block

        this.context = canvas.getContext("2d");

        //map out veritcal lines
        for(var x = 1; x <= canvas.width; x += this.blockWidth) {
            this.context.moveTo(x, 0);
            this.context.lineTo(x, canvas.height);
        }

        //map out horizontal lines
        for(var y = 1; y <= canvas.height; y += this.blockWidth) {
            this.context.moveTo(0, y);
            this.context.lineTo(canvas.width, y);
        }

        //draw
        this.context.strokeStyle = "black";
        this.context.stroke();

        // Then, once you've fully composed your background, grab it as a base64 PNG
        var base64 = canvas.toDataURL();
        // ..  and stuff that PNG into the element's background
        canvas.style.backgroundImage = "url("+base64+")";
    },
    otherPlayerCanvas: []
};
