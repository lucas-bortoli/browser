const webView = document.querySelector('#content')

webView.addEventListener('ipc-message', e => {
    const event_name = e.channel
})

webView.addEventListener("dom-ready", event => {
    // Remove this once https://github.com/electron/electron/issues/14474 is fixed
    webView.blur()
    webView.focus()
})