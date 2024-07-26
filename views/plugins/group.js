const Info = {
  context: 'warning',
  icon: 'th',
  title: 'Group'
}

export default ({modal, tag}) => {
  var btn = null
  return {
    ...Info,
    init: el => {btn = el},
    href: () => {
      const tbl = btn.closest('table')
      const {query, properties} = tbl.read()
      const P = properties
      const K = Object.keys(P)

      if (query.group) {
        btn.innerHTML = ''
        btn.appendChild(tag({
          ...Info
        }))
        query.group = null
        tbl.refresh()
      } else {
        modal({
          ...Info,
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
              title: Info.title,
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
