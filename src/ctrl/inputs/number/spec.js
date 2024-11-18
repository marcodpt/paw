import html from '../../../node/html.js'

const update = (err, v) => {
  console.log(err)
  console.log(v)
}
export default ({
  title: 'number',
  description: 'Number controller',
  properties: {},
  examples: [
    {
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
        div({
          class: 'position-relative'
        }, [
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
        div({
          class: 'position-relative'
        }, [
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
        div({
          class: 'position-relative'
        }, [
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
        div({
          class: 'position-relative'
        }, [
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
      title: 'A number with a list of suggestions.',
      data: [
        {
          type: 'integer',
          list: [2, 3, 5, 7, 11],
          default: 9,
          minimum: 0,
          maximum: 20,
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
            type: 'number',
            value: '9',
            min: '0',
            max: '20',
            step: '1',
            list: 'app_list_000002'
          }),
          datalist({
            id: 'app_list_000002'
          }, [
            option({}, [
              text('2')
            ]),
            option({}, [
              text('3')
            ]),
            option({}, [
              text('5')
            ]),
            option({}, [
              text('7')
            ]),
            option({}, [
              text('11')
            ])
          ]),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'A number with a list of suggestions with label.',
      data: [
        {
          type: 'integer',
          list: [
            {value: 2, label: 'Two'}, 
            {value: 3, label: 'Three'}, 
            {value: 5, label: 'Five'}, 
            {value: 7, label: 'Seven'}, 
            {value: 11, label: 'Eleven'},
          ],
          minimum: 0,
          maximum: 20,
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
            type: 'number',
            value: '0',
            min: '0',
            max: '20',
            step: '1',
            list: 'app_list_000001'
          }),
          datalist({
            id: 'app_list_000001'
          }, [
            option({
              value: '2'
            }, [
              text('Two')
            ]),
            option({
              value: '3'
            }, [
              text('Three')
            ]),
            option({
              value: '5'
            }, [
              text('Five')
            ]),
            option({
              value: '7'
            }, [
              text('Seven')
            ]),
            option({
              value: '11'
            }, [
              text('Eleven')
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
