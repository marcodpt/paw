import en from './lang/en.js'
import pt from './lang/pt.js'

const l = document.documentElement.lang.split('-')[0]
const lang = l == 'pt' ? pt : en

export default {
  lang,
  tools: {
    icon: x => x ? 'fa-solid fa-'+x : '',
    link: x => x ? 'btn btn-'+x : '',
    rowlink: x => x ? 'btn btn-sm btn-'+x : ''
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
