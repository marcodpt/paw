import wrapper from '../wrapper.js'
import {uid} from '../../../lib.js'

export default ({
  type,
  ui,
  title,
  description,
  readOnly,
  update,
  size,
  options,
  value
}) => wrapper(({div, input, label, text}) => {
  value = value instanceof Array ? value : []
  return options.map((o, i) => {
    const id = uid('checkbox')
    return div({
      class: [
        'form-check',
        ui == 'switch' ? 'form-switch' : ''
      ]
    }, [
      input({
        class: [
          !i ? 'validate' : '',
          'form-check-input'
        ],
        type: 'checkbox',
        name: title,
        value: o.value,
        id,
        checked: value.indexOf(o.value) >= 0,
        onclick: ev => {
          ev.target.closest('div.form-check').parentNode.querySelectorAll(
            `input[type="checkbox"]`
          ).forEach(checkbox => {
            checkbox.classList.remove('validate')
          })
          ev.target.classList.add('validate')
          var v = ev.target.value
          options.forEach(o => {
            if (o.value == v) {
              v = o.value
            }
          })
          const index = value.indexOf(v)
          if (index < 0) {
            value.push(v)
          } else {
            value.splice(index, 1)
          }
          const itens = options.filter(o => value.indexOf(o.value) >= 0)
          value = itens.map(({value}) => value)
          update(value, itens.map(({label}) => label).join('\n'))
        }
      }),
      label({
        class: 'form-check-label',
        for: id
      }, [
        text(o.label)
      ]),
      div({
        class: 'invalid-feedback'
      })
    ])
  })
}, true)
