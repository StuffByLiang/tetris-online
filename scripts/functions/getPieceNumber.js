window.game.getPieceNumber = function(pieceName) {
  switch(pieceName) {
      case 'S':
          return 1;
      case 'Z':
          return 2;
      case 'I':
          return 3;
      case 'T':
          return 4;
      case 'J':
          return 5;
      case 'L':
          return 6;
      case 'O':
          return 7;
      default:
        console.log("no such piece available");
  }
}
