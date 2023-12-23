import e from './e.js'
import {link, icon, lang} from './lib.js'
import back from './tags/back.js'

export default ({
  title,
  description,
  fields
}) => {
  const l = lang()

  return e(({div, form, fieldset, legend, label, input, button, text}) => div({
    class: 'container my-5'
  }, [
    form({
      novalidate: true
    }, [
      fieldset({}, [
        !title ? null : legend({}, [
          text(title)
        ]),
        !description ? null : div({
          class: 'alert alert-info',
          role: 'alert',
          style: 'white-space: pre-wrap;'
        }, [
          text(description)
        ])
      ].concat(fields.map(({title, description, name, value}) =>
        div({
          class: 'my-3'+(title != null ? ' row' : '')
        }, [
          title == null ? null : div({
            class: 'col-md-3'
          }, [
            label({
              class: 'form-label',
              title: description
            }, [
              text(title)
            ])
          ])
        ]),
        div({
          class: title == null ? null : 'col-md-9'
        }, [
          input({
            class: 'form-control',
            name,
            value
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      ))).concat([
        div({
          class: 'row g-2 align-items-center'
        }, [
          div({
            class: 'col-auto'
          }, [
            back()
          ]),
          div({
            class: 'col-auto'
          }, [
            button({
              type: 'submit',
              class: link.submit
            }, [
              i({
                class: icon.submit
              }),
              text(l.submit)
            ])
          ])
        ])
      ])
    ])
  ]))
}
