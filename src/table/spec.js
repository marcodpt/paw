import html from '../node/html.js'
import {table} from '../components.js'
import {prop0, data0, prop1, data1, prop2, data2} from './data.js'

var btn = null
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
      title: 'With title and context',
      data: [
        {
          title: 'Accounts',
          icon: 'user',
          description: 'Users accounts',
          context: 'info'
        }
      ],
      html: html(({
        table,
        thead,
        tr,
        th,
        div,
        h4,
        i,
        text,
        span,
        tbody,
        td
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
                        'fa-solid',
                        'fa-user'
                      ]
                    }),
                    text(' Accounts')
                  ]),
                  span({
                    style: {
                      whiteSpace: 'pre-wrap'
                    }
                  }, [
                    text('Users accounts')
                  ])
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
            properties: prop0
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
      title: 'With fields and data and css',
      data: [
        {
          css: 'table-dark',
          items: {
            css: 'table-light',
            properties: prop0
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
          class: [
            'table',
            'table-dark'
          ]
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
            tr({
              class: 'table-light'
            }, [
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
            tr({
              class: 'table-light'
            }, [
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
      title: 'With fields and data and info',
      data: [
        {
          items: {
            info: 'A row',
            properties: prop0
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
            tr({
              title: 'A row'
            }, [
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
            tr({
              title: 'A row'
            }, [
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
      title: 'With fields and data and functional info',
      data: [
        {
          items: {
            info: ({name, balance}) => `${name}: ${balance}`,
            properties: prop0
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
            tr({
              title: 'Alice: 1400.2'
            }, [
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
            tr({
              title: 'Bob: 1250.34'
            }, [
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
      title: 'A compact table',
      data: [
        {
          css: [
            'table-sm',
            'table-bordered'
          ],
          items: {
            properties: prop1
          },
          default: data1
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
          class: [
            'table',
            'table-sm',
            'table-bordered'
          ]
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
                  title: 'User age',
                  dataCtx: 'field:age'
                }, [
                  text('Age (Y)')
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
                text('June Kirk')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Mathews Mcgowan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tyson Hatfield')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Stacey Gentry')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Olive Huff')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Harriet Benton')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tran Heath')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('29')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Christie Sloan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Diaz Williams')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Kelley Tyson')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('34')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Eve Snider')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Baird Lynch')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Arline Chang')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('36')
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'A very compact table',
      data: [
        {
          css: [
            'small',
            'table-sm',
            'table-bordered'
          ],
          items: {
            properties: prop1
          },
          default: data1
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
          class: [
            'table',
            'small',
            'table-sm',
            'table-bordered'
          ]
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
                  title: 'User age',
                  dataCtx: 'field:age'
                }, [
                  text('Age (Y)')
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
                text('June Kirk')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Mathews Mcgowan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tyson Hatfield')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Stacey Gentry')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Olive Huff')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Harriet Benton')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tran Heath')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('29')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Christie Sloan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Diaz Williams')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Kelley Tyson')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('34')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Eve Snider')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Baird Lynch')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Arline Chang')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('36')
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'A fancy table',
      data: [
        {
          css: [
            'table-striped',
            'table-hover',
            'table-bordered'
          ],
          items: {
            properties: prop1
          },
          default: data1
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
          class: [
            'table',
            'table-striped',
            'table-hover',
            'table-bordered'
          ]
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
                  title: 'User age',
                  dataCtx: 'field:age'
                }, [
                  text('Age (Y)')
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
                text('June Kirk')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Mathews Mcgowan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tyson Hatfield')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Stacey Gentry')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Olive Huff')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Harriet Benton')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tran Heath')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('29')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Christie Sloan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Diaz Williams')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Kelley Tyson')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('34')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Eve Snider')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Baird Lynch')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Arline Chang')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('36')
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'Context based on row data',
      data: [
        {
          css: 'table-dark',
          items: {
            css: row => row.age >= 35 ? 'table-info' :
              row.age >= 30 ? 'table-success' :
              row.age >= 25 ? 'table-warning' :
                'table-danger',
            properties: prop1
          },
          default: data1
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
          class: [
            'table',
            'table-dark'
          ]
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
                  title: 'User age',
                  dataCtx: 'field:age'
                }, [
                  text('Age (Y)')
                ])
              ])
            ])
          ]),
          tbody({}, [
            tr({
              class: 'table-danger'
            }, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('June Kirk')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({
              class: 'table-danger'
            }, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Mathews Mcgowan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({
              class: 'table-success'
            }, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tyson Hatfield')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({
              class: 'table-success'
            }, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Stacey Gentry')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({
              class: 'table-danger'
            }, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Olive Huff')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({
              class: 'table-success'
            }, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Harriet Benton')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({
              class: 'table-warning'
            }, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tran Heath')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('29')
              ])
            ]),
            tr({
              class: 'table-danger'
            }, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Christie Sloan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({
              class: 'table-success'
            }, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Diaz Williams')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({
              class: 'table-success'
            }, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Kelley Tyson')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('34')
              ])
            ]),
            tr({
              class: 'table-danger'
            }, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Eve Snider')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({
              class: 'table-danger'
            }, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Baird Lynch')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({
              class: 'table-info'
            }, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Arline Chang')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('36')
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'A sortable table',
      data: [
        {
          sort: true,
          items: {
            properties: prop1
          },
          default: data1
        }
      ],
      html: html(({
        table,
        thead,
        tr,
        th,
        span,
        text,
        a,
        i,
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
                ]),
                a({
                  dataCtx: 'sort:name',
                  href: 'javascript:;'
                }, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-sort'
                    ]
                  })
                ])
              ]),
              th({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                span({
                  title: 'User age',
                  dataCtx: 'field:age'
                }, [
                  text('Age (Y)')
                ]),
                a({
                  dataCtx: 'sort:age',
                  href: 'javascript:;'
                }, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-sort'
                    ]
                  })
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
                text('June Kirk')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Mathews Mcgowan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tyson Hatfield')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Stacey Gentry')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Olive Huff')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Harriet Benton')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tran Heath')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('29')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Christie Sloan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Diaz Williams')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Kelley Tyson')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('34')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Eve Snider')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Baird Lynch')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Arline Chang')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('36')
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'A sortable table with query params',
      data: [
        {
          sort: true,
          query: {
            sort: '-name'
          },
          items: {
            properties: prop1
          },
          default: data1
        }
      ],
      html: html(({
        table,
        thead,
        tr,
        th,
        span,
        text,
        a,
        i,
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
                ]),
                a({
                  dataCtx: 'sort:name',
                  href: 'javascript:;'
                }, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-sort-up'
                    ]
                  })
                ])
              ]),
              th({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                span({
                  title: 'User age',
                  dataCtx: 'field:age'
                }, [
                  text('Age (Y)')
                ]),
                a({
                  dataCtx: 'sort:age',
                  href: 'javascript:;'
                }, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-sort'
                    ]
                  })
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
                text('Tyson Hatfield')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tran Heath')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('29')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Stacey Gentry')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Olive Huff')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Mathews Mcgowan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Kelley Tyson')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('34')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('June Kirk')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Harriet Benton')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Eve Snider')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Diaz Williams')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Christie Sloan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Baird Lynch')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Arline Chang')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('36')
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'A table with search bar.',
      data: [
        {
          search: 'Search',
          items: {
            properties: prop1
          },
          default: data1
        }
      ],
      html: html(({
        table,
        thead,
        tr,
        th,
        div,
        input,
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
                class: 'text-center',
                colspan: '100%'
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-control'
                    ],
                    type: 'text',
                    name: 'search',
                    value: '',
                    placeholder: 'Search'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ])
            ]),
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
                  title: 'User age',
                  dataCtx: 'field:age'
                }, [
                  text('Age (Y)')
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
                text('June Kirk')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Mathews Mcgowan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tyson Hatfield')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Stacey Gentry')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Olive Huff')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Harriet Benton')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tran Heath')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('29')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Christie Sloan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Diaz Williams')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Kelley Tyson')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('34')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Eve Snider')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Baird Lynch')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Arline Chang')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('36')
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'A table with a default value in the search bar.',
      data: [
        {
          search: 'Search',
          items: {
            properties: prop1
          },
          query: {
            search: 'At'
          },
          default: data1
        }
      ],
      html: html(({
        table,
        thead,
        tr,
        th,
        div,
        input,
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
                class: 'text-center',
                colspan: '100%'
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-control'
                    ],
                    type: 'text',
                    name: 'search',
                    value: 'At',
                    placeholder: 'Search'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ])
            ]),
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
                  title: 'User age',
                  dataCtx: 'field:age'
                }, [
                  text('Age (Y)')
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
                text('Mathews Mcgowan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tyson Hatfield')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tran Heath')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('29')
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
            properties: prop1
          },
          default: data1
        }
      ],
      html: html(({
        table,
        thead,
        tr,
        td,
        div,
        button,
        i,
        input,
        datalist,
        option,
        text,
        th,
        span,
        tbody
      }) => 
        table({
          class: 'table'
        }, [
          thead({}, [
            tr({}, [
              td({
                class: 'text-center',
                colspan: '100%'
              }, [
                div({
                  class: [
                    'row',
                    'gx-1',
                    'justify-content-center'
                  ]
                }, [
                  div({
                    class: 'col-auto'
                  }, [
                    button({
                      class: [
                        'btn',
                        'btn-primary'
                      ],
                      type: 'button',
                      disabled: ''
                    }, [
                      i({
                        class: [
                          'fa-solid',
                          'fa-fast-backward'
                        ]
                      })
                    ])
                  ]),
                  div({
                    class: 'col-auto'
                  }, [
                    button({
                      class: [
                        'btn',
                        'btn-primary'
                      ],
                      type: 'button',
                      disabled: ''
                    }, [
                      i({
                        class: [
                          'fa-solid',
                          'fa-step-backward'
                        ]
                      })
                    ])
                  ]),
                  div({
                    class: 'col-auto'
                  }, [
                    div({}, [
                      input({
                        class: [
                          'validate',
                          'form-control'
                        ],
                        type: 'text',
                        value: '📖 (1 / 2)',
                        list: 'app_list_000001'
                      }),
                      datalist({
                        id: 'app_list_000001'
                      }, [
                        option({}, [
                          text('📖 (1 / 2)')
                        ]),
                        option({}, [
                          text('📖 (2 / 2)')
                        ])
                      ]),
                      div({
                        class: 'invalid-feedback'
                      })
                    ])
                  ]),
                  div({
                    class: 'col-auto'
                  }, [
                    button({
                      class: [
                        'btn',
                        'btn-primary'
                      ],
                      type: 'button'
                    }, [
                      i({
                        class: [
                          'fa-solid',
                          'fa-step-forward'
                        ]
                      })
                    ])
                  ]),
                  div({
                    class: 'col-auto'
                  }, [
                    button({
                      class: [
                        'btn',
                        'btn-primary'
                      ],
                      type: 'button'
                    }, [
                      i({
                        class: [
                          'fa-solid',
                          'fa-fast-forward'
                        ]
                      })
                    ])
                  ])
                ])
              ])
            ]),
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
                  title: 'User age',
                  dataCtx: 'field:age'
                }, [
                  text('Age (Y)')
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
                text('June Kirk')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Mathews Mcgowan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tyson Hatfield')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Stacey Gentry')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Olive Huff')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Harriet Benton')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tran Heath')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('29')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Christie Sloan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Diaz Williams')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Kelley Tyson')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('34')
              ])
            ])
          ])
        ])
      )
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
            properties: prop1
          },
          default: data1
        }
      ],
      html: html(({
        table,
        thead,
        tr,
        td,
        div,
        button,
        i,
        input,
        datalist,
        option,
        text,
        th,
        span,
        tbody
      }) => 
        table({
          class: 'table'
        }, [
          thead({}, [
            tr({}, [
              td({
                class: 'text-center',
                colspan: '100%'
              }, [
                div({
                  class: [
                    'row',
                    'gx-1',
                    'justify-content-center'
                  ]
                }, [
                  div({
                    class: 'col-auto'
                  }, [
                    button({
                      class: [
                        'btn',
                        'btn-primary'
                      ],
                      type: 'button'
                    }, [
                      i({
                        class: [
                          'fa-solid',
                          'fa-fast-backward'
                        ]
                      })
                    ])
                  ]),
                  div({
                    class: 'col-auto'
                  }, [
                    button({
                      class: [
                        'btn',
                        'btn-primary'
                      ],
                      type: 'button'
                    }, [
                      i({
                        class: [
                          'fa-solid',
                          'fa-step-backward'
                        ]
                      })
                    ])
                  ]),
                  div({
                    class: 'col-auto'
                  }, [
                    div({}, [
                      input({
                        class: [
                          'validate',
                          'form-control'
                        ],
                        type: 'text',
                        value: '📖 (2 / 5)',
                        list: 'app_list_000002'
                      }),
                      datalist({
                        id: 'app_list_000002'
                      }, [
                        option({}, [
                          text('📖 (1 / 5)')
                        ]),
                        option({}, [
                          text('📖 (2 / 5)')
                        ]),
                        option({}, [
                          text('📖 (3 / 5)')
                        ]),
                        option({}, [
                          text('📖 (4 / 5)')
                        ]),
                        option({}, [
                          text('📖 (5 / 5)')
                        ])
                      ]),
                      div({
                        class: 'invalid-feedback'
                      })
                    ])
                  ]),
                  div({
                    class: 'col-auto'
                  }, [
                    button({
                      class: [
                        'btn',
                        'btn-primary'
                      ],
                      type: 'button'
                    }, [
                      i({
                        class: [
                          'fa-solid',
                          'fa-step-forward'
                        ]
                      })
                    ])
                  ]),
                  div({
                    class: 'col-auto'
                  }, [
                    button({
                      class: [
                        'btn',
                        'btn-primary'
                      ],
                      type: 'button'
                    }, [
                      i({
                        class: [
                          'fa-solid',
                          'fa-fast-forward'
                        ]
                      })
                    ])
                  ])
                ])
              ])
            ]),
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
                  title: 'User age',
                  dataCtx: 'field:age'
                }, [
                  text('Age (Y)')
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
                text('Stacey Gentry')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Olive Huff')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Harriet Benton')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'Table with checkbox',
      data: [
        {
          check: true,
          items: {
            properties: prop1
          },
          default: data1
        }
      ],
      html: html(({
        table,
        thead,
        tr,
        th,
        button,
        i,
        span,
        text,
        tbody,
        td,
        div,
        input
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
                ],
                dataCtx: 'groupHide'
              }, [
                button({
                  class: [
                    'btn',
                    'btn-success',
                    'btn-sm'
                  ],
                  type: 'button'
                }, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-check'
                    ]
                  })
                ])
              ]),
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
                  title: 'User age',
                  dataCtx: 'field:age'
                }, [
                  text('Age (Y)')
                ])
              ])
            ])
          ]),
          tbody({}, [
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('June Kirk')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Mathews Mcgowan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tyson Hatfield')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Stacey Gentry')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Olive Huff')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Harriet Benton')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tran Heath')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('29')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Christie Sloan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Diaz Williams')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Kelley Tyson')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('34')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Eve Snider')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Baird Lynch')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Arline Chang')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('36')
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'Table with checkbox with query params',
      data: [
        {
          query: {
            checked: [data1[1], data1[3], data1[7]]
          },
          check: true,
          items: {
            properties: prop1
          },
          default: data1
        }
      ],
      html: html(({
        table,
        thead,
        tr,
        th,
        button,
        i,
        span,
        text,
        tbody,
        td,
        div,
        input
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
                ],
                dataCtx: 'groupHide'
              }, [
                button({
                  class: [
                    'btn',
                    'btn-success',
                    'btn-sm'
                  ],
                  type: 'button'
                }, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-check'
                    ]
                  })
                ])
              ]),
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
                  title: 'User age',
                  dataCtx: 'field:age'
                }, [
                  text('Age (Y)')
                ])
              ])
            ])
          ]),
          tbody({}, [
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('June Kirk')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox',
                    checked: ''
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Mathews Mcgowan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tyson Hatfield')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox',
                    checked: ''
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Stacey Gentry')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Olive Huff')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Harriet Benton')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tran Heath')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('29')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox',
                    checked: ''
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Christie Sloan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Diaz Williams')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Kelley Tyson')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('34')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Eve Snider')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Baird Lynch')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Arline Chang')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('36')
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'Table with totals',
      data: [
        {
          items: {
            properties: prop2
          },
          default: data2
        }
      ],
      html: html(({
        table,
        thead,
        tr,
        td,
        text,
        th,
        span,
        tbody
      }) => 
        table({
          class: 'table'
        }, [
          thead({}, [
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ],
                dataCtx: 'totals:name'
              }, [
                text('13')
              ]),
              td({
                class: [
                  'text-center',
                  'align-middle'
                ],
                dataCtx: 'totals:age'
              }, [
                text('28')
              ]),
              td({
                class: [
                  'text-center',
                  'align-middle'
                ],
                dataCtx: 'totals:balance'
              }, [
                text('33,979.24')
              ])
            ]),
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
                  title: 'User age',
                  dataCtx: 'field:age'
                }, [
                  text('Age (Y)')
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
                text('June Kirk')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('1,260.38')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Mathews Mcgowan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('3,072.78')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tyson Hatfield')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('1,326.09')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Stacey Gentry')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('3,318.59')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Olive Huff')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('1,747.45')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Harriet Benton')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('1,146.87')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tran Heath')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('29')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('2,510.93')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Christie Sloan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('3,022.48')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Diaz Williams')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('3,410.05')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Kelley Tyson')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('34')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('3,973.95')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Eve Snider')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('2,823.23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Baird Lynch')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('2,459.93')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Arline Chang')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('36')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('3,906.51')
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'Table with totals and checkbox with query params',
      data: [
        {
          query: {
            checked: [data2[1], data2[3], data2[7]]
          },
          check: true,
          items: {
            properties: prop2
          },
          default: data2
        }
      ],
      html: html(({
        table,
        thead,
        tr,
        td,
        text,
        th,
        button,
        i,
        span,
        tbody,
        div,
        input
      }) => 
        table({
          class: 'table'
        }, [
          thead({}, [
            tr({}, [
              td({
                dataCtx: 'groupHide'
              }),
              td({
                class: [
                  'text-center',
                  'align-middle'
                ],
                dataCtx: 'totals:name'
              }, [
                text('3')
              ]),
              td({
                class: [
                  'text-center',
                  'align-middle'
                ],
                dataCtx: 'totals:age'
              }, [
                text('26')
              ]),
              td({
                class: [
                  'text-center',
                  'align-middle'
                ],
                dataCtx: 'totals:balance'
              }, [
                text('9,413.85')
              ])
            ]),
            tr({}, [
              th({
                class: [
                  'text-center',
                  'align-middle'
                ],
                dataCtx: 'groupHide'
              }, [
                button({
                  class: [
                    'btn',
                    'btn-success',
                    'btn-sm'
                  ],
                  type: 'button'
                }, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-check'
                    ]
                  })
                ])
              ]),
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
                  title: 'User age',
                  dataCtx: 'field:age'
                }, [
                  text('Age (Y)')
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
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('June Kirk')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('1,260.38')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox',
                    checked: ''
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Mathews Mcgowan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('3,072.78')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tyson Hatfield')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('1,326.09')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox',
                    checked: ''
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Stacey Gentry')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('3,318.59')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Olive Huff')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('1,747.45')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Harriet Benton')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('1,146.87')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tran Heath')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('29')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('2,510.93')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox',
                    checked: ''
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Christie Sloan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('3,022.48')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Diaz Williams')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('3,410.05')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Kelley Tyson')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('34')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('3,973.95')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Eve Snider')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('2,823.23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Baird Lynch')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('2,459.93')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Arline Chang')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('36')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('3,906.51')
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'A counter plugin',
      data: [
        {
          check: true,
          links: [
            {
              context: 'dark',
              icon: 'info-circle',
              title: 'Counter',
              href: ({query}) => {
                const msg = `Hello!\n${query.checked.length} user(s) checked!`
                window.alert(msg)
              }
            }
          ],
          items: {
            properties: prop1
          },
          default: data1
        }
      ],
      html: html(({
        table,
        thead,
        tr,
        th,
        div,
        button,
        span,
        i,
        text,
        tbody,
        td,
        input
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
                div({
                  class: [
                    'row',
                    'gx-1',
                    'justify-content-center'
                  ]
                }, [
                  div({
                    class: 'col-auto'
                  }, [
                    button({
                      class: [
                        'btn',
                        'btn-dark'
                      ],
                      type: 'button'
                    }, [
                      span({}, [
                        i({
                          class: [
                            'fa-solid',
                            'fa-info-circle'
                          ]
                        }),
                        text(' Counter')
                      ])
                    ])
                  ])
                ])
              ])
            ]),
            tr({}, [
              th({
                class: [
                  'text-center',
                  'align-middle'
                ],
                dataCtx: 'groupHide'
              }, [
                button({
                  class: [
                    'btn',
                    'btn-success',
                    'btn-sm'
                  ],
                  type: 'button'
                }, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-check'
                    ]
                  })
                ])
              ]),
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
                  title: 'User age',
                  dataCtx: 'field:age'
                }, [
                  text('Age (Y)')
                ])
              ])
            ])
          ]),
          tbody({}, [
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('June Kirk')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Mathews Mcgowan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tyson Hatfield')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Stacey Gentry')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Olive Huff')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Harriet Benton')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tran Heath')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('29')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Christie Sloan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Diaz Williams')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Kelley Tyson')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('34')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Eve Snider')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Baird Lynch')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-check-input'
                    ],
                    type: 'checkbox'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Arline Chang')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('36')
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'A CSV exporter plugin',
      data: [
        {
          links: [
            {
              context: 'secondary',
              icon: 'file',
              title: 'Export',
              mime: 'text/plain; charset=UTF-8',
              download: 'data.txt',
              href: ({rows, format, properties}) => {
                const P = properties
                const K = Object.keys(P)

                const nl = '\n'
                const sep = '\t'
                
                var data = ''
                data += K.map(k => P[k].title || k).join(sep)+nl
                data += rows
                  .map(row => K.map(k => format[k](row[k])).join(sep))
                  .join(nl)

                return data
              }
            }
          ],
          items: {
            properties: prop1
          },
          default: data1
        }
      ],
      html: html(({
        table,
        thead,
        tr,
        th,
        div,
        button,
        span,
        i,
        text,
        a,
        tbody,
        td
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
                div({
                  class: [
                    'row',
                    'gx-1',
                    'justify-content-center'
                  ]
                }, [
                  div({
                    class: 'col-auto'
                  }, [
                    button({
                      class: [
                        'btn',
                        'btn-secondary'
                      ],
                      type: 'button'
                    }, [
                      span({}, [
                        i({
                          class: [
                            'fa-solid',
                            'fa-file'
                          ]
                        }),
                        text(' Export')
                      ]),
                      a({
                        class: 'd-none',
                        href: 'data:text/plain; charset=UTF-8,',
                        download: 'data.txt'
                      })
                    ])
                  ])
                ])
              ])
            ]),
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
                  title: 'User age',
                  dataCtx: 'field:age'
                }, [
                  text('Age (Y)')
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
                text('June Kirk')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Mathews Mcgowan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tyson Hatfield')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Stacey Gentry')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Olive Huff')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Harriet Benton')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tran Heath')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('29')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Christie Sloan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Diaz Williams')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Kelley Tyson')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('34')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Eve Snider')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Baird Lynch')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Arline Chang')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('36')
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'A filter plugin',
      data: [
        {
          links: [
            {
              context: 'info',
              icon: 'filter',
              title: 'Age <= 30 AND Name contains "a"',
              init: el => {btn = el},
              href: ({data, query, refresh}) => {
                btn.disabled = true
                query.filters = [
                  row => row.age <= 30,
                  row => row.name.indexOf('a') >= 0
                ]
                refresh()
              }
            }
          ],
          items: {
            properties: prop1
          },
          default: data1
        }
      ],
      html: html(({
        table,
        thead,
        tr,
        th,
        div,
        button,
        span,
        i,
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
                class: 'text-center',
                colspan: '100%'
              }, [
                div({
                  class: [
                    'row',
                    'gx-1',
                    'justify-content-center'
                  ]
                }, [
                  div({
                    class: 'col-auto'
                  }, [
                    button({
                      class: [
                        'btn',
                        'btn-info'
                      ],
                      type: 'button'
                    }, [
                      span({}, [
                        i({
                          class: [
                            'fa-solid',
                            'fa-filter'
                          ]
                        }),
                        text(' Age <= 30 AND Name contains "a"')
                      ])
                    ])
                  ])
                ])
              ])
            ]),
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
                  title: 'User age',
                  dataCtx: 'field:age'
                }, [
                  text('Age (Y)')
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
                text('June Kirk')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Mathews Mcgowan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tyson Hatfield')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Stacey Gentry')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Olive Huff')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Harriet Benton')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tran Heath')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('29')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Christie Sloan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Diaz Williams')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Kelley Tyson')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('34')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Eve Snider')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Baird Lynch')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Arline Chang')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('36')
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'A group plugin',
      data: [
        {
          links: [
            {
              context: 'warning',
              icon: 'th',
              title: 'Group by Age',
              init: el => {btn = el},
              href: ({query, refresh}) => {
                btn.disabled = true
                query.group = ['age']
                refresh()
              }
            }
          ],
          items: {
            properties: prop2
          },
          default: data2
        }
      ],
      html: html(({
        table,
        thead,
        tr,
        th,
        div,
        button,
        span,
        i,
        text,
        td,
        tbody
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
                div({
                  class: [
                    'row',
                    'gx-1',
                    'justify-content-center'
                  ]
                }, [
                  div({
                    class: 'col-auto'
                  }, [
                    button({
                      class: [
                        'btn',
                        'btn-warning'
                      ],
                      type: 'button'
                    }, [
                      span({}, [
                        i({
                          class: [
                            'fa-solid',
                            'fa-th'
                          ]
                        }),
                        text(' Group by Age')
                      ])
                    ])
                  ])
                ])
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'text-center',
                  'align-middle'
                ],
                dataCtx: 'totals:name'
              }, [
                text('13')
              ]),
              td({
                class: [
                  'text-center',
                  'align-middle'
                ],
                dataCtx: 'totals:age'
              }, [
                text('28')
              ]),
              td({
                class: [
                  'text-center',
                  'align-middle'
                ],
                dataCtx: 'totals:balance'
              }, [
                text('33,979.24')
              ])
            ]),
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
                  title: 'User age',
                  dataCtx: 'field:age'
                }, [
                  text('Age (Y)')
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
                text('June Kirk')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('1,260.38')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Mathews Mcgowan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('3,072.78')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tyson Hatfield')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('1,326.09')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Stacey Gentry')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('3,318.59')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Olive Huff')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('1,747.45')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Harriet Benton')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('30')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('1,146.87')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Tran Heath')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('29')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('2,510.93')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Christie Sloan')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('20')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('3,022.48')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Diaz Williams')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('33')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('3,410.05')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Kelley Tyson')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('34')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('3,973.95')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Eve Snider')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('23')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('2,823.23')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Baird Lynch')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('24')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('2,459.93')
              ])
            ]),
            tr({}, [
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('Arline Chang')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('36')
              ]),
              td({
                class: [
                  'align-middle',
                  'text-center'
                ]
              }, [
                text('3,906.51')
              ])
            ])
          ])
        ])
      )
    }
  ]
})
