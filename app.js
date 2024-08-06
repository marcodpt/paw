import paw from './index.js'
import build from './views/build.js'
import settings from './views/settings.js'
import users from './views/users.js'
import user from './views/user.js'
import doc from './views/doc.js'
import example from './views/example.js'
import converter from './views/converter.js'

window.stop = paw({
  build,
  root: document.body.querySelector('main'),
  routes: {
    '*': ({render, home}) => render(home),
    '/settings': settings,
    '/converter': converter,
    '/users': users,
    '/users/:id': user,
    '/doc/:component': doc,
    '/example/:component/:index': example
  }
})
