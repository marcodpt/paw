import paw from 'https://cdn.jsdelivr.net/gh/marcodpt/paw@0.7.7/index.min.js'

paw({
  build: () => {
    const home = document.body.querySelector('main')
      .firstElementChild.cloneNode(true)
    return {home}
  },
  root: document.body.querySelector('main'),
  routes: {
    '*': ({render, home}) => render(home),
    '/hello/:name': ({render, Params, node}) => render(node(({
      div, h1, text
    }) => 
      div({
        class: 'container my-5'
      }, [
        h1({}, [
          text(`Hello ${Params.name}`)
        ])
      ])
    )),
    '/login': ({render, form, modal}) => render(form({
      css: 'container my-5',
      title: 'Login',
      icon: 'sign-in',
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
          context: 'primary',
          title: 'Login',
          href: (data) => {
            modal({
              title: 'Login',
              icon: 'sign-in',
              context: 'info',
              description: 'This was just a demo.\nNow it\'s up to you!'
            })
          }
        }
      ]
    }))
  }
})
