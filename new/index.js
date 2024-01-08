import e from './e.js'
import build from './router.js'
import table from './table.js'
import form from './form.js'
import users from '../data/users.js'
import schema_users from '../schema/users.js'
import {queryString} from './lib.js'

const delay = 0

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
  '/users': (main, {url, path, Query}) => {
    const goto = Q => {
      const q = queryString({
        ...Query,
        ...(Q || {})
      })
      return '#'+path+(q.length?'?'+q:'')
    }
    const tbl = table(schema_users)
    view(main, tbl)
    setTimeout(() => {
      const p = !Query._page || isNaN(Query._page) ? 1 : parseInt(Query._page)
      const ps = Math.ceil(users.length / 10) || 1
      tbl.dispatchEvent(new CustomEvent('app.table', {detail: {
        pagination: {
          page: p,
          pages: ps,
          first: goto({
            _page: 1
          }),
          previous: goto({
            _page: p - 1
          }),
          next: goto({
            _page: p + 1
          }),
          last: goto({
            _page: ps
          })
        },
        rows: users.slice((p - 1) * 10, p * 10),
        totals: null
      }}))
    }, delay)
  },
  '/insert/users': main => {
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
      fields: s == 'delete' ? [] : Object.keys(P).filter(k => k != 'id')
        .map(k => ({
          ...P[k],
          name: k,
          value: row[k]
        }))
    }))
  }
})

window.addEventListener('hashchange', router)
router()
