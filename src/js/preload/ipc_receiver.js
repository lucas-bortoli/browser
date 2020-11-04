const { remote, ipcRenderer } = require('electron/renderer')
const { clipboard } = require('electron/common')

ipcRenderer.on('context-menu-paste', ev => {
    console.log(ev)
    if (!window._$browser_contextmenu_element)
        return

    _$browser_contextmenu_element.focus()
    document.execCommand('paste')
})