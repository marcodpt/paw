export default ({icon, title, context}, {modal}) => ({
  icon,
  title,
  context,
  href: ({data, properties, refresh}) => {
    const P = {...properties}
    delete P.id
    modal({
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
        modal({
          icon,
          title,
          context: 'success',
          description: `New user inserted: ${user.name}!`
        })
      }
    })
  }
})
