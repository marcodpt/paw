import {interpolate} from './lib.js'

export default {
  template: document.getElementById('view-form'),
  set: (_, state) => state,
  init: ({data, ...route}, call) => {
    const {schema, row, submit} = data
    const state = {
      schema: null,
      row: null,
      fields: null,
      valid: false,
      submit
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
    })
  },
  validate: (state) => {
    const getErr = (err, v) => {
      const meta = document.head.querySelector(`meta[error_${err}]`)
      const text = (meta ? meta.getAttribute('content') : '') || err
      return interpolate(text, {$: v})
    } 
    state.valid = true
    state.model = state.fields.reduce((model, field) => {
      const v = field.value
      const {type, minLength, maxLength, pattern, minimum, maximum} = field 
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
        state.valid = false
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
  submit: (state, ev) => {
    console.log('submit')
    ev.preventDefault()
    ev.stopPropagation()

    if (state.valid) {
      state.submit(state.model)
    }
  },
  change: (state, ev) => {
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
