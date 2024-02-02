import e from '../e.js'
import {iconify} from '../lib.js'

export default ({children}) => e(({div, a, ul, li, i, text}) => 
  div({
    class: 'collapse navbar-collapse',
    dataApp: 'nav'
  }, [
    ul({
      class: 'navbar-nav ms-auto'
    }, children.map(({children, href, icon, title}) => children ?
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
          icon ? i({class: iconify(icon)}) : null,
          icon && title ? text(' ') : null,
          text(title)
        ]),
        ul({
          class: 'dropdown-menu'
        }, children.map(({href, icon, title}) => 
          li({
            dataAppPath: title
          }, [
            a({
              class: 'dropdown-item',
              dataAppActive: 'active',
              href
            }, [
              icon ? i({class: iconify(icon)}) : null,
              icon && title ? text(' ') : null,
              text(title)
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
          icon ? i({class: iconify(icon)}) : null,
          icon && title ? text(' ') : null,
          text(title)
        ])
      ])
    ))
  ])
)
