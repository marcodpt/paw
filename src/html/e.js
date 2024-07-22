import tags from './tags.js'

const camelToKebab = string => string
  .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
  .toLowerCase()

const h = (tagName, attributes, children) => {
  const e = document.createElement(tagName)

  Object.keys(attributes || {}).forEach(key => {
    const v = attributes[key]
    const k = camelToKebab(key)
    if (typeof v == 'function') {
      if (k.substr(0, 2) == 'on') {
        e.addEventListener(k.substr(2), v)
      } else {
        e[key] = (...args) => v(e, ...args)
      }
    } else if (typeof v === 'string' || typeof v === 'number') {
      e.setAttribute(k, v)
    } else if (k === 'style' && v && typeof v === 'object') {
      const style = Object.keys(v).reduce((style, k) => {
        if (typeof v[k] == 'number' || typeof v[k] == 'string') {
          const s = String(v[k]).trim()
          if (s) {
            style += (style ? '; ' : '')+camelToKebab(k)+': '+s
          }
        }
        return style
      }, "")

      if (style) {
        e.setAttribute('style', style)
      }
    } else if (k === 'class' && (v instanceof Array)) {
      const css = v
        .filter(c => typeof c == "string")
        .map(c => c.trim())
        .filter(c => c)
        .join(" ")

      if (css) {
        e.setAttribute('class', css)
      }
    } else if (v === true) {
      e.setAttribute(k, '')
    }
  })

  if (children instanceof Array) {
    children.filter(c => c).forEach(child => e.appendChild(child))
  }

  return e
}

const Tags = {
  text: str => document.createTextNode(
    typeof str === 'string' ? str :
    str === undefined ? '' : 
    typeof str === 'function' ? str.toString() : 
      JSON.stringify(str, undefined, 2)
  )
}

Object.keys(tags)
  .filter(tag => tags[tag].tags.indexOf('body') >= 0)
  .forEach(tag => {
    Tags[tag] = tags[tag].tags.indexOf('self-closing') >= 0 ?
      attributes => h(tag, attributes) :
      (attributes, children) => h(tag, attributes, children)
  })

export default el => el(Tags)
