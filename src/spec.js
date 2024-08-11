import paw from '../index.js'

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
          description: ''
        },
        plugins: {
          type: 'array',
          default: [],
          description: ''
        }
      }
    }
  ],
  returns: {
    type: 'function',
    title: 'stop',
    description: 'Stops the router.'
  },
  examples: []
})
