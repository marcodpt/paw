import html from '../node/html.js'
import {form} from '../components.js'
import schema from '../../views/data/schema.js'
import users from '../../views/data/users.js'

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
  args: [
    {
      type: 'object',
      properties: {
        css: {
          type: ['string', 'array'],
          description: `Classes to apply to the returned node.`,
          default: ''
        },
        update: {
          type: 'function',
          description: `
            Function that is called every time a form field is updated.
            When rendering the form, update is also called with the default values.
          `,
          args: [
            {
              title: 'error',
              type: 'boolean',
              description: `Whether the form fields passed validation.`
            },
            {
              title: 'Data',
              type: 'object',
              description: `
                Form data, regardless of whether it passes validation.
              `
            }, {
              title: 'Label',
              type: 'object',
              description: `
                Associated formatted text of each data property.
                In the case of options present, it will bear the associated label.
              `
            }
          ]
        },
        submit: {
          type: 'function',
          description: `
            Function that will be called when submitting the form.
            And if validation passes.
          `,
          args: [
            {
              title: 'Data',
              type: 'object',
              description: `Form data.`
            }, {
              title: 'Label',
              type: 'object',
              description: `
                Associated formatted text of each data property.
                In the case of options present, it will bear the associated label.
              `
            }
          ],
          returns: {
            type: ['string', 'null'],
            default: null,
            description: `
              When the download and mime properties are passed.
              If submit returns a string, it will be treated as downloadable content.
            `
          }
        },
        links: {
          type: 'array',
          description: `
            Links that will be displayed at the end of the form.
            Use href: 'submit' to create a submit button.
          `
        },
        align: {
          type: 'string',
          default: 'start',
          enum: [
            'block',
            'start',
            'center',
            'end'
          ],
          description: `
            The layout of the links on the screen:
             - block: occupy everything without leaving empty spaces.
             - start: align at the beginning.
             - center: align in the center.
             - end: align at the end.
          `
        },
        download: {
          type: 'string',
          default: '',
          description: `
            The name of the file to download when upload returns its contents.
          `
        },
        mime: {
          type: 'string',
          default: '',
          description: `
            The MIME of the file to download when upload returns its contents.
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
        text
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
            ])
          ])
        ])
      )
    }, {
      title: 'Header with close bs dismiss.',
      data: [
        {
          title: 'A header',
          description: 'Associated description',
          icon: 'exclamation-circle',
          close: 'modal'
        }
      ],
      html: html(({
        form,
        fieldset,
        legend,
        span,
        i,
        text,
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
              ]),
              button({
                type: 'button',
                class: [
                  'btn-close',
                  'float-end'
                ],
                dataBsDismiss: 'modal'
              })
            ])
          ])
        ])
      )
    }, {
      title: 'Header with close function.',
      data: [
        {
          title: 'A header',
          description: 'Associated description',
          icon: 'exclamation-circle',
          close: () => {window.alert('close')}
        }
      ],
      html: html(({
        form,
        fieldset,
        legend,
        span,
        i,
        text,
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
              ]),
              button({
                type: 'button',
                class: [
                  'btn-close',
                  'float-end'
                ]
              })
            ])
          ])
        ])
      )
    }, {
      title: 'Header with close',
      data: [
        {
          title: 'A header',
          description: 'Associated description',
          icon: 'exclamation-circle',
          close: 'modal',
          align: 'end',
          links: [
            {
              icon: 'times',
              href: 'modal',
              title: 'Close',
              context: 'secondary'
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
        button,
        hr,
        div,
        a
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
              ]),
              button({
                type: 'button',
                class: [
                  'btn-close',
                  'float-end'
                ],
                dataBsDismiss: 'modal'
              })
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
              'justify-content-end'
            ]
          }, [
            div({
              class: 'col-auto'
            }, [
              a({
                class: [
                  'btn',
                  'btn-secondary'
                ],
                href: 'modal'
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
            ])
          ])
        ])
      )
    }, {
      title: 'Header with confirm',
      data: [
        {
          title: 'A header',
          description: 'Associated description',
          icon: 'exclamation-circle',
          align: 'center',
          links: [
            {
              icon: 'check',
              href: () => {window.alert('submit')},
              title: 'Submit'
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
      title: 'An alert message',
      data: [
        {
          icon: 'info-circle',
          title: 'Alert',
          description: 'This is an example of an alert modal.\n\nWith a message to the user.',
          context: 'warning',
          close: 'modal',
          align: 'end',
          links: [
            {
              icon: 'times',
              href: 'modal',
              title: 'Close',
              context: 'secondary'
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
        button,
        hr,
        div,
        a
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
                title: 'This is an example of an alert modal.\n\nWith a message to the user.'
              }, [
                i({
                  class: [
                    'fa-solid',
                    'fa-info-circle'
                  ]
                }),
                text(' Alert')
              ]),
              button({
                type: 'button',
                class: [
                  'btn-close',
                  'float-end'
                ],
                dataBsDismiss: 'modal'
              })
            ]),
            hr({
              class: 'my-2'
            }),
            div({
              class: [
                'alert',
                'alert-warning',
                'my-0'
              ],
              role: 'alert'
            }, [
              span({
                style: {
                  whiteSpace: 'pre-wrap'
                }
              }, [
                text('This is an example of an alert modal.\n\nWith a message to the user.')
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
              'justify-content-end'
            ]
          }, [
            div({
              class: 'col-auto'
            }, [
              a({
                class: [
                  'btn',
                  'btn-secondary'
                ],
                href: 'modal'
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
            ])
          ])
        ])
      )
    }, {
      title: 'A confirm action',
      data: [
        {
          icon: 'circle-question',
          title: 'Confirm',
          description: 'This is an example of a confirmation dialog.',
          context: 'info',
          close: 'modal',
          align: 'end',
          links: [
            {
              icon: 'times',
              href: 'modal',
              title: 'Close',
              context: 'secondary'
            }, {
              icon: 'check',
              href: () => {window.alert('submit')},
              title: 'Submit'
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
        button,
        hr,
        div,
        a
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
                title: 'This is an example of a confirmation dialog.'
              }, [
                i({
                  class: [
                    'fa-solid',
                    'fa-circle-question'
                  ]
                }),
                text(' Confirm')
              ]),
              button({
                type: 'button',
                class: [
                  'btn-close',
                  'float-end'
                ],
                dataBsDismiss: 'modal'
              })
            ]),
            hr({
              class: 'my-2'
            }),
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
                text('This is an example of a confirmation dialog.')
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
              'justify-content-end'
            ]
          }, [
            div({
              class: 'col-auto'
            }, [
              a({
                class: [
                  'btn',
                  'btn-secondary'
                ],
                href: 'modal'
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
          align: 'block',
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
                div({
                  class: 'position-relative'
                }, [
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
                div({
                  class: 'position-relative'
                }, [
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
          },
          links: [
            {
              title: 'Submit',
              href: 'submit'
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
        label,
        input,
        button,
        textarea
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
                  class: 'col-sm-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold',
                      'small'
                    ]
                  }, [
                    text('name:')
                  ])
                ]),
                div({
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
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
                  class: 'col-sm-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold',
                      'small'
                    ]
                  }, [
                    text('email:')
                  ])
                ]),
                div({
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
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
                  class: 'col-sm-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold',
                      'small'
                    ]
                  }, [
                    text('age:')
                  ])
                ]),
                div({
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
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
                  class: 'col-sm-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold',
                      'small'
                    ]
                  }, [
                    text('language:')
                  ])
                ]),
                div({
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
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
                    autocomplete: 'off'
                  }),
                  div({
                    class: [
                      'list-group',
                      'd-none',
                      'w-100',
                      'position-absolute',
                      'z-3',
                      'small'
                    ]
                  }, [
                    button({
                      class: [
                        'py-1',
                        'list-group-item',
                        'list-group-item-action'
                      ]
                    }, [
                      text('English')
                    ]),
                    button({
                      class: [
                        'py-1',
                        'list-group-item',
                        'list-group-item-action'
                      ]
                    }, [
                      text('Spanish')
                    ]),
                    button({
                      class: [
                        'py-1',
                        'list-group-item',
                        'list-group-item-action'
                      ]
                    }, [
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
                  class: 'col-sm-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold',
                      'small'
                    ]
                  }, [
                    text('news:')
                  ])
                ]),
                div({
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
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
                  class: 'col-sm-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold',
                      'small'
                    ]
                  }, [
                    text('bio:')
                  ])
                ]),
                div({
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
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
              class: 'col-auto',
              title: 'language: Must be one of the possible options.'
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
      title: 'Register with hidden fields',
      data: [
        {
          title: 'Register',
          icon: 'user',
          properties: {
            name: {
              type: 'string'
            },
            email: {
              type: 'string'
            },
            age: {
              type: 'integer',
              default: 30,
              ui: 'hide'
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
              type: 'boolean',
              default: true,
              ui: 'hide'
            },
            bio: {
              type: 'string',
              ui: 'text'
            }
          },
          submit: data => {
            console.log(data)
          },
          links: [
            {
              title: 'Submit',
              href: 'submit'
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
        label,
        input,
        button,
        textarea
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
                  'my-2',
                  'row'
                ]
              }, [
                div({
                  class: 'col-sm-3'
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
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
                }, [
                  input({
                    class: [
                      'validate',
                      'form-control'
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
                  'my-2',
                  'row'
                ]
              }, [
                div({
                  class: 'col-sm-3'
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
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
                }, [
                  input({
                    class: [
                      'validate',
                      'form-control'
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
                  'my-2',
                  'row'
                ]
              }, [
                div({
                  class: 'col-sm-3'
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
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
                }, [
                  input({
                    class: [
                      'validate',
                      'form-control',
                      'is-invalid'
                    ],
                    type: 'text',
                    name: 'language',
                    value: '',
                    autocomplete: 'off'
                  }),
                  div({
                    class: [
                      'list-group',
                      'd-none',
                      'w-100',
                      'position-absolute',
                      'z-3'
                    ]
                  }, [
                    button({
                      class: [
                        'py-1',
                        'list-group-item',
                        'list-group-item-action'
                      ]
                    }, [
                      text('English')
                    ]),
                    button({
                      class: [
                        'py-1',
                        'list-group-item',
                        'list-group-item-action'
                      ]
                    }, [
                      text('Spanish')
                    ]),
                    button({
                      class: [
                        'py-1',
                        'list-group-item',
                        'list-group-item-action'
                      ]
                    }, [
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
                  'my-2',
                  'row'
                ]
              }, [
                div({
                  class: 'col-sm-3'
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
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
                }, [
                  textarea({
                    class: [
                      'validate',
                      'form-control'
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
              class: 'col-auto',
              title: 'language: Must be one of the possible options.'
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
        button,
        hr,
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
                  class: 'col-sm-3'
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
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
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
                    autocomplete: 'off'
                  }),
                  div({
                    class: [
                      'list-group',
                      'd-none',
                      'w-100',
                      'position-absolute',
                      'z-3'
                    ]
                  }, [
                    button({
                      class: [
                        'py-1',
                        'list-group-item',
                        'list-group-item-action',
                        'active'
                      ]
                    }, [
                      text('Id')
                    ]),
                    button({
                      class: [
                        'py-1',
                        'list-group-item',
                        'list-group-item-action'
                      ]
                    }, [
                      text('Name')
                    ]),
                    button({
                      class: [
                        'py-1',
                        'list-group-item',
                        'list-group-item-action'
                      ]
                    }, [
                      text('Age (Y)')
                    ]),
                    button({
                      class: [
                        'py-1',
                        'list-group-item',
                        'list-group-item-action'
                      ]
                    }, [
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
                  class: 'col-sm-3'
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
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
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
                    autocomplete: 'off'
                  }),
                  div({
                    class: [
                      'list-group',
                      'd-none',
                      'w-100',
                      'position-absolute',
                      'z-3'
                    ]
                  }, [
                    button({
                      class: [
                        'py-1',
                        'list-group-item',
                        'list-group-item-action',
                        'active'
                      ]
                    }, [
                      text('Contains')
                    ]),
                    button({
                      class: [
                        'py-1',
                        'list-group-item',
                        'list-group-item-action'
                      ]
                    }, [
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
                  class: 'col-sm-3'
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
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
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
              class: 'col-auto',
              title: 'Value: Must be a minimum of 1 character(s).'
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
                    'fa-check'
                  ]
                })
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
                  class: 'col-sm-3'
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
                  class: 'col-sm-9'
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
                  class: 'col-sm-3'
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
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
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
                  class: 'col-sm-3'
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
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
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
              class: 'col-auto',
              title: ''
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
                    'fa-check'
                  ]
                })
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'Edit form small',
      data: [
        {
          size: 'sm',
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
                  'my-1',
                  'row',
                  'small'
                ]
              }, [
                div({
                  class: 'col-sm-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold',
                      'small'
                    ]
                  }, [
                    text('id:')
                  ])
                ]),
                div({
                  class: 'col-sm-9'
                }, [
                  text('27')
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
                  class: 'col-sm-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold',
                      'small'
                    ]
                  }, [
                    text('name:')
                  ])
                ]),
                div({
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
                }, [
                  input({
                    class: [
                      'validate',
                      'form-control',
                      'form-control-sm'
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
                  'my-1',
                  'row',
                  'small'
                ]
              }, [
                div({
                  class: 'col-sm-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold',
                      'small'
                    ]
                  }, [
                    text('age:')
                  ])
                ]),
                div({
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
                }, [
                  input({
                    class: [
                      'validate',
                      'form-control',
                      'form-control-sm'
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
              class: 'col-auto',
              title: ''
            }, [
              button({
                class: [
                  'btn',
                  'btn-primary',
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
            ])
          ])
        ])
      )
    }, {
      title: 'Edit form large',
      data: [
        {
          size: 'lg',
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
                  'my-3',
                  'row',
                  'fs-5'
                ]
              }, [
                div({
                  class: 'col-sm-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold',
                      'fs-5'
                    ]
                  }, [
                    text('id:')
                  ])
                ]),
                div({
                  class: 'col-sm-9'
                }, [
                  text('27')
                ])
              ]),
              div({
                class: [
                  'col-12',
                  'my-3',
                  'row',
                  'fs-5'
                ]
              }, [
                div({
                  class: 'col-sm-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold',
                      'fs-5'
                    ]
                  }, [
                    text('name:')
                  ])
                ]),
                div({
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
                }, [
                  input({
                    class: [
                      'validate',
                      'form-control',
                      'form-control-lg'
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
                  'my-3',
                  'row',
                  'fs-5'
                ]
              }, [
                div({
                  class: 'col-sm-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold',
                      'fs-5'
                    ]
                  }, [
                    text('age:')
                  ])
                ]),
                div({
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
                }, [
                  input({
                    class: [
                      'validate',
                      'form-control',
                      'form-control-lg'
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
              class: 'col-auto',
              title: ''
            }, [
              button({
                class: [
                  'btn',
                  'btn-primary',
                  'btn-lg'
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
            ])
          ])
        ])
      )
    }, {
      title: 'Edit form with error',
      data: [
        {
          properties: {
            id: {
              default: 27,
              readOnly: true,
              minimum: 30
            }, 
            name: {
              default: 'Josh',
              minLength: 2
            }, 
            age: {
              default: 30,
              readOnly: true,
              writeOnly: true,
              maximum: 29
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
                  class: 'col-sm-3'
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
                  class: 'col-sm-9'
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
                  class: 'col-sm-3'
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
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
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
                  class: 'col-sm-3'
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
                  class: [
                    'position-relative',
                    'col-sm-9'
                  ]
                }, [
                  input({
                    class: [
                      'validate',
                      'form-control',
                      'is-invalid'
                    ],
                    type: 'number',
                    name: 'age',
                    value: '30',
                    max: '29',
                    step: '1',
                    disabled: ''
                  }),
                  div({
                    class: 'invalid-feedback'
                  }, [
                    text('Must be at most: 29')
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
              class: 'col-auto',
              title: 'id: Must be at least: 30\n\nage: Must be at most: 29'
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
                    'fa-check'
                  ]
                })
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
          col: 6,
          properties: {
            id: {
              type: 'integer',
              title: 'Id',
              description: 'User id',
              default: 0,
              href: '#/users/{id}',
              totals: 'count',
              col: 12
            },
            name: {
              type: 'string',
              title: 'Name',
              description: 'User name',
              default: '',
              minLength: 1,
              maxLength: 255,
              col: 12
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
          }
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
                  class: 'col-sm-3'
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
                  class: 'col-sm-9'
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
                  class: 'col-sm-3'
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
                  class: 'col-sm-9'
                }, [
                  text('Mathews Mcgowan')
                ])
              ]),
              div({
                class: [
                  'col-6',
                  'my-2',
                  'row'
                ]
              }, [
                div({
                  class: 'col-sm-3'
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
                  class: 'col-sm-9'
                }, [
                  text('24')
                ])
              ]),
              div({
                class: [
                  'col-6',
                  'my-2',
                  'row'
                ]
              }, [
                div({
                  class: 'col-sm-3'
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
                  class: 'col-sm-9'
                }, [
                  text('3,072.78')
                ])
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'Static with actions',
      data: [
        {
          css: 'container card my-5 p-3',
          title: 'User: Mathews Mcgowan',
          description: 'Single user entry',
          readOnly: true,
          close: () => {window.alert('close')},
          col: 6,
          properties: {
            id: {
              type: 'integer',
              title: 'Id',
              description: 'User id',
              default: 0,
              href: '#/users/{id}',
              totals: 'count',
              col: 12
            },
            name: {
              type: 'string',
              title: 'Name',
              description: 'User name',
              default: '',
              minLength: 1,
              maxLength: 255,
              col: 12
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
                  class: 'col-sm-3'
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
                  class: 'col-sm-9'
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
                  class: 'col-sm-3'
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
                  class: 'col-sm-9'
                }, [
                  text('Mathews Mcgowan')
                ])
              ]),
              div({
                class: [
                  'col-6',
                  'my-2',
                  'row'
                ]
              }, [
                div({
                  class: 'col-sm-3'
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
                  class: 'col-sm-9'
                }, [
                  text('24')
                ])
              ]),
              div({
                class: [
                  'col-6',
                  'my-2',
                  'row'
                ]
              }, [
                div({
                  class: 'col-sm-3'
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
                  class: 'col-sm-9'
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
    }, {
      title: 'Static with actions and hidden field',
      data: [
        {
          css: 'container card my-5 p-3',
          title: 'User: Mathews Mcgowan',
          description: 'Single user entry',
          readOnly: true,
          close: () => {window.alert('close')},
          size: 'lg',
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
              maxLength: 255,
              col: 12
            }, 
            age: {
              type: 'integer',
              title: 'Age (Y)',
              description: 'User age',
              default: 18,
              minimum: 18,
              maximum: 99,
              totals: 'avg',
              ui: 'hide'
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
                'fs-4'
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
                  'my-3',
                  'row',
                  'fs-5'
                ]
              }, [
                div({
                  class: 'col-sm-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold',
                      'fs-5'
                    ],
                    title: 'User id'
                  }, [
                    text('Id:')
                  ])
                ]),
                div({
                  class: 'col-sm-9'
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
                  'my-3',
                  'row',
                  'fs-5'
                ]
              }, [
                div({
                  class: 'col-sm-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold',
                      'fs-5'
                    ],
                    title: 'User name'
                  }, [
                    text('Name:')
                  ])
                ]),
                div({
                  class: 'col-sm-9'
                }, [
                  text('Mathews Mcgowan')
                ])
              ]),
              div({
                class: [
                  'col-12',
                  'my-3',
                  'row',
                  'fs-5'
                ]
              }, [
                div({
                  class: 'col-sm-3'
                }, [
                  label({
                    class: [
                      'form-label',
                      'fw-bold',
                      'fs-5'
                    ]
                  }, [
                    text('Balance ($):')
                  ])
                ]),
                div({
                  class: 'col-sm-9'
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
                  'btn-danger',
                  'btn-lg'
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
                  'btn-warning',
                  'btn-lg'
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
    }, {
      title: 'Form with links only',
      data: [
        {
          align: 'center',
          links: [
            {
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
        hr,
        div,
        button,
        span,
        i,
        text
      }) => 
        form({
          novalidate: ''
        }, [
          div({
            class: [
              'row',
              'g-1',
              'align-items-center',
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
