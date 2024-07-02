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
    value = ev.target.value
    ev.target.value = ''
  }

  const change = (ev, blur) => {
    const i = options.reduce(
      (p, o, i) => p < 0 && o.label == ev.target.value ? i : p
    , -1)

    if (i >= 0) {
      value = ev.target.value
      update(options[i].value, options[i].label)
    } else if (blur) {
      ev.target.value = value
    }
  }

  const list = `app.data.${title || 'list'}`

  return wrapper(({input, datalist, option}) => [
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
      disabled: readOnly || options.length <= 1,
      oninput: change,
      onfocus: clear,
      onmousedown: clear,
      onblur: ev => change(ev, true)
    }),
    datalist({
      id: list
    }, options.map(o =>
      option({
        value: o.label
      })
    ))
  ])
}
