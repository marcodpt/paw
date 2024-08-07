const normalizeDesc = desc => typeof desc == 'string' ?
  desc.trim().split('\n').map(l => l.trim()).join('\n') : desc

const docify = P => Object.keys(P).reduce((Q, k) => {
  const {type, title, description, ...U} = P[k]
  Q[k] = {
    type: 'object',
    title: title || (k+(
      type == 'array' && U.items?.type ? ' (['+U.items?.type+'])' :
        type ? ' ('+type+')' : ''
    )),
    description: normalizeDesc(description),
    context: 'light',
    properties: Object.keys(U).reduce((Q, k) => ({
      ...Q,
      [k]: U[k].properties ? {
        ...U[k],
        title: '',
        properties: docify(U[k].properties)
      } : {
        default: k == 'enum' ? U[k].join('\n') : U[k],
        ui: k == 'enum' ? 'text' : null
      }
    }), {})
  }
  return Q
}, {})

export default ({render, Params, form, node}) => {
  return render(import(
    `../src/${Params.component.split('.').join('/')}/spec.js`
  ).then(mod => {
    const base = {
      ...mod.default
    }
    base.readOnly = true
    base.context = 'light'
    base.description = normalizeDesc(base.description)
    base.properties = docify(base.properties)
    return node(({div}) => div({
      class: 'container my-5 mx-auto'
    }, [
      form(base)
    ]))
  }))
}
