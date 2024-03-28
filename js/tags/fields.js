import e from '../e.js'
import ctrl from '../tags/ctrl.js'

export default ({
  title,
  description,
  properties,
  update,
  noValid,
  ...schema
}) => {
  const P = properties || {}
  const K = Object.keys(P)
  const D = schema.default || {}
  var Data = {}
  var Err = K.reduce((E, k) => ({...E, [k]: true}), {})
  const hasErr = () => Object.keys(Err)
    .reduce((err, k) => err || Err[k], false)

  return e(({
    div,
    fieldset,
    legend,
    label,
    text
  }) =>
    fieldset({}, [
      !title ? null : legend({
        title: description
      }, [
        text(title)
      ])
    ].concat(K.map(k => ({
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
        ctrl({
          ...schema,
          noValid: schema.noValid == null ? noValid : schema.noValid,
          title: name,
          description: title == null ? description : null,
          css: title == null ? null : 'col-md-9',
          update: (err, v) => {
            Data[name] = v
            Err[name] = !!err
            if (typeof update == 'function') {
              update(hasErr(), Data)
            }
          }
        })
      ])
    )))
  )
}
