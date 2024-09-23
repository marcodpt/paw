import paw from '../index.js'
import active from './plugins/active/spec.js'

export default ({
  icon: 'paw',
  title: 'paw',
  description: 'A low-code, vdom-free hyperscript framework.',
  component: paw,
  type: 'function',
  args: [
    {
      type: 'object',
      properties: {
        root: {
          type: 'node',
          default: 'document.body',
          description: 'DOM node where the application should be mounted.'
        },
        build: {
          type: 'function',
          description: `
            Executed once at the beginning of the application.

            Can be used to add new user-defined components and methods to all routes.

            And also to use the components available in page elements outside the router root.
          `,
          returns: {
            title: 'addons',
            type: 'object'
          }
        },
        routes: {
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
        },
        plugins: {
          type: 'array',
          default: [],
          description: `
            Functions that are executed sequentially with each route change.
            Used to add new properties to the state. 
            And also perform actions with each route change.
          `,
          items: {
            title: 'plugin',
            type: 'function',
            args: [
              {
                title: 'state',
                type: 'object',
                description: ``,
                properties: {
                  url: {
                    type: 'string',
                    description: `The current URL exactly as passed to the router.`
                  },
                  route: {
                    type: 'string',
                    description: `
                      Matching route as defined in the object keys passed to the router.
                    `
                  },
                  path: {
                    type: 'string',
                    description: `
                      The path associated with the URL (content before the first ?).
                    `
                  },
                  Params: {
                    type: 'object',
                    default: {},
                    description: ``
                  },
                  query: {
                    type: 'string',
                    description: `
                      The query associated with the URL (content after the first ?).
                    `
                  },
                  Query: {
                    type: 'object',
                    description: `
                      Parsed query string.
                      Array syntax (param[]=value) is supported.
                    `
                  }
                },
                additionalProperties: {
                  description: `
                    Properties added by plugins will be available in the route.
                    And they will also be available to all later plugins in the array.
                  `
                }
              }
            ]
          }
        }
      }
    }
  ],
  returns: {
    type: 'function',
    title: 'stop',
    description: 'Stops the router.'
  },
  examples: [],
  modules: [active]
})
