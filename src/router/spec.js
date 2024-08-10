import router from './index.js'
import plugins from './plugins/spec.js'

export default ({
  icon: 'traffic-light',
  title: 'router',
  description: 'SPA hash router integrated with the app.',
  component: router,
  args: [
    {
      title: 'routes',
      type: 'object',
      default: {},
      description: `
        keys: string associated with a route, with support for use of parameters.
        values: function(state) => stop()

        The * route matches anything.
        It is useful to build 404 routes or return to the home page.

        The function associated with each route receives the state object.
        Optionally returns a stop function that will be called before changing the route.
      `
    }, {
      title: 'plugins',
      description: `
        Functions that are executed sequentially with each route change.
      `,
      type: 'array',
      default: []
    }
  ],
  returns: {
    title: 'change',
    type: 'function',
    args: [
      {
        type: 'string',
        title: 'url'
      }
    ]
  },
  modules: [plugins],
  examples: []
})
