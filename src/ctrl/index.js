import link from './link.js'
import output from './output.js'
import input from './inputs/index.js'

export default ({
  init,
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

  const ctrl = schema.type == null &&
    schema.default == null &&
    schema.ui == null &&
    schema.href != null ?
      link(schema) :
    schema.update == null && schema.ui != 'pending' ?
      output(schema) :
      input(schema)

  if (typeof init == 'function') {
    init(ctrl)
  }

  return ctrl
}
