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
  if (href && link) {
    const Current = []
    var l = link
    while (l = l.closest('[data-paw-path]')) {
      Current.push(l.getAttribute('data-paw-path'))
      let p = l.getAttribute('data-paw-active') ? l :
        l.querySelector('[data-paw-active]')
      if (p) {
        setClass(p, 'active', 'add')
        setClass(p, 'inactive', 'remove')
      }
      p = l.getAttribute('data-paw-inactive') ? l :
        l.querySelector('[data-paw-inactive]')
      if (p) {
        setClass(p, 'active', 'add')
        setClass(p, 'inactive', 'remove')
      }
      l = l.parentNode
    }
    const d = ' | '
    document.title = Current.concat(document.title.split(d).pop()).join(d)
    Current.reverse()
    const current = Current.join(' / ')
    T.forEach(t => {
      t.textContent = current
    })
  } else {
    T.forEach(t => {
      t.textContent = ''
    })
  }
}
