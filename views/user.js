import users from './data/users.js'
import schema from './data/schema.js'

export default ({render, Params, form, dialog}) => {
  const user = users.filter(({id}) => id == Params.id)[0]
  const s = {
    ...schema.items,
    readOnly: true,
    css: 'container card my-5 p-3',
    close: () => {history.back()},
    title: user.name,
    default: user
  }
  s.links[0].href = () => dialog({
    ...s.links[0],
    title: 'Delete: '+user.name,
    description: 'Do you want to delete this row?',
    submit: () => {
      const i = users.reduce((p, {id}, i) => id == user.id ? i : p, -1)
      if (i >= 0) {
        users.splice(i, 1)
      }
      history.back()
    }
  })
  s.links[1].href = () => {
    const P = {...schema.items.properties}
    delete P.id
    const H = {
      icon: s.links[1].icon,
      title: 'Edit: '+user.name
    }
    dialog({
      ...H,
      properties: P,
      default: user,
      submit: data => {
        const name = user.name
        Object.assign(user, data)
        s.title = user.name
        render(form(s))
        dialog({
          ...H,
          context: 'success',
          description: `User ${name} was edited!`
        })
      }
    })
  }
  render(form(s))
}
