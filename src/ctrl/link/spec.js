import html from '../../node/html.js'
import opt from '../options.js'
import tag from '../tag/spec.js'
import {wait} from '../../lib.js'

var ref = null
export default ({
  icon: 'link',
  title: 'link',
  description: 'Buttons and links.',
  properties: {
    context: {
      type: 'string',
      enum: opt('context', true),
      description: `
        One of the bootstrap 5 button variants.
        If href is a string, the default value is: link.
        Otherwise, the default value is: primary.
      `
    },
    href: {
      type: 'string',
      description: `
        A string <a> or a function <button>.
        If a string is passed, the data object will be used to interpolate the URL {vars}.
        If a function is passed, data will be passed as the first parameter when clicked. 
        An empty string generates a disabled link, any other falsy value a disabled button.
        Only if href is a string and contains a protocol (://) will the target be _blank.
      `
    },
    size: {
      type: 'string',
      description: `
        The size of the link.
        Medium size link is the default.
      `,
      enum: ['sm', 'lg']
    },
    data: {
      type: 'object',
      description: `
        If href is a string, it will be used to interpolate the URL {vars}.
        If href is a function, it will be passed as the first param when clicked.
      `
    },
    ...tag.properties
  },
  examples: [
    {
      title: 'A link to home',
      data: [
        {
          title: 'Go Home!',
          href: '#/'
        }, {
          title: 'Go Home!',
          href: '#/',
          description: '',
          icon: '',
          size: 'xxx',
          data: {
            x: 'dog'
          }
        }, {
          title: 'Go Home!',
          href: '#/',
          description: '',
          icon: '',
          size: '',
          data: null
        }
      ],
      html: html(({
        a,
        text
      }) => 
        a({
          href: '#/'
        }, [
          text('Go Home!')
        ])
      )
    }, {
      title: 'A external link with target _blank',
      data: [
        {
          icon: '@github',
          title: 'Repository',
          href: 'https://github.com/marcodpt/paw'
        }
      ],
      html: html(({
        a,
        span,
        i,
        sup,
        text
      }) => 
        a({
          href: 'https://github.com/marcodpt/paw',
          target: '_blank'
        }, [
          span({}, [
            i({
              class: [
                'fa-brands',
                'fa-github'
              ]
            }),
            text(' Repository')
          ]),
          sup({}, [
            text(' '),
            i({
              class: [
                'small',
                'fa-solid',
                'fa-arrow-up-right-from-square'
              ]
            })
          ])
        ])
      )
    }, {
      title: 'A external link with target _blank and no title',
      data: [
        {
          icon: 'home',
          href: 'https://github.com/marcodpt/paw'
        }
      ],
      html: html(({
        a,
        span,
        i,
        sup,
        text
      }) => 
        a({
          href: 'https://github.com/marcodpt/paw',
          target: '_blank'
        }, [
          i({
            class: [
              'fa-solid',
              'fa-home'
            ]
          })
        ])
      )
    }, {
      title: 'A button that says hello!',
      data: [
        {
          title: 'Hi!',
          href: () => {
            ref.closest('div').innerHTML = html(({
              h1,
              text
            }) => 
              h1({}, [
                text('Hello!')
              ])
            )
          },
          init: btn => {
            ref = btn
          }
        }
      ],
      html: html(({
        button,
        text
      }) => 
        button({
          class: [
            'btn',
            'btn-primary'
          ],
          type: 'button'
        }, [
          text('Hi!')
        ])
      )
    }, {
      title: 'A blocked default link!',
      data: [
        {
          icon: 'times',
          title: 'No action!',
          href: ''
        }
      ],
      html: html(({
        a,
        span,
        i,
        text
      }) => 
        a({
          class: [
            'btn',
            'btn-link',
            'disabled'
          ],
          href: 'javascript:;'
        }, [
          span({}, [
            i({
              class: [
                'fa-solid',
                'fa-times'
              ]
            }),
            text(' No action!')
          ])
        ])
      )
    }, {
      title: 'A blocked default button!',
      data: [
        {
          icon: 'times',
          title: 'No action!',
          href: false
        }
      ],
      html: html(({
        button,
        span,
        i,
        text
      }) => 
        button({
          class: [
            'btn',
            'btn-primary',
            'disabled'
          ],
          type: 'button'
        }, [
          span({}, [
            i({
              class: [
                'fa-solid',
                'fa-times'
              ]
            }),
            text(' No action!')
          ])
        ])
      )
    }, {
      title: 'A link with data, size and description!',
      data: [
        {
          icon: 'house',
          title: 'Home',
          href: '#/?user={user}&id={id}',
          data: {
            user: 'josh',
            id: 34
          },
          size: 'sm'
        }
      ],
      html: html(({
        a,
        span,
        i,
        text
      }) => 
        a({
          class: [
            'btn',
            'btn-link',
            'btn-sm'
          ],
          href: '#/?user=josh&id=34'
        }, [
          span({}, [
            i({
              class: [
                'fa-solid',
                'fa-house'
              ]
            }),
            text(' Home')
          ])
        ])
      )
    }, {
      title: 'A button with data, size, link and description!',
      data: [
        {
          icon: 'face-smile',
          context: 'warning',
          title: 'Greetings',
          description: 'My hello message!',
          href: data => {
            ref.closest('div').innerHTML = '<h1>Hello '+data+'!</h1>'
          },
          init: btn => {
            ref = btn
          },
          data: 'josh',
          size: 'lg'
        }
      ],
      html: html(({
        button,
        span,
        i,
        text
      }) => 
        button({
          class: [
            'btn',
            'btn-warning',
            'btn-lg'
          ],
          title: 'My hello message!',
          type: 'button'
        }, [
          span({}, [
            i({
              class: [
                'fa-solid',
                'fa-face-smile'
              ]
            }),
            text(' Greetings')
          ])
        ])
      )
    }, {
      title: 'A download link with delay',
      data: [
        {
          icon: 'database',
          context: 'secondary',
          title: 'Backup',
          description: 'Sample backup!',
          href: data => wait(1000).then(() => `Hello ${data}!`),
          data: 'josh',
          download: 'sample.txt',
          mime: 'text/plain'
        }
      ],
      html: html(({
        button,
        span,
        i,
        text,
        a
      }) => 
        button({
          class: [
            'btn',
            'btn-secondary'
          ],
          title: 'Sample backup!',
          type: 'button'
        }, [
          span({}, [
            i({
              class: [
                'fa-solid',
                'fa-database'
              ]
            }),
            text(' Backup')
          ]),
          a({
            class: 'd-none',
            href: 'data:text/plain,',
            download: 'sample.txt'
          })
        ])
      )
    }, {
      title: 'A dropdown button',
      data: [
        {
          icon: 'flask',
          context: 'secondary',
          title: 'Dropdown',
          href: '',
          links: [
            {
              icon: 'face-smile',
              title: 'Say Hi!',
              href: () => {window.alert('Hi!')}
            }, {
              icon: 'home',
              title: 'Go Home!',
              href: '#/'
            }, {
              icon: '@github',
              title: ' Repository',
              href: 'https://github.com/marcodpt/paw'
            }, {
              icon: 'times',
              title: 'No Action!'
            }
          ]
        }
      ],
      html: html(({
        div,
        button,
        span,
        i,
        sup,
        text,
        ul,
        li,
        a
      }) => 
        div({
          class: 'btn-group'
        }, [
          button({
            class: [
              'btn',
              'btn-secondary',
              'dropdown-toggle'
            ],
            type: 'button',
            dataBsToggle: 'dropdown',
            ariaExpanded: 'false'
          }, [
            span({}, [
              i({
                class: [
                  'fa-solid',
                  'fa-flask'
                ]
              }),
              text(' Dropdown')
            ])
          ]),
          ul({
            class: 'dropdown-menu'
          }, [
            li({}, [
              a({
                class: 'dropdown-item',
                href: 'javascript:;'
              }, [
                span({}, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-face-smile'
                    ]
                  }),
                  text(' Say Hi!')
                ])
              ])
            ]),
            li({}, [
              a({
                class: 'dropdown-item',
                href: '#/'
              }, [
                span({}, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-home'
                    ]
                  }),
                  text(' Go Home!')
                ])
              ])
            ]),
            li({}, [
              a({
                class: 'dropdown-item',
                href: 'https://github.com/marcodpt/paw',
                target: '_blank'
              }, [
                span({}, [
                  i({
                    class: [
                      'fa-brands',
                      'fa-github'
                    ]
                  }),
                  text(' Repository')
                ]),
                sup({}, [
                  text(' '),
                  i({
                    class: [
                      'small',
                      'fa-solid',
                      'fa-arrow-up-right-from-square'
                    ]
                  })
                ])
              ])
            ]),
            li({}, [
              a({
                class: [
                  'dropdown-item',
                  'disabled'
                ],
                href: 'javascript:;',
                ariaDisabled: 'true'
              }, [
                span({}, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-times'
                    ]
                  }),
                  text(' No Action!')
                ])
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'A dropdown split button large',
      data: [
        {
          icon: 'face-smile',
          context: 'warning',
          title: 'Say Hi!',
          href: () => {window.alert('Hi!')},
          size: 'lg',
          links: [
            {
              icon: 'face-smile',
              title: 'Say Hi!',
              href: () => {window.alert('Hi!')}
            }, {
              icon: 'home',
              title: 'Go Home!',
              href: '#/'
            }, {
              icon: 'times',
              title: 'No Action!'
            }
          ]
        }
      ],
      html: html(({
        div,
        button,
        span,
        i,
        text,
        ul,
        li,
        a
      }) => 
        div({
          class: 'btn-group'
        }, [
          button({
            class: [
              'btn',
              'btn-warning',
              'btn-lg'
            ],
            type: 'button'
          }, [
            span({}, [
              i({
                class: [
                  'fa-solid',
                  'fa-face-smile'
                ]
              }),
              text(' Say Hi!')
            ])
          ]),
          button({
            class: [
              'btn',
              'btn-warning',
              'btn-lg',
              'dropdown-toggle',
              'dropdown-toggle-split'
            ],
            type: 'button',
            dataBsToggle: 'dropdown',
            ariaExpanded: 'false'
          }),
          ul({
            class: 'dropdown-menu'
          }, [
            li({}, [
              a({
                class: 'dropdown-item',
                href: 'javascript:;'
              }, [
                span({}, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-face-smile'
                    ]
                  }),
                  text(' Say Hi!')
                ])
              ])
            ]),
            li({}, [
              a({
                class: 'dropdown-item',
                href: '#/'
              }, [
                span({}, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-home'
                    ]
                  }),
                  text(' Go Home!')
                ])
              ])
            ]),
            li({}, [
              a({
                class: [
                  'dropdown-item',
                  'disabled'
                ],
                href: 'javascript:;',
                ariaDisabled: 'true'
              }, [
                span({}, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-times'
                    ]
                  }),
                  text(' No Action!')
                ])
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'A dropdown split link small',
      data: [
        {
          icon: 'home',
          context: 'info',
          title: 'Go Home!',
          href: '#/',
          size: 'sm',
          links: [
            {
              icon: 'face-smile',
              title: 'Say Hi!',
              href: () => {window.alert('Hi!')}
            }, {
              icon: 'home',
              title: 'Go Home!',
              href: '#/'
            }, {
              icon: 'times',
              title: 'No Action!'
            }
          ]
        }
      ],
      html: html(({
        div,
        a,
        span,
        i,
        text,
        button,
        ul,
        li
      }) => 
        div({
          class: 'btn-group'
        }, [
          a({
            class: [
              'btn',
              'btn-info',
              'btn-sm'
            ],
            href: '#/'
          }, [
            span({}, [
              i({
                class: [
                  'fa-solid',
                  'fa-home'
                ]
              }),
              text(' Go Home!')
            ])
          ]),
          button({
            class: [
              'btn',
              'btn-info',
              'btn-sm',
              'dropdown-toggle',
              'dropdown-toggle-split'
            ],
            type: 'button',
            dataBsToggle: 'dropdown',
            ariaExpanded: 'false'
          }),
          ul({
            class: 'dropdown-menu'
          }, [
            li({}, [
              a({
                class: 'dropdown-item',
                href: 'javascript:;'
              }, [
                span({}, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-face-smile'
                    ]
                  }),
                  text(' Say Hi!')
                ])
              ])
            ]),
            li({}, [
              a({
                class: 'dropdown-item',
                href: '#/'
              }, [
                span({}, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-home'
                    ]
                  }),
                  text(' Go Home!')
                ])
              ])
            ]),
            li({}, [
              a({
                class: [
                  'dropdown-item',
                  'disabled'
                ],
                href: 'javascript:;',
                ariaDisabled: 'true'
              }, [
                span({}, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-times'
                    ]
                  }),
                  text(' No Action!')
                ])
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'A disabled dropdown button',
      data: [
        {
          icon: 'flask',
          context: 'secondary',
          title: 'Dropdown',
          href: '',
          links: []
        }
      ],
      html: html(({
        div,
        button,
        span,
        i,
        text,
        ul
      }) => 
        div({
          class: 'btn-group'
        }, [
          button({
            class: [
              'btn',
              'btn-secondary',
              'disabled',
              'dropdown-toggle'
            ],
            type: 'button',
            dataBsToggle: 'dropdown',
            ariaExpanded: 'false'
          }, [
            span({}, [
              i({
                class: [
                  'fa-solid',
                  'fa-flask'
                ]
              }),
              text(' Dropdown')
            ])
          ]),
          ul({
            class: 'dropdown-menu'
          })
        ])
      )
    }, {
      title: 'A disabled dropdown split button small',
      data: [
        {
          icon: 'face-smile',
          context: 'warning',
          title: 'Say Hi!',
          href: () => {window.alert('Hi!')},
          size: 'sm',
          links: []
        }
      ],
      html: html(({
        div,
        button,
        span,
        i,
        text,
        ul
      }) => 
        div({
          class: 'btn-group'
        }, [
          button({
            class: [
              'btn',
              'btn-warning',
              'btn-sm'
            ],
            type: 'button'
          }, [
            span({}, [
              i({
                class: [
                  'fa-solid',
                  'fa-face-smile'
                ]
              }),
              text(' Say Hi!')
            ])
          ]),
          button({
            class: [
              'btn',
              'btn-warning',
              'btn-sm',
              'disabled',
              'dropdown-toggle',
              'dropdown-toggle-split'
            ],
            type: 'button',
            dataBsToggle: 'dropdown',
            ariaExpanded: 'false'
          }),
          ul({
            class: 'dropdown-menu'
          })
        ])
      )
    }, {
      title: 'A disabled dropdown split link large',
      data: [
        {
          icon: 'home',
          context: 'info',
          title: 'Go Home!',
          href: '#/',
          size: 'lg',
          links: []
        }
      ],
      html: html(({
        div,
        a,
        span,
        i,
        text,
        button,
        ul
      }) => 
        div({
          class: 'btn-group'
        }, [
          a({
            class: [
              'btn',
              'btn-info',
              'btn-lg'
            ],
            href: '#/'
          }, [
            span({}, [
              i({
                class: [
                  'fa-solid',
                  'fa-home'
                ]
              }),
              text(' Go Home!')
            ])
          ]),
          button({
            class: [
              'btn',
              'btn-info',
              'btn-lg',
              'disabled',
              'dropdown-toggle',
              'dropdown-toggle-split'
            ],
            type: 'button',
            dataBsToggle: 'dropdown',
            ariaExpanded: 'false'
          }),
          ul({
            class: 'dropdown-menu'
          })
        ])
      )
    }, {
      title: 'Modal close button',
      data: [
        {
          context: 'secondary',
          icon: 'times',
          title: 'Close',
          bs: {
            dismiss: 'modal'
          }
        }
      ],
      html: html(({
        button,
        span,
        i,
        text
      }) => 
        button({
          class: [
            'btn',
            'btn-secondary'
          ],
          type: 'button',
          dataBsDismiss: 'modal'
        }, [
          span({}, [
            i({
              class: [
                'fa-solid',
                'fa-times'
              ]
            }),
            text(' Close')
          ])
        ])
      )
    }
  ]
})
