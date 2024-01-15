import e from './e.js'

export default ({
  title,
  sidebar
}) => {
  return e(({div, nav, h5, a, small, ul, li, i}) => div({}, [
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
              i({class: link.menu})
            ])
          ])
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
          }, text(title)),
          small({
            class: 'text-secondary'
          }, text(current))
        ])
      ]),
      div({
        class: 'offcanvas-body'
      }, sidebar)
    ])
  ]))
}
