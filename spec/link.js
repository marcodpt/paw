import ctrl from '../src/ctrl/index.js'
import opt from '../src/ctrl/options.js'
import tag from './tag.js'

export default ({
  icon: 'link',
  title: 'link',
  description: 'Buttons and links.',
  component: ctrl,
  properties: {
    link: {
      type: 'string',
      enum: opt('link', true),
      description: `
        One of the bootstrap 5 button variants.
        If href is a string, the default value is: link.
        Otherwise, the default value is: primary.
      `
    },
    href: {
      type: 'string',
      description: `
        A string <a> or a function <button>.
        If a string is passed, the data object will be used to interpolate the URL {vars}.
        If a function is passed, data will be passed as the first parameter when clicked. 
        An empty string generates a disabled link, any other falsy value a disabled button.
        Only if href is a string and contains a protocol (://) will the target be _blank.
      `
    },
    size: {
      type: 'string',
      description: `
        The size of the link.
        Medium size link is the default.
      `,
      enum: ['sm', 'lg']
    },
    data: {
      type: 'object',
      description: `
        If href is a string, it will be used to interpolate the URL {vars}.
        If href is a function, it will be passed as the first param when clicked.
      `
    },
    ...tag.properties
  },
  examples: [
    {
      title: 'A link to home',
      data: [
        {
          title: 'Go Home!',
          href: '#/'
        }, {
          title: 'Go Home!',
          href: '#/',
          description: '',
          icon: '',
          size: 'xxx',
          data: {
            x: 'dog'
          }
        }, {
          title: 'Go Home!',
          href: '#/',
          description: '',
          icon: '',
          size: '',
          data: null
        }
      ],
      html: `<a href="#/">Go Home!</a>`
    }, {
      title: 'A external link with target _blank',
      data: [
        {
          icon: '@github',
          title: 'Repository',
          href: 'https://github.com/marcodpt/app'
        }
      ],
      html: 
`<a
  href="https://github.com/marcodpt/app"
  target="_blank"
><span><i class="fa-brands fa-github"></i> Repository</span></a>`
    }, {
      title: 'A button that says hello!',
      data: [
        {
          title: 'Hi!',
          href: () => {
            document.getElementById('result').textContent = 'hello!'
          }
        }
      ],
      html: `<button class="btn btn-primary" type="button">Hi!</button>`
    }
  ]
})
