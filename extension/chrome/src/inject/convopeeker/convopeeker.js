let convosCache;

const peekerBack = document.createElement('div')
peekerBack.id = "canvasplus-convo-peeker-back"

const peekerElement = document.createElement('div')
peekerElement.id = "canvasplus-convo-peeker"

peekerElement.style.visibility = "hidden"
peekerElement.style.opacity = "0"

peekerBack.style.visibility = "hidden"
peekerBack.style.opacity = "0"

peekerBack.addEventListener('click', () => {
    peekerElement.style.visibility = "hidden"
    peekerElement.style.opacity = "0"

    peekerBack.style.visibility = "hidden"
    peekerBack.style.opacity = "0"
})

const peekerConvoList = document.createElement('div')
peekerConvoList.id = 'canvasplus-convo-peeker-convo-list'

const runConvoKeeper = () => {
    const button = document.querySelector('#global_nav_conversations_link')

    button.addEventListener('click', async (event) => {
        event.preventDefault()

        peekerElement.style.visibility = "visible"
        peekerElement.style.opacity = "1"

        peekerBack.style.visibility = "visible"
        peekerBack.style.opacity = "1"

        if(!document.getElementById('canvasplus-convo-peeker-convo-list')) {
            let convos = await getConversations()
            convos.forEach(item => {
                insertConversation(item)
            })
        }
    })

    document.body.insertBefore(peekerElement, document.body.firstElementChild);
    document.body.insertBefore(peekerBack, document.body.firstElementChild);
}

const insertConversation = (data) => {
    const conversationElement = document.createElement('div')
    conversationElement.classList = 'convo-peeker-convo'

    const subjectLine = document.createElement('b')
    subjectLine.classList = 'convo-peeker-convo-subject-line'
    subjectLine.innerText = data.subject

    const previewLine = document.createElement('p')
    previewLine.classList = 'convo-peeker-convo-preview-line'
    previewLine.innerText = data.last_message.replace(/(\r\n|\n|\r)/gm, " ");

    const convoMetaContainer = document.createElement('div')
    convoMetaContainer.classList = 'convo-peeker-convo-meta-container'

    const readIndicator = document.createElement('span')
    readIndicator.className = 'convo-peeker-read-indicator'

    if(data.workflow_state === "unread") {
        readIndicator.classList.add('unread')
    }

    const dateLine = document.createElement('p')
    dateLine.classList = 'convo-peeker-convo-date'
    dateLine.innerText = formatDate(new Date(data.last_message_at))

    const authorLine = document.createElement('b')
    authorLine.classList = 'convo-peeker-convo-author'
    authorLine.innerText = data.participants[0].name

    const participants = document.createElement('div')
    participants.classList = 'convo-peeker-convo-participants'

    let i = 0
    data.participants.every(item => {
        const icon = document.createElement('img')
        icon.classList = 'convo-peeker-convo-participant-icon'
        icon.src = item.avatar_url
        icon.style.left = (i * 24) + 'px'
        participants.appendChild(icon)

        i++

        return i <= 3
    })
    participants.style.width = ((i * 24) + 27) + 'px'

    conversationElement.appendChild(subjectLine)
    conversationElement.appendChild(previewLine)

    convoMetaContainer.appendChild(readIndicator)
    convoMetaContainer.appendChild(dateLine)
    convoMetaContainer.appendChild(participants)
    convoMetaContainer.appendChild(authorLine)
    conversationElement.appendChild(convoMetaContainer)

    peekerConvoList.appendChild(conversationElement)

    conversationElement.addEventListener('click', () => {
        open('/conversations?find-select-conversation=' + data.id, 'test', "menubar=1,resizable=1,width=1250,height=750")
    })
}

const insertConversationTop = () => {
    const top = document.createElement('div')
    top.classList = 'canvasplus-convo-peeker-convo-top'

    const header = document.createElement('b')
    header.innerText = 'Emails'

    const searchFormWrapper = document.createElement('div')
    searchFormWrapper.classList = 'canvasplus-convo-peeker-convo-top-interaction-wrapper'

    const expandLink = document.createElement('a')
    expandLink.classList = 'canvasplus-convo-peeker-convo-top-expand-link'
    expandLink.href = '/conversations'
    expandLink.innerText = 'Expand'

    top.appendChild(header)

    searchFormWrapper.appendChild(expandLink)

    top.appendChild(searchFormWrapper)

    peekerElement.appendChild(top)
}

const formatDate = (date) => {
    const now = new Date()
    const day = new Date()
    day.setHours(0)
    day.setMinutes(0)
    day.setSeconds(0)
    day.setMilliseconds(0)

    if(now.getDate() === date.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
        let hour = date.getHours()
        let mins = date.getMinutes()
        if(hour < 12) {
            if(hour === 0) return '12:' + (mins < 10 ? '0' : '') + mins + 'am'
            else return hour + ':' + (mins < 10 ? '0' : '') + mins + 'am'
        } else {
            if(hour === 12) return '12:' + (mins < 10 ? '0' : '') + mins + 'am'
            else return (hour - 12) + ':' + (mins < 10 ? '0' : '') + mins + 'am'
        }
    } else if(date.getTime() + 86400000 > day.getTime()) {
        return 'Yesterday'
    } else if(date.getTime() + 604800000 > day.getTime()) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        return days[date.getDay()]
    } else {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
    }
}

const getConversations = () => {
    return new Promise((resolve, reject) => {
        if(convosCache === undefined) {
            fetch('/api/v1/conversations?include=participant_avatars').then(data => {
                data.json().then(json => {

                    insertConversationTop()

                    peekerElement.appendChild(peekerConvoList)

                    convosCache = json
                    resolve(json)
                })
            })
        } else {
            resolve(convosCache)
        }
    })
}

chrome.storage.local.get(["canvasplus-setting-convopeeker"], function(data) {
    if(data["canvasplus-setting-convopeeker"])
    {
        console.log('[Canvas+] Injecting email peeker ...')
        runConvoKeeper()
    }
})
