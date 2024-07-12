const Info = {
  link: 'warning',
  icon: 'th',
  title: 'Group'
}

export default ({modal, tag}, schema, data, run) => {
  var btn = null
  const P = schema.items.properties
  const K = Object.keys(P)
  return {
    ...Info,
    icon: schema?.scope?.group instanceof Array ? 'close' : Info.icon,
    init: el => {
      btn = el
    },
    href: ({group, setGroup}) => {
      if (group) {
        btn.innerHTML = ''
        btn.appendChild(tag({
          ...Info
        }))
        setGroup(null)
      } else {
        modal({
          ...Info,
          properties: {
            fields: {
              type: 'array',
              title: '',
              noValid: true,
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
            setGroup(fields)
          }
        })
      }
    }
  }
}
