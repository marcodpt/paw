import {iconify, linkify} from './lib.js'
import e from './e.js'
import lang from './lang.js'
import links from './links.js'
import icons from './icons.js'

const back = () => {
  const l = lang()
  return e(({a, i, text}) => 
    a({
      class: linkify(links.back),
      href: 'javascript:history.back()'
    }, [
      i({
        class: iconify(icons.back)
      }),
      text(l.back)
    ])
  )
}

const output ({
  data,
  href,
  link,
  ui
}) => e(({a, span, i, text}) =>
  href ? a({
    href,
    class: link
  }, [
    text(data)
  ]) :
  ui == 'icon' ? span({}, [
    i({class: iconify(data)}),
    text(data)
  ]) : 
  ui == 'link' ? a({
    class: linkify(data)
  }, [
    text(data)
  ]) : 
  text(data)
)

export {back, output}
