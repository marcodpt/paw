import {interpolate} from './lib.js'

export default {
  template: document.getElementById('view-table'),
  set: (_, state) => state,
  init: ({data, ...route}, call) => {
    const {schema, rows} = data
    const state = {
      schema: null,
      rows: null
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
        links: state.schema.links,
        columns: C.map(k => P[k]),
        rows: rows.map(row => ({
          fields: C.map(k => row[k])
        }))
      })
    })
  }
}
