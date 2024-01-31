import e from '../e.js'
import {icon} from '../lib.js'

export default ({target}) => e(({ul, li, a, i}) => 
  ul({
    class: 'navbar-nav'
  }, [
    li({
      class: 'nav-item'
    }, [
      a({
        class: 'nav-link',
        dataBsToggle: 'offcanvas',
        href: target,
        role: 'button',
        ariaControls: 'sidebar'
      }, [
        i({class: icon.menu})
      ])
    ])
  ])
)
