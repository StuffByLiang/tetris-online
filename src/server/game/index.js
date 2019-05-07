class Game {
  constructor(io) {
    this.io = io;
    this.players = [];
    this.bag = [];
    this.started=false;

    //this.send = new Send();
  }
  getPlayer(id) {
    return this.players[id];
  }
  iterate(callback) {
    //iterate through all players with a callback function
    for(var playerId in this.players) {
      var player = this.getPlayer(playerId);
      callback(player);
    }
  }
  getTotalAlive() {
    var aliveCount=0;
    this.iterate(player => {
      if(player.alive) {
        aliveCount++;
      }
    })

    return aliveCount;
  }
  getRandomPlayer() {
    var keys = Object.keys(this.players);
    return this.players[keys[Math.floor(keys.length * Math.random())]];
  }

  // bag
  newBag() {
    var bagLength = this.bag.length;

    this.bag[bagLength] = ["S", "Z", "I", "T", "J", "L", "O"]; //all pieces
    this.shuffleBag(this.bag[bagLength]); //shuffle bag
    this.bag[bagLength] = this.bag[bagLength].join(','); //shuffle bag
  }
  shuffleBag(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  reset() {
    this.players = [];
    this.started = false;
    this.io.emit("gameInfo", false);
  }
}
module.exports = Game;
