import html from '../../../node/html.js'

const update = (err, v) => {
  console.log(err)
  console.log(v)
}
export default ({
  title: 'pending',
  description: 'Pending controller',
  properties: {},
  examples: [
    {
      title: 'Pending',
      data: [
        {
          ui: 'pending'
        }
      ],
      html: html(({
        div,
        input
      }) => 
        div({}, [
          input({
            class: [
              'form-control',
              'text-center'
            ],
            type: 'text',
            value: '⏳',
            disabled: ''
          })
        ])
      )
    }
  ]
})
