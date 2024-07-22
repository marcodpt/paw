import T from './lang/index.js'

const rm = el => {
  if (el && el.parentNode) {
    el.parentNode.removeChild(el)
  }
}

const isNum = x =>
  x != null && typeof x != 'boolean' && x !== '' && !isNaN(x)

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

    return x => {
      if (isNum(x)) {
        if (type == 'number' ||
          (typeof x == 'string' && x.indexOf('.') >= 0)
        ) {
          x = parseFloat(x)
        } else {
          x = parseInt(x) / pow
        }
        return x.toLocaleString(T('lang'), {
          minimumFractionDigits: precision,
          maximumFractionDigits: precision
        })
      }
      return x == null ? '' : x
    }
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
        return x == null || !isNum(x) ? 0 : x
      }
      const a = minimum == null ? 0 : minimum
      const b = maximum == null ? (type == 'number' ? 1 : 100) : maximum
      x = (x - a) / (b - a)
      x = x < 0 ? 0 : x
      return 100 * x
    }
  } else if (type == 'integer' || type == 'number') {
    return x => !isNum(x) ? x == null ? '' : x :
      (type == 'integer' ? Math.round(x) : parseFloat(x))
        .toLocaleString(T('lang'))
  } else if (type != 'string') {
    return x => JSON.stringify(x, undefined, 2)
  } else {
    return x => x == null ? '' : x
  }
}

export {
  rm,
  formatter
}
