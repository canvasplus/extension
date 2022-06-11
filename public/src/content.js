if (window["cpxstate"] == null) {
  (async () => {
    window["cpxstate"] = "loading";

    const url = new URL(window.location.href);
    url.searchParams.set("cpxstate", "loading");

    window.history.replaceState({}, "Loading", url.toString());

    console.log("script");
    window.stop();

    let timeout = window.setTimeout(function () {}, 0);

    while (timeout--) {
      window.clearTimeout(timeout);
    }

    let interval = window.setInterval(function () {}, 0);

    while (interval--) {
      window.clearInterval(interval);
    }

    document.documentElement.innerHTML = "";
  })();
}
