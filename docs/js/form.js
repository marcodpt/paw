import {meta} from './lib.js'

export default {
  template: document.getElementById('view-form'),
  set: (_, state) => state,
  init: ({data, ...route}, call) => {
    const {schema, row, submit} = data
    const state = {
      route,
      alert: 'danger',
      schema: null,
      row: null,
      fields: null,
      invalid: ' disabled',
      submit
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

      const P = state.schema.properties || {}
      Object.keys(P).forEach(k => {
        if (row[k] == null) {
          if (P[k].default != null) {
            row[k] = P[k].default
          } else if (P[k].type == 'number' || P[k].type == 'integer') {
            row[k] = 0
          } else if (P[k].type == 'string') {
            row[k] = ""
          } else if (P[k].type == 'boolean') {
            row[k] = false
          } else if (P[k].type == 'object') {
            row[k] = {}
          } else if (P[k].type == 'array') {
            row[k] = []
          } else {
            row[k] = null
          }
        }
      })

      state.fields = Object.keys(P).map(k => ({
        ...P[k],
        name: k,
        value: row[k] != null ? row[k] : P[k].default,
        feedback: '',
        error: '' 
      }))
      state.links = state.schema.links
      call('set', state)
      call('validate')
    }).catch(err => {
      state.result = err.toString()
      call('set', state)
      throw err
    })
  },
  validate: state => {
    const getErr = (err, v) => meta('error_'+err, {$: v}) 
    state.invalid = '' 
    state.model = state.fields.reduce((model, field) => {
      field.error = ''
      var v = field.value
      const {type, minLength, maxLength, pattern, minimum, maximum} = field 
      if (type == 'integer' && !isNaN(v)) {
        v = parseInt(v)
      } else if (type == 'number' && !isNaN(v)) {
        v = parseFloat(v)
      }
      if (
        (type == 'null' && v !== null) ||
        (type == 'boolean' && v !== false && v !== true) ||
        (type == 'object' && (
          typeof v != 'object' || v == null || v instanceof Array
        )) ||
        (type == 'array' && !(v instanceof Array)) ||
        (type == 'string' && typeof v != 'string') ||
        (type == 'number' && typeof v != 'number') ||
        (type == 'integer' && (typeof v != 'number' || v % 1 !== 0))
      ) {
        field.error = getErr('type', type)
      } else if (
        field.enum instanceof Array && field.enum.indexOf(v) < 0
      ) {
        field.error = getErr('enum', field.enum)
      } else if (typeof v == 'string') {
        if (minLength != null && v.length < minLength) {
          field.error = getErr('minLength', minLength)
        } else if (maxLength != null && v.length > maxLength) {
          field.error = getErr('maxLength', maxLength)
        } else if (pattern != null && !(new RegExp(pattern)).test(v)) {
          field.error = getErr('pattern', pattern)
        }
      } else if (typeof v == 'number') {
        if (minimum != null && v < minimum) {
          field.error = getErr('minimum', minimum)
        } else if (maximum != null && v > maximum) {
          field.error = getErr('maximum', maximum)
        }
      }
      if (field.error) {
        field.feedback = ' is-invalid'
        state.invalid = ' disabled'
      } else {
        field.feedback = ' is-valid'
      }
      field.model = v
      model[field.name] = v
      if (field.options instanceof Array) {
        field.options.forEach(o => {
          if (o.value == v) {
            field.value = o.label
            o.css = ' active'
          } else {
            o.css = ''
          }
        })
      }
      return model
    }, {})
  },
  submit: (state, ev, call) => {
    ev.preventDefault()
    ev.stopPropagation()

    if (!state.invalid) {
      state.invalid = ' disabled'
      Promise.resolve().then(() => {
        return state.submit(state.route, state.model)
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
  change: (state, ev, call) => {
    const name = ev.target.getAttribute('name')
    state.model[name] = ev.target.value
    state.fields.forEach(f => {
      if (f.name == name) {
        f.value = ev.target.value
      }
    })
    call('validate')
  }
}
