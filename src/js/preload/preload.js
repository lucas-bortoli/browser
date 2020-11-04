const { ipcRenderer } = require('electron')
const { Shortcuts } = require('shortcuts')

const KEYMAP = {
  openBar: 'Alt',
  closeBar: 'Escape'
}

const shortcuts = new Shortcuts()

Object.entries(KEYMAP).forEach(([task, shortcut]) => {
  shortcuts.add([{
    shortcut,
    handler: () => ipcRenderer.sendToHost('webview-task', { task })
  }])
})

window.addEventListener('click', () => ipcRenderer.sendToHost('webview-task', { task:  'closeBar' }))

require('./ipc_receiver')
require('./context_menu')
require('./trusted_page')