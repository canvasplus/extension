const oldDefaults = {
  "canvasplus-setting-quicklink": true,
  "canvasplus-setting-search": true,
  "canvasplus-setting-smartscroll": true,
  "canvasplus-display-appearance": "light",
  "canvasplus-setting-convopeeker": true,
  "canvasplus-setting-hidelogo": true,
  "canvasplus-setting-sidebar-color": '#1b7ecf',
  "canvasplus-setting-active-sidebar-color": {"background": "darker", "icon": "white"},
  "canvasplus-setting-sidebar-icon-color": "white",
  "canvasplus-setting-sidebar-smaller-icons": true,
  "canvasplus-setting-sidebar-more-spacing": true,
  "canvasplus-setting-roundermodules": true
}

const newDefaults = {
}

chrome.runtime.onInstalled.addListener((details) => {
    if(details.reason === "install"){
      chrome.tabs.create({
        url:"https://canvasplus.adrwas.dev/welcome"
      });
      chrome.storage.local.set(newDefaults);
      chrome.storage.local.set(oldDefaults);
      chrome.storage.local.set({
        "installDate": {
          "timestamp": Date.now(),
          "from": "install"
        }
      })
    }
    else if (details.reason === "update" && details.previousVersion !== "0.3.1") {
      //reminder to remove the install date stuff in 0.3.2 chrome.storage.local.set(newDefaults);


      // REMOVE ME IN 0.3.2
      chrome.storage.local.set({
        "installDate": {
          "timestamp": Date.now(),
          "from": "update"
        }
      })
    }
});
