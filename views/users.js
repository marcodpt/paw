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
  const {render, table, wait} = X

  schema.links = []
  schema.links.push(post(X, users))
  schema.links.push(count(X))
  schema.links.push(query(X, users))
  schema.links.push(group(X))
  schema.links.push(exporter(X))

  schema.items.links = []
  schema.items.links.push(remove(X, users))
  schema.items.links.push(edit(X, users))

  const tbl = table(schema)
  render(tbl)
  wait(500).then(() => tbl.setData(users))
}
