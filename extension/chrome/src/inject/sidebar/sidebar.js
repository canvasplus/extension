chrome.storage.local.get(["canvasplus-setting-sidebar-size-toggle"], function(toggle) {
  if(toggle["canvasplus-setting-sidebar-size-toggle"]) {
    chrome.storage.local.get(["canvasplus-setting-sidebar-size"], function(data) {
        const sidebarwidth = data;
        const text = document.getElementsByClassName("menu-item__text");
        const icon = document.getElementsByClassName("ic-icon-svg");
        for (i = 0; i < text.length; i++) {
          text[i].style.fontSize = sidebarwidth + "px";
        };
        for (i = 0; i < icon.length; i++) {
          icon[i].style.width = sidebarwidth * "1.85714285714" + "px";
        };

        chrome.storage.local.get(["canvasplus-setting-sidebar-hidelogo"], function(data) {
          if(data["canvasplus-setting-sidebar-hidelogo"] != true) {
            document.getElementsByClassName("ic-app-header__logomark")[0].style.height = sidebarwidth * "6.07142857143" + "px";
          };
        });
        document.getElementsByClassName("fs-exclude ic-avatar")[0].style.height = sidebarwidth * "2.57142857143" + "px";
        document.getElementsByClassName("fs-exclude ic-avatar")[0].style.width = sidebarwidth * "2.57142857143" + "px";
        document.getElementsByClassName("menu-item-icon-container")[0].style.width = sidebarwidth * "2.57142857143" + "px";
    });
  };
});

chrome.storage.local.get(["canvasplus-setting-sidebar-hidelogo"], function(data) {
  if(data["canvasplus-setting-sidebar-hidelogo"]) {
    document.getElementsByClassName("ic-app-header__logomark-container")[0].remove();
  };
});

var sidebarStyle = '';

chrome.storage.local.get(["canvasplus-setting-sidebar-color"], function(data) {
  const color = data["canvasplus-setting-sidebar-color"];
  if(color.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)) {
    sidebarStyle += `--ic-brand-global-nav-bgd: ${ color };--ic-brand-global-nav-ic-icon-svg-fill--active: ${ color };--ic-brand-global-nav-avatar-border: ${ color };`;
    document.querySelector('#header').style = sidebarStyle;
  }
});

chrome.storage.local.get(["canvasplus-setting-sidebar-icon-color"], function(data) {
  const color = data["canvasplus-setting-sidebar-icon-color"];
  if(color === "invert") {
    console.log("COLOR IS INVERT");
    sidebarStyle += `--ic-brand-global-nav-ic-icon-svg-fill:var(--ic-brand-global-nav-bgd);`;
    document.querySelector('#header').style = sidebarStyle;
    for(let el of document.querySelectorAll(".menu-item-icon-container svg")) {
      el.style = "filter:invert(1);";
    }
  }
  else if(color !== "unset") {
    sidebarStyle += `--ic-brand-global-nav-ic-icon-svg-fill: ${ color };`;
    document.querySelector('#header').style = sidebarStyle;
  }
});