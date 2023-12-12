import {setOptions} from './lib.js'
import opt from './options.js'
import config from './config.js'

export default (schema, {name, model, error, options, label}) => {
  const {lang, tools} = config
  const {
    type,
    ui,
    minimum,
    maximum,
    readOnly,
    href,
    link
  } = schema
  var isNum = false
  var precision = 0
  var pow = 0
  var step = type == 'integer' ? 1 : null
  const value = schema.default == null && model ? model[name] : schema.default

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
      {value: 0, label: lang.boolFalse},
      {value: 1, label: lang.boolTrue}
    ]
  }

  var format =  x => x
  if (ui == 'password') {
    format = () => '********'
  } else if (options instanceof Array) {
    format = x => {
      const r = options.reduce(
        (r, {value, label}) => r == null && value == x ? label : r
      , null)
      return r == null ? '' : r
    }
  } else if (type == 'boolean' || ui == 'bool') {
    format = x => x ? lang.boolTrue : lang.boolFalse
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
  } else if (typeof x != 'string') {
    format = x => JSON.stringify(x, undefined, 2)
  }

  var loader = x => x
  if (ui == 'date' && (type == 'integer' || type == 'number')) {
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
  } else if (options) {
    input = 'typeahead'
  } else if (ui == 'icon') {
    input = 'icon'
  } else if (ui == 'text' || ui == 'info') {
    input = 'textarea'
  }

  var output = 'default'
  if (href) {
    output = 'href'
  } else if (ui == 'link' || ui == 'icon') {
    output = ui
  }

  name != null ? {
    ui: `input:${input}`,
    type: ui != 'default' ? null :
      ui == 'date' || ui == 'file' ? ui :
      type == 'integer' || type == 'number' ? 'number' : 'text',
    name,
    placeholder: label,
    value: readOnly && label ? label : loader(value),
    raw: value,
    min: minimum == null ? null : loader(minimum),
    max: maximum == null ? null : loader(maximum),
    step: step,
    multiple: ui == 'file' && type == 'array' ? '' : null,
    disabled: readOnly || (options && options.length <= 1),
    feedback: error == null ? '' : error ? ' is-invalid' : ' is-valid',
    error,
    parser: ui == 'date' && type == 'integer' ? 'date:int' :
      ui == 'date' && type == 'number' ? 'date:num' :
      ui == 'file' && type == 'array' ? 'files' :
      ui == 'file' ? 'file' :
      isNum && type == 'integer' ? 'pow:'+pow :
      type == 'array' || type == 'object' || type == 'null' ? 'json' : type
  } : {
    ui: `output:${output}`,
    text: format(value),
    raw: value,
    href,
    link
  }
}
