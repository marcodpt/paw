import {ctrl} from '../components.js'
import link from './link/spec.js'
import output from './output/spec.js'
import inputs from './inputs/spec.js'
import tag from './tag/spec.js'

export default {
  icon: 'gamepad',
  title: 'ctrl',
  description: 'Form Controls based on JSON Schema.',
  component: ctrl,
  properties: {},
  modules: [
    tag,
    link,
    output,
    inputs
  ]
}
