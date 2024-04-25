import e from '../e.js'
import style from '../config/style.js'
import T from '../lang/index.js'

export default () => e(({div, span, text}) =>
  div({
    class: 'd-flex justify-content-center p-5',
    title: T('loading')
  }, [
    div({
      class: 'spinner-border',
      style: style.spinner,
      role: 'status'
    }, [
      span({
        class: 'visually-hidden'
      }, [
        text(T('loading'))
      ])
    ])
  ])
)
