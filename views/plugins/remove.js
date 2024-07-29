import schema from '../data/schema.js'

export default ({modal, wait}, data) => {
  var btn = null
  const L = schema.items.links[0]
  return {
    ...L,
    init: el => {btn = btn || el},
    href: user => {
      const tbl = btn.closest('table')
      const title = L.title +': '+user.name
      return modal({
        ...L,
        title,
        description: [
          'Do you want to delete this row?',
          'This decision cannot be undone.'
        ].join('\n'),
        submit: () => wait(2000).then(() => {
          const i = data.reduce((p, {id}, i) => id == user.id ? i : p, -1)
          if (i >= 0) {
            data.splice(i, 1)
            tbl.setData(data)
          }
          modal({
            ...L,
            title,
            context: 'success',
            description: `User ${user.name} was removed!`
          })
        })
      })
    }
  }
}
