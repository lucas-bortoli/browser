const { clipboard, ipcRenderer } = require('electron')

const ContextMenu = require('./classes/context_menu')

const webView = document.querySelector('#content')

let ctx_menu = null

webView.addEventListener('ipc-message', e => {
    if (e.channel === 'webview-context-menu-open') {
        let data = e.args[0]

        if (ctx_menu) 
            ctx_menu.close()

        let menu_elements = []

        for (let target of data.targets) {
            if (target.type === 'link') {
                menu_elements.push({
                    icon: 'content_copy',
                    label: 'Copy link',
                    click: () => clipboard.writeText(target.url)
                })
            } else if (target.type === 'image') {
                menu_elements.push({
                    icon: 'content_copy',
                    label: 'Copy image link',
                    click: () => clipboard.writeText(target.url)
                })
            } else if (target.type === 'input') {
                menu_elements.push({
                    icon: 'content_paste',
                    label: 'Paste',
                    click: () => webView.send('context-menu-paste')
                })
            }
        }

        menu_elements.push({
            icon: "code",
            label: "Inspect element",
            click: () => webView.inspectElement(data.x, data.y)
        })

        ctx_menu = new ContextMenu(data.x, data.y, menu_elements)
    } else if (e.channel === 'webview-context-menu-close') {
        if (ctx_menu) 
            ctx_menu.close()

        ctx_menu = null
    }
})