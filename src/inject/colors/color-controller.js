// const linkApplyVars = document.createElement('link');
//   linkApplyVars.href = '';
//   linkApplyVars.type = 'text/css';
//   linkApplyVars.rel = 'stylesheet';

// const varSheet = document.createElement('link');
//   varSheet.href = '';
//   varSheet.type = 'text/css';
//   varSheet.rel = 'stylesheet';

// const html = document.querySelector('html');
// html.appendChild(linkApplyVars);
// html.appendChild(varSheet);

// const applyVarsURL = chrome.extension.getURL("src/inject/colors/apply-variables.css");;

// useReactiveFeature('canvasplus-display-appearance', (appearance) => {
//   if(appearance && appearance !== 'light') {
//     linkApplyVars.href = applyVarsURL;
//     varSheet.href = chrome.extension.getURL('src/inject/colors/' + appearance + '.css')
//   } else {
//     linkApplyVars.href = '';
//     varSheet.href = '';
//   }
// })