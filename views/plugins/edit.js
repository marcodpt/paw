export default ({icon, title, context}, {dialog}) => ({
  icon,
  title,
  context,
  href: ({row, properties, refresh}) => {
    title = title.split(':')[0]+': '+row.name
    const P = {...properties}
    delete P.id
    dialog({
      icon,
      title,
      properties: P,
      default: row,
      submit: user => {
        Object.assign(row, user)
        refresh()
        dialog({
          icon,
          title,
          context: 'success',
          description: `User ${user.name} was edited!`
        })
      }
    })
  }
})
