window.toggleSettings = function() {
  var isOpen = $('#settings-container').is(":visible");
  if(isOpen) {
    $('#settings-container').hide();
  } else {
    $('#settings-container').show();

    //Makes sure that the values of the shown in text boxes match settins
    $("#das").val() = settings.das;
    $("#arr").val() = settings.arr;
    $("#gravity").val() = settings.gravity;
    $("#softDrop").val() = settings.softDrop;

  }
}
