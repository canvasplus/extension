document.getElementById("version").innerHTML = "Version " + chrome.app.getDetails().version;

window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
    chrome.tabs.create({url:e.target.href})
  }
})

const settings = ["quicklink", "search", "smartscroll"];

for(let setting of settings)
{
  document.getElementById("setting-" + setting + "-checkbox").addEventListener('click', function () {
    let toChange = {};
    toChange['canvasplus-setting-' + setting] = this.checked;
    chrome.storage.local.set(toChange);
  });

  chrome.storage.local.get(['canvasplus-setting-' + setting], function(data) {
    if(data['canvasplus-setting-' + setting])
    {
      document.getElementById("setting-" + setting + "-checkbox").checked = true;
    }
  });
}


// document.getElementById("toggledarkmode").addEventListener('click', function () {
//   chrome.storage.local.get(['dark_mode'], function(data) {
//     if(data.dark_mode)
//     {
//       chrome.storage.local.set({"dark_mode": false})
//       document.getElementById("darkmode").innerHTML = "Dark Mode is OFF"
//     }
//     else
//     {
//       chrome.storage.local.set({"dark_mode": true})
//       document.getElementById("darkmode").innerHTML = "Dark Mode is ON"
//     }
//   })
// })

document.getElementById("canvasplus-tab-changes").addEventListener('click', function () {
  for(tabItem of document.getElementById("canvasplus-tab-wrapper").children)
  {
    tabItem.hidden = true;
  }
  for(tab of document.getElementById("canvasplus-tab-control").children)
  {
    tab.classList = "";
  }

  let newTab = document.getElementById("canvasplus-changes");
  newTab.hidden = false;
  this.classList = "active-tab";

  chrome.storage.local.set({"canvasplus-popup-active-tab": "changes"});
})

document.getElementById("canvasplus-tab-settings").addEventListener('click', function () {
  for(tabItem of document.getElementById("canvasplus-tab-wrapper").children)
  {
    tabItem.hidden = true;
  }
  for(tab of document.getElementById("canvasplus-tab-control").children)
  {
    tab.classList = "";
  }

  let newTab = document.getElementById("canvasplus-settings");
  newTab.hidden = false;
  this.classList = "active-tab";

  chrome.storage.local.set({"canvasplus-popup-active-tab": "settings"});
})

document.getElementById("canvasplus-tab-display").addEventListener('click', function () {
  for(tabItem of document.getElementById("canvasplus-tab-wrapper").children)
  {
    tabItem.hidden = true;
  }
  for(tab of document.getElementById("canvasplus-tab-control").children)
  {
    tab.classList = "";
  }

  let newTab = document.getElementById("canvasplus-display");
  newTab.hidden = false;
  this.classList = "active-tab";

  chrome.storage.local.set({"canvasplus-popup-active-tab": "display"});
})

chrome.storage.local.get(['canvasplus-popup-active-tab'], function(data) {
  let activeTab = data['canvasplus-popup-active-tab'];
  if(activeTab != null)
  {
    for(tabItem of document.getElementById("canvasplus-tab-wrapper").children)
    {
      tabItem.hidden = true;
    }
    for(tab of document.getElementById("canvasplus-tab-control").children)
    {
      tab.classList = "";
    }

    document.getElementById("canvasplus-" + activeTab).hidden = false;
    document.getElementById("canvasplus-tab-" + activeTab).classList = "active-tab";
  }
});
