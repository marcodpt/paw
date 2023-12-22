import e from './e.js'
import lang from './lang.js'
import links from './links.js'
import icons from './icons.js'
import {linkify, iconify, interpolate} from './lib.js'
import {back} from './tags.js'

export default ({

}) => {
  return e(({div, legend}) => div({
    class: 'container my-5'
  }, [
    legend()
  ]))
}
