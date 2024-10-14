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
    } 
  ]
})
