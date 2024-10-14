import html from '../../../node/html.js'

const update = (err, v) => {
  console.log(err)
  console.log(v)
}
export default ({
  title: 'context',
  description: 'Context controller',
  properties: {},
  examples: [
    {
      title: 'Bootstrap btn string',
      data: [
        {
          type: 'string',
          ui: 'context',
          default: 'primary',
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
        div({
          class: 'position-relative'
        }, [
          input({
            type: 'radio',
            class: 'btn-check',
            id: 'app_radio_000002',
            autocomplete: 'off',
            value: 'primary',
            checked: ''
          }),
          label({
            class: [
              'btn',
              'btn-primary',
              'me-2'
            ],
            for: 'app_radio_000002'
          }, [
            text('primary')
          ]),
          input({
            type: 'radio',
            class: 'btn-check',
            id: 'app_radio_000003',
            autocomplete: 'off',
            value: 'secondary'
          }),
          label({
            class: [
              'btn',
              'btn-secondary',
              'me-2'
            ],
            for: 'app_radio_000003'
          }, [
            text('secondary')
          ]),
          input({
            type: 'radio',
            class: 'btn-check',
            id: 'app_radio_000004',
            autocomplete: 'off',
            value: 'success'
          }),
          label({
            class: [
              'btn',
              'btn-success',
              'me-2'
            ],
            for: 'app_radio_000004'
          }, [
            text('success')
          ]),
          input({
            type: 'radio',
            class: 'btn-check',
            id: 'app_radio_000005',
            autocomplete: 'off',
            value: 'danger'
          }),
          label({
            class: [
              'btn',
              'btn-danger',
              'me-2'
            ],
            for: 'app_radio_000005'
          }, [
            text('danger')
          ]),
          input({
            type: 'radio',
            class: 'btn-check',
            id: 'app_radio_000006',
            autocomplete: 'off',
            value: 'warning'
          }),
          label({
            class: [
              'btn',
              'btn-warning',
              'me-2'
            ],
            for: 'app_radio_000006'
          }, [
            text('warning')
          ]),
          input({
            type: 'radio',
            class: 'btn-check',
            id: 'app_radio_000007',
            autocomplete: 'off',
            value: 'info'
          }),
          label({
            class: [
              'btn',
              'btn-info',
              'me-2'
            ],
            for: 'app_radio_000007'
          }, [
            text('info')
          ]),
          input({
            type: 'radio',
            class: 'btn-check',
            id: 'app_radio_000008',
            autocomplete: 'off',
            value: 'light'
          }),
          label({
            class: [
              'btn',
              'btn-light',
              'me-2'
            ],
            for: 'app_radio_000008'
          }, [
            text('light')
          ]),
          input({
            type: 'radio',
            class: 'btn-check',
            id: 'app_radio_000009',
            autocomplete: 'off',
            value: 'dark'
          }),
          label({
            class: [
              'btn',
              'btn-dark',
              'me-2'
            ],
            for: 'app_radio_000009'
          }, [
            text('dark')
          ]),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }
  ]
})
