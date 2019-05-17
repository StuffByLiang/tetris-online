window.saveSettings = function() {
  //saves settings
  //remember, to get variables, use $("#das").val()
  settings.das = parseInt(()$("#das").val()), 10);
  settings.arr = parseInt($("#arr").val()), 10);
  settings.gravity = parseInt($("#gravity").val()),10);
  settings.softDrop = parseInt($("#softDrop").val()),10);

  // cookies i think
  Cookies.set('das', settings.das, { expires: 999999999 });
  Cookies.set('arr', settings.arr, { expires: 999999999 });
  Cookies.set('gravity', settings.gravity, { expires: 999999999 });
  Cookies.set('softDrop', settings.softDrop, { expires: 999999999 });

  toggleSettings(); //closes settings box
}
