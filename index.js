import {hashRouter} from "https://cdn.jsdelivr.net/gh/marcodpt/wand@0.1.1/index.js"
import * as components from './src/components.js'
import active from './src/plugins/active/index.js'

export default ({root, build, routes, plugins}) => {
  root = root || document.body
  build = typeof build == 'function' ? build : (() => ({}))
  routes = routes || {}
  plugins = [active].concat(plugins || [])

  var stop = null

  Promise.resolve()
    .then(() => typeof build === 'function' ? build(components) : null)
    .then(addons => {
      if (stop == null) {
        stop = hashRouter({
          init: () => ({
            ...(addons || {}),
            ...components,
            root,
            render: (view, el) => components.render(view, el || root)
          }),
          routes,
          plugins
        })
      }
    })

  return () => {
    if (typeof stop == 'function') {
      stop()
    }
  }
}
