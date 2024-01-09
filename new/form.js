import e from './e.js'
import {link, icon, lang} from './lib.js'
import back from './tags/back.js'
import input from './tags/input.js'

export default ({
  title,
  description,
  properties,
  ...schema
}) => {
  const l = lang()
  const P = properties || {}
  const D = schema.default || {}

  return e(({
    div,
    form,
    fieldset,
    legend,
    label,
    button,
    text,
    i
  }) => div({
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
      ].concat(Object.keys(P).map(k => ({
        ...P[k],
        name: k,
        default: D[k] == null ? P[k].default : D[k]
      })).map(({title, description, name, ...schema}) =>
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
          ]),
          div({
            class: title == null ? null : 'col-md-9'
          }, [
            input({
              ...schema,
              title: name,
              default: schema.default
            }),
            div({
              class: 'invalid-feedback'
            })
          ])
        ])
      )).concat([
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
      ]))
    ])
  ]))
}
