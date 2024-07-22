import e from './html/e.js'

const faIcon = icon => !icon || typeof icon != 'string' ? '' : 
    icon.substr(0, 1) == '@' ? `fa-brands fa-${icon.substr(1)}` :
      `fa-solid fa-${icon}`

export default ({
  title,
  description,
  icon 
}) => e(({span, i, text}) => {
  const children = [
    !icon ? null : i({
      class: faIcon(icon)
    }),
    !icon || !title ? null : text(' '),
    !title ? null : text(title)
  ].filter(c => c != null)

  const n = children.length
  const e = !n ? text('') :
    n == 1 && (icon || !description) ? children[0] : span({
      title: description || null
    }, children)

  if (children.length == 1 && icon && description) {
    e.setAttribute('title', description)
  }

  return e
})

