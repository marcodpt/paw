import html from '../../node/html.js'

export default ({
  icon: 'tag',
  title: 'tag',
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
      title: 'A success FontAwesome solid icon',
      description: 'With a context you can create badges.',
      data: [
        {
          icon: 'check',
          context: 'success'
        }, {
          icon: 'check',
          title: '',
          context: 'success'
        }, {
          icon: 'check',
          description: '',
          context: 'success'
        }, {
          icon: 'check',
          title: '',
          description: '',
          context: 'success'
        }
      ],
      html: html(({
        span,
        i
      }) => 
        span({
          class: [
            'badge',
            'text-bg-success'
          ]
        }, [
          i({
            class: [
              'fa-solid',
              'fa-check'
            ]
          })
        ])
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
      title: 'A FontAwesome brand icon lg and dark',
      description: 'Badges can also have size.',
      data: [
        {
          icon: '@github',
          context: 'dark',
          size: 'lg'
        }, {
          icon: '@github',
          title: '',
          context: 'dark',
          size: 'lg'
        }, {
          icon: '@github',
          description: '',
          context: 'dark',
          size: 'lg'
        }, {
          icon: '@github',
          title: '',
          description: '',
          context: 'dark',
          size: 'lg'
        }
      ],
      html: html(({
        span,
        i
      }) => 
        span({
          class: [
            'badge',
            'text-bg-dark',
            'fs-5'
          ]
        }, [
          i({
            class: [
              'fa-brands',
              'fa-github'
            ]
          })
        ])
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
      title: 'Description with context generate alerts.',
      data: [
        {
          icon: '@github',
          description: '@github',
          context: 'info'
        }, {
          icon: '@github',
          title: '',
          description: '@github',
          context: 'info'
        }
      ],
      html: html(({
        div,
        h4,
        i,
        span,
        text
      }) => 
        div({
          class: [
            'alert',
            'alert-info',
            'my-0'
          ],
          role: 'alert'
        }, [
          h4({
            class: 'alert-heading'
          }, [
            i({
              class: [
                'fa-brands',
                'fa-github'
              ]
            })
          ]),
          span({
            style: {
              whiteSpace: 'pre-wrap'
            }
          }, [
            text('@github')
          ])
        ])
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
      title: 'A primary standalone label.',
      description: 'A label with context generates a badge.',
      data: [
        {
          title: 'A Label',
          context: 'primary'
        }, {
          title: 'A Label',
          icon: '',
          context: 'primary'
        }, {
          title: 'A Label',
          description: '',
          context: 'primary'
        }, {
          title: 'A Label',
          description: '',
          icon: '',
          context: 'primary'
        }
      ],
      html: html(({
        span,
        text
      }) => 
        span({
          class: [
            'badge',
            'text-bg-primary'
          ]
        }, [
          text('A Label')
        ])
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
      title: 'A standalone label with description and context.',
      description: 'With description and context generates an alert',
      data: [
        {
          title: 'A label with description',
          description: 'This is a description!\nAssociated with this label.',
          context: 'warning'
        }, {
          title: 'A label with description',
          description: 'This is a description!\nAssociated with this label.',
          icon: '',
          context: 'warning'
        }
      ],
      html: html(({
        div,
        h4,
        text,
        span 
      }) => 
        div({
          class: [
            'alert',
            'alert-warning',
            'my-0'
          ],
          role: 'alert'
        }, [
          h4({
            class: 'alert-heading'
          }, [
            text('A label with description')
          ]),
          span({
            style: {
              whiteSpace: 'pre-wrap'
            }
          }, [
            text('This is a description!\nAssociated with this label.')
          ])
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
      title: 'A sm success badge with icon and label',
      data: [
        {
          icon: 'check',
          title: 'check',
          context: 'success',
          size: 'sm'
        }, {
          icon: 'check',
          title: 'check',
          description: '',
          context: 'success',
          size: 'sm'
        }
      ],
      html: html(({
        span,
        i,
        text
      }) => 
        span({
          class: [
            'badge',
            'text-bg-success',
            'small'
          ]
        }, [
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
      title: 'A sm alert',
      data: [
        {
          icon: '@github',
          title: '@github',
          description: 'This is a description!\nAssociated with this alert.',
          context: 'light',
          size: 'sm'
        }
      ],
      html: html(({
        div,
        h5,
        i,
        text,
        span
      }) => 
        div({
          class: [
            'alert',
            'alert-light',
            'my-0',
            'small'
          ],
          role: 'alert'
        }, [
          h5({
            class: 'alert-heading'
          }, [
            i({
              class: [
                'fa-brands',
                'fa-github'
              ]
            }),
            text(' @github')
          ]),
          span({
            style: {
              whiteSpace: 'pre-wrap'
            }
          }, [
            text('This is a description!\nAssociated with this alert.')
          ])
        ])
      )
    }, {
      title: 'A lg error alert',
      data: [
        {
          icon: 'exclamation',
          title: 'Error',
          description: 'An error showcase!\nJust a sample!',
          context: 'danger',
          size: 'lg'
        }
      ],
      html: html(({
        div,
        h3,
        i,
        text,
        span
      }) => 
        div({
          class: [
            'alert',
            'alert-danger',
            'my-0',
            'fs-5'
          ],
          role: 'alert'
        }, [
          h3({
            class: 'alert-heading'
          }, [
            i({
              class: [
                'fa-solid',
                'fa-exclamation'
              ]
            }),
            text(' Error')
          ]),
          span({
            style: {
              whiteSpace: 'pre-wrap'
            }
          }, [
            text('An error showcase!\nJust a sample!')
          ])
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
        },
        {
          icon: '',
          title: '',
          description: '',
          size: 'sm',
          context: 'dark'
        },
        {
          icon: '',
          title: '',
          description: '',
          size: '',
          context: 'danger'
        }
      ],
      html: html(({text}) => 
        text('')
      )
    }
  ]
})
