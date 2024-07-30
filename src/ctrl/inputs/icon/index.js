import tag from '../../../tag.js'
import wrapper from '../wrapper.js'

export default ({
  title,
  description,
  readOnly,
  update,
  size,
  value
}) => wrapper(({div, span, input}) => 
  div({
    class: 'input-group'
  }, [
    span({
      class: 'input-group-text'
    }, [
      tag({
        icon: value
      })
    ]),
    input({
      class: [
        'validate',
        'form-control',
        size ? 'form-control-'+size : ''
      ],
      type: 'text',
      name: title,
      placeholder: description,
      disabled: readOnly,
      value,
      oninput: ev => {
        const ref = ev.target.closest('.input-group')
          .querySelector('.input-group-text')

        ref.innerHTML = ''
        ref.appendChild(tag({
          icon: ev.target.value
        }))

        update(ev.target.value)
      }
    })
  ])
)
