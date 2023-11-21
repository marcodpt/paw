export default {
  root: document.getElementById('navbar'),
  set: (_, state) => state,
  init: (data, call) => {
    const offcanvas = new bootstrap.Offcanvas(
      document.getElementById('sidebar')
    )
    const hashchange = () => call('update')
    const navbarchange = ev => call('update', ev.detail)
    window.addEventListener('hashchange', hashchange)
    window.addEventListener('navbarchange', navbarchange)
    call('set', {offcanvas, hashchange, navbarchange})
    call('update', data)
  },
  update: (state, data) => {
    if (data && typeof data == 'object') {
      const {icons, links, sidebar} = data
      const {menu, isClosed, isOpen} = icons || {}
      state.links = links instanceof Array ? links : []
      state.sidebar = sidebar instanceof Array ? sidebar : []
      state.parents = []
      state.isClosed = typeof isClosed == 'string' ?
        isClosed : 'fa-solid fa-angle-down' 
      state.isOpen = typeof isOpen == 'string' ?
        isOpen : 'fa-solid fa-angle-up' 
      state.menu = !state.sidebar.length ? '' :
        typeof menu == 'string' ? menu : 'fa-solid fa-bars'
    }

    const getRoute = (path, query, links) => links.reduce((R, l) => {
      l.css = ''
      l.open = false
      l.indicator = state.isClosed
      l.children = l.children || null 
      const H = (l.href || '').split('?')
      if (path === H.shift() && query.indexOf(H.join('?')) == 0) {
        R.push([l])
      } else if (l.children) {
        l.index = state.parents.length
        state.parents.push(l)
        const L = getRoute(path, query, l.children)
        if (L.length) {
          L.push(l)
          R.push(L)
        }
      }
      return R
    }, []).reduce((R, L) => {
      if (!R.length || (L[0].href || '').length > (R[0].href || '').length) {
        return L
      }
      return R
    }, [])

    const H = location.hash.split('?')
    state.parents = []
    const R = getRoute(
      H.shift() || '#', H.join('?'), [].concat(state.links, state.sidebar)
    )
    R.forEach(l => {
      l.css = ' active'
      l.open = true
      l.indicator = state.isOpen
    })

    return state
  },
  toggle: ({parents, isOpen, isClosed}, ev) => {
    const index = parseInt(ev.target.getAttribute('data-index'))
    parents.forEach((l, i) => {
      if (i == index) {
        l.open = !l.open
        l.indicator = l.open ? isOpen : isClosed
      }
    })
  },
  hide: ({offcanvas}) => {
    offcanvas.hide()
  },
  format: ({menu, links, sidebar}) => ({
    menu, links, sidebar
  }),
  done: ({hashchange, navbarchange}) => {
    window.removeEventListener('hashchange', hashchange)
    window.removeEventListener('navbarchange', navbarchange)
  }
}
