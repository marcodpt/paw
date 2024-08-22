export default ({icon, title, context}, {modal, wait}) => ({
  icon,
  title,
  context,
  href: ({query}) => wait(1000).then(() => {
    const msg = `Hello!\n${query.checked.length} user(s) checked!`
    modal({
      icon,
      title,
      context: 'success',
      description: msg
    })
  })
})
