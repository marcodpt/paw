import e from '../e.js'
import {iconify, linkify, link, lang, formatter} from '../lib.js'

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
