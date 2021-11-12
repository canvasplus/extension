const findParam = new URLSearchParams(window.location.search).url.get('find-select-conversation')

if(findParam) {
    delayedQuerySelector(`#conversation-checkbox-${findParam}`).then((element) => {
        element.parentElement.parentElement.dispatchEvent(new Event('click'));
    })
}