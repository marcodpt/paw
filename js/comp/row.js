import e from '../e.js'
import {linkify, iconify, interpolate, parser, getTarget} from '../lib.js'
import output from '../tags/output.js'
import style from '../config/style.js'

export default ({
  css,
  title,
  description,
  close,
  properties,
  links,
  ...schema
}) => {
  const P = properties || {}
  const D = schema.default || {}

  return e(({text, div, label, h5, a, i, button, hr}) => div({
    class: css
  }, [
    !close && !title ? null : div({
      class: 'clearfix'
    }, [
      !title ? null : h5({
        title: description,
        class: 'd-inline'
      }, [
        text(title)
      ]),
      !close ? null : button({
        type: 'button',
        class: 'btn-close float-end',
        onclick: close
      })
    ]),
    !close && !title ? null : hr()
  ].concat(
    div({
      class: 'row'
    }, Object.keys(P).map(k => ({
      ...P[k],
      title: P[k].title == null ? k : P[k].title,
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
        class: `my-1 col-${col || 12}`+(title != null && !col ? ' row' : '')
      }, [
        !title ? null : div({
          class: col ? 'd-inline' : 'col-3'
        }, [
          label({
            class: 'form-label fw-bold',
            title: description
          }, [
            text(title+':')
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
    !links || !links.length ? null : div({
      class: 'row g-2 align-items-center'
    }, (links || []).map(({href, link, icon, title, description}) => 
      div({
        class: 'col-auto'
      }, [
        a({
          class: linkify(link),
          title: description,
          href: typeof href != 'function' ?
            interpolate(href, D) : 'javascript:;',
          onclick: typeof href != 'function' ? null : () => href(D),
          target: getTarget(href)
        }, [
          i({
            class: iconify(icon)
          }),
          text(' '),
          text(title)
        ])
      ])
    ))
  ])))
}
