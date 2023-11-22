export default {
  template: document.getElementById('view-row'),
  set: (_, state) => state,
  init: ({data, ...route}, call) => {
    const {dflt} = data
    call('set', {})
    Promise.resolve().then(() => dflt(route)).then(model => {
      call('set', {
        fields: Object.keys(model).map(k => ({
          title: k,
          name: k,
          value: model[k]
        }))
      })
    })
  }
}
