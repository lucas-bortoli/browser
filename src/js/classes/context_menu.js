class ContextMenu {
    /**
     * @param {number} x
     * @param {number} y
     * @param {ContextMenuOption[]} opts 
     */
    constructor(x, y, opts) {
        let menu_element = document.createElement('div')
        menu_element.classList.add('menu')
        menu_element.classList.add('open')
        menu_element.style = `top: ${y}px; left: ${x}px; bottom: unset; right: unset;`
        
        for (let opt of opts) {
            let opt_element = document.createElement('button')
            opt_element.classList.add('menu-item')
            if (opt.disabled)
                opt_element.classList.add('disabled')

            let icon_element = document.createElement('i')
            icon_element.classList.add('material-icons')
            icon_element.innerText = opt.icon || 'none'

            let label_element = document.createElement('span')
            label_element.classList.add('text')
            label_element.innerText = opt.label

            if (!opt.disabled)
                opt_element.addEventListener('click', e => { 
                    this.close()
                    if (opt.click)
                        opt.click(e) 
                })

            opt_element.appendChild(icon_element)
            opt_element.appendChild(label_element)
            menu_element.appendChild(opt_element)
        }

        document.body.appendChild(menu_element)
        menu_element.focus()

        menu_element.addEventListener('focusout', this.close)

        this.element = menu_element
    }

    close() {
        if (this.element)
            this.element.remove()
    }
}

module.exports = ContextMenu