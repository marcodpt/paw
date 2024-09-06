export default ({icon, title, context}, {dialog}) => ({
  icon,
  title,
  context,
  href: ({data, properties, refresh}) => {
    const P = {...properties}
    delete P.id
    dialog({
      icon,
      title,
      properties: P,
      submit: user => {
        data.push({
          ...user,
          id: data.reduce(
            (rowid, {id}) => id >= rowid ? id + 1 : rowid
          , 0)
        })
        refresh()
        dialog({
          icon,
          title,
          context: 'success',
          description: `New user inserted: ${user.name}!`
        })
      }
    })
  }
})
