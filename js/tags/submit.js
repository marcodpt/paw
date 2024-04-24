import e from '../e.js'
import tag from '../comp/tag.js'
import {link, lang} from '../lib.js'
import pending from '../tags/pending.js'

const icons = {
  submit: 'check',
  error: 'exclamation'
}

export default X => {
  const l = lang()
  X = X || {}
  const css = typeof X.css == 'string' ? (' '+X.css.trim()) : ''
  const title = l.submit
  var icon = icons.submit
  const btn = e(({button, text}) =>
    button({
      type: 'submit',
      class: link.submit+css,
      setStatus: err => {
        icon = icons.submit
        if (err) {
          btn.disabled = true
          btn.setAttribute('class', link.error+css)
          icon = icons.error
        } else {
          btn.disabled = false
          btn.setAttribute('class', link.submit+css)
        }
        btn.innerHTML = ''
        btn.appendChild(tag({title, icon}))
      },
      run: callback => {
        btn.disabled = true
        const ic = btn.querySelector('i')
        const p = pending()
        ic.replaceWith(p)
        return Promise.resolve()
          .then(() => callback())
          .then(result => {
            btn.disabled = false
            p.replaceWith(tag({
              icon: icons.submit
            }))
            return result
          })
          .catch(err => {
            btn.setAttribute('class', link.error+css)
            p.replaceWith(tag({
              icon: icons.error
            }))
            throw err
          })
      }
    }, [
      tag({icon, title})
    ])
  )

  return btn
}
