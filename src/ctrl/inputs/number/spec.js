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
    }
  ]
})
