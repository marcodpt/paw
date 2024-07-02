import wrapper from './wrapper.js'
import link from '../link.js'
import opt from '../options.js'

export default ({
  title,
  description,
  readOnly,
  update,
  size,
  value
}) => wrapper(({input, label, text}) => 
  opt('link', true).map(btn => {
    const l = link({
      link: btn,
      title: btn,
      size,
      href: 'javascript:;'
    })
    return [
      input({
        type: 'radio',
        name: title,
        title: description,
        class: 'btn-check',
        id: (title || 'app.radio')+'.'+btn,
        autocomplete: 'off',
        value: btn,
        checked: btn == value,
        disabled: readOnly,
        onclick: ev => {
          update(ev.target.value)
        }
      }),
      label({
        class: l.getAttribute('class')+' me-2',
        for: (title || 'app.radio')+'.'+btn
      }, [
        text(l.textContent)
      ])
    ]
  }).reduce((X, V) => X.concat(V), [])
)
