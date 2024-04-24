import e from './e.js'
import form from './comp/form.js'
import {link, lang, rm} from './lib.js'

const showModal = ({
  submit,
  links,
  ...schema
}) => {
  const l = lang()

  const modal = e(({div}) => 
    div({
      class: 'modal fade',
      tabindex: '-1'
    }, [
      div({
        class: [
          'modal-dialog',
          Object.keys(schema.properties || {}).length ? 'modal-lg' : 'modal-sm'
        ].join(' ')
      }, [
        div({
          class: 'modal-content'
        }, [
          form({
            ...schema,
            css: 'modal-body',
            ui: schema.ui || 'info',
            close: 'modal',
            submit: typeof submit != 'function' ? null : Data => 
              Promise.resolve().then(() => submit(Data)).then(response => {
                if (response && typeof response == 'object') {
                  reopen = {
                    title: schema.title,
                    icon: schema.icon,
                    ...response
                  }
                }
                if (isVisible) {
                  M.hide()
                }
              }),
            links: [
              {
                link: link.close,
                icon: 'times',
                title: l.close,
                href: 'modal'
              }
            ]
              .concat(links || [])
              .concat(typeof submit != 'function' ? null : {
                href: null
              })
              .filter(x => x)
          })
        ])
      ])
    ])
  )

  modal.addEventListener('hidden.bs.modal', () => {
    rm(modal)
    isVisible = false
    if (reopen) {
      showModal(reopen)
    }
  })

  document.body.appendChild(modal)

  const M = new bootstrap.Modal(modal)

  var isVisible = true
  var reopen = null
  M.show()
}

export default showModal
