window.record = {
    startTime : 0,
    boardPosition : "",
    linesSent: "",
    recordBoardPosition : function() {
        //record board
        var tempstring = "";
        var time = 0;

        //get position
        for(var y=0; y <= 21; y++) {// every row
            for(var x=0; x<= 9; x++) { //go through every block in the row
                if(game.boardPosition[x][y] > 0){
                    tempstring += game.boardPosition[x][y];
                }
                tempstring += ".";
            }
        }

        //get time interval

        time = (new Date).getTime() - this.startTime;

        tempstring += "," + time + "|";

        this.boardPosition += tempstring;
    },
    recordLinesSent : function(lines) {
        //record board
        var tempstring = "";
        var time = 0;

        tempstring += lines.toString() + ',';

        //get time interval

        time = (new Date).getTime() - this.startTime;

        tempstring +=  time + "|";

        this.linesSent += tempstring;
    }
};
