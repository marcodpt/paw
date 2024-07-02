import e from '../e.js'
import {
  parser, hasStep, getStep, rm
} from '../lib.js'
import output from './output.js'

export default ({
  update,
  ...schema
}) => {
  const t = schema.type
  const ui = schema.ui
  const isStatic = readOnly && !writeOnly
  const isText = t == 'string' && (ui == 'text' || ui == 'info')
  const isRadio = ui == 'link' && !isStatic
  var isCheckbox = false
  const wrapper = e(({
    div, span, i, input, label, text
  }) => div({
    class: css
  }, [
    target,
    div({
      class: 'invalid-feedback'
    })
  ]))

  return isStatic && !css ? target : wrapper
}
