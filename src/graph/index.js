import node from '../hyperscript/node.js'
import spinner from '../spinner/index.js'
import ctrl from '../ctrl/index.js'
import T from '../lang/index.js'

export default ({data}) => {
  const graph = node(({
    div, p, h5, i, text
  }) =>
    div({
      class: 'w-100 vh-100'
    }, [
      div({
        class: 'p-5 h-100'
      }, [
        div({
          class: 'card mb-3 h-100'
        }, [
          div({
            class: 'row no-gutters h-100'
          }, [
            div({
              class: 'col-lg-4 border-right'
            }, [
              div({
                class: 'card-body h-100 overflow-auto p5'
              }, [
                h5({
                  class: 'card-title'
                }, [
                  text(T('noOption'))
                ]),
                p({
                  class: 'card-text'
                })
              ])
            ]),
            div({
              class: 'col-lg-8 h-100'
            }, [
              spinner()
            ])
          ])
        ])
      ])
    ])
  )

  import(
    'https://cdn.jsdelivr.net/npm/cytoscape@3.28.1/dist/cytoscape.esm.min.js'
  ).then(cytoscape => {
    const V = data.filter(X => X.source == null || X.target == null)
    const E = data.filter(X =>
      X.source != null &&
      X.target != null &&
      V.map(v => v.id).indexOf(X.source) != -1 &&
      V.map(v => v.id).indexOf(X.target) != -1
    )

    const container = graph.querySelector('.col-lg-8')
    container.innerHTML = ''
    var g = cytoscape.default({
      container,
      elements: V.concat(E).map(X => ({data: X})),
      style: [
        {
          selector: 'node',
          style: {
            shape: 'ellipse',
            height: '50px',
            width: '70px',
            'border-width': '1px',
            'border-color': 'data(color)',
            'text-valign': 'center',
            'background-color': 'white',
            color: 'black',
            label: 'data(label)'
          }
        }, {
          selector: 'edge',
          style: {
            'line-color': 'data(color)',
            'curve-style': 'bezier',
            'target-arrow-color': 'data(color)',
            'target-arrow-shape': 'chevron'
          }
        }
      ],
      layout: {
        name: 'cose',
        animate: false
      }
    })

    const label = graph.querySelector('h5')
    const info = graph.querySelector('p')
    var pending = false
    g.on('tap', ev => {
      if (pending) {
        return
      }
      const D = ev.target.data()
      label.textContent = D.label || T('noOption')

      if (typeof D.info != 'function') {
        info.textContent = D.info
        return
      }

      pending = true
      info.innerHTML = ''
      info.appendChild(spinner())
            
      Promise.resolve().then(D.info).then(text => {
        info.innerHTML = ''
        info.appendChild(ctrl({
          type: 'string',
          ui: 'text',
          default: text,
          readOnly: true
        }))
        pending = false
      })
    })
  })

  return graph
}
