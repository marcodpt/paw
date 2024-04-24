import e from '../e.js'
import fa from '../comp/fa.js'
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
  const btn = e(({button, text}) =>
    button({
      type: 'submit',
      class: link.submit+css,
      setStatus: err => {
        const ic = btn.querySelector('i')
        if (err) {
          btn.disabled = true
          btn.setAttribute('class', link.error+css)
          ic.replaceWith(fa({
            name: icons.error
          }))
        } else {
          btn.disabled = false
          btn.setAttribute('class', link.submit+css)
          ic.replaceWith(fa({
            name: icons.submit
          }))
        }
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
            p.replaceWith(fa({
              name: icons.submit
            }))
            return result
          })
          .catch(err => {
            btn.setAttribute('class', link.error+css)
            p.replaceWith(fa({
              name: icons.error
            }))
            throw err
          })
      }
    }, [
      fa({
        name: icons.submit
      }),
      text(' '),
      text(l.submit)
    ])
  )

  return btn
}
