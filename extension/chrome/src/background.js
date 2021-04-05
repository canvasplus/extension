chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        window.open("https://canvasplus.adrwas.dev/welcome");
    }
});
