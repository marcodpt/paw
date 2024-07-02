import wrapper from './wrapper.js'

export default ({
  type,
  title,
  description,
  minimum,
  maximum,
  readOnly,
  update,
  size,
  value
}) => {
  const loader = x => {
    if ((type == 'integer' || type == 'number') && x) {
      return new Date(x < 0 ? x + 1 : x * 1000).toISOString().substr(0, 10)
    } else if (type == 'string' && x) {
      return x.substr(0, 10)
    } else {
      return null
    }
  }

  return wrapper(({input}) => 
    input({
      class: [
        'validate',
        'form-control',
        size ? 'form-control-'+size : ''
      ],
      type: 'date',
      name: title,
      value: loader(value),
      min: loader(minimum),
      max: loader(maximum),
      placeholder: description,
      disabled: readOnly,
      oninput: ev => {
        var x = ev.target.value
        if (type == 'integer' || type == 'number') {
          if (!x) {
            x = 0
          } else {
            var d = new Date(x+'T12:00').getTime() / 1000
            d = d <= 0 ? d-1 : d
            if (type == 'integer') {
              d = Math.round(d)
            }
            x = d
          }
        }
        update(x)
      }
    })
  )
}
