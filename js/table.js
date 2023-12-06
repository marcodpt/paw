import {interpolate, meta, queryString} from './lib.js'

export default {
  template: document.getElementById('view-table'),
  set: (_, state) => state,
  init: ({data, ...route}, call) => {
    const {schema, pages, rows, totals, exporter} = data
    const state = {
      ...route,
      cssSearch: !route.Query._search ? ' disabled' : '',
      cssFirst: ' disabled',
      cssLast: ' disabled',
      cssExporter: '',
      exporter
    }
    call('set', state)
    const p = route.Query._page
    if (!p || isNaN(p)) {
      call('goto', {
        _page: 1
      })
      return
    }
    state.page = parseInt(p)
    if (p > 1) {
      state.cssFirst = ''
    }
    state.pages = state.page
    state.pagination = meta('pagination', state)
    Promise.resolve().then(() => {
      return typeof schema == 'function' ? schema(route) : null
    }).then(schema => {
      state.schema = schema
      return typeof pages == 'function' ? pages(route) : null
    }).then(pages => {
      if (pages) {
        state.pages = pages
        state.pagination = meta('pagination', state)
        if (state.page < state.pages) {
          state.cssLast = ''
        } else if (state.page > state.pages) {
          call('goto', {
            _page: state.pages
          })
          throw 'redirect'
        }
      }
      return typeof totals == 'function' ? totals(route, []) : null
    }).then(totals => {
      state.totals = totals
      return typeof rows == 'function' ? rows(route) : null
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
      const L = state.schema.items.links || []
      const G = (state.Query._group || [])
        .filter(k => C.indexOf(k) >= 0)
      const grouped = G.length > 0
      const textGroup = meta('link_group')
      call('set', {
        ...state,
        title: state.schema.title,
        description: state.schema.description,
        check: P.id != null && state.totals,
        links: state.schema.links,
        grouped,
        textGroup,
        groupStatus: grouped ? '' : ' disabled',
        columns: C.map(k => ({
          ...P[k],
          name: k,
          group: G.indexOf(k) >= 0 ? textGroup : 'reset',
          sort: state.Query._sort == k ? 'asc' : 
            state.Query._sort == `-${k}` ? 'desc' : 'none'
        })),
        aggregates: !state.totals ? null : C.map(k => state.totals[k]),
        actions: L,
        rows: rows.map(row => ({
          id: row.id,
          checked: (state.Query._id || []).indexOf(String(row.id)) >= 0,
          fields: C.map(k => ({
            value: row[k],
            href: grouped ? null : interpolate(P[k].href, row)
          })),
          links: L.map(({href, ...link}) => ({
            ...link,
            href: interpolate(href, row)
          }))
        }))
      })
    }).catch(err => {
      if (err != 'redirect') {
        throw err
      }
    })
  },
  check: (state, ev, call) => {
    const v = ev.target.getAttribute('value')
    const Id = state.Query._id || []
    state.rows.forEach(row => {
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
  first: (state, ev, call) => {
    call('goto', {
      _page: 1
    })
  },
  previous: ({page}, ev, call) => {
    if (page > 1) {
      call('goto', {
        _page: page - 1
      })
    }
  },
  next: ({page, pages}, ev, call) => {
    if (page < pages) {
      call('goto', {
        _page: page + 1
      })
    }
  },
  last: ({pages}, ev, call) => {
    call('goto', {
      _page: pages
    })
  },
  search: (state, ev, call) => {
    const search = ev.target.value || ''
    state.Query._search = search
    setTimeout(() => {
      const actual = ev.target.value || ''
      if (actual == search) {
        call('goto')
      }
    }, 500)
  },
  sort: ({Query}, ev, call) => {
    const k = ev.target.closest('a').getAttribute('data-sort')
    call('goto', {
      _sort: (Query._sort == k ? '-' : '')+k
    })
  },
  group: (state, ev, call) => {
    const name = ev.target.getAttribute('data-name')
    const {grouped, columns, textGroup} = state
    if (grouped) {
      if (name == null) {
        call('goto', {
          _group: null
        })
      }
    } else if (name) {
      state.groupStatus = columns.reduce((pass, c) => {
        if (c.name == name) {
          c.group = c.group == textGroup ? 'reset' : textGroup
        }
        return pass || c.group == textGroup
      }, false) ? '' : ' disabled'
    } else {
      const G = columns.reduce((G, {group, name}) => {
        if (group == textGroup) {
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
  exporter: (state, ev, call) => {
    state.cssExporter = ' disabled'
    Promise.resolve().then(() => {
      return state.exporter({Query: state.Query})
    }).then(({data, name}) => {
      data = 'data:text/plain;charset=utf-8,'+encodeURIComponent(data)
      const link = document.createElement("a")
      link.setAttribute('href', data) 
      link.setAttribute('download', name)

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      call('set', {
        ...state,
        cssExporter: ''
      })
    }).catch(err => {
      call('set', {
        ...state,
        cssExporter: ''
      })
      throw err
    })
  },
  goto: ({url, path, Query}, Q) => {
    if (location.hash == url) {
      const q = queryString({
        ...Query,
        ...(Q || {})
      })
      location.replace(path+(q.length?'?'+q:''))
    }
  }
}
