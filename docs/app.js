import merlin from "https://cdn.jsdelivr.net/gh/marcodpt/merlin@0.1.0/index.js"
import navbar from './js/navbar.js'
import table from './js/table.js'
import form from './js/form.js'
import row from './js/row.js'
import data from './samples/data.js'

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
      route: '#/table/:name',
      component: 'table'
    }, {
      route: '#/form/:name',
      component: 'form'
    }, {
      route: '#/table/:name/:id',
      component: 'row'
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
        title: 'Users',
        children: [
          {
            title: 'All',
            href: '#/table/users'
          }, {
            title: 'New',
            href: '#/form/users'
          }, {
            title: 'First',
            href: '#/table/users/0'
          }
        ]
      }
    ]
  },
  table: {
    rows: () => data
  },
  form: {
    dflt: () => ({
      name: '',
      age: 0,
      balance: 0.0
    }),
    submit: row => {
      data.push(row)
      history.back()
    }
  },
  row: {
    dflt: ({Params}) => data[Params.id]
  }
})
