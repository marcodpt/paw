export default {
  template: document.getElementById('view-form'),
  set: (_, state) => state,
  init: ({data, ...route}, call) => {
    const {dflt, submit} = data
    call('set', {})
    Promise.resolve().then(() => dflt(route)).then(model => {
      call('set', {
        model,
        submit,
        fields: Object.keys(model).map(k => ({
          title: k,
          name: k,
          value: model[k],
          feedback: ''
        }))
      })
    })
  },
  submit: (state, ev) => {
    console.log('submit')
    ev.preventDefault()
    ev.stopPropagation()
    state.submit(state.model)
  },
  change: (state, ev) => {
    const name = ev.target.getAttribute('name')
    state.model[name] = ev.target.value
    state.fields.forEach(f => {
      if (f.name == name) {
        f.value = ev.target.value
      }
    })
  }
}
