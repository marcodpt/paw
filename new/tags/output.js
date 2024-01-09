import e from '../e.js'
import {iconify, linkify, link, lang} from '../lib.js'

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

export default schema => {
  const data = formatter(schema)(schema.default)
  return e(({a, span, i, text}) =>
    schema.href ? a({
      href: schema.href,
      class: link.link
    }, [
      text(data)
    ]) :
    schema.ui == 'icon' ? span({}, [
      i({class: data}),
      text(schema.default)
    ]) : 
    schema.ui == 'link' ? a({
      class: data
    }, [
      text(schema.default)
    ]) : 
    text(data)
  )
}
