import e from '../e.js'
import alert from '../tags/alert.js'
import message from './message.js'
import style from '../config/style.js'
import fields from '../tags/fields.js'
import button from '../tags/submit.js'
import {linkify, iconify, interpolate, getTarget} from '../lib.js'

const builder = ({
  css,
  description,
  update,
  ui,
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
          btn.run(() => submit(Data))
            .catch(err => ({
              description: err.toString(),
              error: err,
              ui: 'danger'
            })).then(response => {
              if (response && typeof response == 'object') {
                target.replaceWith(builder({
                  title: schema.title,
                  icon: schema.icon,
                  ...response
                }))
                if (response.error) {
                  throw description
                }
              }
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
      !submit ? null : alert(description, ui || 'info'),
      (links || submit) && (!links || links.length) ? hr() : null,
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

export default builder
