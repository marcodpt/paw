import e from '../e.js'
import {link, icon, lang} from '../lib.js'
import pending from '../tags/pending.js'

export default () => {
  const l = lang()
  const btn = e(({button, i, text}) =>
    button({
      type: 'submit',
      class: link.submit,
      setStatus: err => {
        const ic = btn.querySelector('i')
        if (err) {
          btn.disabled = true
          btn.setAttribute('class', link.error)
          ic.setAttribute('class', icon.error)
        } else {
          btn.disabled = false
          btn.setAttribute('class', link.submit)
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
            btn.setAttribute('class', link.error)
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
