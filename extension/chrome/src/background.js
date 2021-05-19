chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        window.open("https://canvasplus.adrwas.dev/welcome");
        chrome.storage.local.set({"canvasplus-setting-quicklink": true, "canvasplus-setting-search": true, "canvasplus-setting-smartscroll": true, "canvasplus-display-appearance": "light"});
    } else if(details.reason == "update") {
      if(details.previousVersion != "0.2.2") window.open("https://canvasplus.adrwas.dev/update/patch-0-2-2");
    }
});
