var currentUrl = window.location.host 
var protocol = window.location.protocol
var realurl = protocol.concat(currentUrl)
const url = new URLSearchParams(window.location.search);
const findParam = url.get('find-select-conversation')

const checkMeQueue = []
let data = undefined
let found = false

if(findParam) {

    fetch(realurl+'/api/v1/conversations/' + findParam).then(response => {
        response.json().then(json => {
            data = json
            checkMeQueue.every(item => {
                if(new Date(item.querySelector('.message-middle-column .date time').dateTime).getTime() === new Date(json.last_message_at).getTime()) {
                    if(item.querySelector('.message-middle-column .summary').innerHTML === json.last_message) {
                        found = true
                        item.dispatchEvent(new Event('click'))
                        return false;
                    }
                }
                return true;
            })
        })
    })

    document.querySelector('.message-list').addEventListener('DOMSubtreeModified', () => {
        if(!document.querySelector('.message-list .messages.unstyled.collectionViewItems')) {
            return
        }
    
        const lastMessage = document.querySelector('.message-list .messages.unstyled.collectionViewItems').lastElementChild
        if(!lastMessage) {
            return;
        }
        
        if(!data) {
            checkMeQueue.push(lastMessage)
        } else if(!found) {
            if(new Date(lastMessage.querySelector('.message-middle-column .date time').dateTime).getTime() === new Date(data.last_message_at).getTime()) {
                if(lastMessage.querySelector('.message-middle-column .summary').innerHTML === data.last_message) {
                    found = true
                    lastMessage.dispatchEvent(new Event('click'))
                    return false;
                }
            }
        }
    })

}