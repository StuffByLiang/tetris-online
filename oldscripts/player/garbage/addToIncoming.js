window.playerObject.prototype.addToIncoming = function(lines) {
    player.incoming.push(lines);
    draw.drawPlayerIncoming();
}
