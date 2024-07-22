const camelToKebab = string => string
  .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
  .toLowerCase()

const kebabToCamel = string => string.replace(/-./g, x => x[1].toUpperCase())

const htmlToJs = (element, ident) => {
  ident = ident || ''
  const tag = element.tagName.toLowerCase()
  const attributes = Array.from(element.attributes).reduce((A, {
    nodeName,
    nodeValue
  }) => ({
    ...A,
    [nodeName]: nodeName == 'class' ?
      nodeValue.split(' ').map(c => c.trim()).filter(c => c) :
    nodeName == 'style' ?
      nodeValue.split(';').reduce((S, style) => {
        const V = style.split(':')
        const key = kebabToCamel(V.shift().trim())
        const value = V.join(':').trim()
      }, {}) : 
      nodeValue
  }), {})

  const childNodes = Array.from(
    (tag == 'template' ? element.content : element).childNodes
  ).map(child => compile(child))
} 

export {camelToKebab}
