if (window["cpxstate"] == null) {
  (async () => {
    window["cpxstate"] = "loading";

    const url = new URL(window.location.href);
    url.searchParams.set("cpxstate", "1");
    window.history.replaceState({}, "Loading", url.toString());

    document.documentElement.innerHTML = "";

    const frame = document.createElement("iframe");
    frame.id = "cpx-frame";
    frame.src = chrome.runtime.getURL(
      `src/index/index.html?ourl=${url.toString()}`
    );

    document.body.appendChild(frame);

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "redirect") {
        window.history.replaceState({}, message.title, message.to);
      } else if (message.action === "sendTo") {
        window.history.pushState({}, message.title, message.to);
      }
    });
  })();
}
