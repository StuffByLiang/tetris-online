class Ghost {
  constructor(player, piece, color) {
    //create a new object in game
    this.player = player;
    this.piece = piece;
    this.color = game.shadeColor(color, -0.5);
    this.pieceName = player.currentPieceName;
    this.angle = piece.angle;
    this.rotations = piece.rotations[piece.angle];
  }
  //create event of the object
  update() {
    this.x = this.piece.x;
    this.y = this.piece.y;
    this.angle = this.piece.angle;
    this.rotations = this.piece.rotations[this.piece.angle];

    while(!this.checkDown()) {
        this.y++;
    }
  }
  checkDown() {
    var myRotations = this.rotations.split('|');
    //check collision

    for(var i=0; i <= 3; i++) {
        var coordinates = myRotations[i].split(',');
        var xx = Number(coordinates[0]); //x pos of the block
        var yy = Number(coordinates[1]); //y pos of the block

        //first check if x or y is past border, return true if it is
        if(this.x + xx < 0 ||
           this.x + xx > 9 ||
           this.y + yy + 1 < 0 ||
           this.y + yy + 1 > 21) {
            return true;
        }

        //then check if the block is free near the piece, return true if there is collision
        if(this.player.boardPosition[this.x + xx][this.y + yy + 1] !== 0){
            return true;
        }
    }

    return false;
  }
}
export { Ghost }
