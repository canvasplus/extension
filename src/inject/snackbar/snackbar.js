const snackbar = () => {
    const snackbarContainer = document.createElement('div');
    snackbarContainer.className = 'cpx-snackbar-container'

    document.body.appendChild(snackbarContainer)

    const setSnackbar = (content) => {
        const element = document.createElement('div');
        element.className = 'cpx-snackbar'
        element.innerText = content
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

    return { setSnackbar, removeSnackbar }
}


const { setSnackbar, removeSnackbar } = snackbar();