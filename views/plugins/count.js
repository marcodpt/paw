export default ({icon, title, context}, {dialog, wait}) => ({
  icon,
  title,
  context,
  href: ({query}) => wait(1000).then(() => {
    const msg = `Hello!\n${query.checked.length} user(s) checked!`
    dialog({
      icon,
      title,
      context: 'success',
      description: msg
    })
  })
})
