const normalizeDesc = desc => typeof desc == 'string' ?
  desc.trim().split('\n').map(l => l.trim()).join('\n') : desc

const setProps = P => Object.keys(P).reduce((Q, k) => ({
  ...Q,
  [k]: setSchema({
    title: k+(
      P[k].type == 'array' && P[k].items?.type ? ' (['+P[k].items?.type+'])' :
        P[k].type ? ' ('+P[k].type+')' : ''
    ),
    ...P[k]
  })
}), {})

const setFn = ({args, returns, type, ...P}) => {
  if (args || returns || type == 'function') {
    args = args || []
    P.title = P.title+`(${args.map(({type, title}, i) => {
      return type == 'object' && !title ? '{...}' : 
        (title || '')+(title && type ? ': ' : '')+(type || '')
    }).join(', ')})`+(returns ? ` => ${returns}` : '')

    P = args.reduce((P, arg) => ({
      ...P,
      ...arg
    }), P)
  }
  return P
}

const setSchema = ({icon, description, ...P}) => {
  P = setFn(P)
  return {
    type: 'object',
    readOnly: true,
    icon,
    title: P.title,
    description: normalizeDesc(description),
    context: 'light',
    properties: Object.keys(P).filter(k => [
      'title',
      'type',
    ].indexOf(k) < 0).reduce((Q, k) => {
      if (k == 'properties' || k == 'args') {
        Q = {
          ...Q,
          ...setProps(P[k])
        }
      } else if (P[k].properties) {
        Q[k] = {
          ...P[k],
          title: '',
          properties: setProps(P[k].properties)
        }
      } else {
        Q[k] = {
          default: k == 'enum' ? P[k].join('\n') : P[k],
          ui: k == 'enum' ? 'text' : null
        }
      }
      return Q
    }, {})
  }
}

export default ({render, Params, form, node}) => {
  return render(import(
    `../src/${Params.component.split('.').join('/')}/spec.js`
  ).then(mod => {
    const {modules, examples, component, ...schema} = mod.default
    return node(({div}) => div({
      class: 'container my-5 mx-auto'
    }, [
      form(setSchema(schema))
    ]))
  }))
}
