import text from './text/spec.js'
import number from './number/spec.js'
import check from './check/spec.js'
import date from './date/spec.js'
import textarea from './textarea/spec.js'
import file from './file/spec.js'
import context from './context/spec.js'
import icon from './icon/spec.js'
import pending from './pending/spec.js'
import typeahead from './typeahead/spec.js'
import select from './select/spec.js'
import radio from './radio/spec.js'
import checkbox from './checkbox/spec.js'
import pagination from './pagination/spec.js'
import items from './items/spec.js'

export default {
  icon: 'pencil',
  title: 'inputs',
  description: 'Form inputs.',
  properties: {},
  modules: [
    text,
    number,
    check,
    date,
    textarea,
    file,
    context,
    icon,
    pending,
    typeahead,
    select,
    radio,
    checkbox,
    pagination,
    items
  ]
}
