document.getElementById("version").innerHTML = "Version " + chrome.app.getDetails().version;

window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
    chrome.tabs.create({url:e.target.href})
  }
})
