const { app } = require('electron')
const electron = require('electron')

app.once('ready', () => {
    const win = new electron.BrowserWindow({
        icon: 'src/images/icon.png',
        webPreferences: {
            webviewTag: true,
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    win.loadFile('src/index.html')
    win.setMenuBarVisibility(false)
})