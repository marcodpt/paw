const Info = {
  link: 'danger',
  icon: 'trash',
  title: 'Delete'
}

export default ({modal, wait}, data) => {
  var btn = null
  return {
    ...Info,
    init: el => {btn = el},
    href: user => {
      const tbl = btn.closest('table')
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
            tbl.setData(data)
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
  }
}
