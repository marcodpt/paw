import e from '../e.js'
import tag from '../comp/tag.js'
import link from './link.js'
import {formatter} from '../lib.js'
import style from '../config/style.js'

export default schema => {
  const data = formatter(schema)(schema.default)
  const p = typeof data == 'number' && data > 100 ? 100 : data
  return e(({a, div, span, text}) =>
    schema.href ? link({
      ...schema,
      title: data,
      description: null,
      icon: null
    }) :
    schema.ui == 'progress' ? div({
      style: 'min-width:100px;background-color:lightgrey',
      class: 'rounded',
      title: data.toFixed(1)+'%'
    }, [
      div({
        class: 'text-center rounded text-white overflow-x-hidden',
        style: `width:${p}%;background-color:hsl(${[
          ((100 - p) / 100 * 240).toFixed(1),
          '100%',
          (p / 4 + 25).toFixed(1)+'%'
        ].join(',')})`
      }, [
        text(data.toFixed(1)+'%')
      ])
    ]) : 
    schema.ui == 'color' ? div({
      style: data ? 'background-color:'+data : null,
      title: schema.default,
      class: 'h-100 w-100'
    }) :
    schema.ui == 'icon' ? tag({
      icon: data,
      title: schema.default
    }) : 
    schema.ui == 'link' ? link({
      title: data,
      link: data,
      href: 'javascript:;',
      size: 'sm'
    }) : 
    schema.ui == 'text' || schema.ui == 'info' ? span({
      style: style.text
    }, [
      text(data)
    ]) : 
    text(data)
  )
}
