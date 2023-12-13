import en from './lang/en.js'
import pt from './lang/pt.js'

const lang = document.documentElement.lang
const l = lang.split('-')[0]
const text = l == 'pt' ? pt : en

export default {
  lang,
  text,
  tools: {
    icon: x => x ? `fa-solid fa-${x}` : '',
    link: (x, isRow) => x ? `btn${isRow ? ' btn-sm' : ''} btn-${x}` : '',
  },
  icon: {
    menu: 'bars',
    isOpen: 'angle-up',
    isClosed: 'angle-down',
    loading: 'spinner fa-spin fa-5x',
    back: 'arrow-left',
    submit: 'check',
    first: 'fast-backward',
    previous: 'step-backward',
    next: 'step-forward',
    last: 'fast-forward',
    close: 'times',
    filter: 'filter',
    group: 'th',
    exporter: 'file',
    check: 'check',
    sort: 'sort',
    sortAsc: 'sort-down',
    sortDesc: 'sort-up'
  },
  link: {
    back: 'secondary',
    submit: 'primary',
    close: 'secondary',
    pagination: 'secondary',
    filter: 'info',
    group: 'warning',
    exporter: 'secondary',
    check: 'success'
  }
}
