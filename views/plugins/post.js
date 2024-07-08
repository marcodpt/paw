const Info = {
  link: 'success',
  icon: 'pencil',
  title: 'Insert'
}

export default ({modal}, schema, data, run) => ({
  ...Info,
  href: () => {
    const P = {...schema.items.properties}
    delete P.id
    modal({
      ...Info,
      properties: P,
      submit: user => {
        data.push({
          ...user,
          id: data.reduce(
            (rowid, {id}) => id >= rowid ? id + 1 : rowid
          , 0)
        })
        run(data)
        modal({
          ...Info,
          ui: Info.link,
          description: 'New user inserted!'
        })
      }
    })
  }
})
