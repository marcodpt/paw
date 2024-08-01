import tag from './index.js'
import html from '../hyperscript/html.js'

export default ({
  icon: 'tag',
  title: 'tag',
  component: tag,
  description: 'FontAwesome 6 icons and labels',
  properties: {
    icon: {
      description: `
        FontAwesome 6 icon.
        Raw icon name uses solid.
        Starting with @ uses brands.
      `,
      type: 'string'
    },
    title: {
      description: 'A label',
      type: 'string'
    },
    description: {
      description: 'A description that appears on mouse hover',
      type: 'string'
    }
  },
  examples: [
    {
      title: 'A FontAwesome solid icon',
      description: 'To use FontAwesome 6 solid icons just pass it name',
      data: [
        {
          icon: 'check'
        }, {
          icon: 'check',
          title: ''
        }, {
          icon: 'check',
          description: ''
        }, {
          icon: 'check',
          title: '',
          description: ''
        }
      ],
      html: html(({i}) => 
        i({
          class: [
            'fa-solid',
            'fa-check'
          ]
        })
      )
    }, {
      title: 'A FontAwesome brand icon',
      description: 'To use FontAwesome 6 brand icons pass it name started with @',
      data: [
        {
          icon: '@github'
        }, {
          icon: '@github',
          title: ''
        }, {
          icon: '@github',
          description: ''
        }, {
          icon: '@github',
          title: '',
          description: ''
        }
      ],
      html: html(({i}) => 
        i({
          class: [
            'fa-brands',
            'fa-github'
          ]
        })
      )
    }, {
      title: 'A FontAwesome icon with description',
      data: [
        {
          icon: '@github',
          description: '@github'
        }, {
          icon: '@github',
          title: '',
          description: '@github'
        }
      ],
      html: html(({i}) => 
        i({
          class: [
            'fa-brands',
            'fa-github'
          ],
          title: '@github'
        })
      )
    }, {
      title: 'A standalone label',
      data: [
        {
          title: 'A Label'
        }, {
          title: 'A Label',
          icon: ''
        }, {
          title: 'A Label',
          description: ''
        }, {
          title: 'A Label',
          description: '',
          icon: ''
        }
      ],
      html: html(({text}) => 
        text('A Label')
      )
    }, {
      title: 'A standalone label with description',
      description: 'The description appears on mouse hover',
      data: [
        {
          title: 'A label with description',
          description: 'This is a description!\nAssociated with this label.'
        }, {
          title: 'A label with description',
          description: 'This is a description!\nAssociated with this label.',
          icon: ''
        }
      ],
      html: html(({
        span,
        text
      }) => 
        span({
          title: 'This is a description!\nAssociated with this label.'
        }, [
          text('A label with description')
        ])
      )
    }, {
      title: 'A FontAwesome icon with a label',
      data: [
        {
          icon: 'check',
          title: 'check'
        }, {
          icon: 'check',
          title: 'check',
          description: ''
        }
      ],
      html: html(({
        span,
        i,
        text
      }) => 
        span({}, [
          i({
            class: [
              'fa-solid',
              'fa-check'
            ]
          }),
          text(' check')
        ])
      )
    }, {
      title: 'A FontAwesome icon with a label and a description',
      data: [
        {
          icon: '@github',
          title: '@github',
          description: 'FontAwesome 6 brands starts with @'
        }
      ],
      html: html(({
        span,
        i,
        text
      }) => 
        span({
          title: 'FontAwesome 6 brands starts with @'
        }, [
          i({
            class: [
              'fa-brands',
              'fa-github'
            ]
          }),
          text(' @github')
        ])
      )
    }, {
      title: 'An empty text node',
      data: [
        {},
        {
          icon: ''
        },
        {
          title: ''
        },
        {
          description: ''
        },
        {
          icon: '',
          title: ''
        },
        {
          icon: '',
          description: ''
        },
        {
          title: '',
          description: ''
        },
        {
          icon: '',
          title: '',
          description: ''
        }
      ],
      html: html(({text}) => 
        text('')
      )
    }
  ]
})
