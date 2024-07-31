const normalizeDesc = desc => (desc || '').trim().split('\n')
  .map(l => l.trim()).join('\n')

const change = [
  'table',
  'graph',
  'chart',
  'modal',
  'sidebar',
  'render',
  'tag',
  'spinner',
  'form'
]

export default ({render, Params, node, print}) => {
  const comp = Params.component
  return render(import(
    change.indexOf(comp) < 0 ? 
      `../spec/${comp}.js` :
      `../src/${comp}/spec.js`
  ).then(mod => {
    const M = mod.default
    const {title, description, data, html} = M.examples[Params.index]
    const desc = normalizeDesc(description)
    setTimeout(() => {
      hljs.highlightAll()
    }, 100)
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
