chrome.storage.local.get(['canvasplus-display-appearance'], function(data) {
  var link = document.createElement("link");
  link.href = chrome.extension.getURL("src/inject/colors/dark.css");
  link.type = "text/css";
  link.rel = "stylesheet";
  var link2 = document.createElement("link");
  link2.href = chrome.extension.getURL("src/inject/colors/dim.css");
  link2.type = "text/css";
  link2.rel = "stylesheet";
    if(data["canvasplus-display-appearance"] == "dark") document.getElementsByTagName('html')[0].appendChild(link);
    if(data["canvasplus-display-appearance"] == "dim") document.getElementsByTagName('html')[0].appendChild(link2);
});