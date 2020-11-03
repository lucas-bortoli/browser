const { load_url } = require("./url")

const webView = document.querySelector('#content')
const statusMenu = document.querySelector('#status-menu')
const backButton = document.querySelector('#back')
const forwardButton = document.querySelector('#forward')
const popupMenuButton = document.querySelector('#popup-menu-button')
const popupMenu = document.querySelector('#popup-menu')
const urlInput = document.querySelector('#url-input')
const homeButton = document.querySelector('#button-home')

const close_popup_menu = () => popupMenu.classList.remove('open')
const open_popup_menu = () => popupMenu.classList.add('open')
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
        close_popup_menu()
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
        close_popup_menu()
        close_bar()
        webView.focus()
    }

    if (e.key === 'Enter' && e.target === urlInput) {
        if (urlInput.value.length > 0) {
            load_url(webView, urlInput.value)
            close_popup_menu()
            close_bar()
            webView.focus()
        }
    }
})

backButton.addEventListener('click', () => webView.goBack())
forwardButton.addEventListener('click', () => webView.goForward())

popupMenuButton.addEventListener('click', () => open_popup_menu())
homeButton.addEventListener('click', () => { 
    load_url(webView, 'https://ddg.gg')
    close_popup_menu()
    close_bar()
    webView.focus()
})
webView.focus()