import e from '../e.js'
import link from '../config/link.js'

export default (message, type) => !message ? null : e(({div, text}) => div({
  class: 'alert alert-'+(type || link.error),
  role: 'alert',
  style: 'white-space: pre-wrap;'
}, [
  text(message)
]))
