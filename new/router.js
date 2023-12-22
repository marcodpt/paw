var stop = null
var old = null
export default routes => () => {
  const root = document.body.querySelector('main')
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
    const state = {url, route, path, Path, Params, query, Query, old}
    if (typeof stop == 'function') {
      stop(state)
    }
    stop = routes[route](root, state)
    old = state
  }
}
