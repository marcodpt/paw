import {getDefault, parser} from './lib.js'
import config from './config.js'
import {input} from './ui.js'
const {tools, text, icon, link} = config

export default {
  template: document.getElementById('view-form'),
  set: (_, state) => state,
  init: ({api, ...route}, call) => {
    const {schema, row, submit} = api
    const state = {
      route,
      alert: 'danger',
      schema: null,
      row: null,
      fields: null,
      back: {
        label: text.back,
        icon: tools.icon(icon.back),
        link: tools.link(link.back)
      },
      submit: {
        run: submit,
        disabled: true,
        label: text.submit,
        icon: tools.icon(icon.submit),
        link: tools.link(link.submit)
      }
    }
    call('set', state)
    Promise.resolve().then(() => {
      return typeof schema == 'function' ? schema(route) : null
    }).then(schema => {
      state.schema = schema
      if (schema) {
        state.title = schema.title
        state.description = schema.description
      }
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
      state.model = {
        ...getDefault(state.schema),
        ...row
      }

      const P = state.schema.properties || {}
      state.fields = Object.keys(P).map(k => input(P[k], {
        name: k,
        model: state.model,
        showValid: true
      }))
      state.links = state.schema.links
      call('set')
      call('validate')
    }).catch(err => {
      state.result = err.toString()
      call('set')
      throw err
    })
  },
  validate: ({submit, fields, model}) => {
    submit.disabled = false
    fields.forEach(field => {
      field.validate()
      if (field.error) {
        submit.disabled = true
      }
    }, {})
  },
  submit: (state, ev, call) => {
    ev.preventDefault()
    ev.stopPropagation()
    const {submit, route, model} = state

    if (!submit.disabled) {
      submit.disabled = true
      Promise.resolve().then(() => {
        return submit.run(route, model)
      }).then(() => {
        state.result = state.schema.links[0].description
        state.alert = 'success'
        call('set', state)
      }).catch(err => {
        state.result = err.toString()
        state.alert = 'danger'
        call('set', state)
        throw err
      })
    }
  },
  change: ({model}, ev, call) => {
    const {name, data} = parser(ev)
    model[name] = data
    call('validate')
  }
}
