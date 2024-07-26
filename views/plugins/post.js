const Info = {
  context: 'success',
  icon: 'pencil',
  title: 'Insert'
}

export default ({modal}, data) => {
  var btn = null
  return {
    ...Info,
    init: el => {btn = el},
    href: () => {
      const tbl = btn.closest('table')
      const {properties} = tbl.read()
      const P = {...properties}
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
          tbl.setData(data)
          modal({
            ...Info,
            context: 'success',
            description: 'New user inserted!'
          })
        }
      })
    }
  }
}
