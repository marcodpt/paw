import html from '../hyperscript/html.js'
import table from './index.js'

export default ({
  icon: 'table',
  title: 'table',
  description: 'Table with many integrated functionalities.',
  component: table,
  properties: {},
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
          default: [
            {
              name: 'Alice',
              balance: 1400.20
            }, {
              name: 'Bob',
              balance: 1250.34
            }
          ]
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
    }
  ]
})
