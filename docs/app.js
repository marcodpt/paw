import merlin from "https://cdn.jsdelivr.net/gh/marcodpt/merlin@0.1.0/index.js"

merlin({
  components: {
    navbar: {
      root: document.body.querySelector('nav'),
      init: () => ({
        value: "",
        todos: []
      }),
      AddTodo: ({todos, value}) => ({
        todos: todos.concat(value),
        value: ''
      }),
      NewValue: ({todos, value}, ev) => ({
        todos,
        value: ev.target.value
      })
    }
  },
  navbar: {
    links: [
      {
        title: lang.tools,
        icon: 'fa-solid fa-tools',
        groups_id: [3],
        children: [
          {
            title: lang.graphClient,
            icon: 'fa-solid fa-project-diagram',
            href: '#/graph/db'
          }, {
            title: lang.graphCore,
            icon: 'fa-solid fa-database',
            href: '#/graph/core'
          }, {
            title: lang.chart,
            icon: 'fa-solid fa-chart-line',
            href: '#/chart/tables'
          }, {
            title: lang.upload,
            icon: 'fa-solid fa-file',
            href: '#/upload/files'
          }, {
            title: lang.request,
            icon: 'fa-solid fa-paper-plane',
            href: '@request'
          }, {
            title: lang.response,
            icon: 'fa-solid fa-inbox',
            href: '@response'
          }, {
            title: lang.rawData,
            icon: 'fa-solid fa-table',
            href: '@data'
          }, {
            title: lang.backup,
            icon: 'fa-solid fa-camera',
            href: '@backup'
          }
        ]
      }
    ],
    sidebar: [
      {
        title: 'Cadastro',
        children: [
          {
            title: 'Pessoas',
            href: '#/api/get/pessoas'
          }
        ]
      }
    ]
  },
})
