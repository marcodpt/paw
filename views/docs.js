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
    base.properties = Object.keys(P).reduce((Q, k) => ({
      ...Q,
      [k]: {
        title: P[k].title ||
          `${k}${R.indexOf(k) >= 0 ? '*' : ''}`+
          (P[k].type ? ` (${P[k].type})` : ''),
        default: [
          normalizeDesc(P[k].description),
          P[k].enum instanceof Array ?
            'Possible values: ['+P[k].enum.join(', ')+'].' : ''
        ].filter(d => d).join('\n'),
        type: 'string',
        ui: 'text'
      }
    }), {})
    return e(({div}) => div({
      class: 'container my-5 mx-auto'
    }, [
      form(base)
    ]))
  }))
}
