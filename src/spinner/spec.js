import T from '../lang/index.js'
import html from '../node/html.js'
import {spinner} from '../components.js'

export default ({
  icon: 'spinner',
  title: 'spinner',
  component: spinner,
  description: 'The default spinner.',
  properties: {},
  examples: [
    {
      title: 'Spinner',
      description: 'No options available to have a consistent user interface.',
      data: [
        {}
      ],
      html: html(({
        div,
        span,
        text
      }) => 
        div({
          class: [
            'd-flex',
            'justify-content-center',
            'p-5'
          ],
          title: T('loading')
        }, [
          div({
            class: 'spinner-border',
            style: {
              width: '5rem',
              height: '5rem'
            },
            role: 'status'
          }, [
            span({
              class: 'visually-hidden'
            }, [
              text(T('loading'))
            ])
          ])
        ])
      )
    }
  ]
})
