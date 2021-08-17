chrome.storage.local.get(["canvasplus-setting-linkcolor"], function(data) {
  const color = data["canvasplus-setting-linkcolor"];
  console.log(color);
  if(color.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)) {
    var link = document.createElement("link");
    link.href = chrome.extension.getURL("src/inject/linkcolor/linkcolor.css");
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName('html')[0].appendChild(link);
    document.documentElement.style.setProperty('--ic-link-color', color);
  };
});
