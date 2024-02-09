import {app, nav} from './index.js'
import users from './data/users.js'
import schema from './data/schema.js'
import ctrl from './data/ctrl.js'

const delay = 500

const wait = message => new Promise(resolve => {
  setTimeout(() => {
    resolve(message)
  }, delay)
})

nav({
  links: [
    {
      title: 'Tools',
      icon: 'tools',
      children: [
        {
          title: 'Flowchart',
          icon: 'project-diagram',
          href: '#/graph'
        }, {
          title: 'Chart',
          icon: 'chart-line',
          href: '#/chart'
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
  ],
  sidebar: [
    {
      title: 'Users',
      icon: 'user',
      href: '#/users'
    }, {
      title: 'Render',
      icon: 'image',
      children: [
        {
          title: 'Lazy String',
          href: '#/render/string'
        }, {
          title: 'Error',
          href: '#/render/error'
        }
      ]
    }
  ]
})

const home = document.body.querySelector('main').innerHTML
app({
  '*': ({render}) => render(home),
  '/render/string': ({render}) => render(() => wait(`
    <div class="container my-5">
      <h1>Lazy HTML string</h1>
    </div>
  `)),
  '/render/error': ({render}) => render(() => {
    throw 'This is an intentional error showcase!'
  }),
  '/settings': ({render, settings}) => render(settings()),
  '/ctrl': ({render, form, row}) => render(form({
    ...ctrl,
    submit: data => {
      console.log(JSON.stringify(data, undefined, 2))
      return row({
        ...ctrl,
        default: data
      })
    },
    update: (err, data) => {
      console.log(err)
      console.log(JSON.stringify(data, undefined, 2))
    }
  })),
  '/users': ({render, table, modal}) => {
    schema.links[0].href = () => {
      const P = {...schema.items.properties}
      delete P.id
      modal({
        icon: schema.links[0].icon,
        title: 'Insert',
        properties: P,
        submit: user => {
          users.push({
            ...user,
            id: users.reduce(
              (rowid, {id}) => id >= rowid ? id + 1 : rowid
            , 0)
          })
          tbl.setData(users)
          return 'New user inserted!'
        }
      })
    }
    schema.items.links[0].href = user => modal({
      icon: schema.items.links[0].icon,
      title: 'Delete: '+user.name,
      description: 'Do you want to delete this row?',
      submit: () => {
        const i = users.reduce((p, {id}, i) => id == user.id ? i : p, -1)
        if (i >= 0) {
          users.splice(i, 1)
          tbl.setData(users)
        }
        return `User ${user.name} was removed!`
      }
    })
    schema.items.links[1].href = (user) => {
      const P = {...schema.items.properties}
      delete P.id
      modal({
        icon: schema.items.links[1].icon,
        title: 'Edit: '+user.name,
        properties: P,
        default: user,
        submit: data => {
          Object.assign(users.filter(({id}) => id == user.id)[0], data)
          tbl.setData(users)
          return `User ${user.name} was edited!`
        }
      })
    }
    schema.config = {
      limit: null,
      noSearch: false,
      noFilter: false
    }
    const tbl = table(schema)
    render(tbl)
    setTimeout(() => {
      tbl.setData(users)
    }, delay)
  },
  '/users/:id': ({render, Params, row, modal}) => {
    const user = users.filter(({id}) => id == Params.id)[0]
    const s = {
      ...schema.items,
      title: user.name,
      default: user
    }
    s.links[0].href = () => modal({
      icon: s.links[0].icon,
      title: 'Delete: '+user.name,
      description: 'Do you want to delete this row?',
      submit: () => {
        const i = users.reduce((p, {id}, i) => id == user.id ? i : p, -1)
        if (i >= 0) {
          users.splice(i, 1)
        }
        history.back()
      }
    })
    s.links[1].href = () => {
      const P = {...schema.items.properties}
      delete P.id
      modal({
        icon: s.links[1].icon,
        title: 'Edit: '+user.name,
        properties: P,
        default: user,
        submit: data => {
          const name = user.name
          Object.assign(user, data)
          render(row(s))
          return `User ${name} was edited!`
        }
      })
    }
    render(row(s))
  },
  '/chart': ({render, chart}) => render(chart({
    title: '$',
    labels: [
      "Jan",
      "Fev",
      "Mar"
    ],
    datasets: [
      {
        data: [
          1.5,
          3,
          4.5
        ],
        borderColor: "blue",
        label: "Sells ($)"
      }, {
        data: [
          2.5,
          3,
          2.5
        ],
        borderColor: "red",
        label: "Expenses ($)"
      }
    ]
  })),
  '/graph': ({render, graph}) => render(graph({
    data: [
      {
        id: 'v1',
        label: 'John',
        color: 'black',
        info: () => wait('I am john!')
      }, {
        id: 'v2',
        label: 'Paul',
        color: 'black',
        info: 'I am Paul!'
      }, {
        id: 'v3',
        label: 'Jimmy',
        color: 'black',
        info: () => wait('I am Jimmy!')
      }, {
        id: 'v4',
        label: 'David',
        color: 'black',
        info: 'I am David!'
      }, {
        id: 'e1',
        label: 'John -> Paul',
        color: 'blue',
        info: 'Cold!',
        source: 'v1',
        target: 'v2'
      }, {
        id: 'e2',
        label: 'Paul -> Jimmy',
        color: 'yellow',
        info: () => wait('Warm!'),
        source: 'v2',
        target: 'v3'
      }, {
        id: 'e3',
        label: 'Paul -> David',
        color: 'red',
        info: 'Very close!',
        source: 'v2',
        target: 'v4'
      }, {
        id: 'e4',
        label: 'Wrong Edge',
        color: 'red',
        info: 'It must be excluded!',
        source: 'v2',
        target: 'v5'
      }
    ]
  }))
})
