import e from '../e.js'
import {lang, validator, parser} from '../lib.js'

export default s => {
  const {title, description, css, update, noValid, ...schema} = s
  const l = lang()
  var validate = validator(schema)
  const parse = parser(schema)
  var oldValue = null
  const onfocus = !schema.enum ? null : () => {
    oldValue = target.value
    target.value = ''
  }
  const getOpt = () => Array.from(wrapper.querySelectorAll('option'))
    .reduce((p, o, i) => p < 0 && o.value == target.value ? i : p, -1)
  const onblur = !schema.enum ? null : () => {
    const i = getOpt()
    if (oldValue != null && i < 0) {
      target.value = oldValue
    }
  }
  const change = () => {
    var value = isCheckbox ? target.checked : target.value
    if (schema.enum) {
      const i = getOpt()
      value = schema.enum[i]
    }

    const v = parse(value)
    const err = validate(v)
    target.classList.remove(`is-invalid`)
    target.classList.remove(`is-valid`)
    if ((err || !noValid) &&
      !(schema.enum && oldValue == null && !schema.enum.length)
    ) {
      target.classList.add(`is-${err ? 'in' : ''}valid`)
    }
    wrapper.querySelector('.invalid-feedback').textContent = err
    if (typeof update == 'function') {
      update(v, err)
    }
  }
  const {type, ui} = schema
  const isCheckbox = type == 'boolean' && !schema.enum
  var step = null
  if (['integer', 'number'].indexOf(type) >= 0) {
    if (/^num\.[1-9][0-9]*$/.test(ui)) {
      const precision = parseInt(ui.substr(4))
      step = 1 / (10 ** precision)
    } else {
      step = 1
    }
  }
  const target = e(({input}) => input({
    class: isCheckbox ? 'form-check-input' : 'form-control',
    name: title,
    type: schema.enum ? null :
      isCheckbox ? 'checkbox' :
      step ? 'number' :
      ui == 'date' ? 'date' : null,
    step,
    placeholder: schema.enum && !schema.enum.length ? l.loading : description,
    value: isCheckbox ? null : schema.default,
    checked: isCheckbox ? !!schema.default : null,
    oninput: change,
    onfocus,
    onblur,
    min: schema.minimum,
    max: schema.maximum,
    disabled: schema.enum && !schema.enum.length,
    list: schema.enum ? `app.data.${title}` : null
  }))
  const wrapper = e(({div, datalist, option}) => div({
    class: css
  }, [
    target,
    schema.enum ? datalist({
      id: `app.data.${title}`
    }, schema.enum.map(o => option({value: o}))) : null,
    div({
      class: 'invalid-feedback'
    })
  ]))
  change()

  if (schema.enum) {
    target.addEventListener(`app.input.${title}.data`, ev => {
      schema.enum = ev.detail.map(({value}) => value)
      validate = validator(schema)
      target.disabled = false
      wrapper.querySelector('datalist')
        .replaceWith(e(({datalist, option}) => datalist({
          id: `app.data.${title}`
        }, ev.detail.map(({label}) => option({value: label})))))
      if (s.default != null) {
        const v = ev.detail.reduce((v, {value, label}) =>
          v == null && value == s.default ? label : v
        , null)
        if (v != null) {
          target.value = v
          change()
        }
      }
    })
  }

  return wrapper
}
