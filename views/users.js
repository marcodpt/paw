import {wait} from './lib.js'
import users from './data/users.js'
import schema from './data/schema.js'

export default ({render, table, modal}) => {
  schema.links[0].href = () => {
    const P = {...schema.items.properties}
    delete P.id
    const H = {
      icon: schema.links[0].icon,
      title: 'Insert'
    }
    modal({
      ...H,
      properties: P,
      submit: user => {
        users.push({
          ...user,
          id: users.reduce(
            (rowid, {id}) => id >= rowid ? id + 1 : rowid
          , 0)
        })
        tbl.setData(users)
        modal({
          ...H,
          ui: 'success',
          description: 'New user inserted!'
        })
      }
    })
  }
  schema.links[1].href = rows => wait(1000).then(() => {
    const msg = `Hello!\n${!rows ? 0 : rows.length} user(s) checked!`
    modal({
      title: schema.links[1].title,
      icon: schema.links[1].icon,
      ui: schema.links[1].link,
      description: msg
    })
  })
  schema.items.links[0].href = user => {
    const H = {
      icon: schema.items.links[0].icon,
      title: 'Delete: '+user.name
    }
    modal({
      ...H,
      description: 'Do you want to delete this row?',
      submit: () => {
        const i = users.reduce((p, {id}, i) => id == user.id ? i : p, -1)
        if (i >= 0) {
          users.splice(i, 1)
          tbl.setData(users)
        }
        return wait(2000).then(() => {
          modal({
            ...H,
            ui: 'success',
            description: `User ${user.name} was removed!`
          })
        })
      }
    })
  }
  schema.items.links[1].href = user => {
    const P = {...schema.items.properties}
    delete P.id
    const H = {
      icon: schema.items.links[1].icon,
      title: 'Edit: '+user.name
    }
    modal({
      ...H,
      properties: P,
      default: user,
      submit: data => {
        Object.assign(users.filter(({id}) => id == user.id)[0], data)
        tbl.setData(users)
        modal({
          ...H,
          ui: 'success',
          description: `User ${user.name} was edited!`
        })
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
    exporter: null,
    table: ''
  }
  const tbl = table(schema)
  render(tbl)
  wait(500).then(() => tbl.setData(users))
}
