const onloadmutation = (el) =>
  new MutationObserver(function (mutations) {
    mutations.forEach(function () {
      for (let el of document.querySelectorAll(".element_toggler")) {
        isclosed(el);
        mutationObserver(el).observe(el, { attributes: true });
      }
    });
  });

const isclosed = (el) => {
  if (el.getAttribute("aria-expanded") == "true") {
    el.parentElement.parentElement.style.borderRadius = "var(--modules-open)";
  } else {
    el.parentElement.parentElement.style.borderRadius = "var(--modules-close)";
  }
};

const mutationObserver = (el) =>
  new MutationObserver(function (mutations) {
    mutations.forEach(function () {
      isclosed(el);
    });
  });

const isclosed2 = (el2) => {
  if (
    el2.children[1].parentElement.parentElement.parentElement.className
      .toString()
      .includes("collapsed_module") == true
  ) {
    el2.parentElement.style.borderRadius = "var(--modules-close)";
  } else {
    el2.parentElement.style.borderRadius = "var(--modules-open)";
  }
};

const mutationObserver2 = (el2) =>
  new MutationObserver(function (mutations) {
    mutations.forEach(function () {
      isclosed2(el2);
    });
  });

let link = document.createElement("link");
link.href = chrome.runtime.getURL(
  "src/inject/roundermodules/roundermodules.css"
);
link.type = "text/css";
link.rel = "stylesheet";

useReactiveFeatures([
  {
    settingName: "canvasplus-setting-roundermodules",
    onChanged: (data) => {
      if (data) {
        if (
          Array.from(document.querySelectorAll("span.ellipsible")).find(
            (el) => el.textContent === "Assignments"
          )
        ) {
          document.documentElement.appendChild(link);
          onloadmutation(document.getElementById("ag-list")).observe(
            document.getElementById("ag-list"),
            { childList: true }
          );
        } else if (
          Array.from(document.querySelectorAll("span.ellipsible")).find(
            (el) => el.textContent == "Modules"
          )
        ) {
          document.documentElement.appendChild(link);
          for (let el2 of document.querySelectorAll(
            '[aria-expanded="true"].ig-header-title.collapse_module_link.ellipsis'
          )) {
            isclosed2(el2);
            mutationObserver2(el2).observe(el2, { attributes: true });
          }
        }
      } else {
        for (let el of document.querySelectorAll(".element_toggler")) {
          mutationObserver(el).disconnect();
        }
        for (let el2 of document.querySelectorAll(
          '[aria-expanded="true"].ig-header-title.collapse_module_link.ellipsis'
        )) {
          mutationObserver(el2).disconnect();
        }
        try {
          link.remove();
        } catch {}
      }
    },
  },
]);
