import e from './e.js'
import build from './router.js'

const view = (root, elem) => {
  root.innerHTML = ''
  if (elem) {
    root.appendChild(elem)
  }
}

const router = build({
  '*': main => view(main, e(({h1, text}) =>
    div({class: 'container my-5'}, [
      h1({}, [
        text("Hello world!")
      ])
    ])
  )),
  '/hello/:name': (main, {Params}) => view(main, e(({h1, text}) =>
    div({class: 'container my-5'}, [
      h1({}, [
        text(`Hello ${Params.name}!`)
      ])
    ])
  ))
})

window.addEventListener('hashchange', router)
router()
