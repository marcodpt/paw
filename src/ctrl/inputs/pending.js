import wrapper from './wrapper.js'

export default ({
  title,
  size
}) => wrapper(({input}) => 
  input({
    class: [
      'form-control',
      size ? 'form-control-'+size : '',
      'text-center'
    ],
    type: 'text',
    name: title,
    value: '⏳',
    disabled: true
  })
, true)
