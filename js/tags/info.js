import e from '../e.js'
import fa from '../comp/fa.js'

export default ({
  title,
  description,
  icon,
  hasPending 
}) => {
  const info = e(({span, i, text}) => span({
    title: description
  }, [
    !hasPending ? null : span({
      class: 'spinner-border spinner-border-sm me-2 d-none',
      ariaHidden: 'true'
    }),
    !icon ? null : fa({
      name: icon
    }),
    !icon || !title ? null : text(' '),
    text(title || '')
  ]))

  if (hasPending) {
    info.toggle = pending => {
      info.querySelector('.spinner-border')
        .classList[pending ? 'remove' : 'add']('d-none')
    }
  } else {
    info.toggle = () => {}
  }

  return info
}

