const snackbar = () => {
    const snackbarContainer = document.createElement('div');
    snackbarContainer.className = 'cpx-snackbar-container'

    document.body.appendChild(snackbarContainer)

    const setSnackbar = (content) => {
        const element = document.createElement('div');
        element.className = 'cpx-snackbar'

        const constructSpan = () => {
            const span = document.createElement('span')
            span.className = 'cpx-snackbar-text-span'
            element.appendChild(span);
            return span;
        }

        for(contentSegment of content) {
            const { type, text } = contentSegment;

            if(type === "text") {
                constructSpan().innerText = text;
            }
    
            if(type === "code") {
                const span = constructSpan();
                span.classList.add('cpx-snackbar-text-span-code');
                span.textContent = text;
            }
        }

        snackbarContainer.innerHTML = ''
        snackbarContainer.appendChild(element)
        return { element: element, id: Math.random(), created: Date.now() } ;
    }

    const removeSnackbar = ({ element }) => {
        setTimeout(() => {
            element.remove()
        }, 325)
        element.classList.add('removing')
    }

    const instantlyRemoveSnackbar = ({ element }) => {
        element.remove()
    }

    return { setSnackbar, removeSnackbar, instantlyRemoveSnackbar }
}


const { setSnackbar, removeSnackbar, instantlyRemoveSnackbar } = snackbar();