import e from '../e.js'
import tag from '../comp/tag.js'
import pending from '../tags/pending.js'
import link from './link.js'
import T from '../lang/index.js'

export default X => {
  X = X || {}
  const css = typeof X.css == 'string' ? (' '+X.css.trim()) : ''
  const btn = link({
    title: T('submit'),
    link: 'primary',
    icon: 'check',
    href: true
  })
  btn.setAttribute('class', btn.getAttribute('class')+css)
  btn.setStatus = err => btn.disabled = !!err
  btn.run = callback => {
    btn.disabled = true
    const ic = btn.querySelector('i')
    const p = pending()
    ic.replaceWith(p)
    return Promise.resolve()
      .then(() => callback())
      .then(result => {
        btn.disabled = false
        p.replaceWith(ic)
        return result
      })
      .catch(err => {
        btn.disabled = false
        p.replaceWith(ic)
        throw err
      })
  }

  return btn
}
