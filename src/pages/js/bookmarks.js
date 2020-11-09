if (!__$_datastore) 
    document.writeln('No DataStores. Are Node.js APIs enabled?')

const bookmark_list_element = document.querySelector('.list')

const escape_html = __$_require('escape-html')

function add_bookmark_to_dom(index, title, link) {
    let element = document.createElement('div')
    bookmark_list_element.appendChild(element)

    element.className = 'entry'
    element.innerHTML = `
        <div class="info">
            <span class="title">${escape_html(title)}</span>
            <a class="url">${escape_html(link)}</a>
        </div>
        <div class="actions">
            <button class="material-icons close">close</button>
        </div>
    `

    element.querySelector('.url').href = link
    element.querySelector('.close').onclick = 
        () => bookmarks_remove(index)
}

function bookmarks_remove(index) {
    let bookmarks = __$_datastore.get('bookmarks') || []

    // remove item from array and save it
    __$_datastore.set('bookmarks', 
        bookmarks.filter((_, i) => i !== index))

    bookmarks_refresh_list()
}

function bookmarks_refresh_list() {
    bookmark_list_element.innerHTML = ''

    let bookmarks = __$_datastore.get('bookmarks') || []

    for (let i = 0; i < bookmarks.length; i++) {
        let bm = bookmarks[i]

        add_bookmark_to_dom(i, bm.title, bm.url)
    }
}

addEventListener('load', () => bookmarks_refresh_list())