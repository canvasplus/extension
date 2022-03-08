const LogoDisplay = addStylingRule("");

let hidelogo = document.createElement("link");
hidelogo.href = chrome.runtime.getURL("src/inject/hidelogo/hidelogo.css");
hidelogo.type = "text/css";
hidelogo.rel = "stylesheet";
document.documentElement.appendChild(hidelogo);

useReactiveFeatures([
  {
    settingName: "canvasplus-setting-hidelogo",
    onChanged: (value) => {
      LogoDisplay.setRule(value ? "--logo-display: none" : "");
    },
  },
]);
