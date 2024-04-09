import e from '../e.js'
import style from '../config/style.js'
import fields from '../tags/fields.js'
import button from '../tags/submit.js'
import {linkify, iconify, interpolate, getTarget} from '../lib.js'

const builder = ({
  css,
  update,
  submit,
  links,
  ...schema
}) => {
  const btnCss = ['lg', 'sm'].indexOf(schema.size) >= 0 ?
    ' btn-'+schema.size : ''
  const btn = button({
    css: (links == null ? 'w-100' : '')+btnCss
  })
  const K = Object.keys(schema.properties || {})
  var Data = schema.default || {}
  var err = false

  var target = e(({
    div,
    form,
    fieldset,
    legend,
    label,
    text,
    i,
    a,
    hr
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
          btn.run(() => submit(Data)).then(response => {
            if (response && typeof response == 'object') {
              const r = builder({
                title: schema.title,
                icon: schema.icon,
                ...response
              })
              target.replaceWith(r)
              target = r
            } else if (typeof response == 'function') {
              response()
            }
          })
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
      (links || submit) && (!links || links.length) ? hr() : null,
      !links ? !submit ? null : btn : !links.length ? null : div({
        class: 'row g-2 align-items-center justify-content-'+
          (schema.close == 'modal' ? 'end' : 'start')
      }, (links || []).map(({href, link, icon, title, description}) => 
        div({
          class: 'col-auto'
        }, [
          href == null ? btn : a({
            class: linkify(link)+btnCss,
            title: description,
            href: typeof href == 'string' && href != 'modal' ?
              interpolate(href, Data) : 'javascript:;',
            dataBsDismiss: href == 'modal' ? href : null,
            onclick: typeof href != 'function' ? null : () => href(Data),
            target: getTarget(href)
          }, [
            i({
              class: iconify(icon)
            }),
            text(' '),
            text(title || '')
          ])
        ])
      ))
    ])
  ]))

  return target
} 

export default builder
