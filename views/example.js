const normalizeDesc = desc => (desc || '').trim().split('\n')
  .map(l => l.trim()).join('\n')

export default X => {
  const {render, Params, node, print, highlight} = X
  const P = Params.component.split('.')
  return render(import(
    `../src/${P.join('/')}/spec.js`
  ).then(mod => {
    const {title, description, data, html} = mod.default.examples[Params.index]
    const desc = normalizeDesc(description)
    highlight()
    return node(({div, h5, p, hr, text, pre, code}) => div({
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
            (mod.default.component || X[P[0]])(data[0])
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
                text(P[0]+'('+print(data[0])+')')
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
