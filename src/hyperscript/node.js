import tags from './tags.js'
import {resolveAttrs, resolveChildren} from './lib.js'

const h = (tagName, attributes, children) => {
  const e = document.createElement(tagName)

  const A = resolveAttrs(attributes)
  Object.keys(A).forEach(k => {
    if (typeof A[k] == 'function') {
      if (k.substr(0, 2) == 'on') {
        e.addEventListener(k.substr(2), A[k])
      } else {
        e[k] = (...args) => A[k](e, ...args)
      }
    } else {
      e.setAttribute(k, A[k])
    }
  })

  const C = resolveChildren(tagName, children)
  if (C instanceof Array) {
    C.forEach(child => e.appendChild(child))
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

Object.keys(tags).forEach(tag => {
  Tags[tag] = (attributes, children) => h(tag, attributes, children)
})

export default el => el(Tags)
