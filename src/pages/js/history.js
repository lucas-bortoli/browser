if (!__$_datastore) 
    document.writeln('No DataStores. Are Node.js APIs enabled?')

const history_list_element = document.querySelector('.list')

const escape_html = __$_require('escape-html')

function add_history_to_dom(index, title, link) {
    let element = document.createElement('div')
    history_list_element.appendChild(element)

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
        () => history_remove(index)
}

function history_remove(index) {
    let history_list = __$_datastore.get('history') || []

    // remove item from array and save it
    __$_datastore.set('history', 
        history_list.filter((_, i) => i !== index))

    history_refresh_list()
}

function history_refresh_list() {
    history_list_element.innerHTML = ''

    let history_list = __$_datastore.get('history') || []

    for (let i = 0; i < history_list.length; i++) {
        let hs = history_list[i]

        add_history_to_dom(i, hs.title, hs.url)
    }
}

addEventListener('load', () => history_refresh_list())
document.querySelector('#clear-btn').addEventListener('click', () => {
    __$_datastore.set('history', [])
    history_refresh_list()
})