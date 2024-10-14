import html from '../../../node/html.js'

const update = (err, v) => {
  console.log(err)
  console.log(v)
}
export default ({
  title: 'textarea',
  description: 'Text controller',
  properties: {},
  examples: [
    {
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
        div({
          class: 'position-relative'
        }, [
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
    }
  ]
})
