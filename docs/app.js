import merlin from "https://cdn.jsdelivr.net/gh/marcodpt/merlin@0.1.0/index.js"
import navbar from './js/navbar.js'
import table from './js/table.js'
import data from './samples/data.js'

merlin({
  components: {
    table,
    navbar
  },
  routes: [
    {},
    {
      route: '#/table/:name',
      component: 'table'
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
            href: '#/table/users'
          }
        ]
      }
    ]
  },
  table: {
    rows: () => data
  }
})
