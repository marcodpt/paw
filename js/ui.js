import {setOptions, validate} from './lib.js'
import opt from './options.js'
import config from './config.js'

const output = (schema, settings) => {
  const {lang, text, tools} = config
  const {name, model} = (settings || {})
  const {
    title,
    description,
    type,
    ui,
    href,
    link
  } = schema

  var isNum = false
  var precision = 0
  var pow = 0
  const value = model && model[name] != null ? model[name] : schema.default

  if (/^num\.[1-9][0-9]*$/.test(ui)) {
    isNum = true
    precision = parseInt(ui.substr(4))
    pow = 10 ** precision
  }

  var format =  x => x
  if (ui == 'password') {
    format = () => '********'
  } else if (type == 'boolean' || ui == 'bool') {
    format = x => x ? text.boolTrue : text.boolFalse
  } else if (ui == 'date') {
    format = x => {
      if (typeof x == 'number' && x) {
        x = (x < 0 ? x+1 : x) * 1000
      } else if (typeof x == 'string' && /^\d{4}-\d{2}-\d{2}/.test(x)) {
        if (x.indexOf('T') < 0) {
          x += 'T12:00'
        }
      } else {
        return ''
      }

      const d = new Date(x)
      return d.toLocaleDateString(lang)
    }
  } else if (isNum) {
    format = x => typeof x != 'number' ? x : 
      (type == 'integer' ? (x / pow) : x).toLocaleString(lang, {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
      })
  } else if (ui == 'progress') {
    format = x => {
      if (typeof x != 'number') {
        return x
      }
      const a = minimum
      const b = maximum
      x = (x - a) / (b - a)
      x = x > 1 ? 1 : x < 0 ? 0 : x
      return (100 * x).toFixed(2)
    }
  } else if (ui == 'link') {
    format = link => tools.link(link, true)
  } else if (ui == 'icon') {
    format = tools.icon
  } else if (type == 'integer' || type == 'number') {
    format = x => typeof x != 'number' ? x : x.toLocaleString(lang)
  } else if (typeof value != 'string') {
    format = x => JSON.stringify(x, undefined, 2)
  }

  var output = 'default'
  if (ui == 'link' || ui == 'icon') {
    output = ui
  }

  return {
    ui: `output:${output}`,
    title: title || '',
    description: description || '',
    text: format(value),
    raw: value,
    href,
    link
  }
}

const input = (schema, settings) => {
  const {text, tools} = config
  const {name, model, options, label, showValid} = (settings || {})
  const {
    title,
    description,
    type,
    ui,
    minimum,
    maximum,
    readOnly
  } = schema

  var isNum = false
  var precision = 0
  var pow = 0
  var step = type == 'integer' ? 1 : null
  const value = model && model[name] != null ? model[name] : schema.default
  if (model && model[name] == null) {
    model[name] = value
  }

  if (/^num\.[1-9][0-9]*$/.test(ui)) {
    isNum = true
    precision = parseInt(ui.substr(4))
    pow = 10 ** precision
    step = (1 / pow).toFixed(precision)
  } else if (ui == 'progress') {
    minimum = minimum == null ? 0 : minimum
    maximum = maximum != null ? maximum : type == 'integer' ? 100 : 1
  }

  if (schema.enum) {
    options = setOptions(schema.enum)
  } else if (type == 'string' && opt[ui] != null && options == null) {
    options = opt[ui]
  } else if (type == 'boolean' || ui == 'bool') {
    options = [
      {value: 0, label: text.boolFalse},
      {value: 1, label: text.boolTrue}
    ]
  }

  if (options && !schema.enum) {
    schema.enum = options.map(({value}) => value)
  }

  var loader = x => x
  if (options) {
    loader = x => {
      const r = options.reduce((r, {
        value, label
      }) => r == null && x == value ? label : r, null)
      return r == null ? x : r
    }
  } else if (ui == 'date' && (type == 'integer' || type == 'number')) {
    loader = x => new Date((x < 0 ? x+1 : x) * 1000)
      .toISOString().substr(0, 10)
  } else if (isNum && type == 'integer') {
    loader = x => x / pow
  } else if (type == 'boolean' || ui == 'bool') {
    loader = x => x ? 1 : 0
  } else if (ui == 'link') {
    loader = link => tools.link(link)
  } else if (ui == 'icon') {
    loader = tools.icon
  }

  var input = 'default'
  if (ui == 'link') {
    input = 'link'
  } else if (ui == 'icon') {
    input = 'icon'
  } else if (ui == 'text' || ui == 'info') {
    input = 'textarea'
  }

  const test = validate(schema)
  const F = {
    ui: `input:${input}`,
    type: options ? 'text' : ui == 'date' ? 'date' :
      type == 'integer' || type == 'number' ? 'number' :
      ui != 'default' ? null : 'text',
    name,
    options,
    list: options && options.length && name ? name : null,
    title: title || '',
    description: description || '',
    placeholder: label,
    min: minimum == null ? null : loader(minimum),
    max: maximum == null ? null : loader(maximum),
    step: step,
    disabled: readOnly || (options && options.length <= 1),
    parser: type == 'integer' ? 'int' :
      type == 'number' ? 'num' :
      type == 'array' || type == 'object' || type == 'null' ? 'json' : null,
    validate: () => {
      const x = model == null ? value : model[name]
      F.value = readOnly && label ? label : loader(x)
      F.raw = x
      if (readOnly) {
        return
      }
      F.error = test(x)
      if (F.error) {
        F.feedback = ' is-invalid'
      } else if (showValid) {
        F.feedback = ' is-valid'
      } else {
        F.feedback = ''
      }
    }
  }

  F.validate()
  return F
}

export {input, output}
