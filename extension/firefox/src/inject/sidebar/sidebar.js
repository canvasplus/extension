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

chrome.storage.local.get(["canvasplus-setting-sidebar-color-toggle"], function(toggle) {
  if(toggle["canvasplus-setting-sidebar-color-toggle"]) {
    chrome.storage.local.get(["canvasplus-setting-sidebar-color"], function(data) {
      document.getElementsByClassName("ic-app-header")[0].style.backgroundColor = "#" + data;
    });
  };
});
