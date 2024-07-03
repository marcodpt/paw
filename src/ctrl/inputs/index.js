import opt from '../options.js'
import output from '../output.js'
import T from '../../lang/index.js'
import link from './link.js'
import pending from './pending.js'
import typeahead from './typeahead.js'
import select from './select.js'
import file from './file.js'
import textarea from './textarea.js'
import icon from './icon.js'
import date from './date.js'
import check from './check.js'
import number from './number.js'
import text from './text.js'

export default ({
  update,
  delay,
  noValid,
  css,
  ...schema
}) => {
  const s = {...schema}
  s.readOnly = !!s.readOnly
  s.writeOnly = !!s.writeOnly

  if (s.default === undefined) {
    if (s.type == 'string') {
      s.default = ''
    } else if (s.type == 'boolean') {
      s.default = false
    } else if (s.type == 'number' || s.type == 'integer') {
      s.default = 0
    } else if (s.type == 'array') {
      s.default = []
    } else if (s.type == 'object') {
      s.default = {}
    } else {
      s.default = null
    }
  }

  if (s.readOnly && !s.writeOnly) {
    return output(s)
  }
  s.value = s.default 

  s.options = s.options ? s.options :
    s.enum instanceof Array ? opt(s.enum) : opt(s.ui)

  if (s.options instanceof Array) {
    s.enum = s.enum || s.options.map(({value}) => value)
    const item = s.options.filter(o => o.value == s.value)[0]
    s.label = item ? item.label : s.value
  }

  const validate = data => {
    const {
      type,
      minLength,
      maxLength,
      pattern,
      minimum,
      maximum
    } = s 
    var error = ''
    if (
      s.enum instanceof Array && s.enum.indexOf(data) < 0
    ) {
      error = T('enum')(s.enum)
    } else if (
      (type == 'null' && data !== null) ||
      (type == 'boolean' && data !== false && data !== true) ||
      (type == 'object' && (
        typeof data != 'object' || data == null || data instanceof Array
      )) ||
      (type == 'array' && !(data instanceof Array)) ||
      (type == 'string' && typeof data != 'string') ||
      (type == 'number' && typeof data != 'number') ||
      (type == 'integer' && (typeof data != 'number' || data % 1 !== 0))
    ) {
      error = T('type')(type)
    } else if (typeof data == 'string' || typeof data == 'number') {
      if (typeof data == 'string') {
        if (minLength != null && data.length < minLength) {
          error = T('minLength')(minLength)
        } else if (maxLength != null && data.length > maxLength) {
          error = T('maxLength')(maxLength)
        } else if (pattern != null && !(new RegExp(pattern)).test(data)) {
          error = T('pattern')(pattern)
        }
      }

      if (minimum != null && data < minimum) {
        error = T('minimum')(formatter(s)(minimum))
      } else if (maximum != null && data > maximum) {
        error = T('maximum')(formatter(s)(maximum))
      }
    }

    return error
  }

  var delayValue = null
  s.update = (value, label) => {
    if (delay && delayValue !== value) {
      delayValue = value
      setTimeout(() => {
        if (delayValue === value) {
          s.update(value, label)
        }
      }, delay)
      return
    }
    const err = validate(value)
    wrapper.validate(err ? err : noValid ? null : '')

    if (typeof update == 'function') {
      update(err, value, label, wrapper)
    }
  }

  const wrapper = (
    s.ui == 'pending' ? pending :
    s.ui == 'link' ? link :
    s.options instanceof Array ?
      s.ui == 'radio' ? radio :
      s.ui == 'select' ? select :
        typeahead :
    s.ui == 'file' || s.ui == 'File' ? file :
    s.ui == 'text' || s.ui == 'info' ? textarea :
    s.ui == 'icon' ? icon :
    s.ui == 'date' ? date :
    s.type == 'boolean' || s.ui == 'bool' ? check :
    s.type == 'number' || s.type == 'integer' ||
      /^num\.[1-9][0-9]*$/.test(s.ui) ? number :
      text
  )(s)

  s.update(s.value, s.label)

  if (css) {
    wrapper.setAttribute('class', css)
  }

  return wrapper
}
