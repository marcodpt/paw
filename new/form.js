import e from './e.js'
import {link, icon, lang} from './lib.js'
import back from './tags/back.js'
import input from './tags/input.js'
import alert from './tags/alert.js'
import pending from './tags/pending.js'
import message from './message.js'

export default ({
  title,
  description,
  properties,
  submit,
  ...schema
}) => {
  const l = lang()
  const P = properties || {}
  const D = schema.default || {}
  var Data = {}
  var Err = {}
  const hasErr = () => Object.keys(Err)
    .reduce((err, k) => err || Err[k], false)

  const b = e(({button, i, text}) => button({
    type: 'submit',
    class: link.submit
  }, [
    i({
      class: icon.submit
    }),
    text(' '),
    text(l.submit)
  ]))

  const target = e(({
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
      novalidate: true,
      submit: ev => {
        ev.preventDefault()
        ev.stopPropagation()
        if (typeof submit == 'function' && !hasErr()) {
          b.disabled = true
          const ic = b.querySelector('i')
          ic.replaceWith(pending())
          Promise.resolve()
            .then(() => submit(Data))
            .then(description => target.replaceWith(message({
              title,
              description,
              ui: 'success'
            })))
            .catch(description => target.replaceWith(message({
              title,
              description
            })))
        }
      }
    }, [
      fieldset({}, [
        !title ? null : legend({}, [
          text(title)
        ]),
        alert(description, 'info')
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
          input({
            ...schema,
            title: name,
            default: schema.default,
            css: title == null ? null : 'col-md-9',
            update: (v, err) => {
              Data[name] = v
              Err[name] = !!err
              const ic = b.querySelector('i')
              if (hasErr()) {
                b.disabled = true
                b.setAttribute('class', link.error)
                ic.setAttribute('class', icon.error)
              } else {
                b.disabled = false
                b.setAttribute('class', link.submit)
                ic.setAttribute('class', icon.submit)
              }
            }
          })
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
          }, [b])
        ])
      ]))
    ])
  ]))

  return target
}