import {html, table} from '../components.js'
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
      title: 'Table with pagination',
      data: [
        {
          pagination: '📖',
          items: {
            properties: prop1
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
            properties: prop1
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
            properties: prop1
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
            properties: prop1
          },
          default: data1
        }
      ]
    }, {
      title: 'Table with totals',
      data: [
        {
          items: {
            properties: prop2
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
            properties: prop2
          },
          default: data2
        }
      ]
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
              init: el => {btn = el},
              href: () => {
                const tbl = btn.closest('table')
                const {query} = tbl.read()
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
      ]
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
              init: el => {btn = el},
              href: () => {
                const tbl = btn.closest('table')
                const {rows, format, properties} = tbl.read()
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
      ]
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
              href: () => {
                const tbl = btn.closest('table')
                const {rows} = tbl.read()
                btn.disabled = true
                tbl.setData(rows.filter(({
                  age, name
                }) => age <= 30 && name.indexOf('a') >= 0))
              }
            }
          ],
          items: {
            properties: prop1
          },
          default: data1
        }
      ]
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
              href: () => {
                const tbl = btn.closest('table')
                btn.disabled = true
                const {query} = tbl.read()
                query.group = ['age']
                tbl.refresh()
              }
            }
          ],
          items: {
            properties: prop2
          },
          default: data2
        }
      ]
    }
  ]
})
