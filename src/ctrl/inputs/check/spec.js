import html from '../../../node/html.js'

const update = (err, v) => {
  console.log(err)
  console.log(v)
}
export default ({
  title: 'check',
  description: 'Boolean controller',
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
    }
  ]
})
