export default ({icon, title, context}, {dialog, wait}) => ({
  icon,
  title,
  context,
  href: ({row, refresh, data}) => {
    title = title.split(':')[0]+': '+row.name
    return dialog({
      icon,
      title,
      context,
      description: [
        'Do you want to delete this row?',
        'This decision cannot be undone.'
      ].join('\n'),
      submit: () => wait(2000).then(() => {
        const i = data.reduce((p, {id}, i) => id == row.id ? i : p, -1)
        if (i >= 0) {
          data.splice(i, 1)
          refresh()
        }
        dialog({
          icon,
          title,
          context: 'success',
          description: `User ${row.name} was removed!`
        })
      })
    })
  }
})
