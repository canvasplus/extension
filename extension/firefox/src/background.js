chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
      window.open("https://canvasplus.adrwas.dev/welcome");
      chrome.storage.local.set({"canvasplus-setting-quicklink": true, "canvasplus-setting-search": true, "canvasplus-setting-smartscroll": true, "canvasplus-display-appearance": "light", "canvasplus-setting-navigator": false, "canvasplus-setting-convopeeker": true, "canvasplus-setting-sidebar-hidelogo": false, "canvasplus-setting-sidebar-color": false, "canvasplus-setting-sidebar-size-toggle": false, "canvasplus-setting-linkcolor-toggle": false});
    }
    else if (details.reason == "update") {
      chrome.storage.local.set({"canvasplus-setting-navigator": false, "canvasplus-setting-convopeeker": true, "canvasplus-setting-sidebar-hidelogo": false, "canvasplus-setting-sidebar-color": false, "canvasplus-setting-sidebar-size-toggle": false, "canvasplus-setting-linkcolor-toggle": false});
    //   if(details.previousVersion != "0.2.3") window.open("https://canvasplus.adrwas.dev/update/patch-0-3");
    }
});
