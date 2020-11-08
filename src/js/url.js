const path = require('path')

const forbidden_url_chars = [ ' ' ]
const url_regex_match = /^([0-9]|[a-z]|-)+\.[a-z]+$/

/**
 * Checks if a string is good enough to pass off as an URL for us
 * DON'T TRUST THIS! It has a bunch of edge cases but I don't care
 * @param {string} url 
 * @returns {boolean}
 */
const is_valid_url = (url) => {
    let valid = false

    if (url_regex_match.test(url))
        valid = true

    for (let c of forbidden_url_chars) {
        if (url.includes(c))
            valid = false
    }

    console.log(`URL validation: ${url} is ${valid ? '':'not '}a valid URL.`)

    return valid
}

/**
 * Loads a string or searches for it with duckduckgo
 * @param {WebviewTag} wv
 * @param {string} query
 * @param {boolean} force Load without checking if the url is valid
 */
const load_url = (wv, query, force) => {
    if (force || is_valid_url(query)) {
        let url = query

        if (!force && !query.startsWith('http://') && !query.startsWith('https://') && !query.startsWith('file://'))
            url = `http://${query}`

        wv.loadURL(url)
    } else {
        wv.loadURL(`https://duckduckgo.com/?q=${encodeURIComponent(query)}`)
    }
}

const make_file_url_from_relative = (relative) => {
    let url = path.resolve(__dirname, relative)
    return `file://${url.split(path.sep).join(path.posix.sep)}`
}

module.exports = { load_url, make_file_url_from_relative }
