import e from './e.js'
import tag from './tag.js'
import ctrl from './ctrl/index.js'
import {rm} from './lib.js'

export default ({links}) => {
  rm(document.getElementById('sidebar'))
  const hasSidebar = links && links instanceof Array

  document.body.querySelectorAll('a[href="#sidebar"]').forEach(a => {
    a.classList[hasSidebar ? 'remove' : 'add']('disabled')
  })

  if (hasSidebar) {
    const tree = ({children}) => {
      const isOpen = 'angle-down'
      const isClosed = 'angle-right'
      
      return e(({div, ul, li, a, text}) => 
        ul({
          class: 'list-group'
        }, (children || []).map(({children, href, title, ...meta}) => 
          li({
            class: 'list-group-item border-0',
            dataAppPath: title
          }, [
            ctrl({
              init: el => {
                el.setAttribute('class', 'text-decoration-none text-reset'),
                el.setAttribute('data-app-active', 'fw-bold')
                if (children) {
                  el.prepend(text(' '))
                  el.prepend(tag({icon: isClosed}))
                  el.addEventListener('click', () => {
                    const l = el.closest('.list-group-item')
                      .querySelector('div')
                    l.classList.toggle('d-none')
                    const i = el.querySelector('i')
                    i.replaceWith(tag({
                      icon: l.classList.contains('d-none') ? isClosed : isOpen
                    }))
                  })
                } else if (typeof href == 'function') {
                  el.addEventListener('click', href)
                }
              },
              href: !children && typeof href == 'string' ?
                href : 'javascript:;',
              title,
              ...meta
            }),
            !children ? null : div({
              class: 'mt-2 d-none'
            }, [
              tree({children})
            ])
          ])
        ))
      )
    }

    document.body.appendChild(e(({div, h5, small, a, text, button}) => 
      div({
        id: 'sidebar',
        class: 'offcanvas offcanvas-start',
        tabindex: '-1',
        onclick: ev => {
          const link = ev.target.closest('a[href]')
          const href = link ? link.getAttribute('href') : ''
          if (href && href.substr(0, 11) != 'javascript:') {
            ev.target.closest('div.offcanvas')
              .querySelector('button.btn-close').click()
          }
        }
      }, [
        div({
          class: 'offcanvas-header'
        }, [
          h5({
            class: 'offcanvas-title'
          }, [
            a({
              href: '#/',
              class: 'text-decoration-none text-reset'
            }, [
              text(document.title)
            ]),
            text(' '),
            small({
              class: 'text-secondary',
              dataAppText: 'current'
            })
          ]),
          button({
            type: 'button',
            class: 'btn-close',
            dataBsDismiss: 'offcanvas',
            ariaLabel: 'close'
          })
        ]),
        div({
          class: 'offcanvas-body'
        }, [
          tree({children: links})
        ])
      ])
    ))
  }
}
