import app from './index.js'
import build from './views/build.js'
import settings from './views/settings.js'
import ctrl from './views/ctrl.js'
import users from './views/users.js'
import user from './views/user.js'
import chart from './views/chart.js'
import graph from './views/graph.js'
import docs from './views/docs.js'
import examples from './views/examples.js'

window.stop = app({
  build,
  root: document.body.querySelector('main'),
  routes: {
    '*': ({render, home}) => render(home),
    '/settings': settings,
    '/ctrl': ctrl,
    '/users': users,
    '/users/:id': user,
    '/chart': chart,
    '/graph': graph,
    '/docs/:component': docs,
    '/examples/:component/:index': examples
  }
})
