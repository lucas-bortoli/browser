const ContextMenu = require('./context_menu')

const webView = document.querySelector('#content')

let ctx_menu = null

webView.addEventListener('ipc-message', e => {
    if (e.channel === 'webview-context-menu-open') {
        let data = e.args[0]
        
        if (ctx_menu) 
            ctx_menu.close()

        ctx_menu = new ContextMenu(data.x, data.y, [
            {
                icon: "code",
                label: "Inspect element",
                click: () => webView.inspectElement(data.x, data.y)
            }
        ])
        console.log(data)
    } else if (e.channel === 'webview-context-menu-close') {
        if (ctx_menu) 
            ctx_menu.close()

        ctx_menu = null
    }
})