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
  if(originalappearance.endsWith('auto')) applyAppearance(appearance = window.matchMedia("(prefers-color-scheme: dark)").matches ? originalappearance.substring(0, originalappearance.length - 5) : 'light')
})

var appearance = '';
var originalappearance = '';

useReactiveFeature('canvasplus-display-appearance', (color) => {
  appearance = originalappearance = color;
  originalappearance.endsWith('auto') ? (appearance = window.matchMedia("(prefers-color-scheme: dark)").matches ? originalappearance.substring(0, originalappearance.length - 5) : 'light') : color;
  applyAppearance(appearance)
})

const observer = new MutationObserver((mutations) => {
  document.querySelectorAll("p span").forEach(span=>{
    if(span.style['background-color'] && !span.style['color']) {
      span.style.color = '#2D3B45'
    }
  })
})

observer.observe(document.documentElement, { childList: true })