const { load_url } = require("../url")

const UI = {
    elements: {
        webView: document.querySelector('#content'),
        statusMenu: {
            statusMenu: document.querySelector('#status-menu'),
            backButton: document.querySelector('#back'),
            forwardButton: document.querySelector('#forward'),
            urlInput: document.querySelector('#url-input'),
            popupMenuButton: document.querySelector('#popup-menu-button')
        },
        popupMenu: {
            popupMenu: document.querySelector('#popup-menu'),
            homeButton: document.querySelector('#button-home'),
            devToolsButton: document.querySelector('#open-dev-tools')
        }
    },
    open_popup_menu: () => UI.elements.popupMenu.popupMenu.classList.add('open'),
    close_popup_menu: () => UI.elements.popupMenu.popupMenu.classList.remove('open'),
    open_bar: () => UI.elements.statusMenu.statusMenu.classList.add('open'),
    close_bar: () => UI.elements.statusMenu.statusMenu.classList.remove('open')
}

UI.elements.webView.focus()

module.exports = UI

require('./events')