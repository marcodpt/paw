import e from '../e.js'
import {linkify, iconify, interpolate, parser} from '../lib.js'
import btnBack from '../tags/back.js'
import output from '../tags/output.js'
import style from '../config/style.js'

export default ({
  title,
  description,
  close,
  back,
  properties,
  links,
  ...schema
}) => {
  const P = properties || {}
  const D = schema.default || {}

  return e(({text, div, label, h5, a, i, button}) => div({
    class: 'container my-5'
  }, [
    !close ? null : button({
      type: 'button',
      class: 'btn-close float-start me-3',
      onclick: close
    }),
    !title ? null : h5({
      title: description
    }, [
      text(title)
    ])
  ].concat(
    div({
      class: 'row'
    }, Object.keys(P).map(k => ({
      ...P[k],
      default: parser(P[k])(D[k] == null ? P[k].default : D[k]),
      href: typeof P[k].href == 'function' ?
        P[k].href(D) : interpolate(P[k].href, D)
    })).map(({
      title,
      description,
      col,
      ...schema
    }) =>
      div({
        class: `my-2 col-${col || 12}`+(title != null && !col ? ' row' : '')
      }, [
        title == null ? null : div({
          class: col ? 'd-inline' : 'col-3'
        }, [
          label({
            class: 'form-label',
            title: description
          }, [
            text(title)
          ])
        ]),
        col ? text(' ') : null,
        div({
          class: col ? 'd-inline' : title == null ? '' : 'col-9',
          style: style.text
        }, [
          output(schema)
        ])
      ])
    ))
  ).concat([
    (close || back === false) && (!links || !links.length) ? null : div({
      class: 'row g-2 align-items-center'
    }, [
      (close || back === false) ? null : div({
        class: 'col-auto'
      }, [
        btnBack({
          href: back
        })
      ])
    ].concat((links || []).map(({href, link, icon, title, description}) => 
      div({
        class: 'col-auto'
      }, [
        a({
          class: linkify(link),
          title: description,
          href: typeof href != 'function' ?
            interpolate(href, D) : 'javascript:;',
          onclick: typeof href != 'function' ? null : () => href(D)
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
