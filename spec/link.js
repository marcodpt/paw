import ctrl from '../src/ctrl/index.js'
import tag from './tag.js'

export default ({
  icon: 'link',
  title: 'link',
  description: 'Buttons and links.',
  component: ctrl,
  properties: {
    link: {
      type: 'string'
    },
    href: {
      type: 'string'
    },
    size: {
      type: 'string'
    },
    data: {
      type: 'object'
    },
    ...tag.properties
  },
  examples: [

  ]
})
