export default ({icon, title, context}, {modal}) => ({
  icon,
  title,
  context,
  href: ({row, properties, refresh}) => {
    title = title.split(':')[0]+': '+row.name
    const P = {...properties}
    delete P.id
    modal({
      icon,
      title,
      properties: P,
      default: row,
      submit: user => {
        Object.assign(row, user)
        refresh()
        modal({
          icon,
          title,
          context: 'success',
          description: `User ${user.name} was edited!`
        })
      }
    })
  }
})
