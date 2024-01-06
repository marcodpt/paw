<div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>

import e from '../e.js'
import {lang, link, icon} from '../lib.js'

export default () => {
  const l = lang()
  return e(({div, span, text}) => 
    a({
      class: link.back,
      href: 'javascript:history.back()'
    }, [
      i({
        class: icon.back
      }),
      text(l.back)
    ])
  )
}
