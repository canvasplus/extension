if (window["cpxstate"] == null) {
  (async () => {
    window["cpxstate"] = "loading";

    const isPathnameCompatible = (fullUrl) => {
      const asUrl = new URL(fullUrl);
      console.log(asUrl.pathname);

      return (
        asUrl.pathname !== "/incompatible_page" &&
        asUrl.pathname !== "/incompatible_page_2"
      );
    };

    const runWithViewer = async () => {
      const url = new URL(window.location.href);
      window.history.replaceState({}, "", url.toString());

      document.documentElement.innerHTML = "";

      const framingContainer = document.createElement("div");
      framingContainer.id = "cpx-framing-container";

      const frame = document.createElement("iframe");
      frame.id = "cpx-main-frame";
      frame.src = chrome.runtime.getURL(
        `src/index/index.html?ourl=${url.toString()}`
      );

      framingContainer.appendChild(frame);

      document.body.appendChild(framingContainer);

      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "redirect" || message.action === "sendTo") {
          if (!isPathnameCompatible(message.to)) {
            location.href = message.to;
            return;
          }

          if (message.action === "redirect")
            window.history.replaceState({}, message.title, message.to);
          if (message.action === "sendTo")
            window.history.pushState({}, message.title, message.to);
        }
      });
    };

    const runWithOverlay = async () => {
      const overlay = document.createElement("div");
      overlay.id = "cpx-incompatible-overlay";

      overlay.innerHTML = `
      <p>Canvas+ does not support this page.</p>
      <div class="cpx-incompatible-overlay__right-button-array">
        <button id="cpx-incompatible-overlay__close">
          <div class="cpx-incompatible-overlay__close__background"></div>
          <svg fill="currentColor" strokewidth="0" xmlns="http://www.w3.org/2000/svg" stroke="none" viewBox="0 0 512 512" height="1em" width="1em" style="overflow: visible;"><path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path></svg>
        </button>
      </div>
      `;

      overlay
        .querySelector("#cpx-incompatible-overlay__close")
        ?.addEventListener("click", () => {
          overlay.remove();
        });

      document.body.appendChild(overlay);
    };

    if (isPathnameCompatible(location.href)) {
      runWithViewer();
    } else {
      runWithOverlay();
    }
  })();
}
