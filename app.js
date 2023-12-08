import app from './index.js'
import users from './data/users.js'
import schema_users from './schema/users.js'
import {copy} from './js/lib.js'

const run = (...F) => data => F.reduce((data, F) => F(data), data)

const identity = data => data

const search = match => data => {
  if (match) {
    data = data.filter(row => Object.keys(row).reduce((pass, k) =>
      pass || String(row[k]).toLowerCase().indexOf(match.toLowerCase()) >= 0
    , false))
  }
  return data
}

const lang = document.documentElement.lang.split('-')[0]
const operators = lang == 'pt' ? {
  "~ct~": "Contém",
  "~nc~": "Não contém",
  "~eq~": "É igual a",
  "~ne~": "Não é igual a",
  "~gt~": "Maior que",
  "~ge~": "Maior ou igual a",
  "~lt~": "Menor que",
  "~le~": "Menor ou igual a"
} : {
  "~ct~": "Contains",
  "~nc~": "Not contains",
  "~eq~": "Equals",
  "~ne~": "Not equals",
  "~gt~": "Greater than",
  "~ge~": "Greater than or equals",
  "~lt~": "Less than",
  "~le~": "Less than or equals"
}

const getFilter = filter => {
  const op = Object.keys(operators).reduce((Match, op) => 
    Match || filter.indexOf(op) < 0 ? Match : op
  , null)
  if (!op) {
    return null
  }

  const L = filter.split(op)
  const field = L.shift()
  const value = L.join(op)
  const P = schema_users.items.properties[field]

  return !P ? null : {
    value,
    field,
    op,
    operator: operators[op],
    title: P.title
  }
}

const filter = Filters => data => (Filters || []).map(getFilter).filter(
  f => f
).reduce((data, {field, op, value}) => data.filter(row => {
  const v = row[field]
  return v == null ? false :
    op == '~ct~' ? String(v).toLowerCase().indexOf(value.toLowerCase()) >= 0 : 
    op == '~nc~' ? String(v).toLowerCase().indexOf(value.toLowerCase()) < 0 : 
    op == '~eq~' ? v == value : 
    op == '~ne~' ? v != value : 
    op == '~gt~' ? v > value : 
    op == '~ge~' ? v >= value : 
    op == '~lt~' ? v < value : 
    op == '~le~' ? v <= value : true
}), data)

const cmp = Fields => {
  const F = Fields.filter(f => f && typeof f == 'string').map(f => {
    const x = f.substr(0, 1) == '-' ? -1 : 1
    return {x, k: x == -1 ? f.substr(1) : f}
  })

  return (a, b) =>  F.reduce(
    (r, {x, k}) => r || x * (a[k] > b[k] ? 1 : a[k] < b[k] ? -1 : 0)
  , 0)
}

const sort = Fields => data => {
  data.sort(cmp(Fields))
  return data
}

const pager = page => data => {
  const p = !page || isNaN(page) ? 1 : parseInt(page)
  return data.slice((p - 1) * 10, p * 10)
}

const select = Id => data => (Id instanceof Array) && Id.length ?
  data.filter(row => Id.indexOf(String(row.id)) >= 0) : data

const Aggregates = {
  count: X => X.length,
  avg: X => X.reduce((s, v) => s += v, 0) / X.length,
  sum: X => X.reduce((s, v) => s += v, 0),
  none: X => ''
}

const totals = (Fields, Methods) => data => {
  const notEqual = cmp(Fields)
  const T = sort(Fields)(data)
  return T.reduce((T, row) => {
    const X = T[T.length - 1]
    if (X == null || notEqual(row, X)) {
      T.push(Object.keys(row).reduce((R, k) => ({
        ...R,
        [k]: Fields.indexOf(k) < 0 ? [row[k]] : row[k]
      }), {}))
    } else {
      Object.keys(row).filter(k => Fields.indexOf(k) < 0).forEach(k => {
        X[k].push(row[k])
      })
    }
    return T
  }, []).map(row => Object.keys(row)
    .filter(k => Fields.indexOf(k) < 0)
    .reduce((R, k) => ({
      ...R,
      [k]: Fields.indexOf(k) >= 0 ? row[k] :
        (Aggregates[Methods[k]] || Aggregates.none)(row[k])
    }), row)
  )
}

const Methods = {
  id: 'count',
  age: 'avg',
  balance: 'sum'
}

const Formatters = {
  num1: v => v.toFixed(1),
  num2: v => v.toFixed(2),
  none: v => String(v)
}

const formatter = F => data => data.map(
  row => Object.keys(row).reduce((R, k) => ({
    ...R,
    [k]: (Formatters[F[k]] || Formatters.none)(row[k])
  }), {})
)

app({
  routes: [
    {}, {
      route: '#'
    }, {
      route: '#/'
    }, {
      route: '#/:name',
      component: 'table'
    }, {
      route: '#/:name/:id',
      component: 'row'
    }, {
      route: '#/insert/:name',
      component: 'form'
    }, {
      route: '#/:service/:name/:id',
      component: 'form'
    }, {
      route: '#/graph/:name'
    }, {
      route: '#/chart/:name'
    }, {
      route: '#/upload'
    }
  ],
  navbar: {
    links: [
      {
        title: 'Tools',
        icon: 'tools',
        children: [
          {
            title: 'Flowchart',
            icon: 'project-diagram',
            href: '#/graph/sample'
          }, {
            title: 'Chart',
            icon: 'chart-line',
            href: '#/chart/sample'
          }, {
            title: 'Import Files',
            icon: 'file',
            href: '#/upload'
          }
        ]
      }, {
        title: 'Repository',
        icon: 'code-fork',
        href: 'https://github.com/marcodpt/app'
      }
    ],
    sidebar: [
      {
        title: 'Data',
        children: [
          {
            title: 'Users',
            href: '#/users'
          }
        ]
      }
    ]
  },
  table: {
    schema: () => schema_users,
    rows: ({Query}) => run(
      search(Query._search),
      filter(Query._filter),
      Query._group && Query._group.length ?
        totals(Query._group, Methods) : identity,
      sort([Query._sort || 'id']), 
      pager(Query._page),
      formatter({
        age: Query._group && Query._group.length ? 'num1' : null,
        balance: 'num2'
      })
    )(users),
    exporter: ({Query}) => {
      const Data = run(
        search(Query._search),
        filter(Query._filter),
        Query._group && Query._group.length ?
          totals(Query._group, Methods) : identity,
        sort([Query._sort || 'id']), 
        formatter({
          age: Query._group && Query._group.length ? 'num1' : null,
          balance: 'num2'
        })
      )(users)

      const name = 'users.csv'
      const nl = '\n'
      const sep = '\t'
      const K = Object.keys(schema_users.items.properties)
      
      var data = ''
      data += K.join(sep)+nl
      data += Data
        .map(row => K.map(field => String(row[field])).join(sep))
        .join(nl)

      return {name, data}
    },
    pages: ({Query}) => Math.ceil(run(
      search(Query._search),
      filter(Query._filter),
      Query._group && Query._group.length ?
        totals(Query._group, Methods) : identity
    )(users).length / 10) || 1,
    totals: ({Query}, Fields) => run(
      select(Query._id),
      search(Query._search),
      filter(Query._filter),
      totals(Fields, Methods),
      formatter({
        age: 'num1',
        balance: 'num2'
      })
    )(users)[0],
    operators: () => Object.keys(operators).map(k => ({
      value: k,
      label: operators[k],
      any: [
        '~ct~',
        '~nc~'
      ].indexOf(k) >= 0
    })),
    values: ({field, operator}) => users.map(row => ({
      value: row[field],
      label: row[field]
    })),
    filters: ({Query}) => {
      return (Query._filter || []).map(filter => {
        const X = getFilter(filter)
        return !X ? filter : `${X.title} ${X.operator} ${X.value}`
      })
    }
  },
  form: {
    schema: ({Params}) => {
      const s = Params.service || 'insert'
      const submit = copy(schema_users.items)
      const row = users.filter(({id}) => id == Params.id)[0] || null
      submit.title = s.substr(0, 1).toUpperCase()+s.substr(1)
      if (row) {
        submit.title += ': '+row.name
      }
      if (s == 'delete') {
        submit.properties = {}
        submit.description = 'Do you want to delete this row?'
      } else {
        submit.description = ''
        delete submit.properties.id
      }
      submit.links = [{
        title: submit.title,
        description: s == 'insert' ? 'New row inserted!' :
          s == 'edit' ? 'Row was edited!' :
          s == 'delete' ? 'Row was removed!' : '',
        href: location.hash
      }]

      return submit
    },
    row: ({Params}) => copy(users.filter(({id}) => id == Params.id)[0] || null),
    submit: ({Params}, user) => {
      if (Params.service == 'delete') {
        const i = users.reduce((p, {id}, i) => id == Params.id ? i : p, -1)
        if (i >= 0) {
          users.splice(i, 1)
        }
      } else if (Params.service == 'edit') {
        Object.assign(users.filter(({id}) => id == Params.id)[0], user)
      } else {
        users.push({
          ...user,
          id: users.reduce((rowid, {id}) => id >= rowid ? id + 1 : rowid, 0)
        })
      }
    }
  },
  row: {
    schema: () => schema_users.items,
    row: ({Params}) => users.filter(({id}) => id == Params.id)[0]
  }
})
