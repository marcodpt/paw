import e from './e.js'
import tag from './tag.js'
import ctrl from './ctrl/index.js'
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
            ctrl({
              init: el => {
                el.setAttribute('class', 'nav-link dropdown-toggle')
                el.setAttribute('data-app-active', 'active')
                el.setAttribute('data-bs-toggle', 'dropdown')
                el.setAttribute('role', 'button')
                el.setAttribute('ariaExpanded', 'false')
                el.removeAttribute('href')
              },
              href: 'dropdown',
              title,
              ...meta
            }),
            ul({
              class: 'dropdown-menu'
            }, children.map(({href, title, ...meta}) => 
              li({
                dataAppPath: title
              }, [
                ctrl({
                  href,
                  title,
                  init: el => {
                    el.setAttribute('class', 'dropdown-item')
                    el.setAttribute('data-app-active', 'active')
                  },
                  ...meta
                })
              ])
            ))
          ]) : li({
            class: 'nav-item',
            dataAppPath: title
          }, [
            ctrl({
              init: el => {
                el.setAttribute('class', 'nav-link')
                el.setAttribute('data-app-active', 'active')
              },
              title,
              href,
              ...meta
            })
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

    target.prepend(e(({ul, li, a}) => 
      ul({
        class: 'navbar-nav',
        dataApp: 'nav'
      }, [
        li({
          class: 'nav-item'
        }, [
          ctrl({
            href: '#sidebar',
            icon: 'bars',
            init: el => {
              el.setAttribute('class', 'nav-link')
              el.setAttribute('data-bs-toggle', 'offcanvas')
              el.setAttribute('role', 'button')
              el.setAttribute('aria-controls', 'sidebar')
            }
          })
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
