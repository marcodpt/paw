import e from './e.js'
import build from './router.js'
import table from './table.js'
import form from './form.js'
import row from './row.js'
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
  '/users/:id': (main, {Params}) => {
    const X = users.filter(({id}) => id == Params.id)[0]
    view(main, row({
      ...schema_users.items,
      title: X.name,
      default: X 
    }))
  },
  '/insert/users': main => {
    const P = {...schema_users.items.properties}
    delete P.id
    view(main, form({
      title: 'Insert',
      description: '',
      properties: P
    }))
  },
  '/:service/users/:id': (main, {Params}) => {
    const s = Params.service || 'insert'
    const row = users.filter(({id}) => id == Params.id)[0]
    const P = {...schema_users.items.properties}
    delete P.id
    view(main, form({
      title: s.substr(0, 1).toUpperCase()+s.substr(1)+
        (row ? ': '+row.name : ''),
      description: s == 'delete' ? 'Do you want to delete this row?' : '',
      properties: s == 'delete' ? null : P,
      default: row
    }))
  }
})

window.addEventListener('hashchange', router)
router()
