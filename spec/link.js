import ctrl from '../src/ctrl/index.js'
import opt from '../src/ctrl/options.js'
import tag from './tag.js'
import wait from './wait.js'

var ref = null
export default ({
  icon: 'link',
  title: 'link',
  description: 'Buttons and links.',
  component: ctrl,
  properties: {
    context: {
      type: 'string',
      enum: opt('context', true),
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
            ref.closest('div').innerHTML = '<h1>Hello!</h1>'
          },
          init: btn => {
            ref = btn
          }
        }
      ],
      html: `<button class="btn btn-primary" type="button">Hi!</button>`,
      click: '<h1>Hello!</h1>'
    }, {
      title: 'A blocked default link!',
      data: [
        {
          icon: 'times',
          title: 'No action!',
          href: ''
        }
      ],
      html: 
`<a
  class="btn btn-link disabled"
  href="javascript:;"
><span><i class="fa-solid fa-times"></i> No action!</span></a>`
    }, {
      title: 'A blocked default button!',
      data: [
        {
          icon: 'times',
          title: 'No action!',
          href: false
        }
      ],
      html: 
`<button
  class="btn btn-primary disabled"
  type="button"
><span><i class="fa-solid fa-times"></i> No action!</span></button>`
    }, {
      title: 'A link with data, size and description!',
      data: [
        {
          icon: 'house',
          title: 'Home',
          href: '#/?user={user}&id={id}',
          data: {
            user: 'josh',
            id: 34
          },
          size: 'sm'
        }
      ],
      html: 
`<a
  class="btn btn-link btn-sm"
  href="#/?user=josh&amp;id=34"
><span><i class="fa-solid fa-house"></i> Home</span></a>`
    }, {
      title: 'A button with data, size, link and description!',
      data: [
        {
          icon: 'face-smile',
          context: 'warning',
          title: 'Greetings',
          description: 'My hello message!',
          href: data => {
            ref.closest('div').innerHTML = '<h1>Hello '+data+'!</h1>'
          },
          init: btn => {
            ref = btn
          },
          data: 'josh',
          size: 'lg'
        }
      ],
      html: 
`<button
  class="btn btn-warning btn-lg"
  title="My hello message!"
  type="button"
><span><i class="fa-solid fa-face-smile"></i> Greetings</span></button>`
    }, {
      title: 'A download link with delay',
      data: [
        {
          icon: 'database',
          context: 'secondary',
          title: 'Backup',
          description: 'Sample backup!',
          href: data => wait(1000).then(() => `Hello ${data}!`),
          data: 'josh',
          download: 'sample.txt',
          mime: 'text/plain'
        }
      ],
      html: 
`<button
  class="btn btn-secondary"
  title="Sample backup!"
  type="button"
>
  <span><i class="fa-solid fa-database"></i> Backup</span>
  <a class="d-none" href="data:text/plain," download="sample.txt"></a>
</button>`
    }, {
      title: 'A dropdown button',
      data: [
        {
          icon: 'flask',
          context: 'secondary',
          title: 'Dropdown',
          href: '',
          links: [
            {
              icon: 'face-smile',
              title: 'Say Hi!',
              href: () => {window.alert('Hi!')}
            }, {
              icon: 'home',
              title: 'Go Home!',
              href: '#/'
            }, {
              icon: 'times',
              title: 'No Action!'
            }
          ]
        }
      ],
      html: 
`<div class="btn-group">
  <button
    class="btn btn-secondary dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <span><i class="fa-solid fa-flask"></i> Dropdown</span>
  </button>
  <ul class="dropdown-menu">
    <li>
      <a
        class="dropdown-item"
        href="javascript:;"
      >
        <span><i class="fa-solid fa-face-smile"></i> Say Hi!</span>
      </a>
    </li>
    <li>
      <a
        class="dropdown-item"
        href="#/"
      >
        <span><i class="fa-solid fa-home"></i> Go Home!</span>
      </a>
    </li>
    <li>
      <a
        class="dropdown-item disabled"
        href="javascript:;"
        aria-disabled="true"
      >
        <span><i class="fa-solid fa-times"></i> No Action!</span>
      </a>
    </li>
  </ul>
</div>`
    }, {
      title: 'A dropdown split button large',
      data: [
        {
          icon: 'face-smile',
          context: 'warning',
          title: 'Say Hi!',
          href: () => {window.alert('Hi!')},
          size: 'lg',
          links: [
            {
              icon: 'face-smile',
              title: 'Say Hi!',
              href: () => {window.alert('Hi!')}
            }, {
              icon: 'home',
              title: 'Go Home!',
              href: '#/'
            }, {
              icon: 'times',
              title: 'No Action!'
            }
          ]
        }
      ],
      html: 
`<div class="btn-group">
  <button
    class="btn btn-warning btn-lg"
    type="button"
  >
    <span><i class="fa-solid fa-face-smile"></i> Say Hi!</span>
  </button>
  <button
    class="btn btn-warning btn-lg dropdown-toggle dropdown-toggle-split"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
  </button>
  <ul class="dropdown-menu">
    <li>
      <a
        class="dropdown-item"
        href="javascript:;"
      >
        <span><i class="fa-solid fa-face-smile"></i> Say Hi!</span>
      </a>
    </li>
    <li>
      <a
        class="dropdown-item"
        href="#/"
      >
        <span><i class="fa-solid fa-home"></i> Go Home!</span>
      </a>
    </li>
    <li>
      <a
        class="dropdown-item disabled"
        href="javascript:;"
        aria-disabled="true"
      >
        <span><i class="fa-solid fa-times"></i> No Action!</span>
      </a>
    </li>
  </ul>
</div>`
    }, {
      title: 'A dropdown split link small',
      data: [
        {
          icon: 'home',
          context: 'info',
          title: 'Go Home!',
          href: '#/',
          size: 'sm',
          links: [
            {
              icon: 'face-smile',
              title: 'Say Hi!',
              href: () => {window.alert('Hi!')}
            }, {
              icon: 'home',
              title: 'Go Home!',
              href: '#/'
            }, {
              icon: 'times',
              title: 'No Action!'
            }
          ]
        }
      ],
      html: 
`<div class="btn-group">
  <a
    class="btn btn-info btn-sm"
    href="#/"
  >
    <span><i class="fa-solid fa-home"></i> Go Home!</span>
  </a>
  <button
    class="btn btn-info btn-sm dropdown-toggle dropdown-toggle-split"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
  </button>
  <ul class="dropdown-menu">
    <li>
      <a
        class="dropdown-item"
        href="javascript:;"
      >
        <span><i class="fa-solid fa-face-smile"></i> Say Hi!</span>
      </a>
    </li>
    <li>
      <a
        class="dropdown-item"
        href="#/"
      >
        <span><i class="fa-solid fa-home"></i> Go Home!</span>
      </a>
    </li>
    <li>
      <a
        class="dropdown-item disabled"
        href="javascript:;"
        aria-disabled="true"
      >
        <span><i class="fa-solid fa-times"></i> No Action!</span>
      </a>
    </li>
  </ul>
</div>`
    }, {
      title: 'A disabled dropdown button',
      data: [
        {
          icon: 'flask',
          context: 'secondary',
          title: 'Dropdown',
          href: '',
          links: []
        }
      ],
      html: 
`<div class="btn-group">
  <button
    class="btn btn-secondary disabled dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <span><i class="fa-solid fa-flask"></i> Dropdown</span>
  </button>
  <ul class="dropdown-menu">
  </ul>
</div>`
    }, {
      title: 'A disabled dropdown split button small',
      data: [
        {
          icon: 'face-smile',
          context: 'warning',
          title: 'Say Hi!',
          href: () => {window.alert('Hi!')},
          size: 'sm',
          links: []
        }
      ],
      html: 
`<div class="btn-group">
  <button
    class="btn btn-warning btn-sm"
    type="button"
  >
    <span><i class="fa-solid fa-face-smile"></i> Say Hi!</span>
  </button>
  <button
    class="btn btn-warning btn-sm disabled dropdown-toggle dropdown-toggle-split"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
  </button>
  <ul class="dropdown-menu"></ul>
</div>`
    }, {
      title: 'A disabled dropdown split link large',
      data: [
        {
          icon: 'home',
          context: 'info',
          title: 'Go Home!',
          href: '#/',
          size: 'lg',
          links: []
        }
      ],
      html: 
`<div class="btn-group">
  <a
    class="btn btn-info btn-lg"
    href="#/"
  >
    <span><i class="fa-solid fa-home"></i> Go Home!</span>
  </a>
  <button
    class="btn btn-info btn-lg disabled dropdown-toggle dropdown-toggle-split"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
  </button>
  <ul class="dropdown-menu"></ul>
</div>`
    }
  ]
})
