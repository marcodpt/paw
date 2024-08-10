export default ({
  icon: 'maginifying-glass',
  title: 'query',
  description: `
    A plugin that parses query string into an object.
    Array[] syntax is supported.
  `,
  args: [
    {
      title: 'state',
      type: 'object'
    }
  ],
  returns: {
    type: 'object',
    properties: {
      Query: {
        type: 'object',
        description: ``
      }
    }
  },
  examples: [],
  modules: []
})
