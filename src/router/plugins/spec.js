import query from './query/spec.js'
import active from './active/spec.js'

export default ({
  icon: 'plug',
  title: 'plugins',
  description: `
    Functions that are executed sequentially with each route change.
    Used to add new properties to the state. 
    And also perform actions with each route change.
  `,
  type: 'array',
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
          }
        },
        additionalProperties: {
          description: `
            Properties added by plugins will be available in the route.
            And they will also be available to all later plugins in the array.
          `
        }
      }
    ],
    returns: {
      title: 'newState',
      type: 'object'
    }
  },
  examples: [],
  modules: [
    query,
    active
  ]
})
