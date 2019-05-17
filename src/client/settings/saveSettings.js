window.saveSettings = function() {
  //saves settings
  //remember, to get variables, use $("#das").val()
  settings.das = $("#das").val();
  settings.arr = $("#arr").val();
  settings.gravity = $("#gravity").val();
  settings.softDrop = $("#softDrop").val();
}
