import wrapper from './wrapper.js'

export default ({
  title,
  description,
  readOnly,
  update,
  size,
  value
}) => wrapper(({textarea, text}) => 
  textarea({
    class: [
      'validate',
      'form-control',
      size ? 'form-control-'+size : ''
    ],
    name: title,
    placeholder: description,
    disabled: readOnly,
    rows: 6,
    oninput: ev => {
      update(ev.target.value)
    }
  }, [
    text(value)
  ])
)
