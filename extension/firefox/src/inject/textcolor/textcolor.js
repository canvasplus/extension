const otherplaceholder = "0";
window.addEventListener('load', function() {
  const amount = document.getElementsByTagName("a");
  if (otherplaceholder != 0) {
    for (i = 0; i in amount; i++) {
      var a = document.getElementsByTagName("a")[i];
      a.style.color = "#" + otherplaceholder;
    };
  };

})
