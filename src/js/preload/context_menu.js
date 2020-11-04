const { ipcRenderer } = require('electron')

window.addEventListener('contextmenu', e => {
    if (e.defaultPrevented)
        return

            /*
                {
                    "type": "link"|"image"|"input"|"other",
                    "url": "https://..."
                }
            */
    let targets = []

    if (e.target.tagName === 'A') {
        targets.push({ 'type': 'link', 'url': e.target.href })
    } else if (e.target.tagName === 'IMG') {
        targets.push({ 'type': 'image', 'url': e.target.src })
    } else if (e.target.tagName === 'INPUT') {
        targets.push({ 'type': 'input', 'canCopy': e.target.selectionStart !== e.target.selectionEnd })
    } else {
        targets.push({ 'type': 'other', 'canCopy': getSelection().type === 'Range' })
    }

    window._$browser_contextmenu_element = e.target

    ipcRenderer.sendToHost('webview-context-menu-open', {
        x: e.clientX,
        y: e.clientY,
        targets
    })
})

window.addEventListener('click', e => {
    ipcRenderer.sendToHost('webview-context-menu-close')
})