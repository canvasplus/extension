const oldDefaults = {
  "canvasplus-setting-quicklink": false,
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
  "canvasplus-setting-roundermodules": true,
  "canvasplus-setting-linkcolor": 'use default',
  "canvasplus-setup-stage": 0
}

const newDefaults = {
}

chrome.runtime.onInstalled.addListener((details) => {
    if(details.reason === "install"){
      chrome.tabs.create({
        url:"https://canvasplus.org/welcome"
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
    else if (details.reason === "update" && details.previousVersion !== "0.3.3") {
      chrome.storage.local.set(newDefaults);
      chrome.storage.local.get("installDate", ({installDate}) => {
        if(installDate.timestamp > 1633669200000) {
          chrome.storage.local.set({"canvasplus-setting-quicklink": false})
        }
      })
    }
});
