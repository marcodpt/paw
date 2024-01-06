import e from './e.js'
import build from './router.js'
import table from './table.js'
import form from './form.js'
import users from '../data/users.js'
import schema_users from '../schema/users.js'

const view = (root, elem) => {
  root.innerHTML = ''
  if (elem) {
    root.appendChild(elem)
  }
}

const router = build({
  '*': main => view(main, e(({div, h1, text}) =>
    div({class: 'container my-5'}, [
      h1({}, [
        text("Hello world!")
      ])
    ])
  )),
  '/hello/:name': (main, {Params}) => view(main, e(({div, h1, text}) =>
    div({class: 'container my-5'}, [
      h1({}, [
        text(`Hello ${Params.name}!`)
      ])
    ])
  )),
  '/users': (main, {Params}) => {
    const P = schema_users.items.properties
    const fields = Object.keys(P).map(k => ({
      ...P[k],
      name: k
    }))

    view(main, table({
      ...schema_users,
      fields
    }))
  },
  '/insert/users': (main) => {
    const P = schema_users.items.properties
    view(main, form({
      title: 'Insert',
      description: '',
      fields: Object.keys(P).filter(k => k != 'id').map(k => ({
        ...P[k],
        name: k,
        value: P[k].default
      }))
    }))
  },
  '/:service/users/:id': (main, {Params}) => {
    const P = schema_users.items.properties
    const s = Params.service || 'insert'
    const row = users.filter(({id}) => id == Params.id)[0]
    view(main, form({
      title: s.substr(0, 1).toUpperCase()+s.substr(1)+
        (row ? ': '+row.name : ''),
      description: s == 'delete' ? 'Do you want to delete this row?' : '',
      fields: s == 'delete' ? [] : Object.keys(P).filter(k != 'id').map(k => ({
        ...P[k],
        name: k,
        value: row[k]
      }))
    }))
  }
})

window.addEventListener('hashchange', router)
router()
