import wrapper from '../wrapper.js'

export default ({
  type,
  title,
  description,
  readOnly,
  update,
  size,
  options,
  value
}) => {
  var noOpt = true
  return wrapper(({select, option, text}) =>
    select({
      class: [
        'validate',
        'form-control',
        size ? 'form-control-'+size : ''
      ],
      name: title,
      disabled: readOnly || !options.length ||
        (options.length == 1 && options[0].value == value),
      onchange: ev => {
        if (options.length == 1) {
          ev.target.disabled = true
        }
        var v = ev.target.value
        if (type == 'integer') {
          v = parseInt(v)
        } else if (type == 'number') {
          v = parseFloat(v)
        }
        const item = options.filter(({value}) => v == value)[0]
        update(v, item ? item.label : ev.target.value)
      },
    }, options.map(o => {
      noOpt = noOpt ? value != o.value : noOpt
      return option({
        value: o.value,
        selected: value == o.value
      }, [
        text(o.label)
      ])
    }).concat(!noOpt ? [] : [
      option({
        value: value,
        disabled: true,
        selected: true
      }, [
        text(description || value)
      ])
    ]))
  )
}
