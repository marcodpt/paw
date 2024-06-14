import ctrl from '../src/ctrl/index.js'

export default ({
  icon: 'font',
  title: 'output',
  description: 'Formatted outputs.',
  component: ctrl,
  properties: {},
  examples: [
    {
      title: 'A static field that needs parsing with precision',
      data: [
        {
          type: 'number',
          minimum: 0,
          ui: 'num.2',
          readOnly: true,
          default: '12345.6789'
        }
      ]
    }
  ]
})
