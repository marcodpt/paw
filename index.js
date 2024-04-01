import e from './js/e.js'
import render from './js/render.js'
import modal from './js/modal.js'
import message from './js/comp/message.js'
import table from './js/comp/table.js'
import form from './js/comp/form.js'
import row from './js/comp/row.js'
import settings from './js/comp/settings.js'
import chart from './js/comp/chart.js'
import graph from './js/comp/graph.js'
import spinner from './js/comp/spinner.js'
import offcanvas from './js/nav/offcanvas.js'
import menu from './js/nav/menu.js'
import toggler from './js/nav/toggler.js'
import link from './js/nav/link.js'
import list from './js/nav/list.js'
import {rm} from './js/lib.js'

var stop = null
var old = null
const app = routes => {
  const root = document.body.querySelector('main')
  const components = {
    e, modal,
    message, table, form, row, settings, chart, graph, spinner,
    render: (view, el) => render(view, el || root)
  }

  const router = () => {
    const url = (window.location.hash || '#/').substr(1)
    const Url = url.split('?')
    const path = Url.shift()
    const Path = path.split('/').map(decodeURIComponent)
    const query = Url.join('?')
    const Query = query.split('&')
      .map(pair => pair.split('='))
      .map(pair => ({
        key: decodeURIComponent(pair.shift()),
        value: decodeURIComponent(pair.join('='))
      }))
      .filter(({key}) => key != "")
      .reduce((Q, {key, value}) => {
        if (key.substr(key.length - 2) == '[]') {
          key = key.substr(0, key.length - 2)
          if (!(Q[key] instanceof Array)) {
            Q[key] = []
          }
          Q[key].push(value)
        } else {
          Q[key] = value
        }
        return Q
      }, {})

    const {route, Params} = Object.keys(routes).reduce((match, route) => {
      const Route = route.split('/')
      if (Route.length == Path.length) {
        var weight = 1
        const Params = Path.reduce((Params, value, i) => {
          if (Params) {
            if (Route[i].substr(0, 1) == ':') {
              Params[Route[i].substr(1)] = value
            } else if (Route[i] !== value) {
              Params = null
            } else {
              weight++
            }
          }
          return Params
        }, {})
        if (Params && weight > match.weight) {
          return {
            route,
            Params,
            weight,
          }
        }
      }
      return match
    }, {
      route: '*',
      Params: {},
      weight: 0
    })

    if (typeof routes[route] == 'function') {
      const state = {
        url, route, path, Path, Params, query, Query, old, root,
        ...components 
      }
      if (typeof stop == 'function') {
        stop(state)
      }
      stop = routes[route](state)
      old = state
    }

    const hash = '#'+url
    document.body.querySelectorAll('[data-app-active]').forEach(p => {
      p.classList.remove(p.getAttribute('data-app-active'))
    })
    const href = Array.from(
      document.body.querySelectorAll('[data-app-path] > a[href]')
    ).reduce((v, link) => {
      const href = link.getAttribute('href')
      const l = href.length
      return hash.substr(0, l) == href && l > v.length ? href : v
    }, '')

    const link = document.body
      .querySelector('[data-app-path] > a[href="'+href+'"]')
    const T = document.body.querySelectorAll('[data-app-text="current"]')
    if (href && link) {
      const Current = []
      var l = link
      while (l = l.closest('[data-app-path]')) {
        Current.push(l.getAttribute('data-app-path'))
        const p = l.getAttribute('data-app-active') ? l :
          l.querySelector('[data-app-active]')
        if (p) {
          p.classList.add(p.getAttribute('data-app-active'))
        }
        l = l.parentNode
      }
      Current.reverse()
      const current = Current.join(' / ')
      T.forEach(t => {
        t.textContent = current
      })
    } else {
      T.forEach(t => {
        t.textContent = ''
      })
    }
  }

  window.addEventListener('hashchange', router)
  router()
}

const nav = ({links, sidebar}) => {
  const nav = document.body.querySelector('nav > .container-fluid')

  rm(document.getElementById('sidebar'))
  nav.querySelectorAll('[data-app="nav"]').forEach(e => rm(e))

  if (links && links instanceof Array) {
    nav.appendChild(toggler())
    nav.appendChild(link({children: links}))
  }
  if (sidebar && sidebar instanceof Array) {
    nav.prepend(menu({target: '#sidebar'}))

    document.body.appendChild(
      offcanvas({
        id: 'sidebar'
      }, [
        list({children: sidebar})
      ])
    )
  }
}

export {app, nav}
