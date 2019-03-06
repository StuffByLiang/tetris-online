var enemyBoard = {
    enemyGarbage : 0,
    enemyIncoming : 0,
    enemyPrevious : 0,
    enemyTotalLines: 0,
    enemyKo : 0,

    playerGarbage : 0,
    playerIncoming : 0,
    playerPrevious : 0,
    playerKo : 0,

    startTime : 0,
    currentBoardPosition : 0,
    currentBoardLine : 0,
    string: "",
    linesSent : "",
    canvas : document.getElementById("enemyCanvas"),
    playerIncomingCanvas : document.getElementById("playerIncomingCanvas"),
    enemyIncomingCanvas : document.getElementById("enemyIncomingCanvas"),
    start : function() {
        //set canvas height/width
        enemyBoard.blockWidth = 24; //set the block width to 20px
        enemyBoard.canvas.width = 10 * enemyBoard.blockWidth + 2; //10 blocks wide * the width of the block
        enemyBoard.canvas.height = 22 * enemyBoard.blockWidth + 2; // 22 blocks wide * the width of the block

        record.startTime = (new Date).getTime(); //set the time in which game starts

        enemyBoard.context = enemyBoard.canvas.getContext("2d");
    },
    drawGrid : function() {

        //map out veritcal lines
        for(var x = 1; x <= enemyBoard.canvas.width; x += enemyBoard.blockWidth) {
            enemyBoard.context.moveTo(x, 0);
            enemyBoard.context.lineTo(x, enemyBoard.canvas.height);
        }

        //map out horizontal lines
        for(var y = 1; y <= enemyBoard.canvas.height; y += enemyBoard.blockWidth) {
            enemyBoard.context.moveTo(0, y);
            enemyBoard.context.lineTo(enemyBoard.canvas.width, y);
        }

        //draw
        enemyBoard.context.strokeStyle = "black";
        enemyBoard.context.stroke();

        // Then, once you've fully composed your background, grab it as a base64 PNG
        var base64 = enemyBoard.canvas.toDataURL();
        // ..  and stuff that PNG into the element's background
        enemyBoard.canvas.style.backgroundImage = "url("+base64+")";
    },
    startUpdate : function() {
        //for position
        enemyBoard.boardPositions = enemyBoard.string.split('|');

        var temp = enemyBoard.boardPositions[enemyBoard.currentBoardPosition].split(',');

        var time = temp[1];

        enemyBoard.timer = setTimeout(enemyBoard.update, time);


        //for lines sent
        enemyBoard.boardLines = enemyBoard.linesSent.split('|');

        var temp = enemyBoard.boardLines[enemyBoard.currentBoardLine].split(',');

        var time = Number(temp[1]) + 1;

        enemyBoard.lineTimer = setTimeout(enemyBoard.updateLines, time);
    },
    update : function() {
        //draw board
        draw.clearCanvas(enemyBoard.canvas);

        //set garbage only if lines are not sent
        var temp1, temp2;

        temp1 = enemyBoard.boardLines[enemyBoard.currentBoardLine].split(',');
        temp2 = enemyBoard.boardPositions[enemyBoard.currentBoardPosition].split(',');
        if(temp1[1] != temp2[1]){
            //if incoming lines will set the garbage to higher than 20 blocks
            if(enemyBoard.enemyIncoming >= 20 - enemyBoard.enemyGarbage) {
                enemyBoard.enemyIncoming -= 20 - enemyBoard.enemyGarbage;
                enemyBoard.enemyGarbage = 20;
            }else{
                enemyBoard.enemyGarbage += enemyBoard.enemyIncoming;
                enemyBoard.enemyIncoming = 0;
            }
        }
        draw.clearCanvas(enemyBoard.enemyIncomingCanvas); // clear the incoming lines canvas

        var temp = enemyBoard.boardPositions[enemyBoard.currentBoardPosition].split(',');

        var positions = temp[0].split('.'); // set positions

        var i = 0;
        //draw
        for(var y=0; y <= 21; y++) {// every row
            for(var x=0; x<= 9; x++) { //go through every block in the row
                var color;
                switch(Number(positions[i])){
                    case 1:
                        color = "#69BE28";
                    break;
                    case 2:
                        color = "#ED2939";
                    break;
                    case 3:
                        color = "#009FDA";
                    break;
                    case 4:
                        color = "#952D98";
                    break;
                    case 5:
                        color = "#0065BD";
                    break;
                    case 6:
                        color = "#FF7900";
                    break;
                    case 7:
                        color = "#FECB00";
                    break;
                }

                //if not empty
                if(positions[i]>0){
                    draw.makeBlock(1 + x * 24, 1 + (y - enemyBoard.enemyGarbage) * 24, 0, 0, color, enemyBoard.canvas);
                }
                i++;
            }
        }

        //check k-o
        var check = false;
        var a = enemyBoard.enemyGarbage * 10;
        var checkPositions = [3 + a , 4 + a, 5 + a, 6 + a, 13 + a, 14 + a, 15 + a, 16 + a];

        for(var i = 0; i <= 7; i++){
            if(positions[checkPositions[i]] != 0){
                check = true;
            }
        }

        if(check){
            enemyBoard.enemyGarbage = 0;
            enemyBoard.playerKo++;
            game.sendLines(0,'not'); // update record
        }

        //draw garbage
        for(var y=21; y > 21 - enemyBoard.enemyGarbage; y--) {// every row
            for(var x=0; x<= 9; x++) { //go through every block in the row
                draw.makeBlock(1 + x * 24, 1 + (y) * 24, 0, 0, "#d3d3d3", enemyBoard.canvas);
            }
        }
        enemyBoard.currentBoardPosition++;

        //now set time
        temp = enemyBoard.boardPositions[enemyBoard.currentBoardPosition].split(',');

        var time = temp[1] - ((new Date).getTime() - enemyBoard.startTime) + 1;

        enemyBoard.lineTimer = setTimeout(enemyBoard.update, time);
    },
    updateLines : function() {

        var temp = enemyBoard.boardLines[enemyBoard.currentBoardLine].split(',');

        var lines = Number(temp[0]); // set lines

        //now send lines
        if(lines > 0){
            //clear incoming lines
            if(enemyBoard.enemyIncoming > lines){
                //if incoming garbage is more than line sent
                enemyBoard.enemyIncoming -= lines;
                lines = 0;
            }else{
                //if incoming garvage is equal or smaller than lines sent
                lines -= enemyBoard.enemyIncoming;
                enemyBoard.enemyIncoming = 0;
            }

            //clear self garvage lines
            if(enemyBoard.enemyGarbage > lines){
                //if garbage is more than line sent
                enemyBoard.enemyGarbage -= lines;
                lines = 0;
            }else{
                //if garbage is equal or smaller than lines sent
                lines -= enemyBoard.enemyGarbage;
                enemyBoard.enemyGarbage = 0;
            }
        }
        enemyBoard.playerIncoming += lines;

        //we draw both canvas due to sending liens and cancelling lines
        enemyBoard.drawPlayerIncoming();
        enemyBoard.drawEnemyIncoming();

        enemyBoard.currentBoardLine++;

        //now set time
        temp = enemyBoard.boardLines[enemyBoard.currentBoardLine].split(',');

        var time = temp[1] - ((new Date).getTime() - enemyBoard.startTime);

        enemyBoard.lineTimer = setTimeout(enemyBoard.updateLines, time);
    },
    sendLines : function(lines) {
        if(lines > 0){
            //clear incoming lines
            if(enemyBoard.playerIncoming > lines){
                //if incoming garbage is more than line sent
                enemyBoard.playerIncoming -= lines;
                lines = 0;
            }else{
                //if incoming garvage is equal or smaller than lines sent
                lines -= enemyBoard.playerIncoming;
                enemyBoard.playerIncoming = 0;
            }

            //clear self garvage lines
            if(enemyBoard.playerGarbage > lines){
                //if garbage is more than line sent
                enemyBoard.playerGarbage -= lines;
                lines = 0;
            }else{
                //if garbage is equal or smaller than lines sent
                lines -= enemyBoard.playerGarbage;
                enemyBoard.playerGarbage = 0;
            }
        }
        enemyBoard.enemyIncoming += lines;

        //we draw both canvas due to sending liens and cancelling lines
        enemyBoard.drawPlayerIncoming();
        enemyBoard.drawEnemyIncoming();
    },
    drawPlayerIncoming : function() {
        draw.clearCanvas(enemyBoard.playerIncomingCanvas);

        var ctx = enemyBoard.playerIncomingCanvas.getContext("2d");

        ctx.fillStyle = 'red';

        if(enemyBoard.playerIncoming > 22) {
            ctx.fillRect(0, 1, 4, enemyBoard.playerIncomingCanvas.height);
        }else {
            ctx.fillRect(0, 1 + enemyBoard.playerIncomingCanvas.height - (enemyBoard.playerIncoming * 24), 4, 1 + enemyBoard.playerIncomingCanvas.height - (enemyBoard.playerIncoming * 24));
        }
    },
    drawEnemyIncoming : function() {
        draw.clearCanvas(enemyBoard.enemyIncomingCanvas);

        var ctx = enemyBoard.enemyIncomingCanvas.getContext("2d");

        ctx.fillStyle = 'red';

        if(enemyBoard.enemyIncoming > 22) {
            ctx.fillRect(0, 1, 4, enemyBoard.enemyIncomingCanvas.height);
        }else {
        ctx.fillRect(0, 1 + enemyBoard.enemyIncomingCanvas.height - (enemyBoard.enemyIncoming * 24), 4, 1 + enemyBoard.enemyIncomingCanvas.height - (enemyBoard.enemyIncoming * 24));
        }
    },
};
