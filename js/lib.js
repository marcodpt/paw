import raw_link from './config/link.js'
import T from './lang/index.js'

const rm = el => {
  if (el && el.parentNode) {
    el.parentNode.removeChild(el)
  }
}

const copy = X => JSON.parse(JSON.stringify(X))

const setOptions = V => V.map(v => ({value: v, label: v ? v : '_'}))

const linkify = (x, size) => x || size ? `btn${
  ['lg', 'sm'].indexOf(size) >= 0 ? ' btn-'+size : ''
} btn-${x ? x : 'link'}` : ''

const link = Object.keys(raw_link).reduce((link, k) => ({
  ...link,
  [k]: linkify(raw_link[k])
}), {})

const interpolate = (str, X) => {
  if (typeof str != 'string') {
    return str
  }
  str = str.replace(/{([^{}]*)}/g, (a, b) => X &&
    (typeof X[b] == 'string' || typeof X[b] == 'number') ? X[b] : '{}'
  )

  if (str.indexOf('{}') >= 0) {
    str = ''
  }

  return str
}

const queryString = Params => Object.keys(Params)
  .reduce((P, key) => P.concat(Params[key] instanceof Array ?
    Params[key].map(value => ({key: `${key}[]`, value})) :
    {key, value: Params[key]}
  ), [])
  .filter(({value}) => typeof value == "number" || typeof value == "string")
  .map(({key, value}) =>
    encodeURIComponent(key)+'='+encodeURIComponent(value)
  ).join("&")

const formatter = ({type, ui, maximum, minimum}) => {
  if (ui == 'password') {
    return () => '********'
  } else if (type == 'boolean' || ui == 'bool') {
    return x => x ? T('boolTrue') : T('boolFalse')
  } else if (ui == 'date') {
    return x => {
      if (typeof x == 'number' && x) {
        x = (x < 0 ? x+1 : x) * 1000
      } else if (typeof x == 'string' && /^\d{4}-\d{2}-\d{2}/.test(x)) {
        if (x.length == 10) {
          x += 'T12:00'
        }
      } else {
        return ''
      }

      const d = new Date(x)
      return d.toLocaleDateString(T('lang'))
    }
  } else if (/^num\.[1-9][0-9]*$/.test(ui)) {
    const precision = parseInt(ui.substr(4))
    const pow = 10 ** precision
    return x => typeof x != 'number' ? x == null ? '' : x : 
      (type == 'integer' ? (x / pow) : x).toLocaleString(T('lang'), {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
      })
  } else if (/^len:[1-9][0-9]*$/.test(ui)) {
    const len = parseInt(ui.substr(4))
    return x => {
      if (x == null) {
        return ''
      } else if (type == 'number' || type == 'integer') {
        return String(x).padStart(len, '0')
      } else {
        return String(x).padEnd(len, ' ').substr(0, len)
      }
    }
  } else if (ui == 'color') {
    return x => typeof x == 'string' ?
      (/^[\dA-Fa-f]{6}$/.test(x) ? '#' : '')+x : x
  } else if (ui == 'progress') {
    return x => {
      if (typeof x != 'number') {
        return x == null ? 0 : x
      }
      const a = minimum == null ? 0 : minimum
      const b = maximum == null ? (type == 'number' ? 1 : 100) : maximum
      x = (x - a) / (b - a)
      x = x < 0 ? 0 : x
      return 100 * x
    }
  } else if (ui == 'link') {
    return link => linkify(link, 'sm')
  } else if (type == 'integer' || type == 'number') {
    return x => typeof x != 'number' ? x == null ? '' : x :
      (type == 'integer' ? Math.round(x) : x).toLocaleString(T('lang'))
  } else if (type != 'string') {
    return x => JSON.stringify(x, undefined, 2)
  } else {
    return x => x == null ? '' : x
  }
}

const validator = schema => data => {
  const {
    type,
    minLength,
    maxLength,
    pattern,
    minimum,
    maximum
  } = schema 
  var error = ''
  if (
    schema.enum instanceof Array && schema.enum.indexOf(data) < 0
  ) {
    error = T('enum')(schema.enum)
  } else if (
    (type == 'null' && data !== null) ||
    (type == 'boolean' && data !== false && data !== true) ||
    (type == 'object' && (
      typeof data != 'object' || data == null || data instanceof Array
    )) ||
    (type == 'array' && !(data instanceof Array)) ||
    (type == 'string' && typeof data != 'string') ||
    (type == 'number' && typeof data != 'number') ||
    (type == 'integer' && (typeof data != 'number' || data % 1 !== 0))
  ) {
    error = T('type')(type)
  } else if (typeof data == 'string') {
    if (minLength != null && data.length < minLength) {
      error = T('minLength')(minLength)
    } else if (maxLength != null && data.length > maxLength) {
      error = T('maxLength')(maxLength)
    } else if (pattern != null && !(new RegExp(pattern)).test(data)) {
      error = T('pattern')(pattern)
    }
  } else if (typeof data == 'number') {
  }
  if (!error) {
    if (minimum != null && data < minimum) {
      error = T('minimum')(formatter(schema)(minimum))
    } else if (maximum != null && data > maximum) {
      error = T('maximum')(formatter(schema)(maximum))
    }
  }
  return error
}

const isNum = x =>
  x != null && typeof x != 'boolean' && x !== '' && !isNaN(x)

const hasStep = ui => /^num\.[1-9][0-9]*$/.test(ui)

const getStep = ui => !hasStep(ui) ? 1 : 1 / (10 ** parseInt(ui.substr(4)))

const parser = ({type, ui}) => data => {
  var value = null

  if (ui == 'date' && (type == 'integer' || type == 'number')) {
    if (!data) {
      value = 0
    } else {
      var d = new Date(data+'T12:00').getTime() / 1000
      d = d <= 0 ? d-1 : d
      if (type == 'integer') {
        d = Math.round(d)
      }
      value = d
    }
  } else if (type == 'integer' && isNum(data)) {
    value = parseInt(Math.round(data / getStep(ui)))
  } else if (type == 'number' && isNum(data)) {
    value = parseFloat(data)
  } else if (type == 'boolean') {
    value = !!(isNum(data) ? parseInt(data) : data)
  } else if (type != 'string' && ui != 'file') {
    try {
      value = JSON.parse(data)
    } catch (err) {}
  } else {
    value = data
  }

  return value
}

const readFiles = Files => {
  const reader = (file, bin) => new Promise((resolve, reject) => {
    const r = new FileReader()
    const end = data => resolve({
      data: bin && data != null ? btoa(data) : data,
      name: file.name,
      mime: file.type,
      is_base64: bin ? 1 : 0
    })
    r.onloadend = () => {
      !r.error ? end(r.result) : 
        bin ? end(null) : reader(file, true)
    }
    bin ? r.readAsBinaryString(file) : r.readAsText(file, 'UTF-8')
  })
  
  const P = []
  for (var i = 0; i < Files.length; i++) {
    P.push(reader(Files[i], Files[i].type.indexOf('text/') < 0))
  }
  return Promise.all(P)
}

const download = (data, name) => {
  data = 'data:text/plain;charset=utf-8,'+
    encodeURIComponent(data)
  const link = document.createElement("a")
  link.setAttribute('href', data) 
  if (name) {
    link.setAttribute('download', name)
  }

  document.body.appendChild(link)
  link.click()
  rm(link)
}

const getTarget = href => typeof href == 'string' && href.indexOf('://') > 0 ?
  '_blank' : null

export {
  rm,
  copy,
  setOptions,
  linkify,
  link,
  link as btns,
  interpolate,
  queryString,
  formatter,
  validator,
  hasStep,
  getStep,
  parser,
  readFiles,
  download,
  getTarget
}
