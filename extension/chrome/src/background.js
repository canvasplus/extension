const settingsList = ["canvasplus-setting-quicklink", "canvasplus-setting-search", "canvasplus-setting-smartscroll"];
let settings = {};

chrome.storage.local.get(settingsList, function(data) {
  settings = data;
  if(Object.entries(data).length < settingsList.length)
  {
    window.open("https://canvasplus.adrwas.dev/welcome");
    chrome.storage.local.set({"canvasplus-setting-quicklink": true, "canvasplus-setting-search": true, "canvasplus-setting-smartscroll": true});
  }
});
