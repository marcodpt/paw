import e from '../e.js'
import tag from '../comp/tag.js'

export default ({children}) => e(({div, a, ul, li}) => 
  div({
    class: 'collapse navbar-collapse',
    dataApp: 'nav'
  }, [
    ul({
      class: 'navbar-nav ms-auto'
    }, children.map(({children, href, title, ...meta}) => children ?
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
)
