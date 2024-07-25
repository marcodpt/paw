import node from './hyperscript/node.js'
import T from './lang/index.js'

export default () => node(({div, span, text}) =>
  div({
    class: 'd-flex justify-content-center p-5',
    title: T('loading')
  }, [
    div({
      class: 'spinner-border',
      style: 'width: 5rem; height: 5rem;',
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
