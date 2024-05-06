import e from './e.js'
import tag from './tag.js'
import {rm} from './lib.js'

export default ({target, links, sidebar}) => {
  rm(document.getElementById('sidebar'))
  target.querySelectorAll('[data-app="nav"]').forEach(e => rm(e))

  if (links && links instanceof Array) {
    target.appendChild(e(({button, span}) => 
      button({
        class: 'navbar-toggler',
        dataBsToggle: 'collapse',
        dataBsTarget: '.navbar-collapse',
        dataApp: 'nav'
      }, [
        span({
          class: 'navbar-toggler-icon'
        })
      ])
    ))
    target.appendChild(e(({div, a, ul, li}) => 
      div({
        class: 'collapse navbar-collapse',
        dataApp: 'nav'
      }, [
        ul({
          class: 'navbar-nav ms-auto'
        }, links.map(({children, href, title, ...meta}) => children ?
          li({
            class: 'nav-item dropdown',
            dataAppPath: title
          }, [
            a({
              class: 'nav-link dropdown-toggle',
              dataAppActive: 'active',
              dataBsToggle: 'dropdown',
              role: 'button',
              ariaExpanded: 'false'
            }, [
              tag({
                ...meta,
                title
              })
            ]),
            ul({
              class: 'dropdown-menu'
            }, children.map(({href, title, ...meta}) => 
              li({
                dataAppPath: title
              }, [
                a({
                  class: 'dropdown-item',
                  dataAppActive: 'active',
                  href
                }, [
                  tag({
                    ...meta,
                    title
                  })
                ])
              ])
            ))
          ]) : li({
            class: 'nav-item',
            dataAppPath: title
          }, [
            a({
              class: 'nav-link',
              dataAppActive: 'active',
              href
            }, [
              tag({
                ...meta,
                title
              })
            ])
          ])
        ))
      ])
    ))
  }
  if (sidebar && sidebar instanceof Array) {
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
              tree({children})
            ])
          ])
        ))
      )
    }

    target.prepend(e(({ul, li, a}) => 
      ul({
        class: 'navbar-nav',
        dataApp: 'nav'
      }, [
        li({
          class: 'nav-item'
        }, [
          a({
            class: 'nav-link',
            dataBsToggle: 'offcanvas',
            href: '#sidebar',
            role: 'button',
            ariaControls: 'sidebar'
          }, [
            tag({icon: 'bars'})
          ])
        ])
      ])
    ))

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
          tree({children: sidebar})
        ])
      ])
    ))
  }
}
