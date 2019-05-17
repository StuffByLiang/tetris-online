window.toggleSettings = function() {
  var isOpen = $('#settings-container').is(":visible");
  if(isOpen) {
    $('#settings-container').hide();
  } else {
    $('#settings-container').show();
  }
}
