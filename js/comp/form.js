import e from '../e.js'
import alert from '../tags/alert.js'
import message from './message.js'
import style from '../config/style.js'
import fields from '../tags/fields.js'
import button from '../tags/submit.js'

export default ({
  css,
  description,
  update,
  submit,
  links,
  ...schema
}) => {
  const btn = button()
  const K = Object.keys(schema.properties || {})
  var Data = {}
  var err = false

  const target = e(({
    div,
    form,
    fieldset,
    legend,
    label,
    text,
    i
  }) => div({
    class: css,
    style: K.length ? null : style.alert
  }, [
    form({
      novalidate: true,
      onsubmit: ev => {
        ev.preventDefault()
        ev.stopPropagation()
        if (typeof submit == 'function' && !err) {
          btn.run(() => submit(Data))
            .then(result => {
              if (result) {
                target.replaceWith(
                  typeof result == 'object' ? result : message({
                    title: schema.title,
                    description: result,
                    ui: 'success'
                  })
                )
              }
            }).catch(description => target.replaceWith(message({
              title: schema.title,
              description
            })))
        }
      }
    }, [
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
      alert(description, 'info'),
      !submit ? null : div({
        class: 'row g-2 align-items-center'
      }, [
        div({
          class: 'col-auto'
        }, [btn])
      ])
    ])
  ]))

  return target
}
