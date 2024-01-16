import e from './e.js'
import {iconify, icon} from './lib.js'

export default ({
  title,
  sidebar,
  links,
  current
}) => {
  const {menu, isClosed, isOpen} = icon 
  const hide = () => {}
  const toggle = ev => {
    ev.target.closest('.list-group')
      .querySelector('.app-sublist').classList.toggle('d-none')
    const i = ev.target.closest('a')
      .querySelector('i[class="'+isClosed+'"], i[class="'+isOpen+'"]')
    i.setAttribute('class',
      i.getAttribute('class') == isClosed ? isOpen : isClosed
    )
  }
  const navbar = e(({
    div, nav, h5, a, small, ul, li, i, span, text, button
  }) => div({
    id: 'navbar'
  }, [
    nav({
      class: 'navbar navbar-expand-lg bg-light navbar-light'
    }, [
      div({
        class: 'container-fluid'
      }, [
        ul({
          class: 'navbar-nav'
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
              i({class: menu})
            ])
          ])
        ]),
        a({
          class: 'navbar-brand',
          href: '#/'
        }, [
          text(title)
        ]),
        span({
          class: 'navbar-text app-current'
        }),
        button({
          class: 'navbar-toggler',
          dataBsToggle: 'collapse',
          dataBsTarget: '.navbar-collapse'
        }, [
          span({
            class: 'navbar-toggler-icon'
          })
        ]),
        div({
          class: 'collapse navbar-collapse'
        }, [
          ul({
            class: 'navbar-nav ms-auto'
          }, links.map(({children, href, icon, title}) => children ?
            li({
              class: 'nav-item dropdown'
            }, [
              a({
                class: 'nav-link dropdown-toggle',
                dataBsToggle: 'dropdown',
                role: 'button',
                ariaExpanded: 'false'
              }, [
                icon ? i({class: iconify(icon)}) : null,
                icon && title ? text(' ') : null,
                text(title)
              ]),
              ul({
                class: 'dropdown-menu'
              }, children.map(({href, icon, title}) => 
                li({}, [
                  a({
                    class: 'dropdown-item',
                    href
                  }, [
                    icon ? i({class: iconify(icon)}) : null,
                    icon && title ? text(' ') : null,
                    text(title)
                  ])
                ])
              ))
            ]) : li({
              class: 'nav-item'
            }, [
              a({
                class: 'nav-link',
                href
              }, [
                icon ? i({class: iconify(icon)}) : null,
                icon && title ? text(' ') : null,
                text(title)
              ])
            ])
          ))
        ])
      ])
    ]),
    div({
      class: 'offcanvas offcanvas-start',
      tabindex: '-1',
      id: 'sidebar'
    }, [
      div({
        class: 'offcanvas-header'
      }, [
        h5({
          class: 'offcanvas-title'
        }, [
          a({
            href: '#/',
            class: 'text-reset text-decoration-none',
            onclick: hide
          }, [
            text(title)
          ]),
          small({
            class: 'text-secondary app-current'
          })
        ])
      ]),
      div({
        class: 'offcanvas-body'
      }, sidebar.map(({children, href, icon, title}) => 
        ul({
          class: 'list-group'
        }, [
          li({
            class: 'list-group-item'
          }, [
            a({
              class: 'text-decoration-none text-reset',
              href: children ? 'javascript:;' : href,
              onclick: children ? toggle : hide
            }, [
              icon ? i({class: iconify(icon)}) : null,
              icon && title ? text(' ') : null,
              text(title),
              children ? text(' ') : null,
              children ? i({class: isClosed}) : null
            ])
          ]),
          !children ? null : li({
            class: 'list-group-item app-sublist d-none'
          }, [
            ul({
              class: 'list-group'
            }, children.map(({href, icon, title}) => 
              li({
                class: 'list-group-item'
              }, [
                a({
                  class: 'text-decoration-none text-reset',
                  href,
                  onclick: hide
                }, [
                  icon ? i({class: iconify(icon)}) : null,
                  icon && title ? text(' ') : null,
                  text(title)
                ])
              ])
            ))
          ])
        ])
      ))
    ])
  ]))

  const hashchange = () => {
    const hash = location.hash
    navbar.querySelectorAll('.active').forEach(link => {
      link.classList.remove('active')
    })
    const route = Array.from(navbar.querySelectorAll('a[href]'))
      .reduce((route, link) => {
        const href = link.getAttribute('href')
        const l = href.length
        return hash.substr(0, l) == href && l > route.length ?
          href : route
      }, '')
    const target = navbar.querySelector('a[href="'+route+'"]')
    const Current = []
    if (route && target) {
      var t = target
      while (t) {
        Current.push(t)
        t = t.parentNode.closest('a[href]')
      }
    }
    Current.reverse()
    const current = Current.map(t => t.textContent.trim())
      .filter(t => t).join(' / ')
    navbar.querySelectorAll('.app-current').forEach(t => {
      t.textContent = current
    })
    Current.forEach(t => {
      const p = t.closest('.list-group-item') || t
      p.classList.add('active')
    })
  }
  window.addEventListener('hashchange', hashchange)
  hashchange()

  return navbar
}
