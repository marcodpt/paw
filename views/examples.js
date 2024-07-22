const normalizeDesc = desc => (desc || '').trim().split('\n')
  .map(l => l.trim()).join('\n')

const print = (x, ident) => {
  ident = ident || ''
  const next = ident+'  '
  return ident+(
    x == null ? 'null' :
    x === true ? 'true' :
    x === false ? 'false' :
    typeof x == 'number' ? String(x) :
    typeof x == 'string' ? `'${x.replaceAll('\n', '\\n')}'` :
    x instanceof Array ? (
      !x.length ? '[]' :
      `[\n${x.map(v => print(v, next)).join(',\n')}\n${ident}]`
    ) : 
    typeof x == 'object' ? (
      x.nodeType === 1 ? x.outerHTML : 
      x.nodeType === 3 ? `document.createTextNode('${x.textContent}')` : 
      !Object.keys(x).length ? '{}' :
      `{\n${Object.keys(x).map(
        k => next+k+': '+print(x[k], next).substr(next.length)
      ).join(',\n')}\n${ident}}`
    ) :
    x.toString().replaceAll('\n        ', '\n')
  )
}

export default ({render, Params, e}) => {
  return render(import(`../spec/${Params.component}.js`).then(mod => {
    const M = mod.default
    const {title, description, data, html} = M.examples[Params.index]
    const desc = normalizeDesc(description)
    setTimeout(() => {
      hljs.highlightAll()
    }, 100)
    return e(({div, h5, p, hr, text, pre, code}) => div({
      class: 'container my-5 mx-auto'
    }, [
      div({
        class: 'card'
      }, [
        div({
          class: 'card-body'
        }, [
          h5({
            class: 'card-title'
          }, [
            text(title)
          ]),
          p({
            class: 'card-text'
          }, [
            pre({}, [
              text(desc)
            ])
          ]),
          hr(),
          div({}, [
            M.component(data[0])
          ]),
          hr(),
          p({
            class: 'card-text'
          }, [
            pre({
              class: 'mb-0'
            }, [
              code({
                class: 'language-js py-0'
              }, [
                text(Params.component+'('+print(data[0])+')')
              ])
            ])
          ]),
          !html ? null : hr(),
          !html ? null : p({
            class: 'card-text'
          }, [
            pre({
              class: 'mb-0'
            }, [
              code({
                class: 'language-html py-0'
              }, [
                text(html)
              ])
            ])
          ])
        ])
      ])
    ]))
  }))
}
