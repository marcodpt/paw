const copy = X => JSON.parse(JSON.stringify(X))

const run = (...F) => data => F.reduce((data, F) => F(data), [...data])

const identity = data => data

const cmp = Fields => {
  const F = Fields.filter(f => f && typeof f == 'string').map(f => {
    const x = f.substr(0, 1) == '-' ? -1 : 1
    return {x, k: x == -1 ? f.substr(1) : f}
  })

  return (a, b) =>  F.reduce(
    (r, {x, k}) => r || x * (a[k] > b[k] ? 1 : a[k] < b[k] ? -1 : 0)
  , 0)
}

const orderBy = Fields => data => {
  data.sort(cmp(Fields))
  return data
}

const pager = (p, limit) => data => !limit ? data :
  data.slice((p - 1) * limit, p * limit)

const find = (match, format) => data => {
  if (match) {
    data = data.filter(row => Object.keys(row).reduce((pass, k) =>
      pass || format[k](row[k]).toLowerCase().indexOf(match.toLowerCase()) >= 0
    , false))
  }
  return data
}

const Aggregates = {
  count: X => X.length,
  avg: X => X.reduce((s, v) => s += v, 0) / (X.length || 1),
  sum: X => X.reduce((s, v) => s += v, 0)
}

const groupBy = (Fields, Methods) => data => {
  const notEqual = cmp(Fields)
  const D = orderBy(Fields)(data)
  const K = Object.keys(Methods).reduce((K, k) => {
    if (K.indexOf(k) < 0) {
      K.push(k)
    }
    return K
  }, copy(Fields))
  return D.reduce((D, row) => {
    const X = D[D.length - 1]
    if (X == null || notEqual(row, X)) {
      D.push(K.reduce((R, k) => ({
        ...R,
        [k]: Fields.indexOf(k) < 0 ? [row[k]] : row[k]
      }), {}))
    } else {
      K.filter(k => Fields.indexOf(k) < 0).forEach(k => {
        X[k].push(row[k])
      })
    }
    return D
  }, []).map(row => K
    .filter(k => Fields.indexOf(k) < 0)
    .reduce((R, k) => ({
      ...R,
      [k]: Methods[k](row[k])
    }), row)
  )
}

export default ({
  search, page, limit, sort, group, checked, data, totals, format
}) => {
  var rows = null
  var view = null
  var pages = 1
  if (data instanceof Array) {
    totals = Object.keys(totals).reduce((T, k) => {
      T[k] = Aggregates[totals[k]] || (() => '_')
      return T
    }, {})
    rows = run(
      find(search, format),
      group ? groupBy(group, totals) : identity,
      sort ? orderBy([sort]) : identity
    )(data)
    pages = Math.ceil(rows.length / limit) || 1
    if (page > pages) {
      page = pages
    } else if (page < 1) {
      page = 1
    }
    view = run(pager(page, limit))(rows)

    const C = checked.length ? checked : rows

    totals = Object.keys(totals).reduce((T, k) => {
      T[k] = T[k](C.map(row => row[k]))
      return T
    }, totals)
  } else {
    totals = Object.keys(totals).reduce((T, k) => {
      T[k] = '_'
      return T
    }, {})
  }

  return {view, totals, pages, rows}
}
