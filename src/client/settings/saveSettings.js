window.saveSettings = function() {
  //saves settings
  //remember, to get variables, use $("#das").val()
  settings.das = parseInt(($("#das").val()), 10);
  settings.arr = parseInt(($("#arr").val()), 10);
  settings.gravity = parseInt(($("#gravity").val()),10);
  settings.softDrop = parseInt(($("#softDrop").val()),10);

  toggleSettings(); //closes settings box
}
