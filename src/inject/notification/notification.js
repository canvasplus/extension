chrome.storage.local.get(["installDate"], (data) => {
    var time = (Math.round(data.installDate.timestamp) / 86400000)
    injectnoification(time)
})

const notification = async(storagevar, time, text, imageurl, fill, border, button1script, button1text, button2script, button2text, installDate, container) => {
    chrome.storage.local.get([storagevar], (data) => {
         console.log(data[storagevar])
        if (data[storagevar] != 'temp' && ((Date.now() - installDate) >= time || time == 0)) {

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

    await notification("notification-rating", 5, "Seems like you've been using Canvas+ for a whlie now. Please consider rating it, it helps us improve.", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/twitter/282/star_2b50.png", "#e6f8ff", "#1791c0", "if (navigator.userAgent.indexOf('Firefox') > -1) {window.open('https://addons.mozilla.org/en-US/firefox/addon/canvasplus/reviews/?utm_source=firefox-browser&utm_medium=firefox-browser&utm_content=addons-manager-reviews-link')} else {window.open('https://chrome.google.com/webstore/detail/canvas%2B/kdkadcnebmokaadholinmnpjelphnghh/reviews')}", "Rate", "const toChange = {}; toChange[storagevar] = 'true'; chrome.storage.local.set(toChange); notification.remove()", "Maybe Later", time, notificationContainer)
}
