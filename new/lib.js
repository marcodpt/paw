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
  const l = document.documentElement.lang.split('-')[0]
  return l == 'pt' ? pt : en
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

export {iconify, linkify, link, icon, lang, interpolate, queryString}
