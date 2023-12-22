import config from './config.js'
const {tools, icon} = config

export default {
  root: document.getElementById('navbar'),
  set: (_, state) => state,
  init: ({api}, call) => {
    const offcanvas = new bootstrap.Offcanvas(
      document.getElementById('sidebar')
    )
    const hashchange = () => call('update')
    const navbarchange = ev => call('update', ev.detail)
    window.addEventListener('hashchange', hashchange)
    window.addEventListener('navbarchange', navbarchange)
    call('set', {
      menu: tools.icon(icon.menu),
      isOpen: tools.icon(icon.isOpen),
      isClosed: tools.icon(icon.isClosed),
      offcanvas,
      hashchange,
      navbarchange
    })
    call('update', api)
  },
  update: (state, data) => {
    if (data && typeof data == 'object') {
      const setIcons = links => links.forEach(link => {
        link.icon = tools.icon(link.icon)
        if (link.children) {
          setIcons(link.children)
        }
      })
      const {links, sidebar} = data
      state.links = links instanceof Array ? links : []
      state.sidebar = sidebar instanceof Array ? sidebar : []
      state.parents = []
      setIcons(state.links)
      setIcons(state.sidebar)
    }

    const getRoute = (path, query, links) => links.reduce((R, l) => {
      l.css = ''
      l.open = false
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
    })
    state.current = R.map(({title}) => title).reverse().join(' / ')

    return state
  },
  toggle: ({parents}, ev) => {
    const index = parseInt(ev.target.closest('a').getAttribute('data-index'))
    parents.forEach((l, i) => {
      if (i == index) {
        l.open = !l.open
      }
    })
  },
  hide: ({offcanvas}) => {
    offcanvas.hide()
  },
  format: ({menu, isOpen, isClosed, current, links, sidebar}) => ({
    menu,
    isOpen,
    isClosed,
    current,
    links,
    sidebar: sidebar && sidebar.length ? sidebar : null
  }),
  done: ({hashchange, navbarchange}) => {
    window.removeEventListener('hashchange', hashchange)
    window.removeEventListener('navbarchange', navbarchange)
  }
}
