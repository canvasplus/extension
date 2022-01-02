const defaults = {
  "canvasplus-setting-quicklink": false,
  "canvasplus-setting-search": true,
  "canvasplus-setting-smartscroll": true,
  "canvasplus-display-appearance": "light",
  "canvasplus-setting-convopeeker": true,
  "canvasplus-setting-hidelogo": true,
  "canvasplus-setting-sidebar-color": '#1b7ecf',
  "canvasplus-setting-active-sidebar-color": {"background": "darker", "icon": "white"},
  "canvasplus-setting-sidebar-icon-color": "white",
  "canvasplus-setting-sidebar-icon-size": 3,
  "canvasplus-setting-sidebar-more-spacing": true,
  "canvasplus-setting-roundermodules": true,
  "canvasplus-setting-linkcolor": 'use default',
  "canvasplus-setting-sidebar-show-settings": true,
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

/*useReactiveFeatures([{
  settingName: "canvasplus-setting-quicklink",
  onChanged: (val) => {
    settingchanged(val, "canvasplus-setting-quicklink")
  }
}])*/

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
          <label><input type="checkbox"></input><p>Sync with OS</p></label>
        </div>
        <div class='canvasplus-finish-setting-up__DisplayOption dark ${selectedAppearance === 'dark' ? 'selected' : ''}'>
          <img src='${ chrome.extension.getURL('assets/img/dark.png') }' />
          <p>Dark</p>
          <label><input type="checkbox"></input><p>Sync with OS</p></label>
        </div>
      </div>
      <div class='canvasplus-finish-setting-up__ExtensionMenu'>
        <img src='${ chrome.extension.getURL("assets/img/extension-menu.png") }'/>
        <div>
          <p>Extension Settings</p>
          <p>If you need to recolor your sidebar, toggle features, or change your appearance later, you can do it all from the extension settings.</p>
        </div>
      </div>
      <div class='canvasplus-finish-setting-up__Footer'>
        <button class='canvasplus-finish-setting-up__Done'>Done</button>
      </div>
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
    if(appearance.endsWith("_auto")) appearance = appearance.substring(0, appearance.length - 5)
    
    popup.querySelector(`.canvasplus-finish-setting-up__DisplayOption.${appearance}`).classList.add('selected')
  }
  const getColor = () => {
    const colors = ['#e0245e', '#ffad1f', '#85c924', '#40afe3', '#6b54ff',  '#fc74e1', '#515975', '#222a42', '#b5043a', '#f45d22', '#17bf63', '#1059e3', '#794bc4', '#c840e3']
    return colors[Math.floor(Math.random() * colors.length)]
  }
  popup.querySelector('.canvasplus-finish-setting-up__DisplayOption.light').addEventListener('click', () => { select('light') })
  popup.querySelector('.canvasplus-finish-setting-up__DisplayOption.dim').addEventListener('click', () => {
    popup.querySelector('.canvasplus-finish-setting-up__DisplayOption.dark input').checked = false;
    const checkbox = popup.querySelector('.canvasplus-finish-setting-up__DisplayOption.dim input')
    select(checkbox?.checked ? "dim_auto" : "dim")
  })
  popup.querySelector('.canvasplus-finish-setting-up__DisplayOption.dark').addEventListener('click', () => {
    popup.querySelector('.canvasplus-finish-setting-up__DisplayOption.dim input').checked = false;
    const checkbox = popup.querySelector('.canvasplus-finish-setting-up__DisplayOption.dark input')
    select(checkbox?.checked ? "dark_auto" : "dark")
  })
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


chrome.storage.local.get(["canvasplus-birthday-confetti"], (data) => {
  const current = data["canvasplus-birthday-confetti"]

  if(current !== true && (Math.floor((((new Date()) - (new Date((new Date()).getFullYear(), 0, 0))) + (((new Date((new Date()).getFullYear(), 0, 0)).getTimezoneOffset() - (new Date()).getTimezoneOffset()) * 60 * 1000)) / 86400000)) === 13) {
    var maxParticleCount = 150; var particleSpeed = 2; var startConfetti; var stopConfetti; var toggleConfetti; var removeConfetti;
    (function() { startConfetti = startConfettiInner; stopConfetti = stopConfettiInner; toggleConfetti = toggleConfettiInner; removeConfetti = removeConfettiInner; var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]; var streamingConfetti = false; var animationTimer = null; var particles = []; var waveAngle = 0; function resetParticle(particle, width, height) { particle.color = colors[(Math.random() * colors.length) | 0]; particle.x = Math.random() * width; particle.y = Math.random() * height - height; particle.diameter = Math.random() * 10 + 5; particle.tilt = Math.random() * 10 - 10; particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05; particle.tiltAngle = 0; return particle; } function startConfettiInner() { var width = window.innerWidth; var height = window.innerHeight; window.requestAnimFrame = (function() { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { return window.setTimeout(callback, 16.6666667); }; })(); var canvas = document.getElementById("confetti-canvas"); if (canvas === null) { canvas = document.createElement("canvas"); canvas.setAttribute("id", "confetti-canvas"); canvas.setAttribute("style", "position:fixed;top:0px;left:0px;z-index:999999;pointer-events:none"); document.body.appendChild(canvas); canvas.width = width; canvas.height = height; window.addEventListener("resize", function() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }, true); } var context = canvas.getContext("2d"); while (particles.length < maxParticleCount) particles.push(resetParticle({}, width, height)); streamingConfetti = true; if (animationTimer === null) { (function runAnimation() { context.clearRect(0, 0, window.innerWidth, window.innerHeight); if (particles.length === 0) animationTimer = null; else { updateParticles(); drawParticles(context); animationTimer = requestAnimFrame(runAnimation); } })(); } } function stopConfettiInner() { streamingConfetti = false; } function removeConfettiInner() { stopConfetti(); particles = []; } function toggleConfettiInner() { if (streamingConfetti) stopConfettiInner(); else startConfettiInner(); } function drawParticles(context) { var particle; var x; for (var i = 0; i < particles.length; i++) { particle = particles[i]; context.beginPath(); context.lineWidth = particle.diameter; context.strokeStyle = particle.color; x = particle.x + particle.tilt; context.moveTo(x + particle.diameter / 2, particle.y); context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2); context.stroke(); } } function updateParticles() { var width = window.innerWidth; var height = window.innerHeight; var particle; waveAngle += 0.01; for (var i = 0; i < particles.length; i++) { particle = particles[i]; if (!streamingConfetti && particle.y < -15) particle.y = height + 100; else { particle.tiltAngle += particle.tiltAngleIncrement; particle.x += Math.sin(waveAngle); particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5; particle.tilt = Math.sin(particle.tiltAngle) * 15; } if (particle.x > width + 20 || particle.x < -20 || particle.y > height) { if (streamingConfetti && particles.length <= maxParticleCount) resetParticle(particle, width, height); else { particles.splice(i, 1); i--; }; }; }; }; })();
    startConfetti()
    let confettiRunning = true;

    setTimeout(() => {
      confettiRunning = false;
      stopConfetti()
    }, 5000);

    chrome.storage.local.set({"canvasplus-birthday-confetti": true})

    notification("Canvas+ is now a year old! Thanks for supporting us along the journey, we have lots of new features coming soon!", "cake", "#ffcff0", "#ff66dd", (notification, dismissMe, e) => {
      dismissMe()
    }, "Done").then(({ image }) => {
        image.addEventListener("click", () => {
          if(!confettiRunning) {
            confettiRunning = true
            startConfetti()
            
            setTimeout(() => {
              confettiRunning = false;
              stopConfetti()
            }, 1500);
          }
        })
    })
    
  }
})

chrome.storage.local.get(["canvasplus-current-version", "canvasplus-display-appearance"], (data) => {
  const current = data["canvasplus-current-version"]
  const displayAppearence = data["canvasplus-display-appearance"]

  if(current !== "0.4") {
    notification("Start 2022 on a good note! Search just got even better, try it out by clicking the new button on the sidebar. Also, we've improved dark mode and smart scrolling, and you can now hide unnecessary items from your sidebar.", "tada", "#dff2c9", "#85ba49", (notification, dismissMe, e) => {
      chrome.storage.local.set({"canvasplus-current-version": "0.4"})
      dismissMe()
    }, "Dismiss", (notification, dismissMe, e) => {
      window.open(chrome.extension.getURL('src/popup/popup.html'), "Popup", 'width=240px,height=400px,resizable=0,scrollbars=no,menubar=no,toolbar=no')
      chrome.storage.local.set({"canvasplus-current-version": "0.4"})
      dismissMe()
    }, "Open Settings", "#cedbcc")
  }
})

chrome.storage.local.get(["canvasplus-survey", "installDate"], (data) => {
  const viewed = data["canvasplus-survey"]
  const time = Math.round(new Date / 86400000) - Math.round(data["installDate"]['timestamp'] / 86400000)

  if (viewed !== true &&  time >= 14) {
    notification("Help us make Canvas+ better! Consider taking this short survey about new improvements we can make!", "scroll", "#fff1e6", "#e5a573", (notification, dismissMe, e) => {
      const surveysettings = { "canvasplus-setting-quicklink": "Speed+Boost", "canvasplus-setting-search": "Search", "canvasplus-setting-smartscroll": "Smart+Scrolling", "canvasplus-display-appearance": {'light': 'Default+(Light)', 'dim': 'Dim', 'dark': 'Lights+Out', 'auto': 'Auto'}, "canvasplus-setting-convopeeker": "Quick+Inbox", "canvasplus-setting-hidelogo": "Hide+Logo", "canvasplus-setting-sidebar-color": 'use default', "canvasplus-setting-roundermodules": "Rounder+Modules", "canvasplus-setting-linkcolor": 'use default' }
      
      chrome.storage.local.get(surveysettings, (data) => {
        var url = 'https://docs.google.com/forms/d/e/1FAIpQLScHWEI7TY5W6DWSqRGaUWTlxLYHKAhcdwUvywvW_oj7MmM9Pw/viewform?usp=pp_url';

        for (rotation = 0; rotation < Object.entries(data).length; rotation++) {
          var hexurl = undefined
          url += (Object.entries(data)[rotation][1] == true ? '&entry.1198748745=' + surveysettings[Object.entries(data)[rotation][0]] : '');
          url += (Object.entries(data)[rotation][0] == "canvasplus-display-appearance" ? '&entry.1404289257=' + surveysettings["canvasplus-display-appearance"][Object.entries(data)[rotation][1]] : '');
          Object.entries(data)[rotation][0] == "canvasplus-setting-sidebar-color" ? hexurl = '&entry.1808318442' : Object.entries(data)[rotation][0] == "canvasplus-setting-linkcolor" ? hexurl = '&entry.1599750073' : undefined;
          url += (hexurl != undefined ? (data[Object.entries(data)[rotation][0]] == "" || data[Object.entries(data)[rotation][0]] == "use default" ? hexurl + '=' + 'Unset' : (Object.entries(data)[rotation][1]).split('#')[0] == "linear-gradient(45deg, " ? hexurl + '=__other_option__' + hexurl + '.other_option_response=' + ((Object.entries(data)[rotation][1]).split('#')[0]).toString() + '%23' + ((Object.entries(data)[rotation][1]).split('#')[1]).toString() + '%23' + ((Object.entries(data)[rotation][1]).split('#')[2]).toString() : hexurl + '=__other_option__' + hexurl + '.other_option_response=%23' + ((Object.entries(data)[rotation][1]).split('#')[1])) : '');
        } url += navigator.userAgent.indexOf('Firefox') > -1 ? '&entry.1159662235=Firefox' : '&entry.1159662235=Chrome%5CChromium'; injectsurvey(url)});
      
      const injectsurvey = (url) => {
        let survey = document.createElement('div'); survey.className = 'survey'; document.documentElement.appendChild(survey); let surveyiframe = document.createElement('iframe'); surveyiframe.src = url; surveyiframe.className = 'surveyiframe'; surveyiframe.innerText = 'Loading...'; survey.appendChild(surveyiframe); let surveyBackground = document.createElement('div'); surveyBackground.className = 'surveyBackground'; document.documentElement.appendChild(surveyBackground); document.addEventListener('click', function (event) {if (event.target === surveyBackground) {surveyBackground.remove(); survey.remove();}});
        chrome.storage.local.set({"canvasplus-survey": true})
      }; dismissMe() }, "Survey", (notification, dismissMe, e) => {
      chrome.storage.local.set({"canvasplus-survey": true})
      dismissMe()
    }, "Maybe Later", "#ffe4cf")
}})

chrome.storage.local.get(["canvasplus-rating", "installDate"], (data) => {
  const viewed = data["canvasplus-rating"]
  const time = Math.round(new Date / 86400000) - Math.round(data["installDate"]['timestamp'] / 86400000)

  if (viewed !== true &&  time >= 20) {
    notification("Seems like you've been using Canvas+ for a whlie now. Please consider rating it, it helps us grow.", "star", "#e6f8ff", "#1791c0", (notification, dismissMe, e) => {
      window.open(navigator.userAgent.indexOf('Firefox') > -1 ? "https://addons.mozilla.org/en-US/firefox/addon/canvasplus/reviews/?utm_source=firefox-browser&utm_medium=firefox-browser&utm_content=addons-manager-reviews-link" : "https://chrome.google.com/webstore/detail/canvas%2B/kdkadcnebmokaadholinmnpjelphnghh/reviews");
      chrome.storage.local.set({"canvasplus-rating": true})
      dismissMe()
    }, "Rate", (notification, dismissMe, e) => {
      chrome.storage.local.set({"canvasplus-rating": true})
      dismissMe()
    }, "Maybe Later", "#caf0ff")
  }
})