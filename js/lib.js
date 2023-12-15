import config from './config.js'

const copy = X => JSON.parse(JSON.stringify(X))

const setOptions = V => V.map(v => ({value: v, label: v ? v : '_'}))

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

const isNum = x =>
  x != null && typeof x != 'boolean' && x !== '' && !isNaN(x)

const parser = ev => {
  const e = ev.target.closest('[name]')
  const name = e.getAttribute('name')
  const method = e.getAttribute('data-parser')
  const type = e.getAttribute('type')
  const data = e.value 
  var value = null

  if (type == 'date' && (method == 'int' || method == 'num')) {
    if (!data) {
      value = 0
    } else {
      var d = new Date(data+'T12:00').getTime() / 1000
      d = d <= 0 ? d-1 : d
      if (method == 'int') {
        d = Math.round(d)
      }
      value = d
    }
  } else if (type == 'number' || type == 'range') {
    const step = parseFloat(e.getAttribute('step') || '1') || 1
    if (isNum(data)) {
      value = step % 1 == 0 ? parseInt(data) : parseFloat(data)
    }
    if (method == 'int' && value && step) {
      value = Math.round(value / step)
    }
  } else if (method == 'int' && isNum(data)) {
    value = parseInt(data)
  } else if (method == 'num' && isNum(data)) {
    value = parseFloat(data)
  } else if (method == 'bool') {
    value = !!(isNum(data) ? parseInt(data) : data)
  } else if (method == 'json') {
    try {
      value = JSON.parse(data)
    } catch (err) {}
  } else {
    value = data
  }

  return {name, data: value}
}

const validate = schema => data => {
  const {text} = config
  var error = ''
  const {
    type,
    minLength,
    maxLength,
    pattern,
    minimum,
    maximum,
    min,
    max
  } = schema 
  if (
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
    error = text.type(type)
  } else if (
    schema.enum instanceof Array && schema.enum.indexOf(data) < 0
  ) {
    error = text.enum(schema.enum)
  } else if (typeof data == 'string') {
    if (minLength != null && data.length < minLength) {
      error = text.minLength(minLength)
    } else if (maxLength != null && data.length > maxLength) {
      error = text.maxLength(maxLength)
    } else if (pattern != null && !(new RegExp(pattern)).test(data)) {
      error = text.pattern(pattern)
    }
  } else if (typeof data == 'number') {
    if (minimum != null && data < minimum) {
      error = text.minimum(min == null ? minimum : min)
    } else if (maximum != null && data > maximum) {
      error = text.maximum(max == null ? maximum : max)
    }
  }
  return error
}

const getDefault = ({type, ...schema}, data) => {
  data = data == null ? schema.default == null ? null : schema.default : data

  if (type == 'integer' && typeof data == 'string' && isNum(data)) {
    data = parseInt(data)
  } else if (type == 'number' && typeof data == 'string' && isNum(data)) {
    data = parseFloat(data)
  }

  if (data == null) {
    if (type == 'number' || type == 'integer') {
      return 0
    } else if (type == 'string') {
      return ""
    } else if (type == 'boolean') {
      return false
    } else if (type == 'object') {
      data = {}
      Object.keys(schema.properties || {}).forEach(k => {
        const p = getDefault(schema.properties[k])
        if (p != null) {
          data[k] = p
        }
      })
    } else if (type == 'array') {
      return []
    }
  }

  return data
}

export {
  copy, setOptions, interpolate, queryString, parser, validate, getDefault
}
