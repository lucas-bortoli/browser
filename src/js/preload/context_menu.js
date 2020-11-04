const { ipcRenderer } = require('electron')

window.addEventListener('contextmenu', e => {
    if (e.defaultPrevented)
        return

            /*
                {
                    "type": "link"|"image"|"input",
                    "url": "https://..."
                }
            */
    let targets = []

    if (e.target.tagName === 'A')
        targets.push({ 'type': 'link', 'url': e.target.href })

    if (e.target.tagName === 'IMG')
        targets.push({ 'type': 'image', 'url': e.target.src })
    
    if (e.target.tagName === 'INPUT')
        targets.push({ 'type': 'input', 'url': null, 'canCopy': e.target.selectionStart !== e.target.selectionEnd })

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