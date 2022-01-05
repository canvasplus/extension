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
  "canvasplus-setting-sidebar-more-spacing": true,
  "canvasplus-setting-roundermodules": true,
  "canvasplus-setting-linkcolor": 'use default',
  "canvasplus-setup-stage": 0,
  "canvasplus-current-version": "0.4"
}

const newDefaults = {
  "canvasplus-setting-sidebar-drawer": true,
  "canvasplus-setting-sidebar-drawer-excluded": ["Dashboard", "Courses", "Calendar", "Inbox", "Settings", "Search"],
  "canvasplus-setting-sidebar-drawer-all-items": ["Settings", "Search"],
  "canvasplus-birthday-confetti": false,
  "canvasplus-allow-surveys": true,
  "canvasplus-survey-seed-1": Math.random(),
  "canvasplus-survey": 0,
  "canvasplus-rating": false,
  "canvasplus-setting-sidebar-icon-size": 3,
  "canvasplus-setting-sidebar-show-settings": true
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
    else if (details.reason === "update" && details.previousVersion === "0.3.4") {
      //chrome.storage.local.set({"canvasplus-current-version": "0.4"}) // canvasjs will detect new version
      chrome.storage.local.set(newDefaults);
    }
});
