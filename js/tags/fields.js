import e from '../e.js'
import ctrl from '../tags/ctrl.js'
import style from '../config/style.js'
import tag from '../comp/tag.js'

export default ({
  title,
  description,
  ui,
  icon,
  close,
  properties,
  update,
  delay,
  noValid,
  size,
  col,
  readOnly,
  writeOnly,
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
    text,
    hr,
    button
  }) => fieldset({}, [
    !close && !title && !icon ? null : legend({
      class: 'fw-bold clearfix '+
        (size == 'lg' ? 'fs-4' : size == 'sm' ? 'fs-6' : 'fs-5')
    }, [
      tag({
        icon,
        title,
        description
      }),
      !close ? null : button({
        type: 'button',
        class: 'btn-close float-end',
        onclick: typeof close != 'function' ? null : close,
        dataBsDismiss: typeof close != 'string' ? null : close 
      })
    ]),
    !close && !title && !icon ? null : hr({
      class: 'my-2'
    }),
    !K.length ? null : div({
      class: 'row'
    }, K.map(k => ({
      ...P[k],
      name: k,
      title: typeof P[k].title != 'string' ? k : P[k].title,
      default: D[k] == null ? P[k].default : D[k],
      data: D
    })).map(schema => ({
      delay,
      noValid,
      size,
      col,
      readOnly,
      writeOnly,
      ...schema
    })).map(({title, description, name, col, ...schema}) =>
      div({
        class: `col-${col || 12} `+
          (size == 'lg' ? 'my-3' : size == 'sm' ? 'my-1' : 'my-2')+
          (title ? ' row' : '')+
          (size == 'lg' ? ' fs-5' : size == 'sm' ? ' small' : '')
      }, [
        !title ? null : div({
          class: 'col-md-3'
        }, [
          label({
            class: 'form-label fw-bold',
            title: description
          }, [
            text(title+':')
          ])
        ]),
        ctrl({
          ...schema,
          title: name,
          description: !title ? description : null,
          css: !title ? null : 'col-md-9',
          update: (err, v) => {
            Data[name] = v
            Err[name] = !!err
            if (typeof update == 'function') {
              update(hasErr(), Data)
            }
          }
        })
      ])
    )),
    !ui || !description ? null : div({
      class: 'alert alert-'+ui+' my-0 '+
        (size == 'lg' ? ' fs-5' : size == 'sm' ? ' small' : ''),
      role: 'alert',
      style: style.text
    }, [
      text(description)
    ])
  ]))
}
