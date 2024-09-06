export default ({icon, title, context}, {dialog, ctrl}) => {
  var btn = null
  return {
    icon,
    title,
    context,
    init: el => {btn = btn || el},
    href: ({query, properties, refresh}) => {
      const P = properties
      const K = Object.keys(P)

      if (query.group) {
        btn.innerHTML = ''
        btn.appendChild(ctrl({
          icon,
          title
        }))
        query.group = null
        refresh()
      } else {
        dialog({
          icon,
          title,
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
            btn.appendChild(ctrl({
              title: title,
              icon: 'close'
            }))
            query.group = fields
            refresh()
          }
        })
      }
    }
  }
}
