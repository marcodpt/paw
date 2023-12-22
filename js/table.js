import {interpolate, queryString, parser} from './lib.js'
import config from './config.js'
import {input, output} from './ui.js'
const {tools, text, icon, link} = config

export default {
  template: document.getElementById('view-table'),
  set: (_, state) => state,
  init: ({api, ...route}, call) => {
    const Q = route.Query
    const model = {
      search: Q._search || '',
      field: null,
      operator: null,
      value: null,
      page: 0
    }
    const filter = {
      label: text.filter,
      icon: tools.icon(icon.filter),
      link: tools.link(link.filter),
      fields: null,
      operators: null,
      values: null,
      exact: false,
      isOpen: false,
      filters: (Q._filter || []).map((f, i) => ({
        value: i,
        label: f
      })),
      count: (Q._filter || []).length,
      disabled: true,
      pending: true,
      inputs: []
    }
    const group = {
      label: text.group,
      icon: tools.icon(icon.group),
      link: tools.link(link.group),
      textOff: 'reset',
      textOn: link.group,
      active: false,
      disabled: true
    }
    const pager = {
      link: tools.link(link.pagination),
      first: tools.icon(icon.first),
      previous: tools.icon(icon.previous),
      next: tools.icon(icon.next),
      last: tools.icon(icon.last),
      isFirst: true,
      isLast: true,
      pages: 0
    }
    const pageInput = options => {
      pager.input = input({
        type: 'integer',
        minimum: 1,
        default: model.page
      }, {name: 'page', model, options})
      pager.input.validate()
    }
    pageInput([])
    const state = {
      route,
      api,
      model,
      pager,
      filter,
      group,
      search: {
        disabled: !model.search,
        input: input({type: 'string'}, {
          name: 'search',
          label: text.search, 
          model
        })
      },
      exporter: {
        label: text.exporter,
        icon: tools.icon(icon.exporter),
        link: tools.link(link.exporter),
        disabled: false
      },
      back: {
        label: text.back,
        icon: tools.icon(icon.back),
        link: tools.link(link.back)
      },
      close: {
        icon: tools.icon(icon.close),
        link: tools.link(link.close)
      },
      loading: {
        icon: tools.icon(icon.loading)
      }
    }
    call('set', state)
    const p = Q._page
    if (!p || isNaN(p)) {
      call('goto', {
        _page: 1
      })
      return
    }
    model.page = parseInt(p)
    if (p > 1) {
      pager.isFirst = false
    }
    pageInput([{
      value: model.page,
      label: text.pagination(model.page, pager.pages)
    }])
    Promise.resolve().then(() => {
      return typeof api.schema == 'function' ? api.schema(route) : null
    }).then(schema => {
      state.schema = schema
      return typeof api.pages == 'function' ? api.pages(route) : null
    }).then(pages => {
      if (pages) {
        pager.pages = pages
        if (model.page < pager.pages) {
          pager.isLast = false
        } else if (model.page > pager.pages) {
          call('goto', {
            _page: pager.pages
          })
          throw 'redirect'
        }
        pageInput(Array(pages).fill().map((v, i) => ({
          value: i + 1,
          label: text.pagination(i + 1, pages)
        })))
      }
      return typeof api.totals == 'function' ? api.totals(route, []) : null
    }).then(totals => {
      state.totals = totals
      return typeof api.rows == 'function' ? api.rows(route) : null
    }).then(rows => {
      rows = rows instanceof Array ? rows : []
      state.schema = state.schema || {
        type: 'array',
        items: {
          type: 'object',
          properties: rows.reduce((P, row) => {
            Object.keys(rows).forEach(k => {
              if (P[k] == null) {
                P[k] = {
                  type: typeof row[k],
                  title: k,
                  name: k
                }
              }
            })
            return P
          }, {}) 
        }
      }

      const P = state.schema.items.properties
      const C = Object.keys(P)
      filter.fields = C.map(k => ({
        value: k,
        label: P[k].title || k
      }))
      filter.inputs[0] = input({
        type: 'string'
      }, {name: 'field', model, options: filter.fields})
      const L = (state.schema.items.links || []).map(({link, icon, ...l}) => ({
        ...l,
        link: tools.link(link, true),
        icon: tools.icon(icon)
      }))
      const G = (Q._group || []).filter(k => C.indexOf(k) >= 0)
      group.active = G.length > 0
      if (group.active) {
        group.disabled = false
      }
      call('set', {
        ...state,
        title: state.schema.title,
        description: state.schema.description,
        check: {
          disabled: P.id == null || !state.totals || group.active,
          label: text.check,
          icon: tools.icon(icon.check),
          link: tools.link(link.check, true)
        },
        links: state.schema.links.map(({link, icon, ...l}) => ({
          ...l,
          link: tools.link(link),
          icon: tools.icon(icon)
        })),
        columns: C.map(k => ({
          ...P[k],
          name: k,
          group: G.indexOf(k) >= 0 ? group.textOn : group.textOff,
          label: text.sort,
          sort: Q._sort == k ? tools.icon(icon.sortAsc) : 
            Q._sort == `-${k}` ? tools.icon(icon.sortDesc) :
              tools.icon(icon.sort)
        })),
        aggregates: !state.totals ? null : C.map(k => state.totals[k]),
        actions: L,
        rows: rows.map(row => ({
          id: row.id,
          checked: (Q._id || []).indexOf(String(row.id)) >= 0,
          fields: C.map(k => output({
            ...P[k],
            href: group.active ? null : interpolate(P[k].href, row)
          }, {name: k, model: row})),
          links: L.map(({href, ...l}) => ({
            ...l,
            href: interpolate(href, row)
          }))
        }))
      })
      return typeof api.operators == 'function' ? api.operators(route) : null
    }).then(operators => {
      if (operators instanceof Array) {
        filter.operators = operators
        filter.inputs[1] = input({
          type: 'string'
        }, {
          name: 'operator',
          model,
          options: filter.operators
        })
        filter.filters.forEach(f => {
          const op = operators.reduce((Match, op) => 
            Match || f.label.indexOf(op.value) < 0 ? Match : op
          , null)
          if (!op) {
            return null
          }

          const L = f.label.split(op.value)
          const field = L.shift()
          const value = L.join(op.value)
          const P = state.schema.items.properties[field]
          const base = `${P.title} ${op.label} `

          if (!op.exact) {
            f.label = base+value
            call('set')
          } else {
            Promise.resolve().then(() => {
              return typeof api.values == 'function' ?
                api.values(route, field) : null
            }).then(values => {
              var l = null
              if (values instanceof Array) {
                l = values.reduce(
                  (l, V) => l == null && V.value == value ? V.label : l 
                , l)
              }
              f.label = base+(l == null ? value : l)
              call('set')
            }).catch(err => {
              f.label = base+value
              call('set')
              throw err
            })
          }
        })
      }
    }).catch(err => {
      if (err != 'redirect') {
        throw err
      }
    })
  },
  change: ({model, pager, search, filter, schema, route, api}, ev, call) => {
    const {name, data} = parser(ev)
    if (name == 'page') {
      model.page = data
      pager.input.validate()
      if (data && typeof data == 'number') {
        call('goto', {
          _page: data
        })
      }
    } else if (name == 'search') {
      model.search = data
      search.disabled = !data
      search.input.validate()
      setTimeout(() => {
        const actual = ev.target.value || ''
        if (actual == data) {
          call('goto', {_search: data})
        }
      }, 500)
    } else {
      if (['toggle', 'filter'].indexOf(name) < 0) {
        model[name] = data
      } else if (name == 'toggle' && filter.isOpen) {
        model.field = null
        model.operator = null
        model.value = null
        filter.exact = null
        filter.isOpen = false
      } else if (name == 'toggle') {
        filter.isOpen = true
      }
      if (name == 'field') {
        filter.values = null
        model.value = null
      }

      const setFirst = name => {
        const X = filter[name+'s']
        if (model[name] == null && X instanceof Array && X.length) {
          model[name] = X[0].value
        }
      }

      setFirst('field')
      setFirst('operator')

      if (filter.operators instanceof Array && model.operator) {
        const exact = filter.exact
        filter.exact = filter.operators.reduce((r, {
          value, exact
        }) => r != null || value != model.operator ? r : exact, null) || false
        if (filter.exact !== exact) {
          model.value = null
          filter.values = null
        }
      }

      const P = schema.items.properties
      if (filter.values == null) {
        filter.inputs[2] = input({
          type: 'string',
          readOnly: filter.exact
        }, {name: 'value', model})
        if (filter.exact) {
          const f = model.field
          const o = model.operator
          filter.pending = true
          Promise.resolve().then(() => api.values(route, f)).then(values => {
            if (model.field == f && model.operator == o) {
              filter.pending = false
              filter.values = values
              filter.inputs[2] = input({
                ...P[f]
              }, {name: 'value', model, options: values})
              call('set')
            }
          })
        }
      }

      filter.inputs[0].validate()
      filter.inputs[1].validate()
      filter.inputs[2].validate()

      const {field, operator, value} = model
      if (field == null || operator == null || value == null) {
        filter.disabled = true
      } else {
        filter.disabled = false
        if (name == 'filter') {
          const F = route.Query._filter
          const _filter = F instanceof Array ? F : []
          _filter.push(`${field}${operator}${value}`)
          call('goto', {_filter})
        }
      }
    }
  },
  check: ({rows, route}, ev, call) => {
    const v = ev.target.getAttribute('value')
    const Id = route.Query._id || []
    rows.forEach(row => {
      if (v == row.id || v == null) {
        const i = Id.indexOf(String(row.id))
        if (i < 0) {
          Id.push(row.id)
        } else {
          Id.splice(i, 1)
        }
      }
    })
    call('goto', {
      _id: Id
    })
  },
  first: ({}, ev, call) => {
    call('goto', {
      _page: 1
    })
  },
  previous: ({model}, ev, call) => {
    const p = model.page
    if (p > 1) {
      call('goto', {
        _page: p - 1
      })
    }
  },
  pager: ({}, ev, call) => {
    call('goto', {
      _page: ev.target.value
    })
  },
  next: ({pager, model}, ev, call) => {
    const {page} = model
    const {pages} = pager
    if (page < pages) {
      call('goto', {
        _page: page + 1
      })
    }
  },
  last: ({pager}, ev, call) => {
    call('goto', {
      _page: pager.pages
    })
  },
  sort: ({route}, ev, call) => {
    const k = ev.target.closest('a').getAttribute('data-sort')
    call('goto', {
      _sort: (route.Query._sort == k ? '-' : '')+k
    })
  },
  group: ({group, columns}, ev, call) => {
    const name = ev.target.getAttribute('data-name')
    const {textOn, textOff, active} = group
    if (active) {
      if (name == null) {
        call('goto', {
          _group: null
        })
      }
    } else if (name) {
      group.disabled = !columns.reduce((pass, c) => {
        if (c.name == name) {
          c.group = c.group == textOn ? textOff : textOn
        }
        return pass || c.group == textOn
      }, false)
    } else {
      const G = columns.reduce((G, {group, name}) => {
        if (group == textOn) {
          G.push(name)
        }
        return G
      }, [])
      if (G.length) {
        call('goto', {
          _group: G
        })
      }
    }
  },
  exporter: ({exporter, api, route}, ev, call) => {
    exporter.disabled = true
    Promise.resolve().then(() => {
      return api.exporter(route)
    }).then(({data, name}) => {
      data = 'data:text/plain;charset=utf-8,'+encodeURIComponent(data)
      const link = document.createElement("a")
      link.setAttribute('href', data) 
      link.setAttribute('download', name)

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      exporter.disabled = false
      call('set')
    }).catch(err => {
      exporter.disabled = false
      call('set')
      throw err
    })
  },
  filter: ({route}, ev, call) => {
    const link = ev ? ev.target.closest('a[data-index]') : null
    const index = !ev || !link ? null : link.getAttribute('data-index')
    const F = route.Query._filter

    if (typeof index == 'string' && !isNaN(index)) {
      const i = parseInt(index)
      if ((F instanceof Array) && i < F.length && i >= 0) {
        F.splice(i, 1)
        call('goto', {
          _filter: F
        })
        return
      }
    }
  },
  goto: ({route}, Q) => {
    const {url, path, Query} = route
    if (location.hash == url) {
      const q = queryString({
        ...Query,
        ...(Q || {})
      })
      location.replace(path+(q.length?'?'+q:''))
    }
  }
}
