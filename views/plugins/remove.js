const Info = {
  link: 'danger',
  icon: 'trash',
  title: 'Delete'
}
export default ({modal, wait}, schema, data, run) => ({
  ...Info,
  href: user => {
    const title = Info.title +': '+user.name
    return modal({
      ...Info,
      title,
      description: [
        'Do you want to delete this row?',
        'This decision cannot be undone.'
      ].join('\n'),
      submit: () => wait(2000).then(() => {
        const i = data.reduce((p, {id}, i) => id == user.id ? i : p, -1)
        if (i >= 0) {
          data.splice(i, 1)
          run(data)
        }
        modal({
          ...Info,
          title,
          ui: 'success',
          description: `User ${user.name} was removed!`
        })
      })
    })
  }
})
