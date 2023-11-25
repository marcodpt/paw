import {interpolate} from './lib.js'

export default {
  template: document.getElementById('view-table'),
  set: (_, state) => state,
  init: ({data, ...route}, call) => {
    const {schema, rows} = data
    const state = {
      search: route.Params._search || ''
    }
    call('set', state)
    Promise.resolve().then(() => {
      return typeof schema == 'function' ? schema(route) : null
    }).then(schema => {
      state.schema = schema
      return typeof rows == 'function' ? rows(route) : null
    }).then(rows => {
      rows = rows instanceof Array ? rows : []
      state.schema = state.schema || {
        type: 'array',
        items: {
          type: 'object',
          properties: rows.reduce((P, row) => {
            Object.keys(rows).forEach(k => {
              if (P[k] == null) {
                P[k] = {
                  type: typeof row[k],
                  title: k,
                  name: k
                }
              }
            })
            return P
          }, {}) 
        }
      }

      const P = state.schema.items.properties
      const C = Object.keys(P)
      call('set', {
        ...state,
        title: state.schema.title,
        description: state.schema.description,
        links: state.schema.links,
        columns: C.map(k => P[k]),
        actions: state.schema.items.links,
        rows: rows.map(row => ({
          fields: C.map(k => row[k]),
          links: (state.schema.items.links || []).map(({href, ...link}) => ({
            ...link,
            href: interpolate(href, row)
          }))
        }))
      })
    })
  },
  search: (state, ev) => {
    console.log('search: '+ev.target.value)
    state.search = ev.target.value || ''
  }
}
