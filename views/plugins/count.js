const Info = {
  link: 'dark',
  icon: 'info-circle',
  title: 'Counter'
}

export default ({modal, wait}) => ({
  ...Info,
  href: rows => wait(1000).then(() => {
    const msg = `Hello!\n${!rows ? 0 : rows.length} user(s) checked!`
    modal({
      ...Info,
      ui: 'success',
      description: msg
    })
  })
})
