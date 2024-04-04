import e from './e.js'
import alert from './tags/alert.js'
import fields from './tags/fields.js'
import button from './tags/submit.js'
import {link, icon as ic, iconify, lang, rm} from './lib.js'

const showModal = ({
  icon,
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
                        title,
                        icon,
                        ...response
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
              !icon ? null : i({
                class: iconify(icon)
              }),
              text((title && icon ? ' ' : '')+(title || ''))
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
                if (btn) {
                  btn.setStatus(err)
                }
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
                class: ic.close
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
    rm(modal)
  })

  document.body.appendChild(modal)

  const M = new bootstrap.Modal(modal)

  M.show()
}

export default showModal
