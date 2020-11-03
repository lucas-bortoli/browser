const { ipcRenderer } = require('electron')

window.addEventListener('contextmenu', e => {
    if (e.defaultPrevented)
        return

            /*
                {
                    "type": "link"|"image",
                    "url": "https://..."
                }
            */
    let targets = []

    if (e.target.tagName === 'A')
        targets.push({ 'type': 'link', 'url': e.target.href })

    if (e.target.tagName === 'IMG')
        targets.push({ 'type': 'image', 'url': e.target.src })

    ipcRenderer.sendToHost('webview-context-menu-open', {
        x: e.clientX,
        y: e.clientY,
        targets
    })
})

window.addEventListener('click', e => {
    ipcRenderer.sendToHost('webview-context-menu-close')
})