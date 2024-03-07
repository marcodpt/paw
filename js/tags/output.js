import e from '../e.js'
import {iconify, linkify, lang, formatter} from '../lib.js'

export default ({href, link, ...schema}) => {
  const data = formatter(schema)(schema.default)
  return e(({a, div, span, i, text}) =>
    href ? a({
      href: typeof href == 'function' ? 'javascript:;' : href,
      onclick: typeof href == 'function' ? href : null,
      class: linkify(link)
    }, [
      text(data)
    ]) :
    schema.ui == 'progress' ? div({
      style: 'min-width:100px;background-color:lightgrey',
      class: 'rounded',
      title: data.toFixed(1)+'%'
    }, [
      div({
        class: 'text-center rounded text-white overflow-x-hidden',
        style: `width:${data}%;background-color:hsl(${[
          ((100 - data) / 100 * 240).toFixed(1),
          '100%',
          (data / 4 + 25).toFixed(1)+'%'
        ].join(',')})`
      }, [
        text(data.toFixed(1)+'%')
      ])
    ]) : 
    schema.ui == 'color' ? div({
      style: schema.default ? 'background-color:'+schema.default : null,
      title: schema.default,
      class: 'h-100 w-100'
    }) :
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
