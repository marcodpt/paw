import e from '../e.js'
import style from '../config/style.js'
import fields from '../tags/fields.js'
import button from '../tags/submit.js'
import tag from './tag.js'
import {linkify, interpolate, getTarget} from '../lib.js'

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
  const hasAlert = schema.ui && schema.description
  var Data = schema.default || {}
  var err = false

  var target = e(({
    div,
    form,
    fieldset,
    legend,
    label,
    text,
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
      (links || submit) && (!links || links.length) && (K.length || hasAlert) ?
        hr({
          class: 'my-2'
        }) : null,
      !links ? !submit ? null : btn : !links.length ? null : div({
        class: 'row g-2 align-items-center justify-content-'+
          (schema.close == 'modal' ? 'end' : 'start')
      }, (links || []).map(({href, link, ...meta}) => 
        div({
          class: 'col-auto'
        }, [
          href == null ? btn : a({
            class: linkify(link)+btnCss,
            href: typeof href == 'string' && href != 'modal' ?
              interpolate(href, Data) : 'javascript:;',
            dataBsDismiss: href == 'modal' ? href : null,
            onclick: typeof href != 'function' ? null : () => href(Data),
            target: getTarget(href)
          }, [
            tag(meta)
          ])
        ])
      ))
    ])
  ]))

  return target
} 

export default builder
