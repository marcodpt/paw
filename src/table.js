import e from './e.js'
import {rm, formatter} from './lib.js'
import spinner from './spinner.js'
import tag from './tag.js'
import form from './form.js'
import modal from './modal.js'
import ctrl from './ctrl/index.js'
import T from './lang/index.js'

const btns = {
  close: 'secondary',
  pagination: 'secondary',
  group: 'warning',
  exporter: 'secondary',
  check: 'success'
}

const icons = {
  first: 'fast-backward',
  previous: 'step-backward',
  next: 'step-forward',
  last: 'fast-forward',
  close: 'times',
  group: 'th',
  exporter: 'file',
  check: 'check',
  sort: 'sort',
  sortAsc: 'sort-down',
  sortDesc: 'sort-up'
}

const copy = X => JSON.parse(JSON.stringify(X))

const run = (...F) => data => F.reduce((data, F) => F(data), data)

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

const sort = Fields => data => {
  data.sort(cmp(Fields))
  return data
}

const pager = (p, limit) => data => !limit ? data :
  data.slice((p - 1) * limit, p * limit)

const search = match => data => {
  if (match) {
    data = data.filter(row => Object.keys(row).reduce((pass, k) =>
      pass || String(row[k]).toLowerCase().indexOf(match.toLowerCase()) >= 0
    , false))
  }
  return data
}

const Aggregates = {
  count: X => X.length,
  avg: X => X.reduce((s, v) => s += v, 0) / (X.length || 1),
  sum: X => X.reduce((s, v) => s += v, 0)
}

const group = (Fields, Methods) => data => {
  const notEqual = cmp(Fields)
  const D = sort(Fields)(data)
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
  title,
  links,
  items,
  config,
  ...schema
}) => {
  config = config || {}

  items = items || {}
  const rowLinks = items.links || []
  const P = items.properties || {}
  const Y = Object.keys(P)
  const K = Y.filter(k => P[k].ui != 'info')
  const I = Y.filter(k => P[k].ui == 'info')
  const F = K.reduce((F, k) => ({
    ...F,
    [k]: formatter(P[k])
  }), {})
  const A = Object.keys(Aggregates)
  const M = K.reduce((M, k) => {
    if (A.indexOf(P[k].totals) >= 0) {
      M[k] = V => Aggregates[P[k].totals](V)
    }
    return M
  }, {})
  const U = Object.keys(M)
  const hasTotals = U.length > 0
  const O = Object.keys(T('operators'))
  const Z = Y.reduce((Z, k) => ({
    ...Z,
    [k]: data => {
      if (P[k].type == 'integer') {
        return parseInt(data)
      } else if (P[k].type == 'number') {
        return parseFloat(data)
      } else if (P[k].type == 'boolean') {
        return !!data
      } else {
        return data
      }
    }
  }), {})
  const parseData = D => D instanceof Array ?
    D.map(row => Y.reduce((R, k) => ({
      ...R,
      [k]: Z[k](row[k])
    }), row)) : null

  const refs = {}

  const state = {
    data: parseData(schema.default),
    base: null,
    checked: null,
    rows: null,
    search: '',
    noSearch: !!config.noSearch,
    noGroup: !!config.noGroup,
    noCheck: !!config.noCheck,
    noSort: !!config.noSort,
    exporter: config.exporter == null ?
      (title || 'data').toLowerCase().split(' ').join('_')+'.txt' :
      config.exporter,
    sort: null,
    page: 1,
    pages: 1,
    limit: config.limit == null ? 10 : config.limit,
    filter: {
      label: ['', '', '']
    },
    filters: [],
    css: (config.table || 'bordered center striped hover').split(' ')
      .map(c => c.trim()).filter(c => c).map(c => 'table-'+c).join(' ')+
      (config.css ? ' '+config.css : '')
  }

  const tbl = e(({
    table, thead, tbody, tr, th, td, div, a, text, button, ul, span
  }) =>
    table({
      class: 'table '+state.css
    }, [
      thead({}, [
        !title ? null : tr({}, [
          th({
            class: 'text-center',
            colspan: '100%'
          }, [
            tag({
              ...schema,
              title
            })
          ])
        ]),
        !links || !links.length ? null : tr({}, [
          th({
            class: 'text-center',
            colspan: '100%'
          }, [
            div({
              class: 'row gx-1 justify-content-center'
            }, (links || []).map(X =>
              div({
                class: 'col-auto'
              }, [
                ctrl({
                  ...X,
                  data: () => state.checked
                })
              ])
            ))
          ])
        ]),
        !state.limit ? null : tr({}, [
          td({
            class: 'text-center',
            colspan: '100%'
          }, [
            form({
              links: [
                {
                  href: () => {
                    state.page = 1
                    update()
                  },
                  link: btns.pagination,
                  icon: icons.first,
                  init: el => refs.first = el
                }, {
                  href: () => {
                    state.page--
                    update()
                  },
                  link: btns.pagination,
                  icon: icons.previous,
                  init: el => refs.previous = el
                }, {
                  ui: 'pending',
                  init: el => refs.pager = el
                }, {
                  href: () => {
                    state.page++
                    update()
                  },
                  link: btns.pagination,
                  icon: icons.next,
                  init: el => refs.next = el
                }, {
                  href: () => {
                    state.page = state.pages
                    update()
                  },
                  link: btns.pagination,
                  icon: icons.last,
                  init: el => refs.last = el
                }
              ] 
            })
          ])
        ]),
        state.noSearch &&
        (!hasTotals || state.noGroup) &&
        !state.exporter ? null : tr({}, [
          th({
            class: 'text-center',
            colspan: '100%'
          }, [
            div({
              class: 'row gx-1 justify-content-center'
            }, [
              state.noSearch ? null : div({
                class: 'col-auto'
              }, [
                ctrl({
                  title: '',
                  href: () => {
                    state.search = ''
                    refs.search.querySelector('input').value = ''
                    update()
                  },
                  link: btns.close,
                  icon: icons.close,
                  init: el => refs.clear = el
                })
              ]),
              state.noSearch ? null : div({
                class: 'col-auto'
              }, [
                ctrl({
                  type: 'string',
                  description: T('search'),
                  noValid: true,
                  title: 'search',
                  default: state.search,
                  delay: 500,
                  update: (err, v) => {
                    if (!err && v != state.search) {
                      state.search = v
                      update()
                    }
                  },
                  init: el => refs.search = el
                })
              ]),
              !hasTotals || state.noGroup ? null : div({
                class: 'col-auto'
              }, [
                state.bgrp = ctrl({
                  title: T('group'),
                  link: btns.group,
                  icon: icons.group,
                  href: () => {
                    if (state.group) {
                      state.group = null
                      state.bgrp.innerHTML = ''
                      state.bgrp.appendChild(tag({
                        title: T('group'),
                        icon: icons.group
                      }))
                      update()
                    } else {
                      modal({
                        title: T('group'),
                        icon: icons.group,
                        properties: {
                          fields: {
                            type: 'array',
                            title: '',
                            noValid: true,
                            default: [],
                            options: K.map(k => ({
                              value: k,
                              label: P[k].title || k
                            }))
                          }
                        },
                        submit: ({fields}) => {
                          state.group = fields
                          state.bgrp.innerHTML = ''
                          state.bgrp.appendChild(tag({
                            title: T('group'),
                            icon: icons.close
                          }))
                          update()
                        }
                      })
                    }
                  }
                })
              ]),
              !state.exporter ? null : div({
                class: 'col-auto'
              }, [
                ctrl({
                  href: () => {
                    const nl = '\n'
                    const sep = '\t'
                    
                    var data = ''
                    data += K.map(k => P[k].title || k).join(sep)+nl
                    data += state.rows
                      .map(row => K.map(k => F[k](row[k])).join(sep))
                      .join(nl)

                    return data
                  },
                  link: btns.exporter,
                  icon: icons.exporter,
                  title: T('exporter'),
                  download: state.exporter,
                  mime: 'text/plain; charset=UTF-8'
                })
              ])
            ])
          ])
        ]),
        !hasTotals ? null : tr({}, [
          state.noCheck ? null : td({
            dataCtx: 'groupHide'
          })
        ].concat(rowLinks.map(() =>
          td({
            dataCtx: 'groupHide'
          })
        )).concat(K.map(k =>
          td({
            class: 'text-center align-middle',
            dataCtx: 'totals:'+k
          })
        ))),
        tr({}, [
          !hasTotals || state.noCheck ? null : th({
            class: 'text-center align-middle',
            dataCtx: 'groupHide'
          }, [
            ctrl({
              size: 'sm',
              link: btns.check,
              icon: icons.check,
              href: () => {
                (state.base || []).forEach(row => {
                  row.checked = !row.checked
                })
                update()
              }
            })
          ])
        ].concat(rowLinks.map(({icon, title}) =>
          th({
            class: 'text-center align-middle',
            dataCtx: 'groupHide'
          }, [
            tag({
              icon,
              title: icon ? '' : title
            })
          ])
        )).concat(K.map(k =>
          th({
            class: 'text-center align-middle'
          }, [
            span({
              title: P[k].description,
              dataCtx: 'field:'+k
            }, [
              text(P[k].title || k)
            ]),
            state.noSort ? null : text(' '),
            state.noSort ? null : a({
              dataCtx: 'sort:'+k,
              href: 'javascript:;',
              onclick: () => {
                state.sort = (state.sort == k ? '-' : '')+k
                update()
              }
            })
          ])
        )))
      ]),
      tbody()
    ])
  )

  const update = (prevent) => {
    const x = tbl.querySelector('tbody')
    x.innerHTML = ''
    if (state.data instanceof Array) {
      state.base = run(
        search(state.search)
      )(state.data)
      state.rows = run(
        state.group ? group(state.group, M) : identity,
        state.sort ? sort([state.sort]) : identity
      )(state.base)
      state.pages = Math.ceil(state.rows.length / state.limit) || 1
      if (state.page > state.pages) {
        state.page = state.pages
      } else if (state.page < 1) {
        state.page = 1
      }
      const view = run(pager(state.page, state.limit))(state.rows)

      tbl.querySelectorAll('[data-ctx^="sort:"]').forEach(f => {
        const k = f.getAttribute('data-ctx').substr(5)
        const s = state.sort
        f.innerHTML = ''
        f.appendChild(tag({
          icon: icons['sort'+(s == k ? 'Asc' : s == '-'+k ? 'Desc' : '')]
        }))
      })

      if (state.limit) {
        if (!prevent) {
          refs.pager.replaceWith(ctrl({
            type: 'integer',
            title: '',
            noValid: true,
            default: state.page,
            options: Array(state.pages).fill().map((v, i) => ({
              value: i + 1,
              label: T('pagination')(i + 1, state.pages)
            })),
            update: (err, v) => {
              if (!err && v && v != state.page) {
                state.page = v
                update(true)
              }
            },
            init: el => refs.pager = el
          }))
        }
        refs.first.disabled = state.page <= 1
        refs.previous.disabled = state.page <= 1
        refs.next.disabled = state.page >= state.pages
        refs.last.disabled = state.page >= state.pages
      }

      if (!state.noSearch) {
        refs.clear.disabled = !state.search
      }

      tbl.querySelectorAll('[data-ctx="groupHide"]')
        .forEach(g => {
          g.classList[state.group ? 'add' : 'remove']('d-none')
        })

      const H = K.filter(
        k => state.group && state.group.indexOf(k) < 0 && U.indexOf(k) < 0 
      )
      K.forEach(k => {
        tbl.querySelectorAll(
          '[data-ctx="field:'+k+'"], [data-ctx="totals:'+k+'"]'
        ).forEach(g => {
          g.closest('th,td')
            .classList[H.indexOf(k) < 0 ? 'remove' : 'add']('d-none')
        })
      })

      state.checked = state.base.filter(({checked}) => checked)
      const C = state.checked.length ? state.checked : state.base
      tbl.querySelectorAll('[data-ctx^="totals:"]').forEach(t => {
        const k = t.getAttribute('data-ctx').substr(7)
        t.innerHTML = ''
        if (M[k]) {
          t.appendChild(ctrl({
            ...P[k],
            readOnly: true,
            href: null,
            default: M[k](C.map(row => row[k]))
          }))
        }
      })

      view.forEach(row => {
        x.appendChild(e(({tr, td, a, text}) =>
          tr({
            title: I.map(k => row[k]).join('\n')
          }, [
            state.group || !hasTotals || state.noCheck ? null : td({
              class: 'text-center align-middle'
            }, [
              ctrl({
                type: 'boolean',
                noValid: true,
                default: !!row.checked,
                update: (err, v) => {
                  if (!err && !!row.checked !== v) {
                    row.checked = v
                    update()
                  }
                }
              })
            ])
          ].concat(rowLinks.map(L =>
            state.group ? null : td({
              class: 'text-center align-middle'
            }, [
              ctrl({
                ...L,
                size: 'sm',
                title: L.icon ? '' : L.title,
                data: row
              })
            ])
          )).concat(K.filter(k => H.indexOf(k) < 0).map(k =>
            td({
              class: 'align-middle text-'+
                (P[k].ui == 'text' ? 'left' : 'center'),
              style: P[k].ui == 'color' && row[k] && typeof row[k] == 'string' ?
                  'background-color:'+F[k](row[k]) : null,
              title: P[k].ui == 'color' ? row[k] : null
            }, [
              P[k].ui == 'color' ? null : ctrl({
                ...P[k],
                readOnly: true,
                href: state.group ? null : P[k].href,
                default: row[k],
                data: row,
                size: P[k].href && !state.group && P[k].link ? 'sm' : null
              })
            ])
          )))
        ))
      })
    } else {
      state.base = null
      state.rows = null
      tbl.querySelectorAll('[data-ctx^="totals:"]').forEach(t => {
        const k = t.getAttribute('data-ctx').substr(7)
        t.textContent = M[k] ? '_' : '' 
      })
      x.appendChild(e(({tr, td}) =>
        tr({}, [
          td({
            colspan: '100%'
          }, [
            spinner()
          ])
        ])
      ))
    }
  }
  update()

  tbl.setData = data => {
    state.data = parseData(data)
    update()
  }

  return tbl
}
