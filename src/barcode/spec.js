import barcode from './index.js'

export default ({
  icon: 'barcode',
  title: 'barcode',
  description: 'Generate barcode with <img>',
  component: barcode,
  properties: {
    barcode: {
      type: 'string',
      description: 'The text or value that will be used to generate the barcode.'
    },
    height: {
      type: 'integer',
      description: 'The height of the <img> in pixels.',
      default: 100
    }
  },
  examples: [
    {
      title: 'A default size',
      data: [
        {
          barcode: 'hjkl6789'
        }, {
          barcode: 'hjkl6789',
          height: 100
        }
      ]
    }, {
      title: 'A big size',
      data: [
        {
          barcode: 'abc1234',
          height: 200 
        }
      ]
    }, {
      title: 'A small size',
      data: [
        {
          barcode: 'dog',
          height: 50
        }
      ]
    }
  ]
})
