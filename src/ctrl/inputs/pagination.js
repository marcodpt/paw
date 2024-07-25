import node from '../../hyperscript/node.js'
import ctrl from '../index.js'

export default ({
  description,
  update,
  minimum,
  maximum,
  link,
  ...schema
}) => {
  link = link || 'secondary'
  minimum = minimum == null ? 1 : minimum
  maximum = maximum == null ? 0 : maximum
  description = description || ''
  var value = schema.default
  const size = schema.size

  const options = []
  for (var i = minimum; i <= maximum; i++) {
    options.push(({
      value: i,
      label: `${description} (${i} / ${maximum})`.trim()
    }))
  }

  const pending = !options.length

  const first = ctrl({
    href: pending ? false : () => setPage(minimum),
    link,
    size,
    icon: 'fast-backward'
  })

  const previous = ctrl({
    href: pending ? false : () => setPage(value - 1),
    link,
    size,
    icon: 'step-backward'
  })

  const next = ctrl({
    href: pending ? false : () => setPage(value + 1),
    link,
    size,
    icon: 'step-forward'
  })

  const last = ctrl({
    href: pending ? false : () => setPage(maximum),
    link,
    size,
    icon: 'fast-forward'
  })

  const setPage = (v, preserve) => {
    value = v < minimum ? minimum : v > maximum ? maximum : v

    first.disabled = value <= minimum
    previous.disabled = value <= minimum
    next.disabled = value >= maximum
    last.disabled = value >= maximum

    if (!preserve) {
      const el = ctrl({
        ...schema,
        options,
        ui: 'typeahead',
        default: value,
        update: (err, v) => {
          if (!err) {
            setPage(v, true)
          }
        }
      })
      if (pager != null) {
        pager.replaceWith(el)
      }
      pager = el
    } else {
      update(value)
    }

  }

  var pager = null
  if (pending) {
    pager = ctrl({
      ...schema,
      ui: 'pending'
    })
  } else {
    setPage(schema.default)
  }

  return node(({div}) =>
    div({
      class: 'row gx-1 justify-content-center'
    }, [
      first,
      previous,
      pager,
      next,
      last
    ].map(el => 
      div({
        class: 'col-auto'
      }, [
        el
      ])
    ))
  )
}
