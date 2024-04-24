import e from '../e.js'
import fa from '../comp/fa.js'

const isOpen = 'angle-down'
const isClosed = 'angle-right'

const list = ({children}) => {
  return e(({div, ul, li, a, text}) => 
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
            const t = ev.target
            const l = t.closest('.list-group-item').querySelector('div')
            l.classList.toggle('d-none')
            const i = ev.target.closest('a').querySelector('i')
            i.replaceWith(fa({
              name: l.classList.contains('d-none') ? isClosed : isOpen
            }))
          },
          dataAppActive: 'fw-bold'
        }, [
          children ? fa({name: isClosed}) : null,
          children ? text(' ') : null,
          icon ? fa({name: icon}) : null,
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
