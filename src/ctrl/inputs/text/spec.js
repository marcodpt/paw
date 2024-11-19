import html from '../../../node/html.js'

const update = (err, v) => {
  console.log(err)
  console.log(v)
}
export default ({
  title: 'text',
  description: 'String controller',
  properties: {},
  examples: [
    {
      title: 'Raw',
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
            value: 'test'
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'Password',
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
        div({
          class: 'position-relative'
        }, [
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
      title: 'Text with suggestion',
      data: [
        {
          type: 'string',
          list: ['dog', 'cat', 'bird', 'horse'],
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
        div({
          class: 'position-relative'
        }, [
          input({
            class: [
              'validate',
              'form-control'
            ],
            type: 'text',
            value: '',
            list: 'app_list_000002',
            autocomplete: 'off'
          }),
          datalist({
            id: 'app_list_000002'
          }, [
            option({}, [
              text('dog')
            ]),
            option({}, [
              text('cat')
            ]),
            option({}, [
              text('bird')
            ]),
            option({}, [
              text('horse')
            ])
          ]),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'Text with suggestion and options',
      data: [
        {
          type: 'string',
          default: 'en',
          list: [
            {value: 'en', label: 'English'},
            {value: 'fr', label: 'French'},
            {value: 'es', label: 'Spanish'},
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
        div({
          class: 'position-relative'
        }, [
          input({
            class: [
              'validate',
              'form-control'
            ],
            type: 'text',
            value: 'en',
            list: 'app_list_000001',
            autocomplete: 'off'
          }),
          datalist({
            id: 'app_list_000001'
          }, [
            option({
              value: 'en'
            }, [
              text('English')
            ]),
            option({
              value: 'fr'
            }, [
              text('French')
            ]),
            option({
              value: 'es'
            }, [
              text('Spanish')
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
