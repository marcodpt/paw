import tag from './index.js'

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
      html: `<i class="fa-solid fa-check"></i>`
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
      html: `<i class="fa-brands fa-github"></i>`
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
      html: `<i class="fa-brands fa-github" title="@github"></i>`
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
      html: `A Label`
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
      html: 
`<span
  title="This is a description!\\nAssociated with this label."
>A label with description</span>`
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
      html: `<span><i class="fa-solid fa-check"></i> check</span>`
    }, {
      title: 'A FontAwesome icon with a label and a description',
      data: [
        {
          icon: '@github',
          title: '@github',
          description: 'FontAwesome 6 brands starts with @'
        }
      ],
      html: 
`<span
  title="FontAwesome 6 brands starts with @"
><i class="fa-brands fa-github"></i> @github</span>`
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
      html: ``
    }
  ]
})
