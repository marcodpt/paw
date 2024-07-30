import wrapper from '../wrapper.js'

export default ({
  title,
  description,
  readOnly,
  update,
  size,
  value
}) => wrapper(({input}) => 
  input({
    class: [
      'validate',
      'form-check-input'
    ],
    type: 'checkbox',
    name: title,
    checked: !!value,
    disabled: readOnly,
    onclick: ev => {
      update(ev.target.checked)
    }
  })
)
