window.game.bag.new = function(bag) {
  debugger;
    var bagLength = game.bag.currentBag.length;

    game.bag.currentBag[bagLength] = ["S", "Z", "I", "T", "J", "L", "O"]; //all pieces
    game.bag.shuffle(game.bag.currentBag[bagLength]); //shuffle bag
    game.bag.currentBag[bagLength] = game.bag.currentBag[bagLength].join(','); //shuffle bag
}
