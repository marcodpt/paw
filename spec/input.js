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
    }, {
      title: 'Checkbox Multiple',
      data: [
        {
          type: 'array',
          default: [2, 4],
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
              type: 'checkbox',
              value: '1',
              id: 'app_checkbox_000003'
            }),
            label({
              class: 'form-check-label',
              for: 'app_checkbox_000003'
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
              type: 'checkbox',
              value: '2',
              id: 'app_checkbox_000004',
              checked: ''
            }),
            label({
              class: 'form-check-label',
              for: 'app_checkbox_000004'
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
              type: 'checkbox',
              value: '3',
              id: 'app_checkbox_000005'
            }),
            label({
              class: 'form-check-label',
              for: 'app_checkbox_000005'
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
              type: 'checkbox',
              value: '4',
              id: 'app_checkbox_000006',
              checked: ''
            }),
            label({
              class: 'form-check-label',
              for: 'app_checkbox_000006'
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
      title: 'Switch Multiple',
      data: [
        {
          type: 'array',
          ui: 'switch',
          default: [2, 4],
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
            class: [
              'form-check',
              'form-switch'
            ]
          }, [
            input({
              class: [
                'validate',
                'form-check-input'
              ],
              type: 'checkbox',
              value: '1',
              id: 'app_checkbox_000003'
            }),
            label({
              class: 'form-check-label',
              for: 'app_checkbox_000003'
            }, [
              text('Dog')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: [
              'form-check',
              'form-switch'
            ]
          }, [
            input({
              class: 'form-check-input',
              type: 'checkbox',
              value: '2',
              id: 'app_checkbox_000004',
              checked: ''
            }),
            label({
              class: 'form-check-label',
              for: 'app_checkbox_000004'
            }, [
              text('Cat')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: [
              'form-check',
              'form-switch'
            ]
          }, [
            input({
              class: 'form-check-input',
              type: 'checkbox',
              value: '3',
              id: 'app_checkbox_000005'
            }),
            label({
              class: 'form-check-label',
              for: 'app_checkbox_000005'
            }, [
              text('Bird')
            ]),
            div({
              class: 'invalid-feedback'
            })
          ]),
          div({
            class: [
              'form-check',
              'form-switch'
            ]
          }, [
            input({
              class: 'form-check-input',
              type: 'checkbox',
              value: '4',
              id: 'app_checkbox_000006',
              checked: ''
            }),
            label({
              class: 'form-check-label',
              for: 'app_checkbox_000006'
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
      title: 'Pending pagination',
      data: [
        {
          ui: 'pagination'
        }
      ],
      html: html(({
        div,
        button,
        i,
        input
      }) => 
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
                'btn-secondary',
                'disabled'
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
                'btn-secondary',
                'disabled'
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
                  'form-control',
                  'text-center'
                ],
                type: 'text',
                value: '⏳',
                disabled: ''
              })
            ])
          ]),
          div({
            class: 'col-auto'
          }, [
            button({
              class: [
                'btn',
                'btn-secondary',
                'disabled'
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
                'btn-secondary',
                'disabled'
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
      )
    }, {
      title: 'Single page pagination lg',
      data: [
        {
          ui: 'pagination',
          description: 'Page',
          context: 'primary',
          default: 1,
          maximum: 1,
          size: 'lg',
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        button,
        i,
        input,
        datalist,
        option,
        text
      }) => 
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
                'btn-primary',
                'btn-lg'
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
                'btn-primary',
                'btn-lg'
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
                  'form-control',
                  'form-control-lg',
                  'is-valid'
                ],
                type: 'text',
                value: 'Page (1 / 1)',
                list: 'app_list_000001',
                disabled: ''
              }),
              datalist({
                id: 'app_list_000001'
              }, [
                option({}, [
                  text('Page (1 / 1)')
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
                'btn-primary',
                'btn-lg'
              ],
              type: 'button',
              disabled: ''
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
                'btn-primary',
                'btn-lg'
              ],
              type: 'button',
              disabled: ''
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
      )
    }, {
      title: 'Multiple pages pagination sm',
      data: [
        {
          ui: 'pagination',
          minimum: -3,
          maximum: 15,
          default: 7,
          size: 'sm',
          update
        }
      ],
      html: html(({
        div,
        button,
        i,
        input,
        datalist,
        option,
        text
      }) => 
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
                'btn-secondary',
                'btn-sm'
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
                'btn-secondary',
                'btn-sm'
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
                  'form-control',
                  'form-control-sm'
                ],
                type: 'text',
                value: '(7 / 15)',
                list: 'app_list_000001'
              }),
              datalist({
                id: 'app_list_000001'
              }, [
                option({}, [
                  text('(-3 / 15)')
                ]),
                option({}, [
                  text('(-2 / 15)')
                ]),
                option({}, [
                  text('(-1 / 15)')
                ]),
                option({}, [
                  text('(0 / 15)')
                ]),
                option({}, [
                  text('(1 / 15)')
                ]),
                option({}, [
                  text('(2 / 15)')
                ]),
                option({}, [
                  text('(3 / 15)')
                ]),
                option({}, [
                  text('(4 / 15)')
                ]),
                option({}, [
                  text('(5 / 15)')
                ]),
                option({}, [
                  text('(6 / 15)')
                ]),
                option({}, [
                  text('(7 / 15)')
                ]),
                option({}, [
                  text('(8 / 15)')
                ]),
                option({}, [
                  text('(9 / 15)')
                ]),
                option({}, [
                  text('(10 / 15)')
                ]),
                option({}, [
                  text('(11 / 15)')
                ]),
                option({}, [
                  text('(12 / 15)')
                ]),
                option({}, [
                  text('(13 / 15)')
                ]),
                option({}, [
                  text('(14 / 15)')
                ]),
                option({}, [
                  text('(15 / 15)')
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
                'btn-secondary',
                'btn-sm'
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
                'btn-secondary',
                'btn-sm'
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
      )
    }, {
      title: 'Items String Large',
      data: [
        {
          items: {
            type: 'string'
          },
          default: [
            'dog',
            'cat'
          ],
          size: 'lg',
          minItems: 1,
          maxItems: 5,
          showValid: true,
          update
        }
      ],
      html: html(({
        div,
        button,
        i,
        input
      }) => 
        div({}, [
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
                  'btn-secondary',
                  'btn-lg'
                ],
                type: 'button'
              }, [
                i({
                  class: [
                    'fa-solid',
                    'fa-minus'
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
                  'btn-secondary',
                  'btn-lg'
                ],
                type: 'button'
              }, [
                i({
                  class: [
                    'fa-solid',
                    'fa-plus'
                  ]
                })
              ])
            ])
          ]),
          div({
            class: 'my-3'
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
                value: 'dog'
              }),
              div({
                class: 'invalid-feedback'
              })
            ])
          ]),
          div({
            class: 'my-3'
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
                value: 'cat'
              }),
              div({
                class: 'invalid-feedback'
              })
            ])
          ])
        ])
      )
    }, {
      title: 'Object Items Small',
      data: [
        {
          items: {
            title: 'Person',
            icon: 'user',
            properties: {
              name: {
                type: 'string',
                minLength: 1
              }, 
              age: {
                type: 'integer',
                default: 30
              }
            }
          },
          update,
          size: 'sm',
          default: [
            {
              name: 'john'
            }
          ]
        }
      ],
      html: html(({
        div,
        button,
        i,
        fieldset,
        legend,
        span,
        text,
        hr,
        label,
        input
      }) => 
        div({}, [
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
                  'btn-secondary',
                  'btn-sm'
                ],
                type: 'button'
              }, [
                i({
                  class: [
                    'fa-solid',
                    'fa-minus'
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
                  'btn-secondary',
                  'btn-sm'
                ],
                type: 'button'
              }, [
                i({
                  class: [
                    'fa-solid',
                    'fa-plus'
                  ]
                })
              ])
            ])
          ]),
          div({
            class: 'my-1'
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
                  text(' Person')
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
                        'form-control-sm'
                      ],
                      type: 'text',
                      name: 'name',
                      value: 'john'
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
                        'form-control-sm'
                      ],
                      type: 'number',
                      name: 'age',
                      value: '30',
                      step: '1'
                    }),
                    div({
                      class: 'invalid-feedback'
                    })
                  ])
                ])
              ])
            ])
          ])
        ])
      )
    }, {
      title: 'Navbar',
      data: [
        {
          items: {
            properties: {
              icon: {
                type: 'string',
                ui: 'icon'
              },
              title: {
                type: 'string'
              }, 
              href: {
                type: 'string'
              },
              children: {
                items: {
                  properties: {
                    icon: {
                      type: 'string',
                      ui: 'icon'
                    },
                    title: {
                      type: 'string'
                    }, 
                    href: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          },
          default: [
            {
              title: 'Tools',
              icon: 'tools',
              children: [
                {
                  title: 'Users',
                  icon: 'user',
                  href: '#/users'
                }, {
                  title: 'Settings',
                  icon: 'cog',
                  href: '#/settings'
                }
              ]
            }, {
              title: 'Repository',
              icon: '@github',
              href: 'https://github.com/marcodpt/app'
            }
          ],
          update
        }
      ],
      html: html(({
        div,
        button,
        i,
        fieldset,
        label,
        text,
        span,
        input
      }) => 
        div({}, [
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
                  'btn-secondary'
                ],
                type: 'button'
              }, [
                i({
                  class: [
                    'fa-solid',
                    'fa-minus'
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
                  'btn-secondary'
                ],
                type: 'button'
              }, [
                i({
                  class: [
                    'fa-solid',
                    'fa-plus'
                  ]
                })
              ])
            ])
          ]),
          div({
            class: 'my-2'
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
                      text('icon:')
                    ])
                  ]),
                  div({
                    class: 'col-md-9'
                  }, [
                    div({
                      class: 'input-group'
                    }, [
                      span({
                        class: 'input-group-text'
                      }, [
                        i({
                          class: [
                            'fa-solid',
                            'fa-tools'
                          ]
                        })
                      ]),
                      input({
                        class: [
                          'validate',
                          'form-control'
                        ],
                        type: 'text',
                        name: 'icon',
                        value: 'tools'
                      })
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
                      text('title:')
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
                      name: 'title',
                      value: 'Tools'
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
                      text('href:')
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
                      name: 'href',
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
                    class: 'col-md-3'
                  }, [
                    label({
                      class: [
                        'form-label',
                        'fw-bold'
                      ]
                    }, [
                      text('children:')
                    ])
                  ]),
                  div({
                    class: 'col-md-9'
                  }, [
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
                            'btn-secondary'
                          ],
                          type: 'button'
                        }, [
                          i({
                            class: [
                              'fa-solid',
                              'fa-minus'
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
                            'btn-secondary'
                          ],
                          type: 'button'
                        }, [
                          i({
                            class: [
                              'fa-solid',
                              'fa-plus'
                            ]
                          })
                        ])
                      ])
                    ]),
                    div({
                      class: 'my-2'
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
                                text('icon:')
                              ])
                            ]),
                            div({
                              class: 'col-md-9'
                            }, [
                              div({
                                class: 'input-group'
                              }, [
                                span({
                                  class: 'input-group-text'
                                }, [
                                  i({
                                    class: [
                                      'fa-solid',
                                      'fa-user'
                                    ]
                                  })
                                ]),
                                input({
                                  class: [
                                    'validate',
                                    'form-control'
                                  ],
                                  type: 'text',
                                  name: 'icon',
                                  value: 'user'
                                })
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
                                text('title:')
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
                                name: 'title',
                                value: 'Users'
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
                                text('href:')
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
                                name: 'href',
                                value: '#/users'
                              }),
                              div({
                                class: 'invalid-feedback'
                              })
                            ])
                          ])
                        ])
                      ])
                    ]),
                    div({
                      class: 'my-2'
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
                                text('icon:')
                              ])
                            ]),
                            div({
                              class: 'col-md-9'
                            }, [
                              div({
                                class: 'input-group'
                              }, [
                                span({
                                  class: 'input-group-text'
                                }, [
                                  i({
                                    class: [
                                      'fa-solid',
                                      'fa-cog'
                                    ]
                                  })
                                ]),
                                input({
                                  class: [
                                    'validate',
                                    'form-control'
                                  ],
                                  type: 'text',
                                  name: 'icon',
                                  value: 'cog'
                                })
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
                                text('title:')
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
                                name: 'title',
                                value: 'Settings'
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
                                text('href:')
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
                                name: 'href',
                                value: '#/settings'
                              }),
                              div({
                                class: 'invalid-feedback'
                              })
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ]),
          div({
            class: 'my-2'
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
                      text('icon:')
                    ])
                  ]),
                  div({
                    class: 'col-md-9'
                  }, [
                    div({
                      class: 'input-group'
                    }, [
                      span({
                        class: 'input-group-text'
                      }, [
                        i({
                          class: [
                            'fa-brands',
                            'fa-github'
                          ]
                        })
                      ]),
                      input({
                        class: [
                          'validate',
                          'form-control'
                        ],
                        type: 'text',
                        name: 'icon',
                        value: '@github'
                      })
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
                      text('title:')
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
                      name: 'title',
                      value: 'Repository'
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
                      text('href:')
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
                      name: 'href',
                      value: 'https://github.com/marcodpt/app'
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
                      text('children:')
                    ])
                  ]),
                  div({
                    class: 'col-md-9'
                  }, [
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
                            'btn-secondary'
                          ],
                          type: 'button',
                          disabled: ''
                        }, [
                          i({
                            class: [
                              'fa-solid',
                              'fa-minus'
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
                            'btn-secondary'
                          ],
                          type: 'button'
                        }, [
                          i({
                            class: [
                              'fa-solid',
                              'fa-plus'
                            ]
                          })
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ])
        ])
      )
    }
  ]
})
