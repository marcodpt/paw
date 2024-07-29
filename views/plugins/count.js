import schema from '../data/schema.js'

export default ({modal, wait}) => {
  var btn = null
  return {
    ...schema.links[1],
    init: el => {btn = btn || el},
    href: () => wait(1000).then(() => {
      const tbl = btn.closest('table')
      const {query} = tbl.read()
      const msg = `Hello!\n${query.checked.length} user(s) checked!`
      modal({
        ...schema.links[1],
        context: 'success',
        description: msg
      })
    })
  }
}
