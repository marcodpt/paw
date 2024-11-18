import wrapper from '../wrapper.js'

export default ({
  title,
  description,
  ui,
  readOnly,
  update,
  size,
  value,
  list
}) => wrapper(({input}) => 
  input({
    class: [
      'validate',
      'form-control',
      size ? 'form-control-'+size : ''
    ],
    type: ui || 'text',
    name: title,
    value,
    placeholder: description,
    disabled: readOnly,
    oninput: ev => {
      update(ev.target.value)
    }
  })
, false, list)
