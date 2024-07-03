import wrapper from './wrapper.js'

export default ({
  title,
  description,
  readOnly,
  update,
  size,
  options,
  value,
  label
}) => {
  const clear = ev => {
    if (ev.target.value) {
      value = ev.target.value
      ev.target.value = ''
    }
  }

  const change = (ev, blur) => {
    const i = options.reduce(
      (p, o, i) => p < 0 && o.label == ev.target.value ? i : p
    , -1)

    if (i >= 0) {
      value = ev.target.value
      update(options[i].value, options[i].label)
      if (options.length == 1) {
        ev.target.disabled = true
      }
    } else if (blur) {
      ev.target.value = value
    }
  }

  const list = `app.data.${title || 'list'}`

  return wrapper(({input, datalist, option, text}) => [
    input({
      class: [
        'validate',
        'form-control',
        size ? 'form-control-'+size : ''
      ],
      type: 'text',
      name: title,
      value: label,
      placeholder: description,
      list,
      disabled: readOnly || !options.length ||
        (options.length == 1 && options[0].value == value),
      oninput: change,
      onfocus: clear,
      onmousedown: clear,
      onblur: ev => change(ev, true)
    }),
    datalist({
      id: list
    }, options.map(o =>
      option({}, [
        text(o.label)
      ])
    ))
  ])
}
