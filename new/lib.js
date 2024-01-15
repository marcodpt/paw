import raw_link from './config/link.js'
import raw_icon from './config/icon.js'
import pt from './lang/pt.js'
import en from './lang/en.js'

const iconify = x => x ? `fa-solid fa-${x}` : ''

const linkify = (x, isRow) => x ? `btn${isRow ? ' btn-sm' : ''} btn-${x}` : ''

const link = Object.keys(raw_link).reduce((link, k) => ({
  ...link,
  [k]: linkify(raw_link[k])
}), {})

const icon = Object.keys(raw_icon).reduce((icon, k) => ({
  ...icon,
  [k]: iconify(raw_icon[k])
}), {})

const lang = () => {
  const lang = document.documentElement.lang
  const l = lang.split('-')[0]
  return {
    ...(l == 'pt' ? pt : en),
    lang
  }
}

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

const formatter = ({type, ui}) => {
  if (ui == 'password') {
    return () => '********'
  } else if (type == 'boolean' || ui == 'bool') {
    const l = lang()
    return x => x ? l.boolTrue : l.boolFalse
  } else if (ui == 'date') {
    const l = lang()
    return x => {
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
      return d.toLocaleDateString(l.lang)
    }
  } else if (/^num\.[1-9][0-9]*$/.test(ui)) {
    const l = lang()
    const precision = parseInt(ui.substr(4))
    const pow = 10 ** precision
    return x => typeof x != 'number' ? x : 
      (type == 'integer' ? (x / pow) : x).toLocaleString(l.lang, {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
      })
  } else if (ui == 'progress') {
    return x => {
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
    return link => linkify(link, true)
  } else if (ui == 'icon') {
    return iconify
  } else if (type == 'integer' || type == 'number') {
    const l = lang()
    return x => typeof x != 'number' ? x : x.toLocaleString(l.lang)
  } else if (type != 'string') {
    return x => JSON.stringify(x, undefined, 2)
  } else {
    return x => x
  }
}

const validator = schema => data => {
  const l = lang()
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
    error = l.enum(schema.enum)
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
    error = l.type(type)
  } else if (typeof data == 'string') {
    if (minLength != null && data.length < minLength) {
      error = l.minLength(minLength)
    } else if (maxLength != null && data.length > maxLength) {
      error = l.maxLength(maxLength)
    } else if (pattern != null && !(new RegExp(pattern)).test(data)) {
      error = l.pattern(pattern)
    }
  } else if (typeof data == 'number') {
  }
  if (!error) {
    if (minimum != null && data < minimum) {
      error = l.minimum(formatter(schema)(minimum))
    } else if (maximum != null && data > maximum) {
      error = l.maximum(formatter(schema)(maximum))
    }
  }
  return error
}

const isNum = x =>
  x != null && typeof x != 'boolean' && x !== '' && !isNaN(x)

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
    value = parseInt(data)
  } else if (type == 'number' && isNum(data)) {
    value = parseFloat(data)
  } else if (type == 'boolean') {
    value = !!(isNum(data) ? parseInt(data) : data)
  } else if (type != 'string') {
    try {
      value = JSON.parse(data)
    } catch (err) {}
  } else {
    value = data
  }

  return value
}

export {
  iconify,
  linkify,
  link,
  icon,
  lang,
  interpolate,
  queryString,
  formatter,
  validator,
  parser
}
