import wrapper from '../wrapper.js'

export default ({
  type,
  title,
  description,
  ui,
  minimum,
  maximum,
  readOnly,
  update,
  size,
  value,
  list
}) => {
  var step = type == 'integer' ? 1 : null
  var fixed = 0

  if (/^num\.[1-9][0-9]*$/.test(ui)) {
    fixed = parseInt(ui.substr(4))
    step = type == 'integer' || fixed ? 1 / (10 ** fixed) : null
  }

  const isNum = x =>
    x != null && typeof x != 'boolean' && x !== '' && !isNaN(x)

  const loader = x => {
    if (!isNum(x)) {
      return x
    }
    x = parseFloat(type == 'integer' ? x * step : x)
    if (fixed) {
      x = x.toFixed(fixed)
    }
    return x
  }

  return wrapper(({input}) => 
    input({
      class: [
        'validate',
        'form-control',
        size ? 'form-control-'+size : ''
      ],
      type: 'number',
      name: title,
      value: loader(value),
      min: loader(minimum),
      max: loader(maximum),
      step: fixed && step ? step.toFixed(fixed) : step,
      placeholder: description,
      disabled: readOnly,
      oninput: ev => {
        var x = ev.target.value
        if (isNum(x)) {
          x = type == 'integer' ?
            parseInt(Math.round(x / step)) : 
            parseFloat(x)
        }

        update(x)
      }
    })
  , false, list)
}
