const { app } = require('electron')
const electron = require('electron')

app.once('ready', () => {
    const win = new electron.BrowserWindow({
        webPreferences: {
            webviewTag: true
        }
    })

    win.loadFile('src/index.html')
})