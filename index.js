import merlin from "https://cdn.jsdelivr.net/gh/marcodpt/merlin@0.1.0/index.js"
import navbar from './js/navbar.js'
import table from './js/table.js'
import form from './js/form.js'
import row from './js/row.js'

export default ({components, routes, ...extra}) => merlin({
  components: {
    ...(components || {}),
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
  ].concat(routes || []),
  ...(extra || {})
})
