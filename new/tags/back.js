import e from '../e.js'
import {lang, link, icon} from '../lib.js'

export default () => {
  const l = lang()
  return e(({a, i, text}) => 
    a({
      class: link.back,
      href: 'javascript:history.back()'
    }, [
      i({
        class: icon.back
      }),
      text(' '),
      text(l.back)
    ])
  )
}
