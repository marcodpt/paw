import e from './e.js'
import {linkify, iconify} from './lib.js'
import back from './tags/back.js'

export default ({
  title,
  description,
  fields,
  links
}) => {
  return e(({text, div, legend, label, a}) => div({
    class: 'container my-5'
  }, [
    legend({
      title: description
    }, [
      text(title)
    ])
  ].concat(fields.map(({title, description, data}) =>
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
        class: title == null ? '' : 'col-md-9'
      }, [
        text(data)
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
    ].concat(links.map(({href, link, icon, title, description}) => 
      div({
        class: 'col-auto'
      }, [
        a({
          class: linkify(link),
          title: description,
          href
        }, [
          i({
            class: iconify(icon)
          }),
          text(title)
        ])
      ])
    )))
  ])))
}
