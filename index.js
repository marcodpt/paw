import merlin from "https://cdn.jsdelivr.net/gh/marcodpt/merlin@0.1.0/index.js"
import navbar from './js/navbar.js'
import table from './js/table.js'
import form from './js/form.js'
import row from './js/row.js'

export default ({components, ...extra}) => merlin({
  components: {
    ...(components || {}),
    table,
    form,
    row,
    navbar
  },
  ...(extra || {})
})
