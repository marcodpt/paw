import e from '../e.js'
import tag from '../tag.js'
import {
  validator, parser, loader, hasStep, getStep, readFiles, rm
} from '../lib.js'
import opt from './options.js'
import output from './output.js'
import link from './link.js'
import T from '../lang/index.js'

export default ({
  title,
  description,
  readOnly,
  writeOnly,
  css,
  update,
  delay,
  noValid,
  size,
  options,
  ...schema
}) => {
  const sizeCss = ['lg', 'sm'].indexOf(size) >= 0 ? ' form-control-'+size : ''
  const t = schema.type
  const ui = schema.ui
  const isStatic = readOnly && !writeOnly
  const isText = t == 'string' && (ui == 'text' || ui == 'info')
  const isRadio = ui == 'link' && !isStatic
  var isCheckbox = false
  var E = schema.enum
  var O = options ? options :
    E instanceof Array ? opt(E) : opt(schema.ui)
  var validate = validator(schema)
  const parse = parser(schema)
  var oldValue = null
  const onfocus = () => {
    if (O instanceof Array && target.value != '') {
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
    if (schema.ui == 'file') {
      if (schema.type == 'File' || schema.type == 'FileList') {
        resolve(
          schema.type == 'File' ? target.files[0] : target.files,
          Array.from(target.files).map(f => f.name).join('\n')
        )
      } else {
        readFiles(target.files)
          .then(files => {
            const names = files.map(({name}) => name)
            resolve(
              schema.type == 'array' ? files : files[0],
              schema.type == 'array' ? names.join('\n') : names[0]
            )
          })
          .catch(err => {
            resolve(null, err.toString())
          })
      }
    } else {
      const label = target.value == null ? '' : target.value
      var value = isCheckbox ? target.checked : target.value
      if (O instanceof Array && !isText) {
        const i = getOpt()
        value = E[i]
      } else if (schema.ui == 'icon') {
        const g = target.closest('.input-group')
          .querySelector('.input-group-text')
        if (g) {
          g.innerHTML = ''
          g.appendChild(tag({
            icon: target.value
          }))
        }
      }
      resolve(value, label)
    }
  }
  var delayValue = null
  const resolve = (value, label) => {
    if (delay && delayValue !== value) {
      delayValue = value
      setTimeout(() => {
        if (delayValue === value) {
          resolve(value, label)
        }
      }, delay)
      return
    }
    delayValue = null
    const v = parse(value)
    const err = validate(v)
    if (target.classList) {
      target.classList.remove(`is-invalid`)
      target.classList.remove(`is-valid`)
      if ((err || !noValid) && !(E && oldValue == null && !E.length)) {
        target.classList.add(`is-${err ? 'in' : ''}valid`)
      }
    }
    const feedback = wrapper.querySelector('.invalid-feedback')
    if (feedback) {
      feedback.textContent = err
    }
    if (typeof update == 'function') {
      update(err, v, label, wrapper)
    }
  }
  const target = e(({input, textarea}) => 
    isStatic ? output({
      ...schema,
      size
    }) : 
    isText ? textarea({
      name: title,
      disabled: !!readOnly,
      class: 'form-control'+sizeCss,
      oninput: change,
      rows: 6
    }) : input({
      name: title,
      type: 'text',
      disabled: !!readOnly,
      oninput: change,
      onfocus,
      onmousedown: onfocus,
      onblur
    })
  )
  const wrapper = e(({
    div, datalist, option, span, i, input, label, text
  }) => div({
    class: css,
    setOptions: isText || isStatic ? null : (el, options, S) => {
      Object.keys(S || {}).forEach(k => {
        schema[k] = S[k]
      })
      var step = null
      if (
        ['integer', 'number'].indexOf(schema.type) >= 0 &&
        schema.ui != 'date'
      ) {
        step = getStep(schema.ui)
      }
      if (
        step != null &&
        !options &&
        (schema.type == 'integer' || step < 0.5)
      ) {
        target.setAttribute('step', step)
      } else {
        target.removeAttribute('step')
      }
      const fixed = hasStep(schema.ui) ? parseInt(schema.ui.substr(4)) : 0
      if (schema.minimum != null) {
        const min = loader(schema, schema.minimum)
        if (fixed) {
          target.setAttribute('min', min.toFixed(fixed))
        } else {
          target.setAttribute('min', min)
        }
      } else {
        target.removeAttribute('min')
      }
      if (schema.maximum != null) {
        const max = loader(schema, schema.maximum)
        if (fixed) {
          target.setAttribute('max', max.toFixed(fixed))
        } else {
          target.setAttribute('max', max)
        }
      } else {
        target.removeAttribute('max')
      }
      isCheckbox = schema.type == 'boolean' && !options
      target.setAttribute('class',
        isCheckbox ? 'form-check-input' : ('form-control'+sizeCss)
      )
      target.setAttribute('type', options ? 'text' :
        isCheckbox ? 'checkbox' :
        step ? 'number' : [
          'date',
          'password',
          'range',
          'file'
        ].indexOf(schema.ui) >= 0 ? schema.ui : 'text'
      )
      if (schema.ui == 'file' &&
        (schema.type == 'array' || schema.type == 'FileList')
      ) {
        target.setAttribute('multiple', true)
      } else {
        target.removeAttribute('multiple')
      }
      if (options === true) {
        target.disabled = true
        target.setAttribute('placeholder', T('loading'))
        target.value = ''
      } else {
        target.disabled = !!readOnly
        if (description) {
          target.setAttribute('placeholder', description)
        }
      }
      var list = wrapper.querySelector('datalist')
      rm(list)
      if (options instanceof Array) {
        target.setAttribute('list', `app.data.${title || 'list'}`)
        wrapper.appendChild(e(({datalist, option}) => datalist({
          id: `app.data.${title || 'list'}`
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
    setValue: (el, v) => {
      const t = schema.type
      if (v == null) {
        v = schema.default != null ? schema.default :
          t == 'integer' || t == 'number' ? 0 :
          t == 'boolean' ? false : ''
      } else {
        v = loader(schema, v)
      }
      if (O instanceof Array) {
        const x = O.reduce((x, {value, label}) =>
          x == null && value == v ? label : x
        , null)
        if (isRadio) {
          wrapper.querySelectorAll('input').forEach(e => {
            e.checked = e.value == x
            if (e.checked) {
              e.click()
            }
          })
        } else {
          target.value = x == null ? v : x
        }
      } else if (isCheckbox) {
        target.checked = !!v
      } else if (schema.ui != 'file') {
        target.value = v
      }
      if (!isRadio && !isStatic) {
        change()
      } else if (typeof update == 'function') {
        resolve(v, v)
      }
      return wrapper
    }
  }, isRadio ? O.map(o => {
    const l = link({
      link: o.value,
      title: o.label,
      size,
      href: 'javascript:;'
    })
    return [
      input({
        type: 'radio',
        name: title,
        class: 'btn-check',
        id: (title || 'app.radio')+'.'+o.value,
        autocomplete: 'off',
        value: o.value,
        onclick: typeof update != 'function' ? null : () => {
          update('', o.value, o.label, wrapper)
        }
      }),
      label({
        class: l.getAttribute('class')+' me-2',
        for: (title || 'app.radio')+'.'+o.value
      }, [
        text(l.textContent)
      ])
    ]
  }).reduce((X, V) => X.concat(V), []) : [
    schema.ui == 'icon' && !isStatic ? 
      div({
        class: 'input-group'
      }, [
        span({
          class: 'input-group-text'
        }, [
          i({})
        ]),
        target
      ]) : 
      target,
    div({
      class: 'invalid-feedback'
    })
  ]))

  isRadio || isText || isStatic ?
    wrapper.setValue(schema.default) : wrapper.setOptions(O)
  return isStatic && !css ? target : wrapper
}
