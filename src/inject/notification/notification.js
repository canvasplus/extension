//for surevy
/*const surveysettings = {
    "canvasplus-setting-quicklink": "Speed+Boost",
    "canvasplus-setting-search": "Search",
    "canvasplus-setting-smartscroll": "Smart+Scrolling",
    "canvasplus-display-appearance": {'light': 'Default+(Light)', 'dim': 'Dim', 'dark': 'Lights+Out'},
    "canvasplus-setting-convopeeker": "Quick+Inbox",
    "canvasplus-setting-hidelogo": "Hide+Logo",
    "canvasplus-setting-sidebar-color": 'use default',
    "canvasplus-setting-roundermodules": "Rounder+Modules",
    "canvasplus-setting-linkcolor": 'use default'
}

var url = 'https://docs.google.com/forms/d/e/1FAIpQLScHWEI7TY5W6DWSqRGaUWTlxLYHKAhcdwUvywvW_oj7MmM9Pw/viewform?usp=pp_url'

var rotation = 0

const checksettings = async () => {
    chrome.storage.local.get(Object.entries(surveysettings)[rotation][0], (data) => {
        if (data[Object.entries(surveysettings)[rotation][0]] == true) {
            url += '&entry.1198748745=' + Object.entries(surveysettings)[rotation][1];
        } else if (data[Object.entries(surveysettings)[rotation][0]] != false) {
            //Apperance Setting
            if (Object.entries(surveysettings)[rotation][0] == "canvasplus-display-appearance") {
                for (value of Object.entries(Object.entries(surveysettings)[rotation][1])) {
                    if (value[0] == data[Object.entries(surveysettings)[rotation][0]]) {
                        url += '&entry.1404289257=' + value[1];
                    }
                }
            //Hex Value Settings
            } else {
                if (Object.entries(surveysettings)[rotation][0] == "canvasplus-setting-sidebar-color") {
                    hexurl = '&entry.1808318442';
                }
                if (Object.entries(surveysettings)[rotation][0] == "canvasplus-setting-linkcolor") {
                    hexurl = '&entry.1599750073';
                }
                if (data[Object.entries(surveysettings)[rotation][0]] == Object.entries(surveysettings)[rotation][1]) {
                    url += hexurl + '=' + 'Unset';
                } else {
                    url += hexurl + '=__other_option__' + hexurl + '.other_option_response=%23' + (data[Object.entries(surveysettings)[rotation][0]]).split('#')[1];
                }
            }
        }
        rotation += 1;
        if (rotation < Object.entries(surveysettings).length) {
            checksettings()
    }})
}
checksettings()

if (navigator.userAgent.indexOf('Firefox') > -1) {
    url += '&entry.1159662235=Firefox'
} else {
    url += '&entry.1159662235=Chrome/Chromium'
}

chrome.storage.local.get(["installDate"], (data) => {
    var time = (Math.round(data.installDate.timestamp) / 86400000)
    injectnoification(time)
})
*/

const notificationContainer = document.createElement('div')
    notificationContainer.className = 'notification-container'
    document.body.appendChild(notificationContainer)

const notification = async(text, emoji, fill, border, button1callback, button1text, button2callback, button2text, alternativeButtonColor) => {
    const notification = document.createElement('div')
        notification.className = 'canvasplus-notification'
        notification.style.border = '1px solid' +  border
        notification.style.backgroundColor = fill
        notificationContainer.appendChild(notification)

    const dismissMe = () => {
        notification.classList.add('dismissing')
        setTimeout(() => {
            notification.remove()
        }, 1500)
    }

    const image = document.createElement('div')
        image.style = `--src:url(${chrome.extension.getURL(`assets/img/notification-emoji/${emoji}.png`)})`
        image.className = 'notification-image notification-image-' + emoji
        notification.appendChild(image)

    const textcontainer = document.createElement('div')
        textcontainer.className = 'text-container'
        notification.appendChild(textcontainer)

    const notificationText = document.createElement('p')
        notificationText.className = 'notification-text'
        notificationText.innerText = text
        textcontainer.appendChild(notificationText)
        
    const buttonContainer = document.createElement('div')
        buttonContainer.className = 'buttoncontainer'
        textcontainer.appendChild(buttonContainer)

    const notificationButton = document.createElement('button')
        notificationButton.className = 'notificationButton mainNotificationButton'
        notificationButton.style.backgroundColor = border
        notificationButton.innerText = button1text
        notificationButton.addEventListener('click', (e) => { button1callback(notification, dismissMe, e) })
        buttonContainer.appendChild(notificationButton)

    if(button2text) {
        const notificationButton2 = document.createElement('button')
        notificationButton2.className = 'notificationButton alternativeNotificationButton'
        notificationButton2.style.backgroundColor = alternativeButtonColor
        notificationButton2.innerText = button2text
        notificationButton2.addEventListener('click', (e) => { button2callback(notification, dismissMe, e) })
        buttonContainer.appendChild(notificationButton2)

        return { notification, dismissMe, image, textcontainer, buttonContainer, notificationButton, notificationButton2}
    } else {
        return { notification, dismissMe, image, textcontainer, buttonContainer, notificationButton }
    }
}

// const injectnoification = async(time) => {
//     let link = document.createElement('link')
//         link.href = chrome.extension.getURL("src/inject/notification/notification.css");
//         link.type = "text/css";
//         link.rel = "stylesheet";
//         document.getElementsByTagName('html')[0].appendChild(link);
    
//     let notificationContainer = document.createElement('div')
//     notificationContainer.className = 'notification-container'
//     document.body.appendChild(notificationContainer)
//     //images from https://twemoji.twitter.com/ and https://emojipedia.org/
//     //localvarname, daysinstalled, Text,: image, fill, border, button1script, button1text, button2script, button2 text
//     await notification("notification-survey", 14, "Help us make Canvas+ better! Consider taking this short survey about new improvements we can make!", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/twitter/282/scroll_1f4dc.png", "#fff1e6", "#e5a573", "let survey = document.createElement('div'); survey.className = 'survey'; document.documentElement.appendChild(survey); let surveyiframe = document.createElement('iframe'); surveyiframe.src=url + '/viewform?embedded=true'; surveyiframe.className = 'surveyiframe'; surveyiframe.innerText = 'Loading...'; survey.appendChild(surveyiframe); const toChange = {}; toChange[storagevar] = 'true'; chrome.storage.local.set(toChange); let surveyBackground = document.createElement('div'); surveyBackground.className = 'surveyBackground'; document.documentElement.appendChild(surveyBackground); document.addEventListener('click', function (event) {if (event.target === surveyBackground) {surveyBackground.remove(); survey.remove();}}); notification.remove();", "Survey", "const toChange = {}; toChange[storagevar] = 'true'; chrome.storage.local.set(toChange); notification.remove();", "Maybe Later", time, notificationContainer)
//     await notification("notification-rating", 20, "Seems like you've been using Canvas+ for a whlie now. Please consider rating it, it helps us grow.", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/twitter/282/star_2b50.png", "#e6f8ff", "#1791c0", "if (navigator.userAgent.indexOf('Firefox') > -1) {window.open('https://addons.mozilla.org/en-US/firefox/addon/canvasplus/reviews/?utm_source=firefox-browser&utm_medium=firefox-browser&utm_content=addons-manager-reviews-link')} else {window.open('https://chrome.google.com/webstore/detail/canvas%2B/kdkadcnebmokaadholinmnpjelphnghh/reviews')}; const toChange = {}; toChange[storagevar] = 'true'; chrome.storage.local.set(toChange); notification.remove();", "Rate", "const toChange = {}; toChange[storagevar] = 'true'; chrome.storage.local.set(toChange); notification.remove();", "Maybe Later", time, notificationContainer)
// }