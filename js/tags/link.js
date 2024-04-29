import e from '../e.js'
import tag from '../comp/tag.js'

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
  var dataBsDismiss = null
  if (href == 'modal') {
    dataBsDismiss = 'modal'
    href = null
  }

  if (isBtn) {
    href = null
  } else if (typeof href != 'string' || !href) {
    href = 'javascript:;'
  } else {
    const X = resolve()
    href = href.replace(/{([^{}]*)}/g, (a, b) => X &&
      (typeof X[b] == 'string' || typeof X[b] == 'number') ? X[b] : a
    )
  }
  const target = typeof href == 'string' && href.indexOf('://') > 0 ?
    '_blank' : null

  const spinner = !run ? null : e(({span}) =>
    span({
      class: 'spinner-border spinner-border-sm',
      ariaHidden: 'true'
    })
  )
  const toggle = pending => {
    btn.classList[pending ? 'add' : 'remove']('disabled')

    if (pending) {
      if (icon) {
        icon.replaceWith(spinner)
      } else {
        btn.prepend(spinner)
      }
    } else {
      if (icon) {
        spinner.replaceWith(icon)
      } else {
        btn.removeChild(spinner)
      }
    }
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

  const btn = e(({button, a, span}) => (isBtn ? button : a)({
    class: link,
    type,
    onclick,
    href,
    dataBsDismiss
  }, [
    tag(extra)
  ])) 
  const icon = btn.querySelector('i')

  return btn
}
