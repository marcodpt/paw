import e from '../e.js'
import tag from '../comp/tag.js'

const isOpen = 'angle-down'
const isClosed = 'angle-right'

const list = ({children}) => {
  return e(({div, ul, li, a, text}) => 
    ul({
      class: 'list-group'
    }, (children || []).map(({children, href, title, ...meta}) => 
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
            i.replaceWith(tag({
              icon: l.classList.contains('d-none') ? isClosed : isOpen
            }))
          },
          dataAppActive: 'fw-bold'
        }, [
          children ? tag({icon: isClosed}) : null,
          children ? text(' ') : null,
          tag({
            ...meta,
            title
          })
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
