chrome.storage.local.get(["canvasplus-setting-linkcolor-toggle"], function(toggle) {
  if(toggle["canvasplus-setting-linkcolor-toggle"]) {
    chrome.storage.local.get(["canvasplus-setting-linkcolor"], function(data) {
      const hexcode = data;
      var amount = document.getElementsByTagName("a");
      for (i = 0; i in amount; i++) {
        var a = document.getElementsByTagName("a")[i];
        a.style.color = "#" + hexcode;
      };
      window.addEventListener('load', function() {
        amount = document.getElementsByTagName("a");
        for (i = 0; i in amount; i++) {
          a = document.getElementsByTagName("a")[i];
          a.style.color = "#" + hexcode;
        };
      });
    });
  };
});
