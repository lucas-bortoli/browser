const path = require('path')
const { elements, open_bar, open_popup_menu, close_bar, close_popup_menu } = require('./ui')
const { load_url, make_file_url_from_relative } = require('../url')
const bookmarks = require('../bookmarks')
const history = require('../history')

elements.webView.addEventListener('ipc-message', e => {
    if (e.channel !== 'webview-task') return

    const { task } = e.args[0]

    if (task === 'openBar') {
        open_bar()
        setTimeout(() => {
            // focus on the URL bar and select its text
            elements.statusMenu.urlInput.selectionStart = 0
            elements.statusMenu.urlInput.focus()
        }, 300)
    } else if (task === 'closeBar') {
        close_popup_menu()
        close_bar()
    }
})

elements.webView.addEventListener('load-commit', () => {
    elements.webView.canGoBack() ? 
        elements.statusMenu.backButton.classList.remove('disabled') : elements.statusMenu.backButton.classList.add('disabled')
    elements.webView.canGoForward() ? 
        elements.statusMenu.forwardButton.classList.remove('disabled') : elements.statusMenu.forwardButton.classList.add('disabled')
    elements.statusMenu.urlInput.value = elements.webView.src
})

elements.webView.addEventListener('page-title-updated', ev => {
    elements.statusMenu.urlInput.value = elements.webView.src
    document.title = ev.title
})

elements.webView.addEventListener('did-finish-load', () => {
    if (new URL(elements.webView.getURL()).protocol === 'file:')
        return

    history.add_history_entry(elements.webView.getTitle(), elements.webView.getURL())
})

document.addEventListener('keyup', e => {
    if (e.key == 'Alt' || e.key == 'Escape') {
        close_popup_menu()
        close_bar()
        elements.webView.focus()
    }

    if (e.key === 'Enter' && e.target === elements.statusMenu.urlInput) {
        if (elements.statusMenu.urlInput.value.length > 0) {
            load_url(elements.webView, elements.statusMenu.urlInput.value)
            close_popup_menu()
            close_bar()
            elements.webView.focus()
        }
    }
})

elements.statusMenu.backButton.addEventListener('click', () => elements.webView.goBack())
elements.statusMenu.forwardButton.addEventListener('click', () => elements.webView.goForward())

elements.statusMenu.popupMenuButton.addEventListener('click', () => open_popup_menu())
elements.popupMenu.homeButton.addEventListener('click', () => { 
    load_url(elements.webView, 'https://ddg.gg')
    close_popup_menu()
    close_bar()
    elements.webView.focus()
})

elements.popupMenu.devToolsButton.addEventListener('click', () => {
    elements.webView.openDevTools()
    close_popup_menu()
    close_bar()
    elements.webView.focus()
})

elements.popupMenu.historyButton.addEventListener('click', () => {
    load_url(elements.webView, make_file_url_from_relative('../pages/history.html'), true)
    close_popup_menu()
    //close_bar()
    elements.webView.focus()
})

elements.popupMenu.viewBookmarksButton.addEventListener('click', () => {
    load_url(elements.webView, make_file_url_from_relative('../pages/bookmarks.html'), true)
    close_popup_menu()
    //close_bar()
    elements.webView.focus()
})

elements.popupMenu.addBookmarkButton.addEventListener('click', () => {
    bookmarks.add_bookmark(elements.webView.getTitle(), elements.webView.getURL())
    close_popup_menu()
})