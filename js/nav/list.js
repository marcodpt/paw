import e from '../e.js'
import {iconify, icon} from '../lib.js'

const list = ({children}) => {
  const {isClosed, isOpen} = icon 
  return e(({div, ul, li, a, i, text}) => 
    ul({
      class: 'list-group'
    }, (children || []).map(({children, href, icon, title}) => 
      li({
        class: 'list-group-item border-0',
        dataAppPath: title
      }, [
        a({
          class: 'text-decoration-none text-reset',
          href: children ? 'javascript:;' : href,
          onclick: !children ? null : ev => {
            ev.target.closest('.list-group-item')
              .querySelector('div').classList.toggle('d-none')
            const i = ev.target.closest('a')
              .querySelector('i[class="'+isClosed+'"], i[class="'+isOpen+'"]')
            i.setAttribute('class',
              i.getAttribute('class') == isClosed ? isOpen : isClosed
            )
          },
          dataAppActive: 'fw-bold'
        }, [
          children ? i({class: isClosed}) : null,
          children ? text(' ') : null,
          icon ? i({class: iconify(icon)}) : null,
          icon && title ? text(' ') : null,
          text(title)
        ]),
        !children ? null : div({
          class: 'mt-2 d-none'
        }, [
          list({children})
        ])
      ])
    ))
  )
}

export default list
