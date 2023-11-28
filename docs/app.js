import merlin from "https://cdn.jsdelivr.net/gh/marcodpt/merlin@0.1.0/index.js"
import navbar from './js/navbar.js'
import table from './js/table.js'
import form from './js/form.js'
import row from './js/row.js'
import users from './data/users.js'
import schema_users from './schema/users.js'
import {copy} from './js/lib.js'

const search = match => row => Object.keys(row).reduce((pass, k) =>
  pass || String(row[k]).toLowerCase().indexOf(match.toLowerCase()) >= 0
, !match)

merlin({
  components: {
    table,
    form,
    row,
    navbar
  },
  routes: [
    {}, {
      route: '#'
    }, {
      route: '#/'
    },
    {
      route: '#/:name',
      component: 'table'
    }, {
      route: '#/:name/:id',
      component: 'row'
    }, {
      route: '#/insert/:name',
      component: 'form'
    }, {
      route: '#/:service/:name/:id',
      component: 'form'
    }, {
      route: '#/graph/:name'
    }, {
      route: '#/chart/:name'
    }, {
      route: '#/upload'
    }
  ],
  navbar: {
    links: [
      {
        title: 'Tools',
        icon: 'fa-solid fa-tools',
        children: [
          {
            title: 'Flowchart',
            icon: 'fa-solid fa-project-diagram',
            href: '#/graph/sample'
          }, {
            title: 'Chart',
            icon: 'fa-solid fa-chart-line',
            href: '#/chart/sample'
          }, {
            title: 'Import Files',
            icon: 'fa-solid fa-file',
            href: '#/upload'
          }
        ]
      }
    ],
    sidebar: [
      {
        title: 'Data',
        children: [
          {
            title: 'Users',
            href: '#/users'
          }
        ]
      }
    ]
  },
  table: {
    schema: () => schema_users,
    rows: ({Query}) => {
      const sort = Query._sort || 'id'
      const x = sort.substr(0, 1) == '-' ? -1 : 1
      const s = x == -1 ? sort.substr(1) : sort
      users.sort((a, b) => x * (a[s] > b[s] ? 1 : a[s] < b[s] ? -1 : 0))

      const page = Query._page
      const p = !page || isNaN(page) ? 1 : parseInt(page)
      return users.filter(search(Query._search)).slice((p - 1) * 10, p * 10)
    },
    pages: ({Query}) => Math.ceil(
      users.filter(search(Query._search)).length / 10
    ) || 1
  },
  form: {
    schema: ({Params}) => {
      const s = Params.service || 'insert'
      const submit = copy(schema_users.items)
      const row = users.filter(({id}) => id == Params.id)[0] || null
      submit.title = s.substr(0, 1).toUpperCase()+s.substr(1)
      if (row) {
        submit.title += ': '+row.name
      }
      if (s == 'delete') {
        submit.properties = {}
        submit.description = 'Do you want to delete this row?'
      } else {
        submit.description = ''
        delete submit.properties.id
      }
      submit.links = [{
        title: submit.title,
        description: s == 'insert' ? 'New row inserted!' :
          s == 'edit' ? 'Row was edited!' :
          s == 'delete' ? 'Row was removed!' : '',
        href: location.hash
      }]

      return submit
    },
    row: ({Params}) => copy(users.filter(({id}) => id == Params.id)[0] || null),
    submit: ({Params}, user) => {
      if (Params.service == 'delete') {
        const i = users.reduce((p, {id}, i) => id == Params.id ? i : p, -1)
        if (i >= 0) {
          users.splice(i, 1)
        }
      } else if (Params.service == 'edit') {
        Object.assign(users.filter(({id}) => id == Params.id)[0], user)
      } else {
        users.push({
          ...user,
          id: users.reduce((rowid, {id}) => id >= rowid ? id + 1 : rowid, 0)
        })
      }
    }
  },
  row: {
    schema: () => schema_users.items,
    row: ({Params}) => users.filter(({id}) => id == Params.id)[0]
  }
})
