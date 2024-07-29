import app from './index.js'
import build from './views/build.js'
import settings from './views/settings.js'
import users from './views/users.js'
import user from './views/user.js'
import docs from './views/docs.js'
import docs2 from './views/docs2.js'
import examples from './views/examples.js'
import examples2 from './views/examples2.js'
import converter from './views/converter.js'

window.stop = app({
  build,
  root: document.body.querySelector('main'),
  routes: {
    '*': ({render, home}) => render(home),
    '/settings': settings,
    '/converter': converter,
    '/users': users,
    '/users/:id': user,
    '/docs/:component': docs,
    '/info/:component': docs2,
    '/examples/:component/:index': examples,
    '/input/:component/:index': examples2
  }
})
