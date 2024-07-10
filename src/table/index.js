import e from '../e.js'
import {rm, formatter} from '../lib.js'
import spinner from '../spinner.js'
import tag from '../tag.js'
import ctrl from '../ctrl/index.js'
import {Aggregates, engine} from './engine.js'

const btns = {
  close: 'secondary',
  pagination: 'secondary',
  check: 'success'
}

const icons = {
  first: 'fast-backward',
  previous: 'step-backward',
  next: 'step-forward',
  last: 'fast-forward',
  close: 'times',
  check: 'check',
  sort: 'sort',
  sortAsc: 'sort-down',
  sortDesc: 'sort-up'
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
    noCheck: !!config.noCheck,
    noSort: !!config.noSort,
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
                  data: () => ({
                    rows: state.rows,
                    checked: state.checked,
                    F,
                    group: state.group,
                    setGroup: g => {
                      state.group = g
                      update()
                    }
                  })
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
            div({
              class: 'row gx-1 justify-content-center'
            }, [
              div({
                class: 'col-auto'
              }, [
                ctrl({
                  href: () => {
                    state.page = 1
                    update()
                  },
                  link: btns.pagination,
                  icon: icons.first,
                  init: el => refs.first = el
                })
              ]),
              div({
                class: 'col-auto'
              }, [
                ctrl({
                  href: () => {
                    state.page--
                    update()
                  },
                  link: btns.pagination,
                  icon: icons.previous,
                  init: el => refs.previous = el
                })
              ]),
              div({
                class: 'col-auto'
              }, [
                ctrl({
                  ui: 'pending',
                  init: el => refs.pager = el
                })
              ]),
              div({
                class: 'col-auto'
              }, [
                ctrl({
                  href: () => {
                    state.page++
                    update()
                  },
                  link: btns.pagination,
                  icon: icons.next,
                  init: el => refs.next = el
                })
              ]),
              div({
                class: 'col-auto'
              }, [
                ctrl({
                  href: () => {
                    state.page = state.pages
                    update()
                  },
                  link: btns.pagination,
                  icon: icons.last,
                  init: el => refs.last = el
                })
              ])
            ])
          ])
        ]),
        state.noSearch && !hasTotals ? null : tr({}, [
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
                  type: 'string',
                  description: '🔎',
                  noValid: true,
                  title: 'search',
                  default: state.search,
                  delay: 500,
                  update: (err, v) => {
                    if (!err && v != state.search) {
                      state.search = v
                      update()
                    }
                  }
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

  const update = prevent => {
    const x = tbl.querySelector('tbody')
    x.innerHTML = ''
    const view = engine(state, M)
    if (view) {
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
              label: `${i + 1} / ${state.pages}`
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
