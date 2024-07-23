const kebabToCamel = string => string.replace(/-./g, x => x[1].toUpperCase())

export default ({
  form,
  render,
  e,
  print
}) => {
  const htmlToJs = (element, ident) => {
    ident = ident || ''

    if (element.nodeType === 3 && element.textContent.trim()) {
      return `${ident}text('${element.textContent.replaceAll('\n', '\\n')}')`
    } else if (element.nodeType !== 1) {
      return ''
    }

    const tag = element.tagName.toLowerCase()

    const attributes = Array.from(element.attributes).reduce((A, {
      nodeName,
      nodeValue
    }) => ({
      ...A,
      [kebabToCamel(nodeName)]: nodeName == 'class' ?
        nodeValue.split(' ').map(c => c.trim()).filter(c => c) :
      nodeName == 'style' ?
        nodeValue.split(';').reduce((S, style) => {
          const V = style.split(':')
          const key = kebabToCamel(V.shift().trim())
          const value = V.join(':').trim()
          if (key && value) {
            S[key] = value
          }
          return S
        }, {}) : 
        nodeValue
    }), {})
    if (attributes.class) {
      const l = attributes.class.length
      if (l == 0) {
        delete attributes.class
      } else if (l == 1) {
        attributes.class = attributes.class[0]
      }
    }
    if (attributes.style && !Object.keys(attributes.style).length) {
      delete attributes.style
    }
    const attrs = print(attributes, ident).substr(ident.length)

    const next = ident+'  '
    const C = Array.from(
      (tag == 'template' ? element.content : element).childNodes
    ).map(child => htmlToJs(child, next)).filter(c => c)
    const children = !C.length ? '' :
      `[\n${C.join(',\n')}\n${ident}]`

    const a = Object.keys(attributes).length
    const c = C.length
    const n = next.length

    return ident+tag+(
      !a && !c ? '()' : 
      !a ? `({}, ${children})` :
      !c ? `(${attrs})` : 
        `(${attrs}, ${children})`
    )
  } 

  render(form({
    css: 'container my-5',
    title: 'HTML to hyperscript converter',
    description: 'Only one HTML element is supported.'+
      '\nIf more than one is entered, only the first one will be returned.',
    icon: 'file-code',
    ui: 'warning',
    properties: {
      html: {
        title: '',
        description: 'enter HTML string...',
        type: 'string',
        ui: 'text'
      }
    },
    showValid: false,
    block: true,
    submit: ({html}) => {
      const target = document.createElement('div')
      target.innerHTML = html
      render(e(({div, pre, code, text}) => div({
        class: 'container my-5 mx-auto'
      }, [
        div({
          class: 'card'
        }, [
          div({
            class: 'card-body'
          }, [
            pre({
              class: 'mb-0'
            }, [
              code({
                class: 'language-js py-0'
              }, [
                text(htmlToJs(target.firstElementChild))
              ])
            ])
          ])
        ])
      ])))
      hljs.highlightAll()
    }
  }))
}
