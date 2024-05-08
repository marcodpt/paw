import e from './e.js'
import ctrl from './ctrl/index.js'
import tag from './tag.js'
import T from './lang/index.js'

export default ({
  css,
  update,
  submit,
  links,
  block,
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
  const Data = schema.default || {}
  const Label = {}
  var Err = K.reduce((E, k) => ({...E, [k]: true}), {})
  var hasErr = false
  var submitter = null
  const run = () => typeof submit != 'function' || hasErr ? null :
    submit(Data, Label)

  links = links instanceof Array ? links :
    typeof submit != 'function' ? [] : [{href: 'submit'}]
  links = links.map(l => {
    l.data = Data
    l.size = size
    if (l.href === 'submit') {
      l.title = l.title == null ? T('submit') : l.title
      l.link = l.link == null ? 'primary' : l.link
      l.icon = l.icon == null ? 'check' : l.icon
      l.href = typeof submit != 'function' ? null : run
      submitter = ctrl(l)
      return submitter
    } else {
      return ctrl(l)
    }
  })

  return e(({
    div,
    form,
    fieldset,
    legend,
    label,
    text,
    button,
    hr
  }) => form({
    class: css,
    style: K.length || !hasAlert ? null : 'max-width: 600px;',
    novalidate: true,
    onsubmit: ev => {
      ev.preventDefault()
      ev.stopPropagation()
      submitter ? submitter.click() : run()
    }
  }, [
    !hasLegend && !K.length && !hasAlert ? null : fieldset({}, [
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
      !K.length ? null : div({
        class: 'row'
      }, K.map(k => ({
        ...P[k],
        name: k,
        title: typeof P[k].title != 'string' ? k : P[k].title,
        default: Data[k] == null ? P[k].default : Data[k],
        data: Data
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
            update: (err, v, label) => {
              Data[name] = v
              Label[name] = label
              Err[name] = !!err
              hasErr = Object.keys(Err).reduce(
                (err, k) => err || Err[k]
              , false)
              if (submitter) {
                submitter.disabled = !!hasErr
              }
              if (typeof update == 'function') {
                update(hasErr, Data, Label)
              }
            }
          })
        ])
      )),
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
      ])
    ]),
    !links.length || (!K.length && !hasAlert) ? null : hr({
      class: 'my-2'
    }),
    !links.length ? null : block ? div({
      class: 'btn-group w-100'
    }, links) : div({
      class: 'row g-1 align-items-center justify-content-'+(
        close == 'modal' ? 'end' :
          (!K.length && !hasAlert) ? 'center' : 'start'
      )
    }, links.map(L => 
      div({
        class: 'col-auto'
      }, [L])
    ))
  ]))
} 
