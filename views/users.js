import {wait} from './lib.js'
import users from '../data/users.js'
import schema from '../data/schema.js'

export default ({render, table, modal}) => {
  schema.links[0].href = () => {
    const P = {...schema.items.properties}
    delete P.id
    modal({
      icon: schema.links[0].icon,
      title: 'Insert',
      properties: P,
      submit: user => {
        users.push({
          ...user,
          id: users.reduce(
            (rowid, {id}) => id >= rowid ? id + 1 : rowid
          , 0)
        })
        tbl.setData(users)
        return {
          ui: 'success',
          description: 'New user inserted!'
        }
      }
    })
  }
  schema.items.links[0].href = user => modal({
    icon: schema.items.links[0].icon,
    title: 'Delete: '+user.name,
    description: 'Do you want to delete this row?',
    submit: () => {
      const i = users.reduce((p, {id}, i) => id == user.id ? i : p, -1)
      if (i >= 0) {
        users.splice(i, 1)
        tbl.setData(users)
      }
      return wait(2000).then(() => ({
        ui: 'success',
        description: `User ${user.name} was removed!`
      }))
    }
  })
  schema.items.links[1].href = user => {
    const P = {...schema.items.properties}
    delete P.id
    modal({
      icon: schema.items.links[1].icon,
      title: 'Edit: '+user.name,
      properties: P,
      default: user,
      submit: data => {
        Object.assign(users.filter(({id}) => id == user.id)[0], data)
        tbl.setData(users)
        return {
          ui: 'success',
          description: `User ${user.name} was edited!`
        }
      }
    })
  }
  schema.config = {
    limit: null,
    noSearch: false,
    noFilter: false,
    noGroup: false,
    noCheck: false,
    noSort: false,
    exporter: null
  }
  const tbl = table(schema)
  render(tbl)
  wait(500).then(() => tbl.setData(users))
}
