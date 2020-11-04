const forbidden_url_chars = [ ' ' ]

/**
 * Checks if a string is good enough to pass off as an URL for us
 * DON'T TRUST THIS! It has a bunch of edge cases but I don't care
 * @param {string} url 
 * @returns {boolean}
 */
const is_valid_url = (url) => {
    let valid = false

    if (url.includes('.'))
        valid = true

    for (let c of forbidden_url_chars) {
        if (url.includes(c))
            valid = false
    }

    return valid
}

/**
 * Loads a string or searches for it with duckduckgo
 * @param {WebviewTag} wv
 * @param {string} query
 */
const load_url = (wv, query) => {
    if (is_valid_url(query)) {
        let url = query

        if (!query.startsWith('http://') && !query.startsWith('https://') && !query.startsWith('file://'))
            url = `http://${query}`

        wv.loadURL(url)
    } else {
        wv.loadURL(`https://duckduckgo.com/?q=${encodeURIComponent(query)}`)
    }
}

module.exports = { load_url }
