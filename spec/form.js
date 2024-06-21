import form from '../src/form.js'
import schema from '../views/data/schema.js'
import T from '../src/lang/index.js'

const P = schema.items.properties
const K = Object.keys(P)
const O = Object.keys(T('operators'))

export default ({
  icon: 'square-check',
  title: 'form',
  description: 'Form with validation.',
  component: form,
  properties: {},
  examples: [
    {
      title: 'Empty',
      data: [
        {}
      ]
    }, {
      title: 'Alert',
      data: [
        {
          description: 'Hello!\nThis is an alert!',
          ui: 'info'
        }
      ]
    }, {
      title: 'Header',
      data: [
        {
          title: 'A header',
          description: 'Associated description',
          icon: 'exclamation-circle'
        }
      ]
    }, {
      title: 'Login',
      data: [
        {
          title: 'Login',
          icon: 'sign-in',
          size: 'lg',
          properties: {
            name: {
              title: '',
              type: 'string',
              description: 'Username'
            },
            pass: {
              title: '',
              type: 'string',
              ui: 'password',
              description: 'Password'
            }
          },
          block: true,
          links: [
            {
              icon: 'sign-in',
              link: 'primary',
              title: 'Login',
              href: (data) => {
                console.log(data)
              }
            }
          ]
        }
      ]
    }, {
      title: 'Register',
      data: [
        {
          title: 'Register',
          icon: 'user',
          size: 'sm',
          properties: {
            name: {
              type: 'string'
            },
            email: {
              type: 'string'
            },
            age: {
              type: 'integer'
            },
            language: {
              type: 'string',
              enum: [
                'English',
                'Spanish',
                'Chinese'
              ]
            },
            news: {
              type: 'boolean'
            },
            bio: {
              type: 'string',
              ui: 'text'
            }
          },
          submit: data => {
            console.log(data)
          }
        }
      ]
    }, {
      title: 'Filter',
      data: [
        {
          properties: {
            field: {
              type: 'string',
              title: T('field'),
              default: K[0],
              options: K.map(k => ({
                value: k,
                label: P[k].title
              }))
            },
            operator: {
              type: 'string',
              title: T('operator'),
              default: O[0],
              options: O.map(o => ({
                value: o,
                label: T('operators')[o]
              }))
            },
            value: {
              type: 'string',
              minLength: 1,
              title: T('value')
            }
          },
          submit: data => {
            console.log(data)
          }
        }
      ]
    }
  ]
})
