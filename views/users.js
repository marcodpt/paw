import users from './data/users.js'
import schema from './data/schema.js'
import post from './plugins/post.js'
import count from './plugins/count.js'
import query from './plugins/query.js'
import group from './plugins/group.js'
import exporter from './plugins/exporter.js'
import remove from './plugins/remove.js'
import edit from './plugins/edit.js'

export default (X) => {
  const {render, table, modal, wait} = X
  const plugin = method => method(X, schema, users, data => {
    tbl.setData(data)
  })

  schema.links = []
  schema.links.push(plugin(post))
  schema.links.push(plugin(count))
  schema.links.push(plugin(query))
  schema.links.push(plugin(group))
  schema.links.push(plugin(exporter))

  schema.items.links = []
  schema.items.links.push(plugin(remove))
  schema.items.links.push(plugin(edit))

  schema.config = {
    limit: null,
    noSearch: false,
    noGroup: false,
    noCheck: false,
    noSort: false,
    table: '',
    css: ''
  }
  const tbl = table(schema)
  render(tbl)
  wait(500).then(() => tbl.setData(users))
}
