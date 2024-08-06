import schema from '../data/schema.js'

export default ({modal}, data) => {
  var btn = null
  var tbl = null
  const L = schema.items.links[1]
  return {
    ...L,
    init: el => {
      btn = btn || el
      tbl = tbl || btn.closest('table') 
    },
    href: user => {
      const {properties} = tbl.read()
      const title = L.title+': '+user.name
      const P = {...properties}
      delete P.id
      modal({
        ...L,
        title,
        properties: P,
        default: user,
        submit: user => {
          Object.assign(data.filter(({id}) => id == user.id)[0], user)
          tbl.setData(data)
          modal({
            ...L,
            title,
            context: 'success',
            description: `User ${user.name} was edited!`
          })
        }
      })
    }
  }
}
