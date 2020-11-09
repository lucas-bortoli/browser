const store = require('./data_store')

const add_bookmark = (title, url) => {
    if (!title || !url)
        throw new Error('Invalid title or url')

    let bookmarks = store.get('bookmarks', [])

    bookmarks.push({ title, url })

    store.set('bookmarks', bookmarks)
}

module.exports = {
    add_bookmark
}