import e from '../e.js'
import link from './link.js'
import output from './output.js'
import input from './inputs/index.js'

export default ({
  init,
  css,
  ...schema
}) => {
  if (schema.type == null && schema.default != null) {
    if (typeof schema.default === 'boolean') {
      schema.type = 'boolean'
    } else if (typeof schema.default === 'string') {
      schema.type = 'string'
    } else if (typeof schema.default === 'number') {
      schema.type = Number.isInteger(schema.default) ? 'integer' : 'number'
    } else if (schema.default instanceof Array) {
      schema.type = 'array'
    } else if (typeof schema.default === 'object') {
      schema.type = 'object'
    }
  }

  schema.size = ['lg', 'sm'].indexOf(schema.size) >= 0 ? schema.size : null

  var ctrl = schema.type == null &&
    schema.default == null &&
    schema.ui == null &&
    schema.href != null ?
      link(schema) :
    schema.update == null && [
      'pending',
      'pagination'
    ].indexOf(schema.ui) < 0 ?
      output(schema) :
      input(schema)

  if (css) {
    if (ctrl.tagName != 'DIV') {
      ctrl = e(({div}) => div({
        class: css
      }, [
        ctrl
      ]))
    } else {
      ctrl.setAttribute('class', 
        ((ctrl.getAttribute('class') || '')+` ${css}`).trim()
      )
    }
  }

  if (typeof init == 'function') {
    init(ctrl)
  }

  return ctrl
}
