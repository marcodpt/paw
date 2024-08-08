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

const setSchema = ({type, title, icon, description, returns, ...P}) => {
  if (P.args || returns || type == 'function') {
    title = title+`(${(P.args || []).map(({type, title}, i) => {
      return type == 'object' && !title ? '{...}' : 
        (title || '')+(title && type ? ': ' : '')+(type || '')
    }).join(', ')})`+(returns ? ` => ${returns}` : '')
    console.log(title)
  }
  return {
    type: 'object',
    readOnly: true,
    icon,
    title,
    description: normalizeDesc(description),
    context: 'light',
    properties: Object.keys(P).filter(k => [
      'title',
      'type',
    ].indexOf(k) < 0).reduce((Q, k) => {
      if (k == 'args') {
        Object.keys(P.args).forEach(i => {
          Q[i] = setSchema(P.args[i])
          Q[i].title = Q[i].title || ''
        })
      } else if (k == 'properties') {
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
