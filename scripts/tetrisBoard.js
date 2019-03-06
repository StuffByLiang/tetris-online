window.tetrisBoard = {
    canvas : document.getElementById("boardCanvas"),
    start : function() {
        //set canvas height/width
        this.blockWidth = 24; //set the block width to 20px
        this.canvas.width = 10 * this.blockWidth + 2; //10 blocks wide * the width of the block
        this.canvas.height = 22 * this.blockWidth + 2; // 22 blocks wide * the width of the block

        this.context = this.canvas.getContext("2d");
    },
    drawGrid : function() {

        //map out veritcal lines
        for(var x = 1; x <= this.canvas.width; x += this.blockWidth) {
            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.canvas.height);
        }

        //map out horizontal lines
        for(var y = 1; y <= this.canvas.height; y += this.blockWidth) {
            this.context.moveTo(0, y);
            this.context.lineTo(this.canvas.width, y);
        }

        //draw
        this.context.strokeStyle = "black";
        this.context.stroke();

        // Then, once you've fully composed your background, grab it as a base64 PNG
        var base64 = this.canvas.toDataURL();
        // ..  and stuff that PNG into the element's background
        this.canvas.style.backgroundImage = "url("+base64+")";
    }
};
