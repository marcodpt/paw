import * as components from './src/components.js'
import genRouter from './src/router/index.js'
import base from './src/router/plugins/index.js'

export default ({root, build, routes, plugins}) => {
  root = root || document.body
  build = typeof build == 'function' ? build : (() => ({}))
  routes = routes || {}
  plugins = plugins || []

  var router = null

  Promise.resolve()
    .then(() => typeof build === 'function' ? build(components) : null)
    .then(addons => {
      if (router == null) {
        router = genRouter(routes, base.concat(state => ({
          ...(addons || {}),
          ...state,
          ...components,
          root,
          render: (view, el) => components.render(view, el || root)
        })))
      }
      change()
    })

  const change = () => {
    if (typeof router == 'function') {
      router((window.location.hash || '#/').substr(1))
    }
  }

  window.addEventListener('hashchange', change)
  return () => {
    router = false
    window.removeEventListener('hashchange', change)
  }
}
