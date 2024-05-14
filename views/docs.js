const normalizeDesc = desc => (desc || '').trim().split('\n')
  .map(l => l.trim()).join('\n')

export default ({render, Params, form, e}) => {
  return render(import(`../spec/${Params.component}.js`).then(mod => {
    const base = {
      ...mod.default
    }
    base.readOnly = true
    base.ui = 'info'
    base.description = normalizeDesc(base.description)
    const P = base.properties
    const R = base.required || []
    const Q = Object.keys(P).reduce((Q, k) => ({
      ...Q,
      [k]: {
        title: `${k}${R.indexOf(k) >= 0 ? '*' : ''} (${P[k].type})`,
        default: [
          normalizeDesc(P[k].description),
          P[k].enum instanceof Array ?
            'Possible values: ['+P[k].enum.join(', ')+'].' : ''
        ].filter(d => d).join('\n'),
        type: 'string',
        ui: 'text'
      }
    }), {})
    Q.index = {
      noValid: true,
      readOnly: false,
      type: 'integer',
      title: '',
      options: base.examples.map(({title}, i) => ({
        value: i,
        label: title
      }))
    }
    base.properties = Q
    const res = e(({div}) => div())
    base.update = (err, {index}) => {
      if (index == null) {
        return
      }
      const {title, description, data, html} = base.examples[index]
      const desc = normalizeDesc(description)
      const print = X => JSON.stringify(X, undefined, 2)
      const style = 'white-space:pre-wrap'
      res.innerHTML = ''
      res.appendChild(e(({div, h5, p, hr, text, code}) => div({
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
            class: 'card-text',
            style
          }, [
            text(desc)
          ]),
          hr(),
          base.component(data[0]),
          div({
            id: 'result'
          }),
          hr(),
          code({
            class: 'card-text',
            style
          }, [
            text(Params.component+'('+print(data[0])+')')
          ]),
          !html ? null : hr(),
          !html ? null : code({
            class: 'card-text',
            style
          }, [
            text(html)
          ])
        ])
      ])))
    }
    return e(({div}) => div({
      class: 'container my-5 mx-auto'
    }, [
      form(base),
      res
    ]))
  }))
}
