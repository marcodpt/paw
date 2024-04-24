import e from '../e.js'
import fa from '../comp/fa.js'

const icon = 'bars'

export default ({target}) => e(({ul, li, a}) => 
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
        href: target,
        role: 'button',
        ariaControls: 'sidebar'
      }, [
        fa({name: icon})
      ])
    ])
  ])
)
