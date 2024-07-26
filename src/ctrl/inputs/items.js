import node from '../../hyperscript/node.js'
import ctrl from '../index.js'

export default ({
  items,
  minItems,
  maxItems,
  readOnly,
  writeOnly,
  noValid,
  update,
  size,
  value
}) => {
  items = items || {}
  value = value instanceof Array ? value : []
  minItems = minItems == null ? 0 : minItems

  const Errors = []
  const refs = []
  const Labels = []

  const change = () => {
    if (!Errors.reduce((err, e) => !!(err || e), false)) {
      update(value, Labels.join('\n'))
    }
    dec.disabled = value.length <= minItems
    inc.disabled = maxItems != null && value.length >= maxItems
  }

  const addItem = (dflt, i) => {
    i = i == null ? value.length : i
    refs[i] = node(({div}) => 
      div({
        class: size == 'lg' ? 'my-3' : size == 'sm' ? 'my-1' : 'my-2'
      }, [
        ctrl({
          size,
          readOnly,
          writeOnly,
          noValid,
          ...items,
          default: dflt,
          update: (err, v, label) => {
            value[i] = v
            Labels[i] = typeof label != "string" ? String(v) : label
            Errors[i] = err
            if (!Errors.reduce((err, e) => !!(err || e), false)) {
              update(value, Labels.join('\n'))
            }
            change()
          }
        })
      ])
    )
    target.appendChild(refs[i])
  }

  const dec = ctrl({
    size,
    icon: 'minus',
    context: 'secondary',
    href: () => {
      const i = value.length
      if (i > minItems) {
        value.pop()
        Labels.pop()
        refs[i - 1].parentNode.removeChild(refs[i - 1])
        refs.pop()
        change()
      }
    }
  })

  const inc = ctrl({
    size,
    icon: 'plus',
    context: 'secondary',
    href: () => addItem(items.default)
  })

  const target = node(({div}) => 
    div({}, [
      div({
        class: 'row g-1 align-items-center justify-content-start'
      }, [
        dec,
        inc
      ].map(btn => 
        div({
          class: 'col-auto'
        }, [
          btn
        ])
      ))
    ])
  )
  change()
  value.forEach((v, i) => addItem(v, i))

  return target
}
