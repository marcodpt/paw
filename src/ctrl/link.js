import e from '../e.js'
import tag from '../tag.js'
import opt from './options.js'

export default ({
  link,
  href,
  size,
  data,
  description,
  ...extra
}) => {
  const isBtn = typeof href != 'string'
  const type = isBtn ? 'button' : null
  const isDisabled = !href
  size = ['lg', 'sm'].indexOf(size) < 0 ? '' : size
  link = opt('link', true).indexOf(link) >= 0 ? link :
    isBtn ? 'primary' :
      size ? 'link' : ''
  link = (link ? 'btn btn-'+link+(size ? ' btn-'+size : '') : '')+
    (isDisabled ? ' disabled' : '')

  const run = typeof href == 'function' ? href : null
  const resolve = () => typeof data == 'function' ? data() : data

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
      if (res && typeof res == 'object' && res.name && res.data) {
        const {name, data} = res
        const link = document.createElement("a")
        link.setAttribute('href',
          'data:text/plain;charset=utf-8,'+encodeURIComponent(data)
        ) 
        link.setAttribute('download', name)

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }).catch(err => {
      toggle(false)
      throw err
    })
  }

  const btn = e(({button, a, span}) => (isBtn ? button : a)({
    class: link || null,
    title: description || null,
    type,
    onclick,
    href,
    target
  }, [
    tag(extra)
  ])) 
  const icon = btn.querySelector('i')

  return btn
}
