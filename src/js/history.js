const store = require('./data_store')

const add_history_entry = (title, url) => {
    if (!title || !url)
        throw new Error('Invalid title or url')

    let entries = store.get('history', [])

    entries.push({ title, url })

    store.set('history', entries)
}

module.exports = {
    add_history_entry
}