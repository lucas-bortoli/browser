const { load_url } = require("./url")

const webView = document.querySelector('#content')
const statusMenu = document.querySelector('#status-menu')
const backButton = document.querySelector('#back')
const forwardButton = document.querySelector('#forward')
const menuButton = document.querySelector('#menu')
const urlInput = document.querySelector('#url-input')

const close_bar = () => statusMenu.classList.remove('open')
const open_bar = () => statusMenu.classList.add('open')

webView.addEventListener('ipc-message', e => {
    if (e.channel !== 'webview-task') return

    const { task } = e.args[0]

    if (task === 'openBar') {
        open_bar()
        setTimeout(() => {
            // focus on the URL bar and select its text
            urlInput.selectionStart = 0
            urlInput.focus()
        }, 300)
    } else if (task === 'closeBar') {
        close_bar()
    }
})

webView.addEventListener('load-commit', () => {
    webView.canGoBack() ? backButton.classList.remove('disabled') : backButton.classList.add('disabled')
    webView.canGoForward() ? forwardButton.classList.remove('disabled') : forwardButton.classList.add('disabled')
    urlInput.value = webView.src
})

document.addEventListener('keyup', e => {
    if (e.key == 'Alt' || e.key == 'Escape') {
        close_bar()
        webView.focus()
    }

    if (e.key === 'Enter' && e.target === urlInput) {
        if (urlInput.value.length > 0) {
            load_url(webView, urlInput.value)
            close_bar()
            webView.focus()
        }
    }
})

backButton.addEventListener('click', () => webView.goBack())
forwardButton.addEventListener('click', () => webView.goForward())

webView.focus()