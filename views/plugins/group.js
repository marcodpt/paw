import schema from '../data/schema.js'

export default ({modal, tag}) => {
  var btn = null
  return {
    ...schema.links[3],
    init: el => {btn = btn || el},
    href: () => {
      const tbl = btn.closest('table')
      const {query, properties} = tbl.read()
      const P = properties
      const K = Object.keys(P)

      if (query.group) {
        btn.innerHTML = ''
        btn.appendChild(tag({
          ...schema.links[3]
        }))
        query.group = null
        tbl.refresh()
      } else {
        modal({
          ...schema.links[3],
          properties: {
            fields: {
              type: 'array',
              title: '',
              default: [],
              options: K.map(k => ({
                value: k,
                label: P[k].title || k
              }))
            }
          },
          submit: ({fields}) => {
            btn.innerHTML = ''
            btn.appendChild(tag({
              title: schema.links[3].title,
              icon: 'close'
            }))
            query.group = fields
            tbl.refresh()
          }
        })
      }
    }
  }
}
