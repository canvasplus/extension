chrome.storage.local.get(["canvasplus-setting-sidebar-icon-size", "canvasplus-setting-sidebar-more-spacing"], function(data) {
  if(data["canvasplus-setting-sidebar-icon-size"]) {
    for(let el of document.querySelectorAll(".menu-item-icon-container svg")) {
      el.style = "width:" + data["canvasplus-setting-sidebar-icon-size"] + "px";
    }
  }
  if(data["canvasplus-setting-sidebar-more-spacing"]) {
    for(let el of document.querySelectorAll(".menu-item.ic-app-header__menu-list-item .ic-app-header__menu-list-link")) {
      el.style = "--custom-padding:.75rem;";
    }
  }
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
    sidebarStyle += `--ic-brand-global-nav-bgd: ${ color };--ic-brand-global-nav-avatar-border: ${ color };--ic-brand-global-nav-ic-icon-svg-fill--active: ${ color };`;
    document.querySelector('#header').style = sidebarStyle;
  }
});

chrome.storage.local.get(["canvasplus-setting-sidebar-icon-color"], function(data) {
  const color = data["canvasplus-setting-sidebar-icon-color"];
  if(color !== "unset") {
    sidebarStyle += `--ic-brand-global-nav-ic-icon-svg-fill: ${ color };--cp-custom-sidebar-tooltip-test-color: ${ color };`;
    document.querySelector('#header').style = sidebarStyle;
  }
});

chrome.storage.local.get(["canvasplus-setting-active-sidebar-color"], (data) => {
  const json = data["canvasplus-setting-active-sidebar-color"];
  if(json) {
    if(json.background === "blend") {
      sidebarStyle += '--custom-active-background: var(--ic-brand-global-nav-ic-icon-svg-fill);';
    } else if(json.background === "darker") {
      sidebarStyle += '--custom-active-background: rgba(0,0,0,0.2);';
    } else if(json.background !== "white") {
      sidebarStyle += `--custom-active-background: ${json.background};`;
    }

    if (json.icon === "white") {
      sidebarStyle += '--ic-brand-global-nav-ic-icon-only-svg-fill--active: #FFFFFF;';
    } else if (json.icon === "black") {
      sidebarStyle += '--ic-brand-global-nav-ic-icon-only-svg-fill--active: #1d1d21;';
    } else if (json.icon === "unset") {
      sidebarStyle += '--ic-brand-global-nav-ic-icon-only-svg-fill--active: var(--ic-brand-global-nav-ic-icon-svg-fill--active);';
    } else {
      sidebarStyle += `--ic-brand-global-nav-ic-icon-only-svg-fill--active: ${json.icon};`;
    }
    document.querySelector('#header').style = sidebarStyle;
  }
});