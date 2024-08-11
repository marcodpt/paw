import docs from '../src/comp.js'

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

const formatArg = ({type, title}) =>
  type == 'object' && !title ? '{...}' : 
    (title || '')+(title && type ? ': ' : '')+(type || '')

const setSchema = ({type, title, icon, description, returns, ...P}) => {
  if (P.args || returns || type == 'function') {
    title = title+`(${(P.args || []).map(formatArg).join(', ')})`+
      (returns ? ` => ${formatArg(returns)}` : '')
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
      } else if (k == 'returns') {
        Q[k] = setSchema(P.returns)
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
      } else if (k == 'items') {
        Q[k] = setSchema(P[k])
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
  return render(Promise.resolve().then(() => {
    const {
      modules, examples, component, ...schema
    } = Params.component.split('.').reduce(
      ({modules}, title) => modules.filter(mod => mod.title == title)[0]
    , {modules: docs})

    return node(({div}) => div({
      class: 'container my-5 mx-auto'
    }, [
      form(setSchema(schema))
    ]))
  }).catch(err => {
    throw 'Page not found!'
  }))
}
