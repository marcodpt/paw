import e from './e.js'
import router from './router.js'
import options from './options.js'
import row from './row.js'
import users from '../data/users.js'
import schema_users from '../schema/users.js'
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

router({
  '*': ({root}) => view(root, e(({div, h1, text}) =>
    div({class: 'container my-5'}, [
      h1({}, [
        text("Hello world!")
      ])
    ])
  )),
  '/hello/:name': ({root, Params}) => view(root, e(({div, h1, text}) =>
    div({class: 'container my-5'}, [
      h1({}, [
        text(`Hello ${Params.name}!`)
      ])
    ])
  )),
  '/users': ({root, url, path, Query, table}) => {
    const tbl = table(schema_users)
    view(root, tbl)
    setTimeout(() => {
      tbl.setData(users)
    }, delay)
  },
  '/users/:id': ({root, Params}) => {
    const X = users.filter(({id}) => id == Params.id)[0]
    view(root, row({
      ...schema_users.items,
      title: X.name,
      default: X 
    }))
  },
  '/insert/users': ({root, form}) => {
    const P = {...schema_users.items.properties}
    delete P.id
    view(root, form({
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
  '/:service/users/:id': ({root, Params, form}) => {
    const s = Params.service
    const row = users.filter(({id}) => id == Params.id)[0]
    const P = {...schema_users.items.properties}
    delete P.id
    view(root, form({
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
