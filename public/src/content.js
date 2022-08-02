if (window["cpxstate"] == null) {
  (async () => {
    window["cpxstate"] = "loading";

    const isPathnameCompatible = (fullUrl) => {
      const asUrl = new URL(fullUrl);

      if (
        asUrl.hostname !== new URL(location.href).hostname ||
        asUrl.searchParams.get("view")?.startsWith("original")
      )
        return false;

      const pathname = asUrl.pathname.replace(/\/+$/, "");

      const path = new URL(asUrl).pathname.split("/").filter((n) => n);

      if (pathname === "" || path[2] === "pages") {
        return true;
      }

      return false;
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

    const runWithViewer = async () => {
      document.documentElement.innerHTML = "";

      document.documentElement.classList.add("h-full", "w-full");

      document.body.classList.add("h-full", "w-full", "font-sans", "text-base");

      const root = document.createElement("div");
      root.classList.add("h-full", "w-full");
      root.id = "root";

      document.body.appendChild(root);

      const style = document.createElement("link");
      style.rel = "stylesheet";
      style.href = chrome.runtime.getURL("assets/io.css");
      console.log(style);
      document.head.appendChild(style);

      const script = chrome.runtime.getURL("src/index.js");
      await import(script);
    };

    if (isPathnameCompatible(location.href)) {
      runWithViewer();
    } else {
      runWithOverlay();
    }
  })();
}
