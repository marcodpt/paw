export default ({
  icon: 'magnifying-glass',
  title: 'query',
  description: `
    A plugin that parses query string into an object.
    Array syntax (param[]=value) is supported.
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
