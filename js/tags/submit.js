import e from '../e.js'
import {link, icon, lang} from '../lib.js'
import pending from '../tags/pending.js'

export default X => {
  const l = lang()
  X = X || {}
  const css = typeof X.css == 'string' ? (' '+X.css.trim()) : ''
  const btn = e(({button, i, text}) =>
    button({
      type: 'submit',
      class: link.submit+css,
      setStatus: err => {
        const ic = btn.querySelector('i')
        if (err) {
          btn.disabled = true
          btn.setAttribute('class', link.error+css)
          ic.setAttribute('class', icon.error)
        } else {
          btn.disabled = false
          btn.setAttribute('class', link.submit+css)
          ic.setAttribute('class', icon.submit)
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
            p.replaceWith(e(({i}) => i({
              class: icon.submit
            })))
            return result
          })
          .catch(err => {
            btn.setAttribute('class', link.error+css)
            p.replaceWith(e(({i}) => i({
              class: icon.error
            })))
            throw err
          })
      }
    }, [
      i({
        class: icon.submit
      }),
      text(' '),
      text(l.submit)
    ])
  )

  return btn
}
