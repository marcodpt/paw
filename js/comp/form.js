import e from '../e.js'
import alert from '../tags/alert.js'
import message from './message.js'
import style from '../config/style.js'
import fields from '../tags/fields.js'
import button from '../tags/submit.js'
import {linkify, iconify, interpolate, getTarget} from '../lib.js'

export default ({
  css,
  description,
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

  const target = e(({
    div,
    form,
    fieldset,
    legend,
    label,
    text,
    i,
    a
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
          btn.run(() => submit(Data))
            .then(result => {
              if (result) {
                target.replaceWith(
                  typeof result == 'object' ? result : message({
                    title: schema.title,
                    description: result,
                    ui: 'success'
                  })
                )
              }
            }).catch(description => {
              target.replaceWith(message({
                title: schema.title,
                description
              }))
              throw description
            })
        }
      }
    }, [
      fields({
        ...schema,
        description,
        update: (error, data) => {
          Data = data
          err = error
          btn.setStatus(err)
          if (typeof update == 'function') {
            update(err, Data)
          }
        } 
      }),
      !submit ? null : alert(description, 'info'),
      !links ? !submit ? null : btn : !links.length ? null : div({
        class: 'row g-2 align-items-center'
      }, (links || []).map(({href, link, icon, title, description}) => 
        div({
          class: 'col-auto'
        }, [
          href == null ? btn : a({
            class: linkify(link)+btnCss,
            title: description,
            href: typeof href == 'string' ?
              interpolate(href, Data) : 'javascript:;',
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
