window.draw.drawIncoming = function(totalIncoming) {
  draw.clearCanvas(draw.playerIncomingCanvas);

  var ctx = draw.playerIncomingCanvas.getContext("2d");

  ctx.fillStyle = 'red';

  if(totalIncoming > 19) {
      ctx.fillRect(0, 1, 4, draw.playerIncomingCanvas.height);
  } else {
      ctx.fillRect(0, 1 + draw.playerIncomingCanvas.height - (totalIncoming * 24), 4, 1 + draw.playerIncomingCanvas.height - ((20-totalIncoming) * 24));
  }
}
