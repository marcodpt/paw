import e from '../e.js'

export default (attributes, slot) => e(({div, h5, small, a, text, button}) => 
  div({
    ...(attributes || {}),
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
          class: 'text-secondary app-current'
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
    }, slot)
  ])
)
