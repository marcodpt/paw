import wrapper from '../wrapper.js'

export default ({
  title,
  description,
  readOnly,
  update,
  options,
  size,
  value
}) => wrapper(({input, label, text, uid}) => 
  options.map(o => {
    const id = uid('radio')
    return [
      input({
        type: 'radio',
        name: title,
        title: description,
        class: 'btn-check',
        id,
        autocomplete: 'off',
        value: o.value,
        checked: o.value == value,
        disabled: readOnly,
        onclick: ev => {
          update(ev.target.value)
        }
      }),
      label({
        class: [
          'btn',
          'btn-'+o.value,
          size ? 'btn-'+size : '',
          'me-2'
        ],
        for: id
      }, [
        text(o.label)
      ])
    ]
  }).reduce((X, V) => X.concat(V), [])
)
