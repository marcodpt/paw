import app from './index.js'
import build from './views/build.js'
import settings from './views/settings.js'
import users from './views/users.js'
import user from './views/user.js'
import docs from './views/docs.js'
import examples from './views/examples.js'

window.stop = app({
  build,
  root: document.body.querySelector('main'),
  routes: {
    '*': ({render, home}) => render(home),
    '/settings': settings,
    '/users': users,
    '/users/:id': user,
    '/docs/:component': docs,
    '/examples/:component/:index': examples
  }
})
