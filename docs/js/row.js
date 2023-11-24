export default {
  template: document.getElementById('view-row'),
  set: (_, state) => state,
  init: ({data, ...route}, call) => {
    const {schema, row} = data
    const state = {
      schema: null,
      row: null,
      fields: null
    }

    call('set', state)
    Promise.resolve().then(() => {
      return typeof schema == 'function' ? schema(route) : null
    }).then(schema => {
      state.schema = schema
      return typeof row == 'function' ? row(route) : null
    }).then(row => {
      row = row && typeof row == 'object' ? row : {}
      state.schema = state.schema || {
        type: 'object',
        properties: Object.keys(row).forEach(k => ({
          type: typeof row[k],
          title: k,
          name: k
        }))
      }

      const P = state.schema.properties || {}
      state.fields = Object.keys(P).map(k => ({
        ...P[k],
        name: k,
        value: row[k] != null ? row[k] : P[k].default
      }))
      state.links = state.schema.links
      call('set', state)
    })
  }
}
