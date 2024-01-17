import e from './e.js'
import {iconify, icon} from './lib.js'
import list from './tags/list.js'
import offcanvas from './tags/offcanvas.js'
import navlink from './tags/navlink.js'

export default ({
  title,
  sidebar,
  links,
  current
}) => {
  const {menu} = icon 
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
          navlink({children: links})
        ])
      ])
    ]),
    offcanvas({
      id: 'sidebar'
    }, [
      list({children: sidebar})
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
