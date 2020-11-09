const Store = require('electron-store')

const store = new Store()

if (!store.has('history'))
    store.set('history', [])

if (!store.has('bookmarks'))
    store.set('bookmarks', [])

module.exports = store