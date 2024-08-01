import form from './index.js'
import schema from '../../views/data/schema.js'
import users from '../../views/data/users.js'
import html from '../hyperscript/html.js'

const P = schema.items.properties
const K = Object.keys(P)
const operators = {
  ct: 'Contains',
  eq: 'Equals'
}
const O = Object.keys(operators)
var oldData = null

export default ({
  icon: 'square-check',
  title: 'form',
  description: 'Form with validation.',
  component: form,
  properties: {},
  examples: [
    {
      title: 'Empty',
      data: [
        {}
      ],
      html: html(({form}) => 
        form({
          novalidate: ''
        })
      )
    }, {
      title: 'Alert',
      data: [
        {
          description: 'Hello!\nThis is an alert!',
          context: 'info'
        }
      ],
      html: html(({
        form,
        fieldset,
        div,
        span,
        text
      }) => 
        form({
          novalidate: ''
        }, [
          fieldset({}, [
            div({
              class: [
                'alert',
                'alert-info',
                'my-0'
              ],
              role: 'alert'
            }, [
              span({
                style: {
                  whiteSpace: 'pre-wrap'
                }
              }, [
                text('Hello!\nThis is an alert!')
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'Header',
      data: [
        {
          title: 'A header',
          description: 'Associated description',
          icon: 'exclamation-circle'
        }
      ],
      html: html(({
        form,
        fieldset,
        legend,
        span,
        i,
        text,
        hr
      }) => 
        form({
          novalidate: ''
        }, [
          fieldset({}, [
            legend({
              class: [
                'fw-bold',
                'clearfix',
                'fs-5'
              ]
            }, [
              span({
                title: 'Associated description'
              }, [
                i({
                  class: [
                    'fa-solid',
                    'fa-exclamation-circle'
                  ]
                }),
                text(' A header')
              ])
            ]),
            hr({
              class: 'my-2'
            })
          ])
        ])
      )
    }, {
      title: 'Login',
      data: [
        {
          title: 'Login',
          icon: 'sign-in',
          size: 'lg',
          showValid: true,
          properties: {
            name: {
              title: '',
              type: 'string',
              description: 'Username'
            },
            pass: {
              title: '',
              type: 'string',
              ui: 'password',
              description: 'Password'
            }
          },
          block: true,
          links: [
            {
              icon: 'sign-in',
              context: 'primary',
              title: 'Login',
              href: (data) => {
                console.log(data)
              }
            }
          ]
        }
      ],
      html: html(({
        form,
        fieldset,
        legend,
        span,
        i,
        text,
        hr,
        div,
        input,
        button
      }) => 
        form({
          novalidate: ''
        }, [
          fieldset({}, [
            legend({
              class: [
                'fw-bold',
                'clearfix',
                'fs-4'
              ]
            }, [
              span({}, [
                i({
                  class: [
                    'fa-solid',
                    'fa-sign-in'
                  ]
                }),
                text(' Login')
              ])
            ]),
            hr({
              class: 'my-2'
            }),
            div({
              class: 'row'
            }, [
              div({
                class: [
                  'col-12',
                  'my-3',
                  'fs-5'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-control',
                      'form-control-lg',
                      'is-valid'
                    ],
                    type: 'text',
                    name: 'name',
                    value: '',
                    placeholder: 'Username'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              div({
                class: [
                  'col-12',
                  'my-3',
                  'fs-5'
                ]
              }, [
                div({}, [
                  input({
                    class: [
                      'validate',
                      'form-control',
                      'form-control-lg',
                      'is-valid'
                    ],
                    type: 'password',
                    name: 'pass',
                    value: '',
                    placeholder: 'Password'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ])
            ])
          ]),
          hr({
            class: 'my-2'
          }),
          div({
            class: [
              'btn-group',
              'w-100'
            ]
          }, [
            button({
              class: [
                'btn',
                'btn-primary',
                'btn-lg'
              ],
              type: 'button'
            }, [
              span({}, [
                i({
                  class: [
                    'fa-solid',
                    'fa-sign-in'
                  ]
                }),
                text(' Login')
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'Register',
      data: [
        {
          title: 'Register',
          icon: 'user',
          size: 'sm',
          showValid: true,
          properties: {
            name: {
              type: 'string'
            },
            email: {
              type: 'string'
            },
            age: {
              type: 'integer'
            },
            language: {
              type: 'string',
              enum: [
                'English',
                'Spanish',
                'Chinese'
              ]
            },
            news: {
              type: 'boolean'
            },
            bio: {
              type: 'string',
              ui: 'text'
            }
          },
          submit: data => {
            console.log(data)
          }
        }
      ],
      html: html(({
        form,
        fieldset,
        legend,
        span,
        i,
        text,
        hr,
        div,
        label,
        input,
        datalist,
        option,
        textarea,
        button
      }) => 
        form({
          novalidate: ''
        }, [
          fieldset({}, [
            legend({
              class: [
                'fw-bold',
                'clearfix',
                'fs-6'
              ]
            }, [
              span({}, [
                i({
                  class: [
                    'fa-solid',
                    'fa-user'
                  ]
                }),
                text(' Register')
              ])
            ]),
            hr({
              class: 'my-2'
            }),
            div({
              class: 'row'
            }, [
              div({
                class: [
                  'col-12',
                  'my-1',
                  'row',
                  'small'
                ]
              }, [
                div({
                  class: 'col-md-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold'
                    ]
                  }, [
                    text('name:')
                  ])
                ]),
                div({
                  class: 'col-md-9'
                }, [
                  input({
                    class: [
                      'validate',
                      'form-control',
                      'form-control-sm',
                      'is-valid'
                    ],
                    type: 'text',
                    name: 'name',
                    value: ''
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              div({
                class: [
                  'col-12',
                  'my-1',
                  'row',
                  'small'
                ]
              }, [
                div({
                  class: 'col-md-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold'
                    ]
                  }, [
                    text('email:')
                  ])
                ]),
                div({
                  class: 'col-md-9'
                }, [
                  input({
                    class: [
                      'validate',
                      'form-control',
                      'form-control-sm',
                      'is-valid'
                    ],
                    type: 'text',
                    name: 'email',
                    value: ''
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              div({
                class: [
                  'col-12',
                  'my-1',
                  'row',
                  'small'
                ]
              }, [
                div({
                  class: 'col-md-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold'
                    ]
                  }, [
                    text('age:')
                  ])
                ]),
                div({
                  class: 'col-md-9'
                }, [
                  input({
                    class: [
                      'validate',
                      'form-control',
                      'form-control-sm',
                      'is-valid'
                    ],
                    type: 'number',
                    name: 'age',
                    value: '0',
                    step: '1'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              div({
                class: [
                  'col-12',
                  'my-1',
                  'row',
                  'small'
                ]
              }, [
                div({
                  class: 'col-md-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold'
                    ]
                  }, [
                    text('language:')
                  ])
                ]),
                div({
                  class: 'col-md-9'
                }, [
                  input({
                    class: [
                      'validate',
                      'form-control',
                      'form-control-sm',
                      'is-invalid'
                    ],
                    type: 'text',
                    name: 'language',
                    value: '',
                    list: 'app_list_000000'
                  }),
                  datalist({
                    id: 'app_list_000000'
                  }, [
                    option({}, [
                      text('English')
                    ]),
                    option({}, [
                      text('Spanish')
                    ]),
                    option({}, [
                      text('Chinese')
                    ])
                  ]),
                  div({
                    class: 'invalid-feedback'
                  }, [
                    text('Must be one of the possible options.')
                  ])
                ])
              ]),
              div({
                class: [
                  'col-12',
                  'my-1',
                  'row',
                  'small'
                ]
              }, [
                div({
                  class: 'col-md-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold'
                    ]
                  }, [
                    text('news:')
                  ])
                ]),
                div({
                  class: 'col-md-9'
                }, [
                  input({
                    class: [
                      'validate',
                      'form-check-input',
                      'is-valid'
                    ],
                    type: 'checkbox',
                    name: 'news'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              div({
                class: [
                  'col-12',
                  'my-1',
                  'row',
                  'small'
                ]
              }, [
                div({
                  class: 'col-md-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold'
                    ]
                  }, [
                    text('bio:')
                  ])
                ]),
                div({
                  class: 'col-md-9'
                }, [
                  textarea({
                    class: [
                      'validate',
                      'form-control',
                      'form-control-sm',
                      'is-valid'
                    ],
                    name: 'bio',
                    rows: '6'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ])
            ])
          ]),
          hr({
            class: 'my-2'
          }),
          div({
            class: [
              'row',
              'g-1',
              'align-items-center',
              'justify-content-start'
            ]
          }, [
            div({
              class: 'col-auto'
            }, [
              button({
                class: [
                  'btn',
                  'btn-primary',
                  'btn-sm'
                ],
                type: 'button',
                disabled: ''
              }, [
                span({}, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-check'
                    ]
                  }),
                  text(' Submit')
                ])
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'Filter',
      data: [
        {
          showValid: true,
          properties: {
            field: {
              type: 'string',
              title: 'Field',
              default: K[0],
              options: K.map(k => ({
                value: k,
                label: P[k].title
              }))
            },
            operator: {
              type: 'string',
              title: 'Operator',
              default: O[0],
              options: O.map(o => ({
                value: o,
                label: operators[o]
              }))
            },
            value: {
              type: 'string',
              minLength: 1,
              title: 'Value' 
            }
          },
          submit: data => {
            console.log(data)
          },
          update: (hasErr, Data, Label, form) => {
            if (oldData == null) {
              oldData = {...Data}
              return
            }
            const anyValue = ({operator}) => [
              'ct', 'nc'
            ].indexOf(operator) >= 0

            if (!anyValue(oldData) && anyValue(Data)) {
              oldData = {...Data}
              form.setProp({
                value: {
                  type: 'string',
                  minLength: 1,
                  title: 'Value',
                  default: ''
                }
              })
            } else if (!anyValue(Data) &&
              (oldData.field != Data.field || anyValue(oldData))
            ) {
              oldData = {...Data}
              const f = Data.field
              const options = users.reduce((O, row) => {
                if (O.indexOf(row[f]) < 0) {
                  O.push(row[f])
                }
                return O
              }, [])
              options.sort()
              form.setProp({
                value: {
                  type: P[f].type,
                  ui: P[f].ui,
                  title: T('value'),
                  enum: options,
                  default: null
                }
              })
            }
          }
        }
      ],
      html: html(({
        form,
        fieldset,
        div,
        label,
        text,
        input,
        datalist,
        option,
        hr,
        button,
        span,
        i
      }) => 
        form({
          novalidate: ''
        }, [
          fieldset({}, [
            div({
              class: 'row'
            }, [
              div({
                class: [
                  'col-12',
                  'my-2',
                  'row'
                ]
              }, [
                div({
                  class: 'col-md-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold'
                    ]
                  }, [
                    text('Field:')
                  ])
                ]),
                div({
                  class: 'col-md-9'
                }, [
                  input({
                    class: [
                      'validate',
                      'form-control',
                      'is-valid'
                    ],
                    type: 'text',
                    name: 'field',
                    value: 'Id',
                    list: 'app_list_000000'
                  }),
                  datalist({
                    id: 'app_list_000000'
                  }, [
                    option({}, [
                      text('Id')
                    ]),
                    option({}, [
                      text('Name')
                    ]),
                    option({}, [
                      text('Age (Y)')
                    ]),
                    option({}, [
                      text('Balance ($)')
                    ])
                  ]),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              div({
                class: [
                  'col-12',
                  'my-2',
                  'row'
                ]
              }, [
                div({
                  class: 'col-md-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold'
                    ]
                  }, [
                    text('Operator:')
                  ])
                ]),
                div({
                  class: 'col-md-9'
                }, [
                  input({
                    class: [
                      'validate',
                      'form-control',
                      'is-valid'
                    ],
                    type: 'text',
                    name: 'operator',
                    value: 'Contains',
                    list: 'app_list_000000'
                  }),
                  datalist({
                    id: 'app_list_000000'
                  }, [
                    option({}, [
                      text('Contains')
                    ]),
                    option({}, [
                      text('Equals')
                    ])
                  ]),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              div({
                class: [
                  'col-12',
                  'my-2',
                  'row'
                ]
              }, [
                div({
                  class: 'col-md-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold'
                    ]
                  }, [
                    text('Value:')
                  ])
                ]),
                div({
                  class: 'col-md-9'
                }, [
                  input({
                    class: [
                      'validate',
                      'form-control',
                      'is-invalid'
                    ],
                    type: 'text',
                    name: 'value',
                    value: ''
                  }),
                  div({
                    class: 'invalid-feedback'
                  }, [
                    text('Must be a minimum of 1 character(s).')
                  ])
                ])
              ])
            ])
          ]),
          hr({
            class: 'my-2'
          }),
          div({
            class: [
              'row',
              'g-1',
              'align-items-center',
              'justify-content-start'
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
                span({}, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-check'
                    ]
                  }),
                  text(' Submit')
                ])
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'Edit form',
      data: [
        {
          properties: {
            id: {
              default: 27,
              readOnly: true
            }, 
            name: {
              default: 'Josh',
              minLength: 2
            }, 
            age: {
              default: 30,
              readOnly: true,
              writeOnly: true
            }
          },
          submit: data => {
            console.log(data)
          }
        }
      ],
      html: html(({
        form,
        fieldset,
        div,
        label,
        text,
        input,
        hr,
        button,
        span,
        i
      }) => 
        form({
          novalidate: ''
        }, [
          fieldset({}, [
            div({
              class: 'row'
            }, [
              div({
                class: [
                  'col-12',
                  'my-2',
                  'row'
                ]
              }, [
                div({
                  class: 'col-md-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold'
                    ]
                  }, [
                    text('id:')
                  ])
                ]),
                div({
                  class: 'col-md-9'
                }, [
                  text('27')
                ])
              ]),
              div({
                class: [
                  'col-12',
                  'my-2',
                  'row'
                ]
              }, [
                div({
                  class: 'col-md-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold'
                    ]
                  }, [
                    text('name:')
                  ])
                ]),
                div({
                  class: 'col-md-9'
                }, [
                  input({
                    class: [
                      'validate',
                      'form-control'
                    ],
                    type: 'text',
                    name: 'name',
                    value: 'Josh'
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ]),
              div({
                class: [
                  'col-12',
                  'my-2',
                  'row'
                ]
              }, [
                div({
                  class: 'col-md-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold'
                    ]
                  }, [
                    text('age:')
                  ])
                ]),
                div({
                  class: 'col-md-9'
                }, [
                  input({
                    class: [
                      'validate',
                      'form-control'
                    ],
                    type: 'number',
                    name: 'age',
                    value: '30',
                    step: '1',
                    disabled: ''
                  }),
                  div({
                    class: 'invalid-feedback'
                  })
                ])
              ])
            ])
          ]),
          hr({
            class: 'my-2'
          }),
          div({
            class: [
              'row',
              'g-1',
              'align-items-center',
              'justify-content-start'
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
                span({}, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-check'
                    ]
                  }),
                  text(' Submit')
                ])
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'Static',
      data: [
        {
          css: 'container card my-5 p-3',
          title: 'User: Mathews Mcgowan',
          description: 'Single user entry',
          readOnly: true,
          close: () => {window.alert('close')},
          properties: {
            id: {
              type: 'integer',
              title: 'Id',
              description: 'User id',
              default: 0,
              href: '#/users/{id}',
              totals: 'count'
            },
            name: {
              type: 'string',
              title: 'Name',
              description: 'User name',
              default: '',
              minLength: 1,
              maxLength: 255
            }, 
            age: {
              type: 'integer',
              title: 'Age (Y)',
              description: 'User age',
              default: 18,
              minimum: 18,
              maximum: 99,
              totals: 'avg'
            }, 
            balance: {
              type: 'number',
              title: 'Balance ($)',
              default: 0,
              minimum: 1000,
              maximum: 4000,
              ui: 'num.2',
              totals: 'sum'
            }
          },
          default: {
            id: 1,
            name: 'Mathews Mcgowan',
            age: 24,
            balance: 3072.78
          },
          links: [
            {
              context: 'danger',
              icon: 'trash',
              title: 'Delete',
              href: () => {window.alert('delete')}
            }, {
              context: 'warning',
              icon: 'edit',
              title: 'Edit',
              href: () => {window.alert('edit')}
            }
          ]
        }
      ],
      html: html(({
        form,
        fieldset,
        legend,
        span,
        text,
        button,
        hr,
        div,
        label,
        a,
        i
      }) => 
        form({
          class: [
            'container',
            'card',
            'my-5',
            'p-3'
          ],
          novalidate: ''
        }, [
          fieldset({}, [
            legend({
              class: [
                'fw-bold',
                'clearfix',
                'fs-5'
              ]
            }, [
              span({
                title: 'Single user entry'
              }, [
                text('User: Mathews Mcgowan')
              ]),
              button({
                type: 'button',
                class: [
                  'btn-close',
                  'float-end'
                ]
              })
            ]),
            hr({
              class: 'my-2'
            }),
            div({
              class: 'row'
            }, [
              div({
                class: [
                  'col-12',
                  'my-2',
                  'row'
                ]
              }, [
                div({
                  class: 'col-md-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold'
                    ],
                    title: 'User id'
                  }, [
                    text('Id:')
                  ])
                ]),
                div({
                  class: 'col-md-9'
                }, [
                  a({
                    href: '#/users/1'
                  }, [
                    text('1')
                  ])
                ])
              ]),
              div({
                class: [
                  'col-12',
                  'my-2',
                  'row'
                ]
              }, [
                div({
                  class: 'col-md-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold'
                    ],
                    title: 'User name'
                  }, [
                    text('Name:')
                  ])
                ]),
                div({
                  class: 'col-md-9'
                }, [
                  text('Mathews Mcgowan')
                ])
              ]),
              div({
                class: [
                  'col-12',
                  'my-2',
                  'row'
                ]
              }, [
                div({
                  class: 'col-md-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold'
                    ],
                    title: 'User age'
                  }, [
                    text('Age (Y):')
                  ])
                ]),
                div({
                  class: 'col-md-9'
                }, [
                  text('24')
                ])
              ]),
              div({
                class: [
                  'col-12',
                  'my-2',
                  'row'
                ]
              }, [
                div({
                  class: 'col-md-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold'
                    ]
                  }, [
                    text('Balance ($):')
                  ])
                ]),
                div({
                  class: 'col-md-9'
                }, [
                  text('3,072.78')
                ])
              ])
            ])
          ]),
          hr({
            class: 'my-2'
          }),
          div({
            class: [
              'row',
              'g-1',
              'align-items-center',
              'justify-content-start'
            ]
          }, [
            div({
              class: 'col-auto'
            }, [
              button({
                class: [
                  'btn',
                  'btn-danger'
                ],
                type: 'button'
              }, [
                span({}, [
                  i({
                    class: [
                      'fa-solid',
                      'fa-trash'
                    ]
                  }),
                  text(' Delete')
                ])
              ])
            ]),
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
                      'fa-edit'
                    ]
                  }),
                  text(' Edit')
                ])
              ])
            ])
          ])
        ])
      )
    }
  ]
})
