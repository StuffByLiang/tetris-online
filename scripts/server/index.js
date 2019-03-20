module.exports = {
    bag: {},
    spawnPiece : function() {
        //spawn a piece from the currentPiece position in the currentBag
        var color, rotations;
        var bagPieces = this.bag.currentBag[player.currentBag].split(',');

        player.currentPieceName = bagPieces[player.currentPiece]; //set currentPieceName

        player.currentPiece++;

        if (player.currentPiece >= 7){
            player.currentPiece = 0;
            player.currentBag++;
        }

        //this sets the rotations and color of the specific piece
        rotations = game.getPieceRotation(player.currentPieceName);
        color = game.getPieceNumber(player.currentPieceName);

        this.piece = new this.pieceObject(3, -1, player.currentPieceName, color, rotations); //create piece

        color = game.getPieceColor(color);

        this.ghost = new this.ghostObject(color);


        //set gravity if down is pressed

        if(key.pressed[key.down] > 0) {
            //check if no collision down and if so, set soft drop
            if(!game.piece.checkCollision(1)){
                clearInterval(game.piece.interval);
                game.piece.interval = setInterval(game.piece.gravityInterval, settings.gravity);
            }
        }

        //move down instantly if its free
        if(!this.piece.checkCollision(1)){
            this.piece.y++;

            //reset lockdown timer and rotation limit if reach a new lowest line
            if(this.piece.y > this.piece.lowestLine){
                this.piece.lowestLine = this.piece.y;
                this.rotationLimit = 0;
                clearTimeout(this.piece.lockDownTimer);
            }
        }

        game.ghost.update();
        game.piece.update();
        game.drawBoard();

        //set canHold = true because new piece has spawned
        if(!player.canHold && !player.firstHold) {
            player.firstHold = true;
        }else{
            player.canHold = true;
        }

    },
    hold : function () {
        //for the first time shift is pressed
        if(player.canHold){
            if(!player.firstHold){
                //set canShift = false until a new piece is spawned
                player.canHold = false;
                player.currentHoldPiece = player.currentPieceName;

                //clear current piece settings
                clearInterval(this.piece.interval);
                clearTimeout(this.piece.lockDownTimer);
                this.piece.lockDownTimer = false;

                //spawn a new piece
                this.spawnPiece();

                this.drawHold(player.currentHoldPiece);
                this.drawQueue();

            }else {
                //set canShift = false until a new piece is spawned
                player.canHold = false;

                player.currentHoldPiece = [player.currentPieceName, player.currentPieceName =   player.currentHoldPiece][0]; //swap two variables

                //clear current piece settings
                clearInterval(this.piece.interval);
                clearTimeout(this.piece.lockDownTimer);
                this.piece.lockDownTimer = false;

                this.drawHold(player.currentHoldPiece);

                //now spawn piece

                //this sets the rotations and color of the specific piece
                var rotations = game.getPieceRotation(player.currentPieceName);
                var color = game.getPieceNumber(player.currentPieceName);

                this.piece = new this.pieceObject(3, -1, player.currentPieceName, color, rotations); //create piece
                color = game.getPieceColor(color);
                this.ghost = new this.ghostObject(color); //create ghost

                //set gravity if down is pressed

                if(key.pressed[key.down] > 0) {
                    //check if no collision down and if so, set soft drop
                    if(!game.piece.checkCollision(1)){
                        clearInterval(game.piece.interval);
                        game.piece.interval = setInterval(game.piece.gravityInterval, 75);
                    }
                }

                //move down instantly if its free
                if(!this.piece.checkCollision(1)){
                    this.piece.y++;

                    //reset lockdown timer and rotation limit if reach a new lowest line
                    if(this.piece.y > this.piece.lowestLine){
                        this.piece.lowestLine = this.piece.y;
                        this.rotationLimit = 0;
                        clearTimeout(this.piece.lockDownTimer);
                    }
                }

                game.ghost.update();
                game.piece.update();
                game.drawBoard();

            }
        }
    },
    clearLines : function() {
        var cleared = 0;

        var tspin = game.checkTspin();
        //clear lines

        //loop through rows, starting from the bottom
        for(var y = 21; y >= 0; y--) {
            var check = 0;//this variable checks for blocks that are filled in the row
            for(var x = 0; x <= 9; x++) {
                if(game.boardPosition[x][y] !== 0){
                    check++;
                }
            }

            //if entire row is filled
            if(check == 10){
                cleared++;

                //clear the row
                for(x = 0; x <= 9; x++) {
                    if(game.boardPosition[x][y] !== 0){
                       game.boardPosition[x][y] = 0;
                    }
                }
                for(var yy = y; yy >= 0; yy--) {
                    for(var xx = 0; xx <= 9; xx++) {
                        //copy the row from one above (unless its the very top row, then clear all of that)
                        if(yy!=0){
                            game.boardPosition[xx][yy] = game.boardPosition[xx][yy - 1];
                        }else{
                            game.boardPosition[xx][yy] = 0;
                        }
                    }
                }
                y++; //restart at this row beause row has collapsed
            }
        }

        //combo
        if(cleared > 0){
            player.combo++;
        }else{
            player.combo = 0;
        }

        game.sendLines(cleared, tspin); //send line function which also recognizes line clears

        player.tspinRotate = false; //reset tspin
    },
    checkTspin : function() {
        if(player.currentPieceName == "T"){
            var corner = [false, false, false, false];
            //check if last sucesssful movement is not a rotate
            if(!player.tspinRotate){
                return "not";
            }

            //top left
            if(game.boardPosition[game.piece.x + 0][game.piece.y + 1]){
                var i = 0 - game.piece.angle;
                if(i < 0){
                    i = 4 + i;
                }
                corner[i] = true;
            }
            //top right
            if(game.boardPosition[game.piece.x + 2][game.piece.y + 1]){
                var i = 1 - game.piece.angle;
                if(i < 0){
                    i = 4 + i;
                }
                corner[i] = true;
            }
            //bottom right
            if(game.boardPosition[game.piece.x + 2][game.piece.y + 3]){
                var i = 2 - game.piece.angle;
                if(i < 0){
                    i = 4 + i;
                }
                corner[i] = true;
            }
            //bottom left
            if(game.boardPosition[game.piece.x + 0][game.piece.y + 3]){
                var i = 3 - game.piece.angle;
                corner[i] = true;
            }

            //corner 0 and 1 are the ones near the point, corners 2 and 3 are the base

            if(corner[0] && corner[1] && (corner[2] || corner[3])){
                return "tspin";
            }

            if(corner[2] && corner[3] && (corner[1] || corner[0])){
                return "mini";
            }

            return "not";
        }
        return "not";
    },
    sendLines : function(cleared, tspin) {
        var linesSent = 0;
        //send combo lines
        switch(player.combo){
            case 0:
            case 1:
                break;
            case 2:
            case 3:
            case 4:
                linesSent += 1;
                break;
            case 5:
            case 6:
                linesSent += 2;
                break;
            case 7:
            case 8:
                linesSent += 3;
                break;
            case 9:
            case 10:
            case 11:
                linesSent += 4;
                break;
            case 12:
            default:
                linesSent += 5;
        }
        document.getElementById("line").innerHTML = "Combo: " + player.combo.toString() + "<BR>";

        //detect perfect clear
        for(var y = 21; y >= 18; y--) {
            var check = 0; //blocks in a row
            for(var x = 0; x <= 9; x++) {
                if(game.boardPosition[x][y] != ""){
                    check++;
                }
            }
            //if row is not empty or entirely filled
            if(!(check == 0 || check == 10)){
                break;
            }else if(y == 18){
                linesSent += 10;
                document.getElementById("line").innerHTML += "PERFECT CLEAR!!!!!!!!!!!!!<BR>";
                player.b2b = false;
            }
        }

        //check if perfect clear has not been done
        if(linesSent <= 5){

            //calculate back to backs
            if(player.b2b == true && cleared == 4){
                linesSent += 6;
                document.getElementById("line").innerHTML += "Back to back TETRIS!!!<BR>";
            }else if(player.b2b == true && tspin != "not"){
               switch(tspin){
                case "mini":
                        linesSent += 2;
                        document.getElementById("line").innerHTML += "Back to back T-spin mini!!!<BR>";
                    break;
                case "tspin":
                    switch(cleared){
                        case 1:
                            linesSent += 3;
                            document.getElementById("line").innerHTML += "Back to back T-spin single!!!<BR>";
                            break;
                        case 2:
                            linesSent += 6;
                            document.getElementById("line").innerHTML += "Back to back T-spin double!!!<BR>";
                            break;
                        case 3:
                            linesSent += 9;
                            document.getElementById("line").innerHTML += "Back to back T-spin triple!!!<BR>";
                            break;
                    }
                    break;
                }
            }else{

                //send lines depending on lines cleared
                switch(cleared){
                    case 1:
                        player.b2b = false;
                        document.getElementById("line").innerHTML += "single<BR>";
                        break;
                    case 2:
                        linesSent += 1;
                        player.b2b = false;
                        document.getElementById("line").innerHTML += "double!<BR>";
                        break;
                    case 3:
                        linesSent += 2;
                        player.b2b = false;
                        document.getElementById("line").innerHTML += "Triple!!<BR>";
                        break;
                    case 4:
                        linesSent += 4;
                        document.getElementById("line").innerHTML += "Tetris!!!!!<BR>";
                        player.b2b = true;
                        break;
                }

                //send lines depending on tspin
                switch(tspin){
                    case "mini":
                        if(cleared > 0){
                            linesSent += 1;
                            player.b2b = true;
                        }
                        document.getElementById("line").innerHTML += "T-spin mini<BR>";
                        break;
                    case "tspin":
                        switch(cleared){
                            case 1:
                                linesSent += 2;
                                document.getElementById("line").innerHTML += "T-spin single!<BR>";
                                break;
                            case 2:
                                linesSent += 3;
                                document.getElementById("line").innerHTML += "T-spin double!!!<BR>";
                                break;
                            case 3:
                                linesSent += 4;
                                document.getElementById("line").innerHTML += "T-spin triple!!!!!<BR>";
                                break;
                        }
                        player.b2b = true;
                        break;
                }
            }
        }

        player.linesSent += linesSent;

        if(cleared > 0){
            record.recordLinesSent(linesSent); //record lines sent
        }

        document.getElementById("line").innerHTML += "lines sent: " + linesSent + "<br>";
        document.getElementById("line").innerHTML += "total lines sent: " + player.linesSent;
    }
};
