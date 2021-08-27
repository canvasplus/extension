const oldDefaults = {
  "canvasplus-setting-quicklink": true,
  "canvasplus-setting-search": true,
  "canvasplus-setting-smartscroll": true,
  "canvasplus-display-appearance": "light"
}

const newDefaults = {
  "canvasplus-setting-convopeeker": true
  "canvasplus-setting-sidebar-hidelogo": true,
  "canvasplus-setting-sidebar-color": '#1b7ecf',
  "canvasplus-setting-active-sidebar-color": {"background": "darker", "icon": "white"},
  "canvasplus-setting-sidebar-icon-color": "white",
  "canvasplus-setting-sidebar-smaller-icons": true,
  "canvasplus-setting-sidebar-more-spacing": true
}

chrome.runtime.onInstalled.addListener((details) => {
  console.log(details);
    if(details.reason === "install"){
      window.open("https://canvasplus.adrwas.dev/welcome");
      chrome.storage.local.set(newDefaults);
      chrome.storage.local.set(oldDefaults);
    }
    else if (details.reason === "update" && details.previousVersion !== "0.3") {
      chrome.storage.local.set(newDefaults);
      window.open("https://canvasplus.adrwas.dev/update/patch-0-3");
    }
});
