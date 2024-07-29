import schema from '../data/schema.js'

export default ({modal}, data) => {
  var btn = null
  return {
    ...schema.links[0],
    init: el => {btn = btn || el},
    href: () => {
      const tbl = btn.closest('table')
      const {properties} = tbl.read()
      const P = {...properties}
      delete P.id
      modal({
        ...schema.links[0],
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
            ...schema.links[0],
            context: 'success',
            description: 'New user inserted!'
          })
        }
      })
    }
  }
}
