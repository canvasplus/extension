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

document.getElementById("cpc-hover").addEventListener('click', function () {
  window.open("https://canvasplus.adrwas.dev/update/patch-0-2-2")
});

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

chrome.storage.local.get(['canvasplus-display-appearance'], function(data) {
  let appearance = data['canvasplus-display-appearance'];
  if(appearance != null)
  {
    document.getElementById("css-vars").href = "vars-" + appearance + ".css"
    document.getElementById("appearance-setting-" + appearance).parentElement.classList.add( "selected");
    document.getElementById("appearance-setting-" + appearance).checked = true;
  }
});

for(element of document.getElementsByClassName("appearance-setting")){
  element.addEventListener('click', function () {
    document.getElementById("css-vars").href = "vars-" + this.id.substring(19) + ".css"
    for(element of document.getElementsByClassName("appearance-setting")){
      element.parentElement.classList.remove("selected");
    }
    this.parentElement.classList.add("selected");
    chrome.storage.local.set({"canvasplus-display-appearance": this.id.substring(19)});
  })
}
