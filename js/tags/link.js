import e from '../e.js'
import info from './info.js'

const links = [
  'link',
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark'
]

const refs = {
  submit: 'primary'
}

export default ({
  link,
  href,
  size,
  data,
  ...extra
}) => {
  const isBtn = typeof href == "boolean" || typeof href == 'function'
  const type = href === true ? 'submit' : isBtn ? 'button' : null
  const isDisabled = !href
  const msg = info({
    ...extra,
    hasPending: typeof href == 'function'
  })
  size = ['lg', 'sm'].indexOf(size) < 0 ? '' : size
  link = links.indexOf(link) >= 0 ? link :
    isBtn ? 'primary' :
      size ? 'link' : ''
  link = link ? 'btn btn-'+link+(size ? ' btn-'+size : '') : ''

  if (isDisabled) {
    link += ' disabled'
  }
  const run = typeof href == 'function' ? href : null
  const resolve = () => typeof data == 'function' ? data() : data
  href = !isBtn ? interpolate(href, resolve()) || 'javascript:;' : null
  const target = typeof href == 'string' && href.indexOf('://') > 0 ?
    '_blank' : null
  const toggle = pending => {
    btn.classList[pending ? 'add' : 'remove']('disabled')
    msg.toggle(pending)
  }
  const onclick = !run ? null : () => {
    Promise.resolve().then(() => {
      toggle(true)
      return run(resolve())
    }) .then(res => {
      toggle(false)
    }).catch(err => {
      toggle(false)
      throw err
    })
  }

  const btn = e(({button, a}) => (isBtn ? button : a)({
    class: link,
    type,
    onclick,
    href
  }, [msg])) 

  return btn
}
