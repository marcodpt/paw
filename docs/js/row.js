export default {
  template: document.getElementById('view-row'),
  set: (_, state) => state,
  init: ({data, ...route}, call) => {
    const {schema, data} = data
    const state = {
      schema: null,
      data: null,
      fields: null
    }

    call('set', state)
    Promise.resolve().then(() => {
      return typeof schema == 'function' ? schema(route) : null
    }).then(schema => {
      state.schema = schema
      return typeof data == 'function' ? data(route) : null
    }).then(data => {
      data = data && typeof data == 'object' ? data : {}
      state.schema = state.schema || {
        type: 'object',
        properties: Object.keys(data).forEach(k => ({
          type: typeof data[k],
          title: k,
          name: k
        }))
      }

      const P = state.schema.properties || {}
      state.fields = Object.keys(P).map(k => ({
        title: P[k].title,
        description: P[k].description,
        name: k,
        value: data[k] != null ? data[k] : P[k].default
      }))
      state.links = state.schema.links
      call('set', state)
    })
  }
}
