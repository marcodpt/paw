import e from '../e.js'
import {
  lang, validator, parser, setOptions, hasStep, getStep
} from '../lib.js'
import opt from '../options.js'

const loader = ({type, ui}, data) => data == null ? data :
  (type == 'integer' || type == 'number') && ui == 'date' ?
    data ?
      new Date(data < 0 ? data + 1 : data * 1000).toISOString().substr(0, 10) :
      '' :
  type == 'integer' && hasStep(ui) ? data * getStep(ui) : data

export default ({title, description, css, update, noValid, ...schema}) => {
  const l = lang()
  const t = schema.type
  const ui = schema.ui
  const isText = t == 'string' && (ui == 'text' || ui == 'info')
  var isCheckbox = false
  var E = schema.enum
  var O = E instanceof Array ? setOptions(E) :
    (t == 'integer' || t == 'number') && schema.ui == 'bool' ? [
      {value: 0, label: l.boolFalse},
      {value: 1, label: l.boolTrue}
    ] : opt[schema.ui]
  var validate = validator(schema)
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
    const label = target.value == null ? '' : target.value
    var value = isCheckbox ? target.checked : target.value
    if (O instanceof Array && !isText) {
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
      update(err, v, label, wrapper)
    }
  }
  const target = e(({input, textarea}) => 
    isText ? textarea({
      name: title,
      class: 'form-control',
      oninput: change,
      rows: 6
    }) : input({
      name: title,
      oninput: change,
      onfocus,
      onblur
    })
  )
  const wrapper = e(({div, datalist, option}) => div({
    class: css,
    dataCtrl: title,
    setOptions: isText ? null : (options, S) => {
      if (S) {
        Object.keys(S).forEach(k => {
          schema[k] = S[k]
        })
      }
      var step = null
      if (
        ['integer', 'number'].indexOf(schema.type) >= 0 &&
        schema.ui != 'date'
      ) {
        step = getStep(schema.ui)
      }
      if (step != null) {
        target.setAttribute('step', step)
      } else {
        target.removeAttribute('step')
      }
      if (schema.minimum != null) {
        target.setAttribute('min', loader(schema, schema.minimum))
      } else {
        target.removeAttribute('min')
      }
      if (schema.maximum != null) {
        target.setAttribute('max', loader(schema, schema.maximum))
      } else {
        target.removeAttribute('max')
      }
      isCheckbox = schema.type == 'boolean' && !options
      target.setAttribute('class',
        isCheckbox ? 'form-check-input' : 'form-control'
      )
      target.setAttribute('type', options ? null :
        isCheckbox ? 'checkbox' :
        step ? 'number' : [
          'date',
          'password',
          'range'
        ].indexOf(schema.ui) >= 0 ? schema.ui : null
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

      return options !== true ? wrapper.setValue(schema.default) : wrapper
    },
    setValue: v => {
      const t = schema.type
      if (v == null) {
        v = t == 'integer' || t == 'number' ? 0 :
          t == 'boolean' ? false : ''
      } else {
        v = loader(schema, v)
      }
      if (O instanceof Array) {
        const x = O.reduce((x, {value, label}) =>
          x == null && value == v ? label : x
        , null)
        target.value = x == null ? v : x
      } else if (isCheckbox) {
        target.checked = !!v
      } else {
        target.value = v
      }
      change()
      return wrapper
    }
  }, [
    target,
    div({
      class: 'invalid-feedback'
    })
  ]))

  return isText ? wrapper.setValue(schema.default) : wrapper.setOptions(O)
}
