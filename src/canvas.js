const defaults = {
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
  "canvasplus-setting-roundermodules": true,
  "canvasplus-setting-linkcolor": 'use default'
}

const settingsList = Object.keys(defaults);
let settings = {};

chrome.storage.local.get(settingsList, function(data) {
  settings = data;
  if(Object.entries(data).length < settingsList.length)
  {
    console.log(Object.entries(data).length, settingsList.length, data);
    chrome.storage.local.set(defaults);
  }
});

let alert = document.createElement("div");
alert.id = "canvasplus-alert";
alert.style.opacity = "0";
alert.style.visibility = "hidden";
alert.addEventListener("click", function (evt) {
  if (evt.target !== this)
    return;

  this.style.opacity = "0";
  this.style.visibility = "hidden";
});

let settingsUpdateBox = document.createElement("div");
settingsUpdateBox.id = "canvasplus-alert-settings-update"
settingsUpdateBox.innerHTML = "<h2>Canvas+ Settings were Changed</h2><p>Your changes will be applied once this page is reloaded.</p><br><button class='btn' onclick='location.reload()'>Reload</button>"

alert.appendChild(settingsUpdateBox);
document.body.insertBefore(alert, document.body.firstElementChild);

let settingprev = [];

const getprevsetting = async (settingname) => {
  await chrome.storage.local.get([settingname], function (data) {
    settingprev[settingname] = data;
  })
}

getprevsetting("canvasplus-setting-quicklink")

const settingchanged = (val, settingname) => {
  if (settingprev[settingname]) {

    if (val != settingprev[settingname][settingname]) {
      alert.style.opacity = "1";
      alert.style.visibility = "visible";
    }
  }
}

useReactiveFeatures([{
  settingName: "canvasplus-setting-quicklink",
  onChanged: (val) => {
    settingchanged(val, "canvasplus-setting-quicklink")
  }
}])