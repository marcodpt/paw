import e from './e.js'
import form from './comp/form.js'
import {rm} from './lib.js'
import T from './lang/index.js'

export default ({
  submit,
  links,
  ...schema
}) => new Promise (resolve => {
  var result = null
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
                if (isVisible) {
                  M.hide()
                  result = response
                } else {
                  resolve(response)
                }
              }),
            links: [
              {
                link: 'secondary',
                icon: 'times',
                title: T('close'),
                href: 'modal'
              }
            ]
              .concat(links || [])
              .concat(typeof submit != 'function' ? null : {
                href: 'submit'
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
    resolve(result)
  })

  document.body.appendChild(modal)

  const M = new bootstrap.Modal(modal)

  var isVisible = true
  M.show()
})
