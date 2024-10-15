import wrapper from '../wrapper.js'

export default ({
  title,
  description,
  readOnly,
  update,
  size,
  options,
  value,
  label
}) => wrapper(({input, div, button, text}) => {
  const sanitize = str => str.trim().toUpperCase()

  const max = options.length
  var index = -1
  const O = options.map((item, i) => {
    index = index == -1 && item.value == value ? i : index
    return {
      ...item,
      search: sanitize(item.label),
      hide: false
    }
  })
  var active = index

  const next = n => {
    if (active < 0) {
      for (var i = n < 0 ? max - 1 : 0; i < max && i >= 0; i = i + n) {
        if (!O[i].hide) {
          active = i
          list.children[i].classList.add('active')
          break
        }
      }
    } else {
      for (var i = active + max + n; !O[i % max].active; i = i + n) {
        const j = i % max
        if (!O[j].hide) {
          list.children[active].classList.remove('active')
          list.children[j].classList.add('active')
          active = j
          break
        }
      }
    }
  }

  const select = i => {
    if (i == null) {
      i = active
    }
    if (active != i) {
      if (active >= 0) {
        list.children[active].classList.remove('active')
      }
    }
    if (i >= 0) {
      list.children[i].classList.add('active')
      index = i
      active = index
      update(O[i].value, O[i].label)
      if (max == 1) {
        field.disabled = true
      }
    }
    close()
  }

  const search = query => {
    query = sanitize(query)
    O.forEach((item, i) => {
      item.hide = query && item.search.indexOf(query) < 0
      if (item.hide) {
        list.children[i].classList.add('d-none')
      } else {
        list.children[i].classList.remove('d-none')
      }
    })
  }

  const open = () => {
    field.value = ''
    search('')
    list.classList.remove('d-none')
  }

  const close = () => {
    field.value = index >= 0 ? O[index].label : label
    list.classList.add('d-none')
  }

  const field = 
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
      autocomplete: 'off',
      disabled: readOnly || !options.length ||
        (options.length == 1 && options[0].value == value),
      oninput: () => {
        list.classList.remove('d-none')
        var old = field.value
        setTimeout(() => {
          if (old == field.value) {
            search(field.value)
          }
        }, 500)
      },
      onfocus: () => open(),
      onmousedown: () => list.classList.contains('d-none') ? open() : close(),
      onblur: () => setTimeout(close, 300),
      onkeydown: ev => {
        const key = Allow => Allow.indexOf(ev.key) >= 0

        if (key(['Escape', 'Enter', 'Tab', 'ArrowDown', 'ArrowUp'])) {
          if (list.classList.contains('d-none')) {
            if (key(['Enter', 'ArrowDown', 'ArrowUp'])) {
              open()
              ev.preventDefault()
            }
          } else {
            if (key(['ArrowDown', 'ArrowUp'])) {
              next(key(['ArrowUp']) ? -1 : 1)
              ev.preventDefault()
            } else if (key(['Enter'])) {
              select()
              ev.preventDefault()
            } else if (key(['Tab'])) {
              select()
            } else if (key(['Escape'])) {
              close()
              ev.stopPropagation()
            }
          }
        }
      }
    })

  const list =
    div({
      class: [
        'list-group',
        'd-none',
        'w-100',
        'position-absolute',
        'z-3',
        size == 'sm' ? 'small' : size == 'lg' ? 'fs-5' : ''
      ]
    }, options.map((o, i) => 
      button({
        class: [
          'py-1',
          'list-group-item',
          'list-group-item-action',
          i == active ? 'active' : ''
        ],
        onclick: ev => {
          ev.preventDefault()
          select(i)
        }
      }, [
        text(o.label)
      ])
    ))

  return [field, list]
})
