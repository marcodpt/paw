const Info = {
  context: 'warning',
  icon: 'edit',
  title: 'Edit'
}

export default ({modal}, data) => {
  var btn = null
  return {
    ...Info,
    init: el => {btn = el},
    href: user => {
      const tbl = btn.closest('table')
      const {properties} = tbl.read()
      const title = Info.title +': '+user.name
      const P = {...properties}
      delete P.id
      modal({
        ...Info,
        title,
        properties: P,
        default: user,
        submit: user => {
          Object.assign(data.filter(({id}) => id == user.id)[0], user)
          tbl.setData(data)
          modal({
            ...Info,
            title,
            context: 'success',
            description: `User ${user.name} was edited!`
          })
        }
      })
    }
  }
}
