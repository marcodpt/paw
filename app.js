import app from './index.js'
import users from './data/users.js'
import schema from './data/schema.js'
import ctrl from './data/ctrl.js'
import offcanvas from './js/tags/offcanvas.js'
import navmenu from './js/tags/navmenu.js'
import navtoggler from './js/tags/navtoggler.js'
import navlink from './js/tags/navlink.js'
import list from './js/tags/list.js'
import {copy} from './js/lib.js'

const delay = 500

const wait = message => new Promise(resolve => {
  setTimeout(() => {
    resolve(message)
  }, delay)
})

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
      }, {
        title: 'Controls',
        icon: 'gamepad',
        href: '#/ctrl'
      }
    ]
  }, {
    title: 'Settings',
    icon: 'cog',
    href: '#/settings'
  }, {
    title: 'Repository',
    icon: '@github',
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
        title: 'Users',
        icon: 'user',
        href: '#/users'
      }, {
        title: 'Render',
        icon: 'image',
        children: [
          {
            title: 'Raw String',
            href: '#/render/string'
          }, {
            title: 'Lazy String',
            href: '#/render/lazystring'
          }, {
            title: 'Hyperscript Object',
            href: '#/render/object'
          }, {
            title: 'Lazy Hyperscript Object',
            href: '#/render/lazyobject'
          }, {
            title: 'Error',
            href: '#/render/error'
          }
        ]
      }
    ]})
  ])
)

const home = document.body.querySelector('main').innerHTML
app({
  '*': ({render, e}) => render(home),
  '/render/string': ({render}) => render(`
    <div class="container my-5">
      <h1>Raw HTML string</h1>
    </div>
  `),
  '/render/lazystring': ({render}) => render(() => wait(`
    <div class="container my-5">
      <h1>Lazy HTML string</h1>
    </div>
  `)),
  '/render/object': ({render, e}) => render(e(({div, h1, text}) =>
    div({
      class: 'container my-5'
    }, [
      h1({}, [
        text("Hyperscript Object")
      ])
    ])
  )),
  '/render/lazyobject': ({render, e}) => render(() => wait(e(({div, h1, text}) =>
    div({
      class: 'container my-5'
    }, [
      h1({}, [
        text("Lazy Hyperscript Object")
      ])
    ])
  ))),
  '/render/error': ({render}) => render(() => {
    throw 'This is an intentional error showcase!'
  }),
  '/settings': ({render, settings}) => render(settings()),
  '/ctrl': ({render, form, row}) => render(form({
    ...ctrl,
    submit: data => {
      console.log(JSON.stringify(data, undefined, 2))
      const schema = copy(ctrl) 
      const P = schema.properties
      Object.keys(P).forEach(k => {
        P[k].default = data[k]
      })
      return row(schema)
    },
    update: (err, data) => {
      console.log(err)
      console.log(JSON.stringify(data, undefined, 2))
    }
  })),
  '/users': ({render, url, path, Query, table}) => {
    const tbl = table(schema)
    render(tbl)
    setTimeout(() => {
      tbl.setData(users)
    }, delay)
  },
  '/users/:id': ({render, Params, row}) => {
    const X = users.filter(({id}) => id == Params.id)[0]
    render(row({
      ...schema.items,
      title: X.name,
      default: X 
    }))
  },
  '/insert/users': ({render, form}) => {
    const P = {...schema.items.properties}
    delete P.id
    render(form({
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
  '/:service/users/:id': ({render, Params, form}) => {
    const s = Params.service
    const row = users.filter(({id}) => id == Params.id)[0]
    const P = {...schema.items.properties}
    delete P.id
    render(form({
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
