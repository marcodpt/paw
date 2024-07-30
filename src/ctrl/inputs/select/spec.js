import html from '../../../hyperscript/html.js'

const update = (err, v) => {
  console.log(err)
  console.log(v)
}
export default ({
  title: 'select',
  description: 'Select controller',
  properties: {},
  examples: [
    {
      title: 'Wrong sm',
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
      title: 'Right without valid',
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
      title: 'Right Lg',
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
      title: 'Wrong single',
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
      title: 'Wrong none',
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
      title: 'right single',
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
    }
  ]
})
