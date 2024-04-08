import e from '../e.js'
import ctrl from '../tags/ctrl.js'
import {iconify, interpolate} from '../lib.js'

export default ({
  title,
  description,
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
    i,
    text,
    hr,
    button
  }) => fieldset({}, [
    !close && !title && !icon ? null : legend({
      title: description,
      class: 'fw-bold clearfix '+
        (size == 'lg' ? 'fs-4' : size == 'sm' ? 'fs-6' : 'fs-5')
    }, [
      !icon ? null : i({
        class: iconify(icon)
      }),
      text((title && icon ? ' ' : '')+(title || '')),
      !close ? null : button({
        type: 'button',
        class: 'btn-close float-end',
        onclick: typeof close != 'function' ? null : close,
        dataBsDismiss: typeof close != 'string' ? null : close 
      })
    ]),
    !close && !title && !icon ? null : hr(),
    !K.length ? null : div({
      class: 'row'
    }, K.map(k => ({
      ...P[k],
      name: k,
      default: D[k] == null ? P[k].default : D[k],
      href: interpolate(P[k].href, D)
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
          (title != null ? ' row' : '')+
          (size == 'lg' ? ' fs-5' : size == 'sm' ? ' small' : '')
      }, [
        title == null ? null : div({
          class: 'col-md-3'
        }, [
          label({
            class: 'form-label fw-bold',
            title: description
          }, [
            text(title ? title+':' : '')
          ])
        ]),
        ctrl({
          ...schema,
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
    ))
  ]))
}
