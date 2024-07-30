import html from '../../../hyperscript/html.js'

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
    },{
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
    }
  ]
})
