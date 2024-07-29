import ctrl from '../src/ctrl/index.js'
import html from '../src/hyperscript/html.js'

const d = new Date()
const iso = d.toISOString().substr(0, 10)
const iso_min = d.getFullYear()+'-'+('0'+(d.getMonth() + 1)).slice(-2)+'-01'
const unix = Math.round(d.getTime() / 1000)
const unix_min = (d.getTime() - 24 * 60 * 60 * 1000) / 1000
const unix_max = (d.getTime() + 7 * 24 * 60 * 60 * 1000) / 1000

const update = (err, v) => {
  console.log(err)
  console.log(v)
}
export default ({
  icon: 'pencil',
  title: 'input',
  description: 'Form inputs.',
  component: ctrl,
  properties: {},
  examples: [
    {
      title: 'Raw Boolean',
      data: [
        {
          type: 'boolean',
          default: true,
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-check-input',
              'is-valid'
            ],
            type: 'checkbox',
            checked: ''
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'Raw String',
      data: [
        {
          type: 'string',
          default: 'test',
          minLength: 1,
          maxLength: 5,
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-control',
              'is-valid'
            ],
            type: 'text',
            value: 'test'
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'Raw Integer',
      data: [
        {
          type: 'integer',
          default: 7,
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-control',
              'is-valid'
            ],
            type: 'number',
            value: '7',
            step: '1'
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'Raw Number',
      data: [
        {
          type: 'number',
          default: 2.7,
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-control',
              'is-valid'
            ],
            type: 'number',
            value: '2.7'
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'A currency example with precision',
      data: [
        {
          type: 'number',
          minimum: 0,
          ui: 'num.2',
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-control',
              'is-valid'
            ],
            type: 'number',
            value: '0.00',
            min: '0.00',
            step: '0.01'
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'Integer representing a currency',
      data: [
        {
          type: 'integer',
          ui: 'num.2',
          default: 699,
          minimum: 698,
          maximum: 710,
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-control',
              'is-valid'
            ],
            type: 'number',
            value: '6.99',
            min: '6.98',
            max: '7.10',
            step: '0.01'
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
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
        datalist,
        option,
        text
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-control',
              'is-valid'
            ],
            type: 'text',
            value: 'Yes',
            list: 'app_list_000000'
          }),
          datalist({
            id: 'app_list_000000'
          }, [
            option({}, [
              text('No')
            ]),
            option({}, [
              text('Yes')
            ])
          ]),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'A date string using ISO dates',
      data: [
        {
          type: 'string',
          ui: 'date',
          default: iso,
          minimum: iso_min,
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-control',
              'is-valid'
            ],
            type: 'date',
            value: iso,
            min: iso_min
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'A date integer using Unix timestamp',
      data: [
        {
          type: 'integer',
          ui: 'date',
          default: unix,
          minimum: unix_min,
          maximum: unix_max,
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-control',
              'is-valid'
            ],
            type: 'date',
            value: new Date(unix * 1000).toISOString().substr(0, 10),
            min: new Date(unix_min * 1000).toISOString().substr(0, 10),
            max: new Date(unix_max * 1000).toISOString().substr(0, 10)
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'A multiline text string',
      data: [
        {
          type: 'string',
          ui: 'text',
          default: 'Text is used for store multiline text!\nAs you can see it!',
          minLength: 1,
          showValid: true,
          update
        }, {
          type: 'string',
          ui: 'info',
          default: 'Text is used for store multiline text!\nAs you can see it!',
          minLength: 1,
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        textarea,
        text
      }) => 
        div({}, [
          textarea({
            class: [
              'validate',
              'form-control',
              'is-valid'
            ],
            rows: '6'
          }, [
            text('Text is used for store multiline text!\nAs you can see it!')
          ]),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'A password string',
      data: [
        {
          type: 'string',
          ui: 'password',
          default: 'secret',
          minLength: 5,
          maxLength: 10,
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-control',
              'is-valid'
            ],
            type: 'password',
            value: 'secret'
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'An array of files',
      data: [
        {
          type: 'array',
          ui: 'file',
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-control',
              'is-valid'
            ],
            type: 'file',
            multiple: ''
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'Raw FileList',
      data: [
        {
          ui: 'File',
          type: 'array',
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-control',
              'is-valid'
            ],
            type: 'file',
            multiple: ''
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'Bootstrap btn string',
      data: [
        {
          type: 'string',
          ui: 'context',
          default: 'primary',
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input,
        label,
        text
      }) => 
        div({}, [
          input({
            type: 'radio',
            class: 'btn-check',
            id: 'app_radio_000002',
            autocomplete: 'off',
            value: 'primary',
            checked: ''
          }),
          label({
            class: [
              'btn',
              'btn-primary',
              'me-2'
            ],
            for: 'app_radio_000002'
          }, [
            text('primary')
          ]),
          input({
            type: 'radio',
            class: 'btn-check',
            id: 'app_radio_000003',
            autocomplete: 'off',
            value: 'secondary'
          }),
          label({
            class: [
              'btn',
              'btn-secondary',
              'me-2'
            ],
            for: 'app_radio_000003'
          }, [
            text('secondary')
          ]),
          input({
            type: 'radio',
            class: 'btn-check',
            id: 'app_radio_000004',
            autocomplete: 'off',
            value: 'success'
          }),
          label({
            class: [
              'btn',
              'btn-success',
              'me-2'
            ],
            for: 'app_radio_000004'
          }, [
            text('success')
          ]),
          input({
            type: 'radio',
            class: 'btn-check',
            id: 'app_radio_000005',
            autocomplete: 'off',
            value: 'danger'
          }),
          label({
            class: [
              'btn',
              'btn-danger',
              'me-2'
            ],
            for: 'app_radio_000005'
          }, [
            text('danger')
          ]),
          input({
            type: 'radio',
            class: 'btn-check',
            id: 'app_radio_000006',
            autocomplete: 'off',
            value: 'warning'
          }),
          label({
            class: [
              'btn',
              'btn-warning',
              'me-2'
            ],
            for: 'app_radio_000006'
          }, [
            text('warning')
          ]),
          input({
            type: 'radio',
            class: 'btn-check',
            id: 'app_radio_000007',
            autocomplete: 'off',
            value: 'info'
          }),
          label({
            class: [
              'btn',
              'btn-info',
              'me-2'
            ],
            for: 'app_radio_000007'
          }, [
            text('info')
          ]),
          input({
            type: 'radio',
            class: 'btn-check',
            id: 'app_radio_000008',
            autocomplete: 'off',
            value: 'light'
          }),
          label({
            class: [
              'btn',
              'btn-light',
              'me-2'
            ],
            for: 'app_radio_000008'
          }, [
            text('light')
          ]),
          input({
            type: 'radio',
            class: 'btn-check',
            id: 'app_radio_000009',
            autocomplete: 'off',
            value: 'dark'
          }),
          label({
            class: [
              'btn',
              'btn-dark',
              'me-2'
            ],
            for: 'app_radio_000009'
          }, [
            text('dark')
          ]),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'FontAwesome icon string',
      data: [
        {
          type: 'string',
          ui: 'icon',
          default: 'check',
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        span,
        i,
        input
      }) => 
        div({}, [
          div({
            class: 'input-group'
          }, [
            span({
              class: 'input-group-text'
            }, [
              i({
                class: [
                  'fa-solid',
                  'fa-check'
                ]
              })
            ]),
            input({
              class: [
                'validate',
                'form-control',
                'is-valid'
              ],
              type: 'text',
              value: 'check'
            })
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
        datalist,
        option,
        text
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-control',
              'is-valid'
            ],
            type: 'text',
            value: 'ui',
            list: 'app_list_000000'
          }),
          datalist({
            id: 'app_list_000000'
          }, [
            option({}, [
              text('_')
            ]),
            option({}, [
              text('date')
            ]),
            option({}, [
              text('bool')
            ]),
            option({}, [
              text('text')
            ]),
            option({}, [
              text('info')
            ]),
            option({}, [
              text('num.1')
            ]),
            option({}, [
              text('num.2')
            ]),
            option({}, [
              text('num.3')
            ]),
            option({}, [
              text('len:2')
            ]),
            option({}, [
              text('len:3')
            ]),
            option({}, [
              text('len:4')
            ]),
            option({}, [
              text('len:5')
            ]),
            option({}, [
              text('len:6')
            ]),
            option({}, [
              text('len:7')
            ]),
            option({}, [
              text('len:8')
            ]),
            option({}, [
              text('len:9')
            ]),
            option({}, [
              text('password')
            ]),
            option({}, [
              text('file')
            ]),
            option({}, [
              text('color')
            ]),
            option({}, [
              text('progress')
            ]),
            option({}, [
              text('context')
            ]),
            option({}, [
              text('icon')
            ]),
            option({}, [
              text('ui')
            ])
          ]),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'Pending',
      data: [
        {
          ui: 'pending'
        }
      ],
      html: html(({
        div,
        input
      }) => 
        div({}, [
          input({
            class: [
              'form-control',
              'text-center'
            ],
            type: 'text',
            value: '⏳',
            disabled: ''
          })
        ])
      )
    }, {
      title: 'Typeahead Wrong sm',
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
        datalist,
        option,
        text
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-control',
              'form-control-sm',
              'is-invalid'
            ],
            type: 'text',
            value: '0',
            list: 'app_list_000000'
          }),
          datalist({
            id: 'app_list_000000'
          }, [
            option({}, [
              text('Dog')
            ]),
            option({}, [
              text('Cat')
            ]),
            option({}, [
              text('Bird')
            ]),
            option({}, [
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
      title: 'Typeahead Right without valid',
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
        datalist,
        option,
        text
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-control'
            ],
            type: 'text',
            value: 'Dog',
            list: 'app_list_000000'
          }),
          datalist({
            id: 'app_list_000000'
          }, [
            option({}, [
              text('Dog')
            ]),
            option({}, [
              text('Cat')
            ]),
            option({}, [
              text('Bird')
            ]),
            option({}, [
              text('Horse')
            ])
          ]),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'Typeahead Right Lg',
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
        datalist,
        option,
        text
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-control',
              'form-control-lg',
              'is-valid'
            ],
            type: 'text',
            value: 'Cat',
            list: 'app_list_000000'
          }),
          datalist({
            id: 'app_list_000000'
          }, [
            option({}, [
              text('Dog')
            ]),
            option({}, [
              text('Cat')
            ]),
            option({}, [
              text('Bird')
            ]),
            option({}, [
              text('Horse')
            ])
          ]),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'Typeahead Wrong single',
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
        datalist,
        option,
        text
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-control',
              'is-invalid'
            ],
            type: 'text',
            value: '0',
            list: 'app_list_000000'
          }),
          datalist({
            id: 'app_list_000000'
          }, [
            option({}, [
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
      title: 'Typeahead Wrong none',
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
        datalist,
        text
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-control',
              'is-invalid'
            ],
            type: 'text',
            value: '0',
            list: 'app_list_000000',
            disabled: ''
          }),
          datalist({
            id: 'app_list_000000'
          }),
          div({
            class: 'invalid-feedback'
          }, [
            text('Must be one of the possible options.')
          ])
        ])
      )
    }, {
      title: 'Typeahead right single',
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
        datalist,
        option,
        text
      }) => 
        div({}, [
          input({
            class: [
              'validate',
              'form-control',
              'is-valid'
            ],
            type: 'text',
            value: 'Dog',
            list: 'app_list_000000',
            disabled: ''
          }),
          datalist({
            id: 'app_list_000000'
          }, [
            option({}, [
              text('Dog')
            ])
          ]),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'Select Wrong sm',
      data: [
        {
          type: 'integer',
          ui: 'select',
          description: 'Choose one option!',
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
        select,
        option,
        text
      }) => 
        div({}, [
          select({
            class: [
              'validate',
              'form-control',
              'form-control-sm',
              'is-invalid'
            ]
          }, [
            option({
              value: '1'
            }, [
              text('Dog')
            ]),
            option({
              value: '2'
            }, [
              text('Cat')
            ]),
            option({
              value: '3'
            }, [
              text('Bird')
            ]),
            option({
              value: '4'
            }, [
              text('Horse')
            ]),
            option({
              value: '0',
              disabled: '',
              selected: ''
            }, [
              text('Choose one option!')
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
      title: 'Select Right without valid',
      data: [
        {
          type: 'integer',
          ui: 'select',
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
        select,
        option,
        text
      }) => 
        div({}, [
          select({
            class: [
              'validate',
              'form-control'
            ]
          }, [
            option({
              value: '1',
              selected: ''
            }, [
              text('Dog')
            ]),
            option({
              value: '2'
            }, [
              text('Cat')
            ]),
            option({
              value: '3'
            }, [
              text('Bird')
            ]),
            option({
              value: '4'
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
      title: 'Select Right Lg',
      data: [
        {
          type: 'integer',
          ui: 'select',
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
        select,
        option,
        text
      }) => 
        div({}, [
          select({
            class: [
              'validate',
              'form-control',
              'form-control-lg',
              'is-valid'
            ]
          }, [
            option({
              value: '1'
            }, [
              text('Dog')
            ]),
            option({
              value: '2',
              selected: ''
            }, [
              text('Cat')
            ]),
            option({
              value: '3'
            }, [
              text('Bird')
            ]),
            option({
              value: '4'
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
      title: 'Select Wrong single',
      data: [
        {
          type: 'integer',
          ui: 'select',
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
        select,
        option,
        text
      }) => 
        div({}, [
          select({
            class: [
              'validate',
              'form-control',
              'is-invalid'
            ]
          }, [
            option({
              value: '1'
            }, [
              text('Dog')
            ]),
            option({
              value: '0',
              disabled: '',
              selected: ''
            }, [
              text('0')
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
      title: 'Select Wrong none',
      data: [
        {
          type: 'integer',
          ui: 'select',
          options: [],
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        select,
        option,
        text
      }) => 
        div({}, [
          select({
            class: [
              'validate',
              'form-control',
              'is-invalid'
            ],
            disabled: ''
          }, [
            option({
              value: '0',
              disabled: '',
              selected: ''
            }, [
              text('0')
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
      title: 'Select right single',
      data: [
        {
          type: 'integer',
          ui: 'select',
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
        select,
        option,
        text
      }) => 
        div({}, [
          select({
            class: [
              'validate',
              'form-control',
              'is-valid'
            ],
            disabled: ''
          }, [
            option({
              value: '1',
              selected: ''
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
      title: 'Radio Wrong sm',
      data: [
        {
          type: 'integer',
          ui: 'radio',
          description: 'Choose one option!',
          maximum: 2,
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
        label,
        text
      }) => 
        div({}, [
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '1',
              id: 'app_radio_000003'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000003'
            }, [
              text('Dog')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '2',
              id: 'app_radio_000004'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000004'
            }, [
              text('Cat')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '3',
              id: 'app_radio_000005'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000005'
            }, [
              text('Bird')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '4',
              id: 'app_radio_000006'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000006'
            }, [
              text('Horse')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: [
                'validate',
                'form-check-input',
                'is-invalid'
              ],
              type: 'radio',
              name: 'app_radio_000001',
              value: '0',
              id: 'app_radio_000002',
              checked: '',
              disabled: ''
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000002'
            }, [
              text('Choose one option!')
            ]),
            div({
              class: 'invalid-feedback'
            }, [
              text('Must be one of the possible options.')
            ])
          ])
        ])
      )
    }, {
      title: 'Radio Right without valid',
      data: [
        {
          type: 'integer',
          ui: 'radio',
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
        label,
        text
      }) => 
        div({}, [
          div({
            class: 'form-check'
          }, [
            input({
              class: [
                'validate',
                'form-check-input'
              ],
              type: 'radio',
              name: 'app_radio_000001',
              value: '1',
              id: 'app_radio_000003',
              checked: ''
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000003'
            }, [
              text('Dog')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '2',
              id: 'app_radio_000004'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000004'
            }, [
              text('Cat')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '3',
              id: 'app_radio_000005'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000005'
            }, [
              text('Bird')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '4',
              id: 'app_radio_000006'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000006'
            }, [
              text('Horse')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ])
        ])
      )
    }, {
      title: 'Radio Right Lg',
      data: [
        {
          type: 'integer',
          ui: 'radio',
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
        label,
        text
      }) => 
        div({}, [
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '1',
              id: 'app_radio_000003'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000003'
            }, [
              text('Dog')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: [
                'validate',
                'form-check-input',
                'is-valid'
              ],
              type: 'radio',
              name: 'app_radio_000001',
              value: '2',
              id: 'app_radio_000004',
              checked: ''
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000004'
            }, [
              text('Cat')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '3',
              id: 'app_radio_000005'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000005'
            }, [
              text('Bird')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '4',
              id: 'app_radio_000006'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000006'
            }, [
              text('Horse')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ])
        ])
      )
    }, {
      title: 'Radio Wrong single',
      data: [
        {
          type: 'integer',
          ui: 'radio',
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
        label,
        text
      }) => 
        div({}, [
          div({
            class: 'form-check'
          }, [
            input({
              class: 'form-check-input',
              type: 'radio',
              name: 'app_radio_000001',
              value: '1',
              id: 'app_radio_000003'
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000003'
            }, [
              text('Dog')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: 'form-check'
          }, [
            input({
              class: [
                'validate',
                'form-check-input',
                'is-invalid'
              ],
              type: 'radio',
              name: 'app_radio_000001',
              value: '0',
              id: 'app_radio_000002',
              checked: '',
              disabled: ''
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000002'
            }, [
              text('0')
            ]),
            div({
              class: 'invalid-feedback'
            }, [
              text('Must be one of the possible options.')
            ])
          ])
        ])
      )
    }, {
      title: 'Radio Wrong none',
      data: [
        {
          type: 'integer',
          ui: 'radio',
          options: [],
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        input,
        label,
        text
      }) => 
        div({}, [
          div({
            class: 'form-check'
          }, [
            input({
              class: [
                'validate',
                'form-check-input',
                'is-invalid'
              ],
              type: 'radio',
              name: 'app_radio_000001',
              value: '0',
              id: 'app_radio_000002',
              checked: '',
              disabled: ''
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000002'
            }, [
              text('0')
            ]),
            div({
              class: 'invalid-feedback'
            }, [
              text('Must be one of the possible options.')
            ])
          ])
        ])
      )
    }, {
      title: 'Radio right single',
      data: [
        {
          type: 'integer',
          ui: 'radio',
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
        label,
        text
      }) => 
        div({}, [
          div({
            class: 'form-check'
          }, [
            input({
              class: [
                'validate',
                'form-check-input',
                'is-valid'
              ],
              type: 'radio',
              name: 'app_radio_000001',
              value: '1',
              id: 'app_radio_000003',
              checked: ''
            }),
            label({
              class: 'form-check-label',
              for: 'app_radio_000003'
            }, [
              text('Dog')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ])
        ])
      )
    }, 
  ]
})
