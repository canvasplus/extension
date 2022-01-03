const snackbar = () => {
    const snackbarContainer = document.createElement('div');
    snackbarContainer.className = 'cpx-snackbar-container'

    document.body.appendChild(snackbarContainer)

    const setSnackbar = (content, size="") => {
        const element = document.createElement('div');
        element.className = `cpx-snackbar${size ? " cpx-snackbar__size-" + size : ""}`

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

            if(type === "spacer") {
                const spacer = document.createElement('div')
                spacer.className = 'cpx-snackbar-spacer'
                spacer.style = `--spacing:${contentSegment.spacing};`
                element.appendChild(spacer)
            }

            if(type === "button-hstack") {
                const stack = document.createElement('div')
                stack.className = 'cpx-snackbar-button-hstack'
                element.appendChild(stack)

                contentSegment.buttons.forEach(buttonData => {
                    const button = document.createElement('button')
                    button.className = 'cpx-snackbar-button'
                    
                    button.innerText = buttonData.text
                    button.style = `--textColor: ${buttonData.textColor ?? '#FFF'}; --buttonColor: ${buttonData.backgroundColor ?? '#3177cc'};`

                    button.addEventListener('click', buttonData.onClick)

                    stack.appendChild(button)
                });
            }
        }

        snackbarContainer.innerHTML = ''
        snackbarContainer.appendChild(element)
        return { element: element, id: Math.random(), created: Date.now() } ;
    }

    const removeSnackbar = ({ element }) => {
        const size = (() => {
            if(element.classList.contains("cpx-snackbar__size-large")) {
                return 725;
            } else {
                return 325;
            }
        })()

        setTimeout(() => {
            element.remove()
        }, size)
        element.classList.add('removing')
    }

    const instantlyRemoveSnackbar = ({ element }) => {
        element.remove()
    }

    return { setSnackbar, removeSnackbar, instantlyRemoveSnackbar }
}


const { setSnackbar, removeSnackbar, instantlyRemoveSnackbar } = snackbar();