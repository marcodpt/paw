import link from '../ctrl/link/spec.js'
import tag from '../ctrl/tag/spec.js'
import {sidebar} from '../components.js'

const extra = {...link.properties}
delete extra.context
delete extra.size
delete extra.data

const {title, description, icon} = tag.properties

extra.href = {
  ...extra.href,
  description: `
    Navigation link.
    Only if href is a string and contains a protocol (://) will the target be _blank.
  `
}

export default ({
  icon: 'bars',
  title: 'sidebar',
  description: 'Navigation with sidebar.',
  component: sidebar,
  args: [
    {
      type: 'object',
      properties: {
        icon,
        title,
        description,
        links: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              ...extra,
              children: {
                type: 'array',
                description: `An array of nested links with the same schema.`
              }
            }
          }
        }
      }
    }
  ],
  returns: {
    type: 'node'
  },
  examples: []
})
