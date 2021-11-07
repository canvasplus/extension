const defaults = {
  "canvasplus-setting-quicklink": false,
  "canvasplus-setting-search": true,
  "canvasplus-setting-smartscroll": true,
  "canvasplus-display-appearance": "auto",
  "canvasplus-setting-convopeeker": true,
  "canvasplus-setting-hidelogo": true,
  "canvasplus-setting-sidebar-color": '#1b7ecf',
  "canvasplus-setting-active-sidebar-color": {"background": "darker", "icon": "white"},
  "canvasplus-setting-sidebar-icon-color": "white",
  "canvasplus-setting-sidebar-smaller-icons": true,
  "canvasplus-setting-sidebar-more-spacing": true,
  "canvasplus-setting-roundermodules": true,
  "canvasplus-setting-linkcolor": 'use default',
  "canvasplus-setup-stage": 0
}

const settingsList = Object.keys(defaults);
let settings = {};

chrome.storage.local.get(settingsList, function(data) {
  settings = data;

  let setupStage = settings["canvasplus-setup-stage"] ?? -1;

  if(setupStage === 0) {
    createFinishSettingUp(settings["canvasplus-display-appearance"])
  }
});

let alert = document.createElement("div");
alert.id = "canvasplus-alert";
alert.style.opacity = "0";
alert.style.visibility = "hidden";
alert.addEventListener("click", function (evt) {
  if (evt.target !== this)
    return;

  this.style.opacity = "0";
  this.style.visibility = "hidden";
});

useReactiveFeatures([{
  settingName: "canvasplus-setting-quicklink",
  onChanged: (val) => {
    settingchanged(val, "canvasplus-setting-quicklink")
  }
}])

const createFinishSettingUp = (selectedAppearance) => {
  const popup = document.createElement('div')
  popup.className = 'canvasplus-finish-setting-up-wrapper'
  popup.innerHTML = `
    <div class='canvasplus-finish-setting-up'>
      <h3 class='canvasplus-finish-setting-up__Header'>Finish Setting Up</h3>
      <div class='canvasplus-finish-setting-up__DisplayHeader'>Chose a Look</div>
      <div class='canvasplus-finish-setting-up__DisplayWrapper'>
        <div class='canvasplus-finish-setting-up__DisplayOption light ${selectedAppearance === 'light' ? 'selected' : ''}'>
          <img src='${ chrome.extension.getURL('assets/img/light.png') }' />
          <p>Default</p>
        </div>
        <div class='canvasplus-finish-setting-up__DisplayOption dim ${selectedAppearance === 'dim' ? 'selected' : ''}'>
          <img src='${ chrome.extension.getURL('assets/img/dim.png') }' />
          <p>Dim</p>
        </div>
        <div class='canvasplus-finish-setting-up__DisplayOption dark ${selectedAppearance === 'dark' ? 'selected' : ''}'>
          <img src='${ chrome.extension.getURL('assets/img/dark.png') }' />
          <p>Dark</p>
        </div>
        <div class='canvasplus-finish-setting-up__DisplayOption auto ${!['dim','dark','light'].includes(selectedAppearance) ? 'selected' : ''}'>
          <img src='${ chrome.extension.getURL('assets/img/' + (window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light') + '.png') }' />
          <p>Auto</p>
        </div>
      </div>
      <div class='canvasplus-finish-setting-up__ExtensionMenu'>
        <img src='${ chrome.extension.getURL("assets/img/extension-menu.png") }'/>
        <div>
          <p>Extension Settings</p>
          <p>If you need to recolor your sidebar, toggle features, or change your appearance later, you can do it all from the extension settings.</p>
        </div>
      </div>
      <button class='canvasplus-finish-setting-up__Done'>Done</button>
    </div>
  `
  const colorscheme = (e) => {
    if (originalappearance == 'auto') {document.querySelector('.canvasplus-finish-setting-up__DisplayOption.auto').children[0].src = chrome.extension.getURL('assets/img/' + (e.matches ? 'light' : 'dark') + '.png')}
  }
  
  const select = (appearance) => {
    popup.querySelectorAll('.canvasplus-finish-setting-up__DisplayOption.selected').forEach((ele) => {
      ele.classList.remove('selected')
      chrome.storage.local.set({'canvasplus-display-appearance': appearance})
    })
    popup.querySelector(`.canvasplus-finish-setting-up__DisplayOption.${appearance}`).classList.add('selected')
  }
  const getColor = () => {
    const colors = ['#e0245e', '#ffad1f', '#85c924', '#40afe3', '#6b54ff',  '#fc74e1', '#515975', '#222a42', '#b5043a', '#f45d22', '#17bf63', '#1059e3', '#794bc4', '#c840e3']
    return colors[Math.floor(Math.random() * colors.length)]
  }
  popup.querySelector('.canvasplus-finish-setting-up__DisplayOption.light').addEventListener('click', () => { select('light') })
  popup.querySelector('.canvasplus-finish-setting-up__DisplayOption.dim').addEventListener('click', () => { select('dim') })
  popup.querySelector('.canvasplus-finish-setting-up__DisplayOption.dark').addEventListener('click', () => { select('dark') })
  popup.querySelector('.canvasplus-finish-setting-up__DisplayOption.auto').addEventListener('click', () => { select('auto') })
  popup.querySelector('.canvasplus-finish-setting-up__Done').addEventListener('click', () => {
    popup.classList.add('closing')
    setTimeout(() => {
      document.body.removeChild(popup)
      window.matchMedia("(prefers-color-scheme: light)").onchange = null;
    }, 1000)
    chrome.storage.local.set({"canvasplus-setup-stage": 1, "canvasplus-setting-sidebar-color": `linear-gradient(45deg, ${getColor()}, ${getColor()})`})
  })
  document.body.appendChild(popup)
  matchMedia("(prefers-color-scheme: light)").onchange = ( e => { colorscheme(e) });
}

chrome.storage.local.get(["canvasplus-current-version", "canvasplus-display-appearance"], (data) => {
  const current = data["canvasplus-current-version"]
  const displayAppearence = data["canvasplus-display-appearance"]

  if(current !== "0.3.4") {
    notification("Thanks for 800 users! This week, we've added a dedicated settings button to the sidebar and fixed dark mode on new quizzes.", "heart", "#ffd0d8", "#ff6680", (notification, dismissMe, e) => {
      chrome.storage.local.set({"canvasplus-current-version": "0.3.4"})
      dismissMe()
    }, "Dismiss", (notification, dismissMe, e) => {
      chrome.storage.local.set({"canvasplus-display-appearance": "dim", "canvasplus-current-version": "0.3.4"})
      dismissMe()
    }, displayAppearence !== "light" ? undefined : "Enable Dark Mode", "#f3dae1")
  }
})