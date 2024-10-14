import html from '../../../node/html.js'

const update = (err, v) => {
  console.log(err)
  console.log(v)
}
export default ({
  title: 'icon',
  description: 'Icon controller',
  properties: {},
  examples: [
    {
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
        div({
          class: 'position-relative'
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
    }
  ]
})
