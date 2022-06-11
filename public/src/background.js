const main = async () => {
  const domains =
    (await chrome.storage.sync.get(["canvas-domains"]))["canvas-domains"]?.map(
      (domain) => {
        return domain?.url;
      }
    ) ?? [];

  chrome.tabs.onUpdated.addListener((id, change, tab) => {
    if (tab.url) {
      const url = new URL(tab.url);

      if (domains.includes(url.host)) {
        chrome.scripting.executeScript({
          target: { tabId: id },
          files: ["src/content.js"],
        });
        chrome.scripting.insertCSS({
          target: { tabId: id },
          files: ["src/content.css"],
        });
      }
    }
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "redirect" || message.action === "sendTo") {
      chrome.tabs.sendMessage(sender.tab.id, message);
    }
  });
};

main();
