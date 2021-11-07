const linkApplyVars = document.createElement('link');
  linkApplyVars.href = '';
  linkApplyVars.type = 'text/css';
  linkApplyVars.rel = 'stylesheet';

const varSheet = document.createElement('link');
  varSheet.href = '';
  varSheet.type = 'text/css';
  varSheet.rel = 'stylesheet';

const html = document.querySelector('html');
html.appendChild(linkApplyVars);
html.appendChild(varSheet);

const applyVarsURL = chrome.extension.getURL("src/inject/colors/apply-variables.css");

const applyAppearance = (appearance) => {
  if(appearance && appearance !== 'light') {
    linkApplyVars.href = applyVarsURL;
    varSheet.href = chrome.extension.getURL('src/inject/colors/' + appearance + '.css')
  } else {
    linkApplyVars.href = '';
    varSheet.href = '';
  }
}

window.matchMedia("(prefers-color-scheme: light)").addEventListener('change', e => {
  if (originalappearance == 'auto') {applyAppearance(e.matches ? "light" : "dark")}
})

var appearance = '';
var originalappearance = '';
useReactiveFeature('canvasplus-display-appearance', (color) => {
  appearance = originalappearance = color;
  originalappearance == 'auto' ? (appearance = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light') : color;
  applyAppearance(appearance)
})