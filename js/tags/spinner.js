import e from '../e.js'
import {lang} from '../lib.js'

export default () => {
  const l = lang()
  return e(({div, span, text}) => div({
    class: 'd-flex justify-content-center p-5',
    title: l.loading
  }, [
    div({
      class: 'spinner-border',
      style: 'width: 5rem; height: 5rem;',
      role: 'status'
    }, [
      span({
        class: 'visually-hidden'
      }, [
        text(l.loading)
      ])
    ])
  ]))
}
