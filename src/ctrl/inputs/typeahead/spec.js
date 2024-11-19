import html from '../../../node/html.js'

const update = (err, v) => {
  console.log(err)
  console.log(v)
}
export default ({
  title: 'typeahead',
  description: 'Typeahead controller',
  properties: {},
  examples: [
    {
      title: 'A boolean with integer type',
      data: [
        {
          type: 'integer',
          ui: 'bool',
          default: 1,
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input,
        button,
        text
      }) => 
        div({
          class: 'position-relative'
        }, [
          input({
            class: [
              'validate',
              'form-control',
              'is-valid'
            ],
            type: 'text',
            value: 'Yes',
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
              text('No')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action',
                'active'
              ]
            }, [
              text('Yes')
            ])
          ]),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'UI string',
      data: [
        {
          type: 'string',
          ui: 'ui',
          default: 'ui',
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input,
        button,
        text
      }) => 
        div({
          class: 'position-relative'
        }, [
          input({
            class: [
              'validate',
              'form-control',
              'is-valid'
            ],
            type: 'text',
            value: 'ui',
            autocomplete: 'off'
          }),
          div({
            class: [
              'list-group',
              'd-none',
              'w-100',
              'position-absolute',
              'z-3',
            ]
          }, [
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('_')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('date')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('bool')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('text')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('info')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('hide')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('num.1')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('num.2')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('num.3')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('len:2')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('len:3')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('len:4')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('len:5')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('len:6')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('len:7')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('len:8')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('len:9')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('password')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('file')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('color')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('progress')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('context')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('icon')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action',
                'active'
              ]
            }, [
              text('ui')
            ])
          ]),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'Wrong sm',
      data: [
        {
          type: 'integer',
          options: [
            {
              value: 1,
              label: 'Dog'
            }, {
              value: 2,
              label: 'Cat'
            }, {
              value: 3,
              label: 'Bird'
            }, {
              value: 4,
              label: 'Horse'
            }
          ],
          size: 'sm',
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input,
        button,
        text
      }) => 
        div({
          class: 'position-relative'
        }, [
          input({
            class: [
              'validate',
              'form-control',
              'form-control-sm',
              'is-invalid'
            ],
            type: 'text',
            value: '0',
            autocomplete: 'off'
          }),
          div({
            class: [
              'list-group',
              'd-none',
              'w-100',
              'position-absolute',
              'z-3',
              'small',
            ]
          }, [
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('Dog')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('Cat')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('Bird')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('Horse')
            ])
          ]),
          div({
            class: 'invalid-feedback'
          }, [
            text('Must be one of the possible options.')
          ])
        ])
      )
    }, {
      title: 'Right without valid',
      data: [
        {
          type: 'integer',
          default: 1,
          options: [
            {
              value: 1,
              label: 'Dog'
            }, {
              value: 2,
              label: 'Cat'
            }, {
              value: 3,
              label: 'Bird'
            }, {
              value: 4,
              label: 'Horse'
            }
          ],
          update
        }
      ],
      html: html(({
        div,
        input,
        button,
        text
      }) => 
        div({
          class: 'position-relative'
        }, [
          input({
            class: [
              'validate',
              'form-control'
            ],
            type: 'text',
            value: 'Dog',
            autocomplete: 'off'
          }),
          div({
            class: [
              'list-group',
              'd-none',
              'w-100',
              'position-absolute',
              'z-3',
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
              text('Dog')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('Cat')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('Bird')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('Horse')
            ])
          ]),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'Right Lg',
      data: [
        {
          type: 'integer',
          default: 2,
          options: [
            {
              value: 1,
              label: 'Dog'
            }, {
              value: 2,
              label: 'Cat'
            }, {
              value: 3,
              label: 'Bird'
            }, {
              value: 4,
              label: 'Horse'
            }
          ],
          size: 'lg',
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input,
        button,
        text
      }) => 
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
            value: 'Cat',
            autocomplete: 'off'
          }),
          div({
            class: [
              'list-group',
              'd-none',
              'w-100',
              'position-absolute',
              'z-3',
              'fs-5',
            ]
          }, [
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('Dog')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action',
                'active'
              ]
            }, [
              text('Cat')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('Bird')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('Horse')
            ])
          ]),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'Wrong single',
      data: [
        {
          type: 'integer',
          options: [
            {
              value: 1,
              label: 'Dog'
            }
          ],
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input,
        button,
        text
      }) => 
        div({
          class: 'position-relative'
        }, [
          input({
            class: [
              'validate',
              'form-control',
              'is-invalid'
            ],
            type: 'text',
            value: '0',
            autocomplete: 'off'
          }),
          div({
            class: [
              'list-group',
              'd-none',
              'w-100',
              'position-absolute',
              'z-3',
            ]
          }, [
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('Dog')
            ])
          ]),
          div({
            class: 'invalid-feedback'
          }, [
            text('Must be one of the possible options.')
          ])
        ])
      )
    }, {
      title: 'Wrong none',
      data: [
        {
          type: 'integer',
          options: [],
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input,
        text
      }) => 
        div({
          class: 'position-relative'
        }, [
          input({
            class: [
              'validate',
              'form-control',
              'is-invalid'
            ],
            type: 'text',
            value: '0',
            autocomplete: 'off',
            disabled: ''
          }),
          div({
            class: [
              'list-group',
              'd-none',
              'w-100',
              'position-absolute',
              'z-3'
            ]
          }),
          div({
            class: 'invalid-feedback'
          }, [
            text('Must be one of the possible options.')
          ])
        ])
      )
    }, {
      title: 'right single',
      data: [
        {
          type: 'integer',
          default: 1,
          options: [
            {
              value: 1,
              label: 'Dog'
            }
          ],
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input,
        button,
        text
      }) => 
        div({
          class: 'position-relative'
        }, [
          input({
            class: [
              'validate',
              'form-control',
              'is-valid'
            ],
            type: 'text',
            value: 'Dog',
            autocomplete: 'off',
            disabled: ''
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
              text('Dog')
            ])
          ]),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'Strange Values',
      data: [
        {
          type: 'integer',
          default: 1,
          options: [
            {
              value: 1,
              label: 'Dog  Cat'
            }, {
              value: 2,
              label: 'Horse  Bird'
            }
          ],
          update
        }
      ],
      html: html(({
        div,
        input,
        button,
        text
      }) => 
        div({
          class: 'position-relative'
        }, [
          input({
            class: [
              'validate',
              'form-control'
            ],
            type: 'text',
            value: 'Dog Cat',
            autocomplete: 'off'
          }),
          div({
            class: [
              'list-group',
              'd-none',
              'w-100',
              'position-absolute',
              'z-3',
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
              text('Dog Cat')
            ]),
            button({
              class: [
                'py-1',
                'list-group-item',
                'list-group-item-action'
              ]
            }, [
              text('Horse Bird')
            ])
          ]),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }
  ]
})
