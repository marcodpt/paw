const Info = {
  link: 'warning',
  icon: 'edit',
  title: 'Edit'
}
export default ({modal}, schema, data, run) => ({
  ...Info,
  href: user => {
    const title = Info.title +': '+user.name
    const P = {...schema.items.properties}
    delete P.id
    modal({
      ...Info,
      title,
      properties: P,
      default: user,
      submit: user => {
        Object.assign(data.filter(({id}) => id == user.id)[0], user)
        run(data)
        modal({
          ...Info,
          title,
          ui: 'success',
          description: `User ${user.name} was edited!`
        })
      }
    })
  }
})
