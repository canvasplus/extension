chrome.storage.local.get(["installDate"], (data) => {
    var time = (Math.round(data.installDate.timestamp) / 86400000)
    injectnoification(time)
})

const notification = async(storagevar, time, text, imageurl, fill, border, button1script, button1text, button2script, button2text, installDate, container) => {
    chrome.storage.local.get([storagevar], (data) => {
        if (data[storagevar] != 'true' && ((Date.now() - installDate) >= time || time == 0)) {

            document.documentElement.style.setProperty('--notification-border', border)
            document.documentElement.style.setProperty('--notification-fill', fill)

            var notification = document.createElement('div')
                notification.className = 'notification'
                container.appendChild(notification)

            var image = document.createElement('img')
                image.src = imageurl
                image.className = 'notification-image'
                notification.appendChild(image)

            var textcontainer = document.createElement('div')
                textcontainer.className = 'text-container'
                notification.appendChild(textcontainer)

            var notificationText = document.createElement('p')
                notificationText.className = 'notification-text'
                notificationText.innerText = text
                textcontainer.appendChild(notificationText)
                
            var buttonContainer = document.createElement('div')
                buttonContainer.className = 'buttoncontainer'
                textcontainer.appendChild(buttonContainer)

            var notificationButton = document.createElement('button')
                notificationButton.className = 'notificationButton'
                notificationButton.innerText = button1text
                notificationButton.onclick = () => eval(button1script)
                buttonContainer.appendChild(notificationButton)

            var notificationButton2 = document.createElement('button')
                notificationButton2.className = 'notificationButton'
                notificationButton2.innerText = button2text
                notificationButton2.onclick = () => eval(button2script)
                buttonContainer.appendChild(notificationButton2)

        }
    })
}

const injectnoification = async(time) => {
    let link = document.createElement('link')
        link.href = chrome.extension.getURL("src/inject/notification/notification.css");
        link.type = "text/css";
        link.rel = "stylesheet";
        document.getElementsByTagName('html')[0].appendChild(link);
    
    let notificationContainer = document.createElement('div')
    notificationContainer.className = 'notification-container'
    document.body.appendChild(notificationContainer)
    //images from https://twemoji.twitter.com/ and https://emojipedia.org/
    //localvarname: daysinstalled: Text: image: fill: border: button1script: button1text: button2script: button2 text
    await notification("notification-survey", 14, "Help us make Canvas+ better! Consider taking this short survey about new improvements we can make!", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/twitter/282/scroll_1f4dc.png", "#fff1e6", "#e5a573", "let survey = document.createElement('div'); survey.className = 'survey'; document.documentElement.appendChild(survey); let surveyiframe = document.createElement('iframe'); surveyiframe.src='https://docs.google.com/forms/d/e/1FAIpQLSdsrF9tcTrBLH2q1D8z1ECyws0YEKXv-sovbkBztJ6w49yeoA/viewform?embedded=true'; surveyiframe.className = 'surveyiframe'; surveyiframe.innerText = 'Loading...'; survey.appendChild(surveyiframe); const toChange = {}; toChange[storagevar] = 'true'; chrome.storage.local.set(toChange); let surveyBackground = document.createElement('div'); surveyBackground.className = 'surveyBackground'; document.documentElement.appendChild(surveyBackground); document.addEventListener('click', function (event) {if (event.target === surveyBackground) {surveyBackground.remove(); survey.remove();}}); notification.remove();", "Survey", "const toChange = {}; toChange[storagevar] = 'true'; chrome.storage.local.set(toChange); notification.remove();", "Maybe Later", time, notificationContainer)
    await notification("notification-rating", 20, "Seems like you've been using Canvas+ for a whlie now. Please consider rating it, it helps us grow.", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/twitter/282/star_2b50.png", "#e6f8ff", "#1791c0", "if (navigator.userAgent.indexOf('Firefox') > -1) {window.open('https://addons.mozilla.org/en-US/firefox/addon/canvasplus/reviews/?utm_source=firefox-browser&utm_medium=firefox-browser&utm_content=addons-manager-reviews-link')} else {window.open('https://chrome.google.com/webstore/detail/canvas%2B/kdkadcnebmokaadholinmnpjelphnghh/reviews')}; const toChange = {}; toChange[storagevar] = 'true'; chrome.storage.local.set(toChange); notification.remove();", "Rate", "const toChange = {}; toChange[storagevar] = 'true'; chrome.storage.local.set(toChange); notification.remove();", "Maybe Later", time, notificationContainer)
}
