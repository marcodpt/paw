import node from '../../hyperscript/node.js'
import tag from '../../tag/index.js'
import link from '../link/index.js'
import {formatter} from '../../lib.js'

export default schema => {
  const data = formatter(schema)(schema.default)
  const p = typeof data == 'number' && data > 100 ? 100 : data
  return node(({a, div, span, text}) =>
    schema.href ? link({
      ...schema,
      title: data,
      description: null,
      icon: null
    }) :
    schema.ui == 'progress' ? div({
      style: {
        minWidth: '100px',
        backgroundColor: 'lightgrey'
      },
      class: 'rounded',
      title: data.toFixed(1)+'%'
    }, [
      div({
        class: [
          'rounded',
          'text-white',
          'overflow-visible',
          'd-flex',
          'flex-row',
          'justify-content-center'
        ],
        style: {
          width: p+'%',
          backgroundColor: `hsl(${[
            ((100 - p) / 100 * 240).toFixed(1),
            '100%',
            (p / 4 + 25).toFixed(1)+'%'
          ].join(',')})`
        }
      }, [
        text('\u2007\u2007\u2007\u2007'+data.toFixed(1)+'%')
      ])
    ]) : 
    schema.ui == 'color' ? div({
      style: data ? {
        backgroundColor: data
      } : null,
      title: data,
      class: 'h-100 w-100'
    }, [
      text('\uFEFF')
    ]) :
    schema.ui == 'icon' ? tag({
      icon: data,
      title: schema.default
    }) : 
    schema.ui == 'context' ? link({
      title: data,
      context: data,
      href: 'javascript:;',
      size: 'sm'
    }) : 
    schema.ui == 'text' || schema.ui == 'info' || (
      schema.ui != 'bool' && (
        schema.type == 'object' || schema.type == 'array'
      )
    ) ? span({
      style: {
        whiteSpace: 'pre-wrap'
      }
    }, [
      text(data)
    ]) : 
    text(data)
  )
}
