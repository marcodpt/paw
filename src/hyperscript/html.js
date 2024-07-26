import tags from './tags.js'
import {resolveAttrs, resolveChildren} from './lib.js'

const MAX_LENGTH = 60

const Tags = {
  text: unsafe => unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

const h = (tagName, attributes, children) => ({tagName, attributes, children})
Object.keys(tags).forEach(tag => {
  Tags[tag] = (attributes, children) => h(tag, attributes, children)
})

const print = (X, ident) => {
  ident = ident || ''
  if (typeof X == 'string') {
    return X.split('\n').map(line => ident+line).join('\n')
  }
  const {tagName, attributes, children} = X
  const A = resolveAttrs(attributes)
  const C = resolveChildren(tagName, children)
  const Attrs = Object.keys(A).map(k => 
    `${k}="${A[k]}"`
  )
  var attrs = Attrs.join(' ')

  if (attrs.length + ident.length + tagName.length + 3 > MAX_LENGTH) {
    attrs = '\n'+Attrs.map(attr => ident+'  '+attr).join('\n')+'\n'+ident
  } else if (attrs) {
    attrs = ' '+attrs
  }
  var s = (tagName == 'html' ? '<!DOCTYPE html>\n' : '')+
    ident+'<'+tagName+attrs

  if (C == null) {
    return s+'>'
  } else {
    s += '>'
    if (!C.length) {
      return tagName ? s+`</${tagName}>` : ''
    } else if (
      C.length == 1 &&
      typeof C[0] === "string" &&
      C[0].indexOf('<') < 0
    ) {
      return s+`${C[0]}</${tagName}>`
    } else {
      const content = children.map(
        child => print(child, ident+'  ')
      ).join('\n')
      return s+'\n'+content+'\n'+ident+`</${tagName}>`
    }
  }
}

export default tpl => print(tpl(Tags))
