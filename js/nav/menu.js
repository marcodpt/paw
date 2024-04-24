import e from '../e.js'
import tag from '../comp/tag.js'

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
        tag({icon})
      ])
    ])
  ])
)
