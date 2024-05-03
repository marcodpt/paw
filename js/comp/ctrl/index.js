import link from './link.js'
import input from './input.js'

export default schema => schema.type == null && schema.default == null ?
  link(schema) : input(schema)
