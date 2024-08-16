import {html, table} from '../components.js'
import {data0, data1, data2} from './data.js'

export default ({
  icon: 'table',
  title: 'table',
  description: 'Table with many integrated functionalities.',
  component: table,
  args: [
    {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        links: {
          type: 'array'
        },
        items: {
          type: 'object'
        },
        sort: {
          type: 'boolean',
          default: false
        },
        search: {
          type: 'string',
          default: ''
        },
        pagination: {
          type: 'string',
          default: ''
        },
        query: {
          type: 'object',
          default: {},
          properties: {
            page: {
              type: 'integer',
              default: 1,
              minimum: 1
            },
            limit: {
              type: 'integer',
              default: 10
            },
            search: {
              type: 'string',
              default: ''
            },
            sort: {
              type: 'string',
              default: ''
            },
            group: {
              type: ['array', 'null'],
              default: null
            },
            checked: {
              type: 'array',
              default: []
            }
          }
        },
        css: {
          type: ['string', 'array'],
          default: '',
          description: `
            A list of classes to apply to the returned table element.
            Common use cases:

            table-striped
            Adds zebra stripes to the table.

            table-hover
            Highlights current line on hover.

            table-bordered
            Adds borders to the table.

            table-borderless
            Removes all borders from the table.

            table-sm
            Makes the table more compact by reducing spacing.

            table-{context}
            Changes the color scheme of the table.

            table-responsive{-sm|-md|-lg|-xl|-xxl}
            Allows horizontal scrolling in the table.
            Useful for tables with many columns that are large for the viewport.
          `
        }
      }
    }
  ],
  returns: {
    type: 'node'
  },
  examples: [
    {
      title: 'Empty',
      data: [
        {}
      ],
      html: html(({
        table,
        thead,
        tbody,
        tr,
        td,
        div,
        span,
        text
      }) => 
        table({
          class: 'table'
        }, [
          thead(),
          tbody({}, [
            tr({}, [
              td({
                colspan: '100%'
              }, [
                div({
                  class: [
                    'd-flex',
                    'justify-content-center',
                    'p-5'
                  ],
                  title: 'Loading...'
                }, [
                  div({
                    class: 'spinner-border',
                    style: {
                      width: '5rem',
                      height: '5rem'
                    },
                    role: 'status'
                  }, [
                    span({
                      class: 'visually-hidden'
                    }, [
                      text('Loading...')
                    ])
                  ])
                ])
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'With title',
      data: [
        {
          title: 'Accounts',
          icon: 'user',
          description: 'Users accounts'
        }
      ],
      html: html(({
        table,
        thead,
        tr,
        th,
        span,
        i,
        text,
        tbody,
        td,
        div
      }) => 
        table({
          class: 'table'
        }, [
          thead({}, [
            tr({}, [
              th({
                class: 'text-center',
                colspan: '100%'
              }, [
                span({
                  title: 'Users accounts'
                }, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-user'
                    ]
                  }),
                  text(' Accounts')
                ])
              ])
            ])
          ]),
          tbody({}, [
            tr({}, [
              td({
                colspan: '100%'
              }, [
                div({
                  class: [
                    'd-flex',
                    'justify-content-center',
                    'p-5'
                  ],
                  title: 'Loading...'
                }, [
                  div({
                    class: 'spinner-border',
                    style: {
                      width: '5rem',
                      height: '5rem'
                    },
                    role: 'status'
                  }, [
                    span({
                      class: 'visually-hidden'
                    }, [
                      text('Loading...')
                    ])
                  ])
                ])
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'With fields',
      data: [
        {
          items: {
            properties: {
              name: {
                type: 'string',
                title: 'Name',
                description: 'User name'
              }, 
              balance: {
                type: 'number',
                title: 'Balance ($)',
                ui: 'num.2'
              }
            }
          }
        }
      ],
      html: html(({
        table,
        thead,
        tr,
        th,
        span,
        text,
        tbody,
        td,
        div
      }) => 
        table({
          class: 'table'
        }, [
          thead({}, [
            tr({}, [
              th({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                span({
                  title: 'User name',
                  dataCtx: 'field:name'
                }, [
                  text('Name')
                ])
              ]),
              th({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                span({
                  dataCtx: 'field:balance'
                }, [
                  text('Balance ($)')
                ])
              ])
            ])
          ]),
          tbody({}, [
            tr({}, [
              td({
                colspan: '100%'
              }, [
                div({
                  class: [
                    'd-flex',
                    'justify-content-center',
                    'p-5'
                  ],
                  title: 'Loading...'
                }, [
                  div({
                    class: 'spinner-border',
                    style: {
                      width: '5rem',
                      height: '5rem'
                    },
                    role: 'status'
                  }, [
                    span({
                      class: 'visually-hidden'
                    }, [
                      text('Loading...')
                    ])
                  ])
                ])
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'With fields and data',
      data: [
        {
          items: {
            properties: {
              name: {
                type: 'string',
                title: 'Name',
                description: 'User name'
              }, 
              balance: {
                type: 'number',
                title: 'Balance ($)',
                ui: 'num.2'
              }
            }
          },
          default: data0
        }
      ],
      html: html(({
        table,
        thead,
        tr,
        th,
        span,
        text,
        tbody,
        td
      }) => 
        table({
          class: 'table'
        }, [
          thead({}, [
            tr({}, [
              th({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                span({
                  title: 'User name',
                  dataCtx: 'field:name'
                }, [
                  text('Name')
                ])
              ]),
              th({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                span({
                  dataCtx: 'field:balance'
                }, [
                  text('Balance ($)')
                ])
              ])
            ])
          ]),
          tbody({}, [
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Alice')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('1,400.20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Bob')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('1,250.34')
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'Table with pagination',
      data: [
        {
          pagination: '📖',
          items: {
            properties: {
              name: {
                type: 'string',
                title: 'Name',
                description: 'User name'
              }, 
              age: {
                type: 'integer',
                title: 'Age (Y)',
                description: 'User age'
              }
            }
          },
          default: data1
        }
      ]
    }, {
      title: 'Table with pagination with query params',
      data: [
        {
          query: {
            limit: 3,
            page: 2
          },
          pagination: '📖',
          items: {
            properties: {
              name: {
                type: 'string',
                title: 'Name',
                description: 'User name'
              }, 
              age: {
                type: 'integer',
                title: 'Age (Y)',
                description: 'User age'
              }
            }
          },
          default: data1
        }
      ]
    }, {
      title: 'Table with checkbox',
      data: [
        {
          check: true,
          items: {
            properties: {
              name: {
                type: 'string',
                title: 'Name',
                description: 'User name'
              }, 
              age: {
                type: 'integer',
                title: 'Age (Y)',
                description: 'User age'
              }
            }
          },
          default: data1
        }
      ]
    }, {
      title: 'Table with checkbox with query params',
      data: [
        {
          query: {
            checked: [data1[1], data1[3], data1[7]]
          },
          check: true,
          items: {
            properties: {
              name: {
                type: 'string',
                title: 'Name',
                description: 'User name'
              }, 
              age: {
                type: 'integer',
                title: 'Age (Y)',
                description: 'User age'
              }
            }
          },
          default: data1
        }
      ]
    }, {
      title: 'Table with totals',
      data: [
        {
          items: {
            properties: {
              name: {
                type: 'string',
                title: 'Name',
                description: 'User name',
                totals: 'count'
              }, 
              age: {
                type: 'integer',
                title: 'Age (Y)',
                description: 'User age',
                totals: 'avg'
              }, 
              balance: {
                type: 'number',
                title: 'Balance ($)',
                ui: 'num.2',
                totals: 'sum'
              }
            }
          },
          default: data2
        }
      ]
    }, {
      title: 'Table with totals and checkbox with query params',
      data: [
        {
          query: {
            checked: [data2[1], data2[3], data2[7]]
          },
          check: true,
          items: {
            properties: {
              name: {
                type: 'string',
                title: 'Name',
                description: 'User name',
                totals: 'count'
              }, 
              age: {
                type: 'integer',
                title: 'Age (Y)',
                description: 'User age',
                totals: 'avg'
              }, 
              balance: {
                type: 'number',
                title: 'Balance ($)',
                ui: 'num.2',
                totals: 'sum'
              }
            }
          },
          default: data2
        }
      ]
    }
  ]
})
