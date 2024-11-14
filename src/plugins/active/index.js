const setClass = (el, attr, fn) =>
  (el.getAttribute(`data-paw-${attr}`) || '').split(' ')
    .map(c => c.trim())
    .filter(c => c).forEach(c => {
      el.classList[fn](c)
    })

export default ({url}) => {
  const hash = '#'+url
  document.body.querySelectorAll([
    '[data-paw-active]',
    '[data-paw-inactive]'
  ].join(', ')).forEach(p => {
    const x = p.closest('[data-paw-path]')
    setClass(p, 'active', 'remove')
    setClass(p, 'inactive', 'add')
  })
  const href = Array.from(
    document.body.querySelectorAll('[data-paw-path] > a[href]')
  ).reduce((v, link) => {
    const href = link.getAttribute('href')
    const l = href.length
    return hash.substr(0, l) == href && l > v.length ? href : v
  }, '')

  const link = document.body
    .querySelector('[data-paw-path] > a[href="'+href+'"]')
  const T = document.body.querySelectorAll('[data-paw-text="current"]')
  const delim = ' | '
  if (href && link) {
    const walk = el => {
      setClass(el, 'active', 'add')
      setClass(el, 'inactive', 'remove')
      Array.from(el.children).forEach(child => {
        if (!child.getAttribute('data-paw-path')) {
          walk(child)
        }
      })
    }

    const Current = []
    var l = link
    while (l = l.closest('[data-paw-path]')) {
      Current.push(l.getAttribute('data-paw-path'))
      walk(l)
      l = l.parentNode
    }
    document.title = Current.concat(
      document.title.split(delim).pop()
    ).filter(item => item).join(delim)
    Current.reverse()
    const current = Current.join(' / ')
    T.forEach(t => {
      t.textContent = current
    })
  } else {
    document.title = document.title.split(delim).pop()
    T.forEach(t => {
      t.textContent = ''
    })
  }
}
