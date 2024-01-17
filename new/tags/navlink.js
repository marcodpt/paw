import e from '../e.js'
import {iconify} from '../lib.js'

export default ({children}) => e(({a, ul, li, i, text}) => 
  ul({
    class: 'navbar-nav ms-auto'
  }, children.map(({children, href, icon, title}) => children ?
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
)
