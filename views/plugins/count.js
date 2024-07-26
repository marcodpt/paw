const Info = {
  context: 'dark',
  icon: 'info-circle',
  title: 'Counter'
}

export default ({modal, wait}) => {
  var btn = null
  return {
    ...Info,
    init: el => {btn = el},
    href: () => wait(1000).then(() => {
      const tbl = btn.closest('table')
      const {query} = tbl.read()
      const msg = `Hello!\n${query.checked.length} user(s) checked!`
      modal({
        ...Info,
        context: 'success',
        description: msg
      })
    })
  }
}
