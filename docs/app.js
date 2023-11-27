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
    {},
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
    pages: ({Query}) => Math.floor(
      users.filter(search(Query._search)).length / 10
    ) || 1
  },
  form: {
    schema: ({Params}) => {
      const s = Params.service
      const submit = copy(schema.users.items)
      submit.title = s.substr(0, 1).toUpperCase()+s.substr(1)
      if (s == 'delete') {
        submit.properties = {}
      } else {
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
    row: ({Params}) => copy(users.filter(({id}) => id == Params.id)[0]),
    submit: ({Params}, user) => {
      if (Params.service == 'delete') {
        users = users.filter(({id}) => id != Params.id)
      } else if (Params.service == 'edit') {
        Object.assign(users.filter(({id}) => id == Params.id)[0], user)
      } else {
        users.push({
          ...user,
          id: users.reduce((rowid, id) => id >= rowid ? id + 1 : rowid, 0)
        })
      }
    }
  },
  row: {
    schema: () => schema_users.items,
    row: ({Params}) => users.filter(({id}) => id == Params.id)[0]
  }
})
