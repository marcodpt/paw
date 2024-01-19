import e from './e.js'
import router from './router.js'
import options from './options.js'
import table from './newtable.js'
import form from './form.js'
import row from './row.js'
import users from '../data/users.js'
import schema_users from '../schema/users.js'
import {queryString} from './lib.js'
import offcanvas from './tags/offcanvas.js'
import navmenu from './tags/navmenu.js'
import navtoggler from './tags/navtoggler.js'
import navlink from './tags/navlink.js'
import list from './tags/list.js'

const delay = 500

const wait = message => new Promise(resolve => {
  setTimeout(() => {
    resolve(message)
  }, delay)
})

const view = (root, elem) => {
  root.innerHTML = ''
  if (elem) {
    root.appendChild(elem)
  }
}

window.setTheme = theme => document.getElementById('theme')
  .setAttribute('href', theme)

window.setNavbar = css => document.body
  .querySelector('nav.navbar')
  .setAttribute('class', `navbar navbar-expand-lg ${css}`)

const nav = document.body.querySelector('nav > .container-fluid')

nav.appendChild(navtoggler())
nav.appendChild(navlink({children: [
  {
    title: 'Tools',
    icon: 'tools',
    children: [
      {
        title: 'Flowchart',
        icon: 'project-diagram',
        href: '#/graph/sample'
      }, {
        title: 'Chart',
        icon: 'chart-line',
        href: '#/chart/sample'
      }, {
        title: 'Import Files',
        icon: 'file',
        href: '#/upload'
      }
    ]
  }, {
    title: 'Set Theme',
    icon: 'palette',
    children: options.theme.map(({value, label}) => ({
      title: label,
      href: `javascript:setTheme('${value}')`
    }))
  }, {
    title: 'Set Navbar',
    icon: 'droplet',
    children: options.navbar.map(({value, label}) => ({
      title: label,
      href: `javascript:setNavbar('${value}')`
    }))
  }, {
    title: 'Logout',
    icon: 'power-off',
    href: '#/logout'
  }, {
    title: 'Repository',
    icon: 'code-fork',
    href: 'https://github.com/marcodpt/app'
  }
]}))

nav.prepend(navmenu({target: '#sidebar'}))

document.body.appendChild(
  offcanvas({
    id: 'sidebar'
  }, [
    list({children: [
      {
        title: 'Data',
        children: [
          {
            title: 'Users',
            href: '#/users'
          }
        ]
      }, {
        title: 'Login',
        icon: 'sign-in',
        href: '#/login'
      }
    ]})
  ])
)

const run = (...F) => data => F.reduce((data, F) => F(data), data)

const cmp = Fields => {
  const F = Fields.filter(f => f && typeof f == 'string').map(f => {
    const x = f.substr(0, 1) == '-' ? -1 : 1
    return {x, k: x == -1 ? f.substr(1) : f}
  })

  return (a, b) =>  F.reduce(
    (r, {x, k}) => r || x * (a[k] > b[k] ? 1 : a[k] < b[k] ? -1 : 0)
  , 0)
}

const sort = Fields => data => {
  data.sort(cmp(Fields))
  return data
}

const pager = p => data => data.slice((p - 1) * 10, p * 10)

const search = match => data => {
  if (match) {
    data = data.filter(row => Object.keys(row).reduce((pass, k) =>
      pass || String(row[k]).toLowerCase().indexOf(match.toLowerCase()) >= 0
    , false))
  }
  return data
}

router({
  '*': main => view(main, e(({div, h1, text}) =>
    div({class: 'container my-5'}, [
      h1({}, [
        text("Hello world!")
      ])
    ])
  )),
  '/hello/:name': (main, {Params}) => view(main, e(({div, h1, text}) =>
    div({class: 'container my-5'}, [
      h1({}, [
        text(`Hello ${Params.name}!`)
      ])
    ])
  )),
  '/users': (main, {url, path, Query}) => {
    const tbl = table(schema_users)
    view(main, tbl)
    setTimeout(() => {
      tbl.setData(users)
    }, delay)
    /*const goto = (Q, raw) => {
      const q = queryString({
        ...Query,
        ...(Q || {})
      })
      const href = '#'+path+(q.length?'?'+q:'')
      return raw ? href : `javascript:location.replace("${href}")`
    }
    const p = !Query._page || isNaN(Query._page) ? 1 : parseInt(Query._page)
    const ps = Math.ceil(run(
      search(Query._search)
    )(users).length / 10) || 1
    if (p > ps) {
      return location.replace(goto({_page: ps}, true))
    }
    setTimeout(() => {
      tbl.dispatchEvent(new CustomEvent('app.table', {detail: {
        pagination: {
          page: p,
          pages: ps,
          change: _page => location.replace(goto({_page}, true)),
          first: goto({
            _page: 1
          }),
          previous: goto({
            _page: p - 1
          }),
          next: goto({
            _page: p + 1
          }),
          last: goto({
            _page: ps
          })
        },
        sort: {
          status: k => Query._sort == '-'+k ? -1 : Query._sort == k ? 1 : 0,
          change: k => goto({
            _sort: (Query._sort == k ? '-' : '')+k
          })
        },
        search: {
          value: Query._search || '',
          change: data => location.replace(goto({
            _search: data || null
          }, true)),
          clear: goto({
            _search: null
          })
        },
        rows: run(
          search(Query._search),
          sort([Query._sort || 'id']), 
          pager(p)
        )(users),
        totals: null
      }}))
    }, delay)*/
  },
  '/users/:id': (main, {Params}) => {
    const X = users.filter(({id}) => id == Params.id)[0]
    view(main, row({
      ...schema_users.items,
      title: X.name,
      default: X 
    }))
  },
  '/insert/users': main => {
    const P = {...schema_users.items.properties}
    delete P.id
    view(main, form({
      title: 'Insert',
      description: '',
      properties: P,
      submit: user => {
        users.push({
          ...user,
          id: users.reduce((rowid, {id}) => id >= rowid ? id + 1 : rowid, 0)
        })
        return wait('New user inserted!')
      }
    }))
  },
  '/:service/users/:id': (main, {Params}) => {
    const s = Params.service
    const row = users.filter(({id}) => id == Params.id)[0]
    const P = {...schema_users.items.properties}
    delete P.id
    view(main, form({
      title: s.substr(0, 1).toUpperCase()+s.substr(1)+
        (row ? ': '+row.name : ''),
      description: s == 'delete' ? 'Do you want to delete this row?' : '',
      properties: s == 'delete' ? null : P,
      default: row,
      submit: user => {
        if (Params.service == 'delete') {
          const i = users.reduce((p, {id}, i) => id == Params.id ? i : p, -1)
          if (i >= 0) {
            users.splice(i, 1)
          }
          return wait(`User ${row.name} was removed!`)
        } else {
          Object.assign(users.filter(({id}) => id == Params.id)[0], user)
          return wait(`User ${row.name} was edited!`)
        }
      }
    }))
  }
})
