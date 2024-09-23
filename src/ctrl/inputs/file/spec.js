import html from '../../../node/html.js'

const update = (err, v) => {
  console.log(err)
  console.log(v)
}
export default ({
  title: 'file',
  description: 'File controller',
  properties: {},
  examples: [
    {
      title: 'An array',
      data: [
        {
          type: 'array',
          ui: 'file',
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
              'form-control',
              'is-valid'
            ],
            type: 'file',
            multiple: ''
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'Raw FileList',
      data: [
        {
          ui: 'File',
          type: 'array',
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
              'form-control',
              'is-valid'
            ],
            type: 'file',
            multiple: ''
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'An object',
      data: [
        {
          type: 'object',
          ui: 'file',
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
              'form-control'
            ],
            type: 'file'
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'Raw File',
      data: [
        {
          ui: 'File',
          type: 'object',
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
              'form-control'
            ],
            type: 'file'
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'String',
      data: [
        {
          ui: 'file',
          type: 'string',
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
              'form-control'
            ],
            type: 'file'
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }
  ]
})
