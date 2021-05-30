chrome.storage.local.get(['canvasplus-display-appearance'], function(data) {
    var link = document.createElement("link");
    link.href = chrome.extension.getURL("src/inject/colors/dark.css");
    link.type = "text/css";
    link.rel = "stylesheet";
      if(data["canvasplus-display-appearance"] == "dark") document.getElementsByTagName('html')[0].appendChild(link);
});
