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
  const Data = {...schema.default} || {}
  const Label = {}
  var Err = K.reduce((E, k) => ({...E, [k]: true}), {})
  var hasErr = false
  var submitter = null
  const run = () => typeof submit != 'function' || hasErr ? null :
    submit(Data, Label)
  const ref = {}

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

  const target = e(({
    div,
    form,
    fieldset,
    legend,
    button,
    hr
  }) => form({
    class: css,
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
                if (submitter) {
                  submitter.disabled = !!hasErr
                }
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
          target.querySelector('fieldset').querySelector('.row').appendChild(el)
        }
        ref[k] = el
      })
    }
    target.setProp(P)
  }

  return target
} 
