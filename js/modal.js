import e from './e.js'
import alert from './tags/alert.js'
import fields from './tags/fields.js'
import button from './tags/submit.js'
import {link, icon, lang} from './lib.js'

const showModal = ({
  title,
  description,
  update,
  submit,
  ui,
  body,
  ...schema
}) => {
  const l = lang()
  const btn = typeof submit == 'function' ? button() : null
  const K = Object.keys(schema.properties || {})
  var Data = {}
  var err = false

  const modal = e(({div, h5, button, form, text, i}) => 
    div({
      class: 'modal fade',
      tabindex: '-1'
    }, [
      div({
        class: 'modal-dialog'+(K.length ? ' modal-lg' : ' modal-sm')
      }, [
        form({
          class: 'modal-content',
          novalidate: !btn ? null : true,
          onsubmit: !btn ? null : ev => {
            ev.preventDefault()
            ev.stopPropagation()
            if (typeof submit == 'function' && !err) {
              btn.run(() => submit(Data))
                .then(result => !result ? null : ({
                  body: typeof result == 'object' ? result : null,
                  description: typeof result == 'string' ? result : null,
                  ui: 'success'
                })).catch(err => ({
                  description: err.toString(),
                  ui: 'danger'
                })).then(response => {
                  if (response) {
                    modal.addEventListener('hidden.bs.modal', () => {
                      showModal({
                        ...response,
                        title
                      })
                    })
                  }
                  M.hide()
                })
            }
          }
        }, [
          div({
            class: 'modal-header'
          }, [
            h5({
              class: 'modal-title'
            }, [
              text(title)
            ]),
            button({
              type: 'button',
              class: 'btn-close',
              dataBsDismiss: 'modal'
            })
          ]),
          div({
            class: 'modal-body'
          }, [
            body,
            fields({
              ...schema,
              update: (error, data) => {
                Data = data
                err = error
                btn.setStatus(err)
                if (typeof update == 'function') {
                  update(err, Data)
                }
              } 
            }),
            alert(description, ui || 'info')
          ]),
          div({
            class: 'modal-footer'
          }, [
            button({
              type: 'button',
              class: link.close,
              dataBsDismiss: 'modal'
            }, [
              i({
                class: icon.close
              }),
              text(' '+l.close)
            ]),
            typeof submit == 'function' ? btn : null
          ])
        ])
      ])
    ])
  )

  modal.addEventListener('hidden.bs.modal', () => {
    modal.parentNode.removeChild(modal)
  })

  document.body.appendChild(modal)

  const M = new bootstrap.Modal(modal)

  M.show()
}

export default showModal
