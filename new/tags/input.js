import e from '../e.js'
import {lang, validator, parser, setOptions} from '../lib.js'

export default ({title, description, css, update, noValid, ...schema}) => {
  const l = lang()
  const t = schema.type
  const dflt = schema.default != null ? schema.default :
    t == 'integer' || t == 'number' ? 0 :
    t == 'boolean' ? false :
    t == 'string' ? '' : null
  var isCheckbox = false
  var E = schema.enum
  var O = E instanceof Array ? setOptions(E) : null
  var validate = null
  const parse = parser(schema)
  var oldValue = null
  const onfocus = () => {
    if (O instanceof Array) {
      oldValue = target.value
      target.value = ''
    }
  }
  const getOpt = () => O.reduce(
    (p, o, i) => p < 0 && o.label == target.value ? i : p
  , -1)

  const onblur = () => {
    if (O instanceof Array) {
      const i = getOpt()
      if (oldValue != null && i < 0) {
        target.value = oldValue
        change()
      }
    }
  }
  const change = () => {
    var value = isCheckbox ? target.checked : target.value
    if (O instanceof Array) {
      const i = getOpt()
      value = E[i]
    }

    const v = parse(value)
    const err = validate(v)
    target.classList.remove(`is-invalid`)
    target.classList.remove(`is-valid`)
    if ((err || !noValid) && !(E && oldValue == null && !E.length)) {
      target.classList.add(`is-${err ? 'in' : ''}valid`)
    }
    wrapper.querySelector('.invalid-feedback').textContent = err
    if (typeof update == 'function') {
      update(v, err)
    }
  }
  const {type, ui} = schema
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
    name: title,
    step,
    oninput: change,
    onfocus,
    onblur,
    min: schema.minimum,
    max: schema.maximum
  }))
  const wrapper = e(({div, datalist, option}) => div({
    class: css,
    dataCtrl: title
  }, [
    target,
    div({
      class: 'invalid-feedback'
    })
  ]))

  wrapper.setOptions = options => {
    isCheckbox = type == 'boolean' && !options
    target.setAttribute('class',
      isCheckbox ? 'form-check-input' : 'form-control'
    )
    target.setAttribute('type', options ? null :
      isCheckbox ? 'checkbox' :
      step ? 'number' :
      ui == 'date' ? 'date' : null
    )
    if (options === true) {
      target.disabled = true
      target.setAttribute('placeholder', l.loading)
      target.value = ''
    } else {
      target.disabled = false
      target.setAttribute('placeholder', description || '')
    }
    var list = wrapper.querySelector('datalist')
    if (list) {
      list.parentNode.removeChild(list)
    }
    if (options instanceof Array) {
      target.setAttribute('list', `app.data.${title}`)
      wrapper.appendChild(e(({datalist, option}) => datalist({
        id: `app.data.${title}`
      }, options.map(({label}) => option({value: label})))))
    } else {
      target.removeAttribute('list')
    }
    O = options
    E = options instanceof Array ? options.map(({value}) => value) : null
    validate = validator({
      ...schema,
      enum: E
    })
    if (options !== true) {
      wrapper.setValue(dflt)
    }

    return wrapper
  }

  wrapper.setValue = v => {
    if (O instanceof Array) {
      const x = O.reduce((x, {value, label}) =>
        x == null && value == v ? label : x
      , null)
      target.value = x == null ? v : x
    } else if (isCheckbox) {
      target.checked = !!v
    } else if (v != null) {
      target.value = v
    }
    change()
    return wrapper
  }

  wrapper.setOptions(O)

  return wrapper
}
