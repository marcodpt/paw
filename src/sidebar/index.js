import {node, ctrl} from '../components.js'
import {rm} from '../lib.js'

export default ({links, title, description, icon}) => {
  rm(document.getElementById('sidebar'))
  const hasSidebar = links && links instanceof Array

  document.body.querySelectorAll('a[href="#sidebar"]').forEach(a => {
    a.classList[hasSidebar ? 'remove' : 'add']('invisible')
  })

  if (hasSidebar) {
    const tree = ({children}) => {
      const isOpen = 'angle-down'
      const isClosed = 'angle-right'
      
      return node(({div, ul, li, a, text}) => 
        ul({
          class: 'list-group'
        }, (children || []).map(({children, href, title, ...meta}) => 
          li({
            class: 'list-group-item border-0',
            dataPawPath: title
          }, [
            ctrl({
              init: el => {
                el.setAttribute('class', 'text-decoration-none text-reset'),
                el.setAttribute('data-paw-active', 'fw-bold')
                if (children) {
                  el.prepend(text(' '))
                  const i = ctrl({icon: isClosed})
                  i.setAttribute('data-paw-active', 'fa-'+isOpen)
                  i.setAttribute('data-paw-inactive', 'fa-'+isClosed)
                  el.prepend(i)
                  el.addEventListener('click', () => {
                    const l = el.closest('.list-group-item')
                      .querySelector('div')
                    l.classList.toggle('d-none')
                    const i = el.querySelector('i')
                    i.setAttribute('class', 'fa-solid fa-'+
                      (l.classList.contains('d-none') ? isClosed : isOpen)
                    )
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
              class: 'mt-2',
              dataPawInactive: 'd-none'
            }, [
              tree({children})
            ])
          ])
        ))
      )
    }

    document.body.appendChild(node(({div, h5, small, a, text, button}) => 
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
            ctrl({
              icon,
              title,
              description
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
