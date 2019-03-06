window.game.applyGarbage = function() {
    for(var lines of player.incoming) {
      game.addGarbage(lines);
    }

    player.incoming = [];
    draw.drawPlayerIncoming();
}
