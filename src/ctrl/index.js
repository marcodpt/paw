import link from './link.js'
import input from './input.js'

export default ({
  init,
  ...schema
}) => {
  const ctrl = schema.type == null && schema.default == null ?
    link(schema) : input(schema)

  if (typeof init == 'function') {
    init(ctrl)
  }

  return ctrl
}
