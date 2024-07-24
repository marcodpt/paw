import T from '../src/lang/index.js'
import spinner from '../src/spinner.js'

export default ({
  icon: 'spinner',
  title: 'spinner',
  component: spinner,
  description: 'The default spinner to use in app routes.',
  properties: {},
  examples: [
    {
      title: 'Spinner',
      description: 'No options available to have a consistent user interface.',
      data: [
        {}
      ],
      html: 
`<div
  class="d-flex justify-content-center p-5"
  title="${T('loading')}"
>
  <div
    class="spinner-border"
    style="width: 5rem; height: 5rem"
    role="status"
  >
    <span class="visually-hidden">${T('loading')}</span>
  </div>
</div>`
    }
  ]
})
