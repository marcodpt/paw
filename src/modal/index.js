import {node, form} from '../components.js'
import {rm} from '../lib.js'

var M = null
export default ({
  submit,
  ...schema
}) => new Promise (resolve => {
  var result = null
  const modal = node(({div}) => 
    div({
      class: 'modal fade',
      tabindex: '-1',
      dataBsFocus: 'false'
    }, [
      div({
        class: [
          'modal-dialog',
          Object.keys(schema.properties || {}).length ? 'modal-xl' : 'modal-sm'
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
            submit: typeof submit != 'function' ? null : (Data, Label) => 
              Promise.resolve()
                .then(() => submit(Data, Label))
                .then(response => {
                  if (M) {
                    M.hide()
                    result = response
                  } else {
                    resolve(response)
                  }
                })
          })
        ])
      ])
    ])
  )

  modal.addEventListener('hidden.bs.modal', () => {
    rm(modal)
    M = null
    resolve(result)
  })

  if (M) {
    M.hide()
  }
  document.body.appendChild(modal)
  M = new bootstrap.Modal(modal)
  M.show()

  return modal
})
