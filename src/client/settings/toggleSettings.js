window.toggleSettings = function() {
  var isOpen = $('#settings-container').is(":visible");
  if(isOpen) {
    $('#settings-container').hide();
  } else {
    $('#settings-container').show();

    //Makes sure that the values of the shown in text boxes match settins
    $("#das").val(settings.das);
    $("#arr").val(settings.arr);
    $("#gravity").val(settings.gravity);
    $("#softDrop").val(settings.softDrop);


  // cookies idk if it works
  Cookies.set('das', settings.das, { expires: 999999999 });
  Cookies.set('arr', settings.arr, { expires: 999999999 });
  Cookies.set('gravity', settings.gravity, { expires: 999999999 });
  Cookies.set('softDrop', settings.softDrop, { expires: 999999999 });
  }
}
