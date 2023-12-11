export default {
  serverino: [
    "string",
    "unsigned",
    "now",
    "uid",
    "pointer",
    "bool",
    "paragraph",
    "code",
    "const",
    "label",
    "strict",
    "url",
    "password",
    "char",
    "blob"
  ],
  frontend: [
    "date",
    "hidden",
    "bool",
    "info",
    "text",
    "password",
    "ui",
    "btn",
    "icon"
  ],
  redelinux: [
    "boolean",
    "cnpj",
    "cpf",
    "date",
    "file",
    "files",
    "hex",
    "integer",
    "number",
    "numString",
    "pantone",
    "password",
    "safeString",
    "string",
    "text",
    "webString",
    "rgb",
    "json",
    "pgb",
  ],
  jsonschema: [
    "string"
    "number"
    "integer"
    "object"
    "array"
    "boolean"
    "null"
  ],
  definitive: [
    'password',
    'date',
    'num.1',
    'num.2',
    'num.3',
    'percentage',
    'bool',
    'file'
  ]
}

import {meta, readFiles} from './lib.js'

export default ({
  type,
  ui,
  minimum,
  maximum,
  minLength,
  maxLength,
  pattern,
  options,
  change
}) => {
  const R = {}
  const lang = document.documentElement.lang.split('-')[0]
  var isNum = false
  var precision = 0
  var pow = 0

  if (/^num\.[1-9][0-9]*$/.test(ui)) {
    isNum = true
    precision = parseInt(ui.substr(4))
    pow = 10 ** precision
  }

  /*prop: format*/
  if (ui == 'password') {
    R.format = () => '********'
  } else if (options instanceof Array) {
    R.format = x => {
      const r = options.reduce(
        (r, {value, label}) => r == null && value == x ? label : r
      , null)
      return r == null ? '' : r
    }
  } else if (type == 'boolean' || ui == 'bool') {
    R.format = x => x ? meta('bool_true') : meta('bool_false')
  } else if (ui == 'date') {
    R.format = x => {
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
    R.format = x => typeof x != 'number' ? x : 
      (type == 'integer' ? (x / pow) : x).toLocaleString(lang, {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
      })
  } else if (ui == 'percentage') {
    R.format = x => {
      if (typeof x != 'number') {
        return x
      }
      const a = minimum == null ? 0 : minimum
      const b = maximum != null ? maximum : type == 'integer' ? 100 : 1
      x = (x - a) / (b - a)
      x = x > 1 ? 1 : x < 0 ? 0 : x
      return (100 * x).toFixed(2)
    }
  } else if (type == 'integer' || type == 'number') {
    R.format = x => typeof x != 'number' ? x : x.toLocaleString(lang)
  } else if (typeof x != 'string') {
    R.format = x => JSON.stringify(x, undefined, 2)
  } else {
    R.format = x => x
  }

  /*prop: parser*/
  if (ui == 'date' && (type == 'integer' || type == 'number')) {
    R.parser = x => {
      if (!x) {
        return 0
      } else {
        var d = new Date(x+'T12:00').getTime() / 1000
        d = d <= 0 ? d-1 : d
        if (type == 'integer') {
          d = Math.round(d)
        }
        return d
      }
    }
  } else if (ui == 'file') {
    R.parser = x => readFiles(x)
      .then(files => type == 'array' ? files : files[0])
  } else if (isNum && type == 'integer') {
    R.parser = x => Math.round(x * pow)
  } else if (type == 'integer') {
    R.parser = x => parseInt(x)
  } else if (type == 'number') {
    R.parser = x => parseFloat(x)
  } else {
    R.parser = x => x
  }

  /*prop: loader*/
  if (ui == 'date' && (type == 'integer' || type == 'number')) {
    R.loader = x => new Date((x < 0 ? x+1 : x) * 1000)
      .toISOString().substr(0, 10)
  } else if (isNum && type == 'integer') {
    R.loader = x => x / pow
  } else {
    R.loader = x => x
  }

  /*prop: getter*/
  if (ui == 'file') {
    R.getter = ev => ev.target.files
  } else {
    R.getter = ev => ev.target.value
  }

  return R
}
