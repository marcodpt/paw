import e from '../../e.js'
import ctrl from '../index.js'
import tag from '../../tag.js'

export default ({
  update,
  properties,
  title,
  description,
  ui,
  icon,
  close,
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
  const hasAlert = ui && description
  const hasLegend = close || title || icon
  const Data = {...schema.default} || {}
  const Label = {}
  var Err = K.reduce((E, k) => ({...E, [k]: true}), {})
  var hasErr = false
  const ref = {}

  const target = e(({
    div,
    fieldset,
    legend,
    button,
    hr,
    text
  }) => !hasLegend && !K.length && !hasAlert ? text('') : fieldset({}, [
    !hasLegend ? null : legend({
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
    !hasLegend ? null : hr({
      class: 'my-2'
    }),
    !hasAlert ? null : div({
      class: 'alert alert-'+ui+' my-0 '+
        (size == 'lg' ? ' fs-5' : size == 'sm' ? ' small' : ''),
      role: 'alert'
    }, [
      ctrl({
        type: 'string',
        ui: 'text',
        default: description,
        readOnly: true
      })
    ]),
    !K.length ? null : div({
      class: 'row'
    })
  ]))

  if (K.length) {
    target.setProp = P => {
      var done = false
      const K = Object.keys(P)
      K.forEach((k, index) => {
        done = K.length - 1 == index
        if (P[k] == null) {
          ref[k]?.parentNode.removeChild(ref[k])
          delete Data[k]
          delete Label[k]
          delete Err[k]
          return
        }

        /*if (P[k].default !== undefined && Data[k] !== undefined) {
          delete Data[k]
        }*/

        col = P[k].col || col
        const {title, description, ...schema} = {
          delay,
          noValid,
          size,
          readOnly,
          writeOnly,
          ...P[k],
          title: typeof P[k].title != 'string' ? k : P[k].title,
          default: Data[k] == null ? P[k].default : Data[k],
          data: Data
        }
        const el = e(({
          div,
          label,
          text,
          button,
        }) =>
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
              title: k,
              description: !title ? description : null,
              css: !title ? null : 'col-md-9',
              update: (err, v, label) => {
                label = typeof label != 'string' ? String(v) : label
                Data[k] = v
                Label[k] = label
                Err[k] = !!err
                hasErr = Object.keys(Err).reduce(
                  (err, k) => err || Err[k]
                , false)
                if (typeof update == 'function' && done) {
                  update(hasErr, Data, Label, target)
                }
              }
            })
          ])
        )

        if (ref[k] != null) {
          ref[k].replaceWith(el)
        } else {
          target.querySelector('.row').appendChild(el)
        }
        ref[k] = el
      })
    }
    target.setProp(P)
  }

  return target
} 
