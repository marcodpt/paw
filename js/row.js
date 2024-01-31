import e from './e.js'
import {linkify, iconify, interpolate} from './lib.js'
import back from './tags/back.js'
import output from './tags/output.js'
import style from './config/style.js'

export default ({
  title,
  description,
  properties,
  links,
  ...schema
}) => {
  const P = properties || {}
  const D = schema.default || {}

  return e(({text, div, label, h3, a, i}) => div({
    class: 'container my-5'
  }, [
    h3({
      title: description
    }, [
      text(title)
    ])
  ].concat(Object.keys(P).map(k => ({
    ...P[k],
    default: D[k] == null ? P[k].default : D[k],
    href: interpolate(P[k].href, D)
  })).map(({
    title,
    description,
    ...schema
  }) =>
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
      div({
        class: title == null ? '' : 'col-md-9',
        style: style.text
      }, [
        output(schema)
      ])
    ])
  )).concat([
    div({
      class: 'row g-2 align-items-center'
    }, [
      div({
        class: 'col-auto'
      }, [
        back()
      ])
    ].concat((links || []).map(({href, link, icon, title, description}) => 
      div({
        class: 'col-auto'
      }, [
        a({
          class: linkify(link),
          title: description,
          href: interpolate(href, D)
        }, [
          i({
            class: iconify(icon)
          }),
          text(' '),
          text(title)
        ])
      ])
    )))
  ])))
}
