import {node, spinner, ctrl} from '../components.js'
import {formatter} from '../lib.js'
import engine from './engine.js'

export default ({
  title,
  links,
  items,
  query,
  pagination,
  search,
  sort,
  check,
  css,
  update,
  init,
  ...schema
}) => {
  items = items || {}
  const rowLinks = items.links || []
  const P = items.properties || {}
  const Y = Object.keys(P)
  const K = Y.filter(k => P[k].ui != 'info')
  const I = Y.filter(k => P[k].ui == 'info')
  const format = K.reduce((F, k) => ({
    ...F,
    [k]: formatter(P[k])
  }), {})
  const T = K.reduce((T, k) => {
    if (P[k].totals) {
      T[k] = P[k].totals
    }
    return T
  }, {})
  const U = Object.keys(T)
  const hasTotals = U.length > 0

  query = query ? {...query} : {}

  var pager = null
  const state = {
    refresh: V => {
      if (V instanceof Array || V === null) {
        state.data = V
      }
      refresh()
    },
    data: schema.default,
    rows: null,
    query,
    properties: P,
    format
  }

  const tbl = node(({
    table, thead, tbody, tr, th, td, div, a, text, button, ul, span, label
  }) =>
    table({
      class: [
        'table'
      ].concat(css)
    }, [
      thead({}, [
        !title ? null : tr({}, [
          th({
            class: 'text-center',
            colspan: '100%'
          }, [
            ctrl({
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
                  data: state
                })
              ])
            ))
          ])
        ]),
        !pagination ? null : tr({}, [
          td({
            class: 'text-center',
            colspan: '100%'
          }, [
            pager = ctrl({
              ui: 'pagination'
            })
          ])
        ]),
        !search ? null : tr({}, [
          th({
            class: 'text-center',
            colspan: '100%'
          }, [
            ctrl({
              type: 'string',
              description: search,
              title: 'search',
              default: query.search,
              delay: 500,
              update: (err, v) => {
                if (!err && v != query.search) {
                  query.search = v
                  refresh()
                }
              }
            })
          ])
        ]),
        !hasTotals ? null : tr({}, [
          !check ? null : td({
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
        !check &&
        !rowLinks.length &&
        !K.length ? null : tr({}, [
          !check ? null : th({
            class: 'text-center align-middle',
            dataCtx: 'groupHide'
          }, [
            ctrl({
              size: 'sm',
              context: 'success',
              icon: 'check',
              href: () => {
                (state.rows || []).forEach(row => {
                  const index = query.checked.indexOf(row)
                  if (index < 0) {
                    query.checked.push(row)
                  } else {
                    query.checked.splice(index, 1)
                  }
                })
                refresh(true)
              }
            })
          ])
        ].concat(rowLinks.map(({icon, title}) =>
          th({
            class: 'text-center align-middle',
            dataCtx: 'groupHide'
          }, [
            ctrl({
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
            !sort ? null : text(' '),
            !sort ? null : a({
              dataCtx: 'sort:'+k,
              href: 'javascript:;',
              onclick: () => {
                query.sort = (query.sort == k ? '-' : '')+k
                refresh(true)
              }
            })
          ])
        )))
      ]),
      tbody()
    ])
  )

  const refresh = prevent => {
    query.page = typeof query.page == 'number' && query.page >= 1 ?
      parseInt(query.page) : 1
    query.limit = !pagination ? 0 : 
      typeof query.limit == 'number' && query.limit >= 1 ?
        parseInt(query.limit) : 10
    query.filters = (query.filters instanceof Array ? query.filters : [])
      .filter(F => typeof F == 'function')
    query.search = typeof query.search == 'string' ? query.search : ''
    query.sort = typeof query.sort == 'string' ? query.sort : ''
    query.group = query.group instanceof Array ? query.group : null
    query.checked = query.checked instanceof Array ? query.checked : []
    if (state.data instanceof Array) {
      const C = query.checked
      for (var i = C.length - 1; i >= 0; i--) {
        if (state.data.indexOf(C[i]) < 0) {
          C.splice(i, 1)
        }
      }
    }

    const x = tbl.querySelector('tbody')
    x.innerHTML = ''

    const R = (update ? update : engine)({
      ...query, data: state.data, totals: T, format
    }) || {}
    state.rows = R.rows
    const {view, totals, pages} = R

    if (view) {
      tbl.querySelectorAll('[data-ctx^="sort:"]').forEach(f => {
        const k = f.getAttribute('data-ctx').substr(5)
        const s = query.sort
        f.innerHTML = ''
        f.appendChild(ctrl({
          icon: 'sort'+(s == k ? '-down' : s == '-'+k ? '-up' : '')
        }))
      })

      if (pagination) {
        if (!prevent) {
          pager.replaceWith(ctrl({
            ui: 'pagination',
            description: pagination,
            default: query.page,
            maximum: pages,
            update: (err, v) => {
              if (!err && v && v != query.page) {
                query.page = v
                refresh(true)
              }
            },
            init: el => pager = el
          }))
        }
      }

      tbl.querySelectorAll('[data-ctx="groupHide"]')
        .forEach(g => {
          g.classList[query.group ? 'add' : 'remove']('d-none')
        })

      const H = K.filter(
        k => query.group && query.group.indexOf(k) < 0 && U.indexOf(k) < 0 
      )
      K.forEach(k => {
        const grouped = query.group && query.group.indexOf(k) >= 0
        tbl.querySelectorAll(
          '[data-ctx="field:'+k+'"], [data-ctx="totals:'+k+'"]'
        ).forEach(g => {
          g.closest('th,td')
            .classList[H.indexOf(k) < 0 ? 'remove' : 'add']('d-none')
          if (g.getAttribute('data-ctx') == `field:${k}`) {
            g.classList.remove('text-uppercase', 'text-lowercase')
            if (query.group) {
              g.classList.add('text-'+(grouped ? 'lower' : 'upper')+'case')
            }
          }
        })
      })

      tbl.querySelectorAll('[data-ctx^="totals:"]').forEach(t => {
        const k = t.getAttribute('data-ctx').substr(7)
        t.innerHTML = ''
        if (totals[k] != null) {
          t.appendChild(ctrl({
            ...P[k],
            readOnly: true,
            href: null,
            default: totals[k]
          }))
        }
      })

      view.forEach(row => {
        x.appendChild(node(({tr, td, a, text}) =>
          tr({
            title: I.map(k => row[k]).join('\n') || null
          }, [
            query.group || !check ? null : td({
              class: 'text-center align-middle'
            }, [
              ctrl({
                type: 'boolean',
                default: query.checked.indexOf(row) >= 0,
                update: (err, v) => {
                  if (!err) {
                    const index = query.checked.indexOf(row)
                    if (index < 0 && v) {
                      query.checked.push(row)
                      refresh(true)
                    } else if (index >= 0 && !v) {
                      query.checked.splice(index, 1)
                      refresh(true)
                    }
                  }
                }
              })
            ])
          ].concat(rowLinks.map(L =>
            query.group ? null : td({
              class: 'text-center align-middle'
            }, [
              ctrl({
                ...L,
                size: 'sm',
                title: L.icon ? '' : L.title,
                data: {
                  ...state,
                  row
                }
              })
            ])
          )).concat(K.filter(k => H.indexOf(k) < 0).map(k =>
            td({
              class: 'align-middle text-'+
                (P[k].ui == 'text' ? 'left' : 'center'),
              style: P[k].ui == 'color' && row[k] && typeof row[k] == 'string' ?
                  'background-color:'+format[k](row[k]) : null,
              title: P[k].ui == 'color' ? row[k] : null
            }, [
              P[k].ui == 'color' ? null : ctrl({
                ...P[k],
                readOnly: true,
                href: query.group ? null : P[k].href,
                default: row[k],
                data: row,
                size: P[k].href && !query.group && P[k].context ? 'sm' : null
              })
            ])
          )))
        ))
      })
    } else {
      tbl.querySelectorAll('[data-ctx^="totals:"]').forEach(t => {
        const k = t.getAttribute('data-ctx').substr(7)
        const v = totals[k]
        t.textContent = v != null ? v : '' 
      })
      x.appendChild(node(({tr, td}) =>
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

  if (typeof init == 'function') {
    init(state.refresh)
  }

  refresh()
  return tbl
}
