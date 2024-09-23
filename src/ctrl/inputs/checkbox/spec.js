import html from '../../../node/html.js'

const update = (err, v) => {
  console.log(err)
  console.log(v)
}
export default ({
  title: 'checkbox',
  description: 'Checkbox controller',
  properties: {},
  examples: [
    {
      title: 'Checkbox',
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
      title: 'Switch',
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
    }
  ]
})
