if (window["cpxstate"] == null) {
  (async () => {
    window["cpxstate"] = "loading";

    const url = new URL(window.location.href);
    url.searchParams.set("cpxstate", "1");
    window.history.replaceState({}, "Loading", url.toString());

    document.documentElement.innerHTML = "";

    const framingContainer = document.createElement("div");
    framingContainer.id = "cpx-framing-container";

    const top = document.createElement("iframe");
    top.id = "cpx-top-frame";
    top.src = chrome.runtime.getURL(`src/top/top.html?ourl=${url.toString()}`);

    const frame = document.createElement("iframe");
    frame.id = "cpx-main-frame";
    frame.src = chrome.runtime.getURL(
      `src/index/index.html?ourl=${url.toString()}`
    );

    framingContainer.appendChild(top);
    framingContainer.appendChild(frame);

    document.body.appendChild(framingContainer);

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "redirect") {
        window.history.replaceState({}, message.title, message.to);
      } else if (message.action === "sendTo") {
        window.history.pushState({}, message.title, message.to);
      }
    });
  })();
}
