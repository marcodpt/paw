import opt from '../options.js'
import output from '../output/index.js'
import T from '../../lang/index.js'
import {formatter} from '../../lib.js'
import context from './context/index.js'
import pending from './pending/index.js'
import pagination from './pagination/index.js'
import typeahead from './typeahead/index.js'
import select from './select/index.js'
import radio from './radio/index.js'
import checkbox from './checkbox/index.js'
import file from './file/index.js'
import items from './items/index.js'
import props from './props/index.js'
import textarea from './textarea/index.js'
import icon from './icon/index.js'
import date from './date/index.js'
import check from './check/index.js'
import number from './number/index.js'
import text from './text/index.js'

export default ({
  update,
  delay,
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

  if (s.readOnly && !s.writeOnly && (s.type != 'object' || s.ui == 'file')) {
    return output(s)
  }
  s.value = s.default 

  s.options = s.options ? s.options :
    s.enum instanceof Array ? opt(s.enum) : opt(s.ui)

  if (s.options instanceof Array && s.type != 'array') {
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
      maximum,
      minItems,
      maxItems,
      uniqueItems
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
    } else if (data instanceof Array) {
      if (minItems != null && data.length < minItems) {
        error = T('error')(minItems)
      } else if (maxItems != null && data.length > maxItems) {
        error = T('error')(maxItems)
      } else if (uniqueItems && !data.reduce(
        (unique, item) => unique && data.indexOf(item) < 0
      , true)) {
        error = T('error')(uniqueItems)
      }
    }

    return error
  }

  var delayValue = null
  var wrapper = null
  s.update = s.properties ? update : (value, label) => {
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
    if (wrapper && typeof wrapper.validate == 'function') {
      wrapper.validate(err ? err : schema.showValid ? '' : null)
    }

    if (typeof update == 'function') {
      update(err, value, label, wrapper)
    }
  }

  wrapper = (
    s.ui != 'file' && (s.type == 'object' || s.properties) ? props :
    s.ui == 'pending' ? pending :
    s.ui == 'pagination' ? pagination :
    s.ui == 'context' ? context :
    s.options instanceof Array ?
      s.type == 'array' ? checkbox :
      s.ui == 'radio' ? radio :
      s.ui == 'select' ? select :
        typeahead :
    s.ui == 'file' || s.ui == 'File' ? file :
    s.type == 'array' || s.items ? items :
    s.ui == 'text' || s.ui == 'info' ? textarea :
    s.ui == 'icon' ? icon :
    s.ui == 'date' ? date :
    s.type == 'boolean' || s.ui == 'bool' ? check :
    s.type == 'number' || s.type == 'integer' ||
      /^num\.[1-9][0-9]*$/.test(s.ui) ? number :
      text
  )(s)

  if (typeof s.update == 'function' && !s.properties && !s.items) {
    s.update(s.value, s.label)
  }

  return wrapper
}
