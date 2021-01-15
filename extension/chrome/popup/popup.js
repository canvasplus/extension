document.getElementById("version").innerHTML = "Version " + "1.0";

window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
    chrome.tabs.create({url:e.target.href})
  }
})
