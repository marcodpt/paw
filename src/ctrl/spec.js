import ctrl from './index.js'
import link from './link/spec.js'
import output from './output/spec.js'
import inputs from './inputs/spec.js'

export default {
  icon: 'gamepad',
  title: 'ctrl',
  description: 'Form Controls based on JSON Schema.',
  component: ctrl,
  properties: {},
  modules: [
    link,
    output,
    inputs
  ]
}
