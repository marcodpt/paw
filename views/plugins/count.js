const Info = {
  link: 'dark',
  icon: 'info-circle',
  title: 'Counter'
}

export default ({modal, wait}) => ({
  ...Info,
  href: ({checked}) => wait(1000).then(() => {
    const msg = `Hello!\n${!checked ? 0 : checked.length} user(s) checked!`
    modal({
      ...Info,
      ui: 'success',
      description: msg
    })
  })
})
