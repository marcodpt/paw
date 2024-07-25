import tags from './tags.js'

const camelToKebab = string => string
  .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
  .toLowerCase()

const resolveAttrs = attributes => Object.keys(attributes || {})
  .reduce((A, key) => {
    var v = attributes[key]
    const k = camelToKebab(key)

    if (k === 'style') {
      if (v && typeof v === 'object') {
        v = Object.keys(v).reduce((style, k) => {
          if (typeof v[k] == 'number' || typeof v[k] == 'string') {
            const s = String(v[k]).trim()
            if (s) {
              style += (style ? '; ' : '')+camelToKebab(k)+': '+s
            }
          }
          return style
        }, "")
      } else if (typeof v === 'string') {
        v = v
          .split(';')
          .map(s => s.trim())
          .filter(s => s && s.indexOf(':') > 0)
          .join('; ')
      }
    } else if (k === 'class') {
      if (v instanceof Array) {
        v = v
          .filter(c => typeof c == "string")
          .map(c => c.trim())
          .filter(c => c)
          .join(" ")
      } else if (typeof v == 'string') {
        v = v
          .split(" ")
          .map(c => c.trim())
          .filter(c => c)
          .join(" ")
      }
    } else if (v === true) {
      v = ''
    } else if (typeof v === 'number') {
      v = String(v)
    } 

    if (typeof v === 'string' && !v && [
      'class',
      'style',
      'id',
      'lang'
    ].indexOf(k) >= 0) {
      v = null
    }

    if (typeof v == 'function' || typeof v == 'string') {
      A[k] = v
    }
    return A
  }, {})

const resolveChildren = (tagName, children) => 
  tags[tagName] == null ? null :
  tags[tagName].usages.indexOf('self-closing') >= 0 ? null :
    (children instanceof Array ? children : []).filter(c => c)

export {resolveAttrs, resolveChildren}
