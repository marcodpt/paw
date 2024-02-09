import e from '../e.js'
import {iconify, linkify, lang, formatter} from '../lib.js'

export default ({href, link, ...schema}) => {
  const data = formatter(schema)(schema.default)
  return e(({a, span, i, text}) =>
    href ? a({
      href: typeof href == 'function' ? 'javascript:;' : href,
      onclick: typeof href == 'function' ? href : null,
      class: linkify(link)
    }, [
      text(data)
    ]) :
    schema.ui == 'icon' ? span({}, [
      i({class: data}),
      text(' '+schema.default)
    ]) : 
    schema.ui == 'link' ? a({
      class: data,
      href: 'javascript:;'
    }, [
      text(schema.default)
    ]) : 
    text(data)
  )
}
