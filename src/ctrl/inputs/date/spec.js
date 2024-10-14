import html from '../../../node/html.js'

const d = new Date()
const iso = d.toISOString().substr(0, 10)
const iso_min = d.getFullYear()+'-'+('0'+(d.getMonth() + 1)).slice(-2)+'-01'
const unix = Math.round(d.getTime() / 1000)
const unix_min = (d.getTime() - 24 * 60 * 60 * 1000) / 1000
const unix_max = (d.getTime() + 7 * 24 * 60 * 60 * 1000) / 1000

const update = (err, v) => {
  console.log(err)
  console.log(v)
}

export default ({
  title: 'date',
  description: 'Date controller',
  properties: {},
  examples: [
    {
      title: 'A string using ISO',
      data: [
        {
          type: 'string',
          ui: 'date',
          default: iso,
          minimum: iso_min,
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
            type: 'date',
            value: iso,
            min: iso_min
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }, {
      title: 'A integer using Unix timestamp',
      data: [
        {
          type: 'integer',
          ui: 'date',
          default: unix,
          minimum: unix_min,
          maximum: unix_max,
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
            type: 'date',
            value: new Date(unix * 1000).toISOString().substr(0, 10),
            min: new Date(unix_min * 1000).toISOString().substr(0, 10),
            max: new Date(unix_max * 1000).toISOString().substr(0, 10)
          }),
          div({
            class: 'invalid-feedback'
          })
        ])
      )
    }
  ]
})
