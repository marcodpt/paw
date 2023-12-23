import e from '../e.js'
import {iconify, linkify} from '../lib.js'

const output ({
  data,
  href,
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
