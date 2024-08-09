import {node} from '../../components.js'
import opt from '../options.js'

const faIcon = icon => !icon || typeof icon != 'string' ? '' : 
    icon.substr(0, 1) == '@' ? `fa-brands fa-${icon.substr(1)}` :
      `fa-solid fa-${icon}`

export default ({
  title,
  description,
  icon,
  size,
  context
}) => node(({div, span, i, text, p, pre, ...h}) => {
  size = ['lg', 'sm'].indexOf(size) < 0 ? '' : size
  context = opt('context', true).indexOf(context) >= 0 ? context : ''
  const css = (size == 'lg' ? ' fs-5' : size == 'sm' ? ' small' : '')

  const children = [
    !icon ? null : i({
      class: faIcon(icon)
    }),
    !icon || !title ? null : text(' '),
    !title ? null : text(title)
  ].filter(c => c != null)

  var e = null
  if (context) {
    if (description) {
      e = div({
        class: [
          'alert',
          'alert-'+context,
          'my-0',
          css
        ],
        role: 'alert'
      }, [
        !children.length ? null :
          h[size == 'lg' ? 'h3' : size == 'sm' ? 'h5' : 'h4']({
            class: 'alert-heading'
          }, children),
        span({
          style: {
            whiteSpace: 'pre-wrap'
          }
        }, [
          text(description)
        ])
      ])
    } else if (children.length) {
      e = span({
        class: [
          'badge',
          'text-bg-'+context,
          css
        ]
      }, children)
    }
  }

  if (e == null) {
    const n = children.length
    e = !n ? text('') :
      n == 1 && (icon || !description) ? children[0] : span({
        title: description || null
      }, children)

    if (children.length == 1 && icon && description) {
      e.setAttribute('title', description)
    }
  }

  return e
})

