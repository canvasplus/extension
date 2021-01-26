// For background code, unsued as of 1/19/21
chrome.tabs.create({"url": "https://canvasplus.adrwas.dev"}, (tab) => {
  console.log("created tab");
  createdTab = tab;
})

chrome.tabs.executeScript(createdTab.id,{
      code: 'document.body.style.backgroundColor="orange"'
    });
