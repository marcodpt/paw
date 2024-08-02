import wrapper from '../wrapper.js'
import {uid} from '../../../lib.js'

export default ({
  type,
  title,
  description,
  readOnly,
  update,
  size,
  options,
  value
}) => wrapper(({div, input, label, text}) => {
  var noOpt = true
  title = title || uid('radio')
  var id = uid('radio')
  return options.map(o => {
    noOpt = noOpt ? value != o.value : noOpt
    const id = uid('radio')
    return div({
      class: 'form-check'
    }, [
      input({
        class: [
          o.value == value ? 'validate' : '',
          'form-check-input'
        ],
        type: 'radio',
        name: title,
        value: o.value,
        id,
        checked: o.value == value,
        onchange: ev => {
          ev.target.closest('div.form-check').parentNode.querySelectorAll(
            `input[type="radio"][name="${title}"]`
          ).forEach(radio => {
            radio.classList.remove('validate')
          })
          ev.target.classList.add('validate')
          var v = ev.target.value
          if (type == 'integer') {
            v = parseInt(v)
          } else if (type == 'number') {
            v = parseFloat(v)
          }
          const item = options.filter(({value}) => v == value)[0]
          update(v, item ? item.label : ev.target.value)
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
  }).concat(!noOpt ? [] : [
    div({
      class: 'form-check'
    }, [
      input({
        class: 'validate form-check-input',
        type: 'radio',
        name: title,
        value: value,
        id,
        checked: true,
        disabled: true
      }),
      label({
        class: 'form-check-label',
        for: id
      }, [
        text(description || value)
      ]),
      div({
        class: 'invalid-feedback'
      })
    ])
  ])
}, true)
