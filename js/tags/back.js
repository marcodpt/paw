import e from '../e.js'
import {lang, link, icon} from '../lib.js'

export default (attr) => {
  const {href} = attr || {}
  const l = lang()
  return e(({a, i, text}) => 
    a({
      class: link.back,
      href: href == null ? 'javascript:history.back()' :
        typeof href == 'function' ? 'javascript:;' : href,
      onclick: typeof href == 'function' ? href : null
    }, [
      i({
        class: icon.back
      }),
      text(' '),
      text(l.back)
    ])
  )
}
