import pt from './pt.js'
import en from './en.js'

export default key => {
  const lang = document.documentElement.lang || ''

  if (key == 'lang') {
    return lang
  }

  const l = lang.split('-')[0]
  const T = l == 'pt' ? pt : en

  return T[key] || key
}
