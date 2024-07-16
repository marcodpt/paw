import e from '../../e.js'
import ctrl from '../index.js'

export default ({
  items,
  minItems,
  maxItems,
  readOnly,
  writeOnly,
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
  const addItem = (dflt, i) => {
    i = i == null ? value.length : i
    refs[i] = e(({div}) => 
      div({
        class: size == 'lg' ? 'my-3' : size == 'sm' ? 'my-1' : 'my-2'
      }, [
        ctrl({
          size,
          readOnly,
          writeOnly,
          ...items,
          default: dflt,
          update: (err, v, label) => {
            value[i] = v
            Labels[i] = typeof label != "string" ? String(v) : label
            Errors[i] = err
            if (!Errors.reduce((err, e) => !!(err || e), false)) {
              update(value, Labels.join('\n'))
            }
          }
        })
      ])
    )
    target.appendChild(refs[i])
    dec.disabled = refs.length <= minItems
    inc.disabled = maxItems != null && refs.length >= maxItems
  }

  const dec = ctrl({
    size,
    icon: 'minus',
    link: 'secondary',
    href: () => {
      const i = value.length
      if (i > minItems) {
        value.pop()
        Labels.pop()
        refs[i - 1].parentNode.removeChild(refs[i - 1])
        refs.pop()
      }
    }
  })

  const inc = ctrl({
    size,
    icon: 'plus',
    link: 'secondary',
    href: () => addItem(items.default)
  })

  const target = e(({div}) => 
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
  value.forEach((v, i) => addItem(v, i))

  return target
}
