const link = document.createElement('link');
    link.href = chrome.extension.getURL("src/inject/roundermodules/roundermodules.css");;
    link.type = 'text/css';
    link.rel = 'stylesheet';

chrome.storage.local.get(['canvasplus-setting-roundermodules'], (data) => {
    if(data['canvasplus-setting-roundermodules']) {
        document.querySelector('html').appendChild(link);
    }
})