import {app, nav} from './index.js'
import menu from './data/menu.js'
import lazy from './views/lazy.js'
import error from './views/error.js'
import settings from './views/settings.js'
import ctrl from './views/ctrl.js'
import users from './views/users.js'
import user from './views/user.js'
import chart from './views/chart.js'
import graph from './views/graph.js'

nav(menu)

const home = document.body.querySelector('main').innerHTML
app({
  '*': ({render}) => render(home),
  '/render/lazy': lazy,
  '/render/error': error,
  '/settings': settings,
  '/ctrl': ctrl,
  '/users': users,
  '/users/:id': user,
  '/chart': chart,
  '/graph': graph
})
