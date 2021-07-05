chrome.storage.local.get(["canvasplus-setting-sidebar"], function(data) {
  const hexcode = data;
  if (data != null) {
    window.addEventListener('load', function() {
      const amount = document.getElementsByTagName("a");
      for (i = 0; i in amount; i++) {
        var a = document.getElementsByTagName("a")[i];
        a.style.color = "#" + hexcode;
      };
    });
  };
});
