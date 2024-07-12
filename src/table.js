import e from './e.js'
import {rm, formatter} from './lib.js'
import spinner from './spinner.js'
import tag from './tag.js'
import ctrl from './ctrl/index.js'

export default ({
  title,
  links,
  items,
  scope,
  pagination,
  search,
  sort,
  check,
  css,
  ...schema
}, engine) => {
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
  const T = K.reduce((T, k) => {
    if (P[k].totals) {
      T[k] = P[k].totals
    }
    return T
  }, {})
  const U = Object.keys(T)
  const hasTotals = U.length > 0

  scope = scope || {}
  scope.page = typeof scope.page == 'number' && scope.page >= 1 ?
    parseInt(scope.page) : 1
  scope.limit = !pagination ? 0 : 
    typeof scope.limit == 'number' && scope.limit >= 1 ?
      parseInt(scope.limit) : 10
  scope.search = typeof scope.search == 'string' ? scope.search : ''
  scope.sort = typeof scope.sort == 'string' ? scope.sort : ''
  scope.group = scope.group instanceof Array ? scope.group : null
  scope.checked = scope.checked instanceof Array ? scope.checked : []

  var pager = null

  const state = {
    data: schema.default,
    base: null,
    rows: null
  }

  const tbl = e(({
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
                    checked: scope.checked,
                    F,
                    group: scope.group,
                    setGroup: g => {
                      scope.group = g
                      update()
                    }
                  })
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
              noValid: true,
              title: 'search',
              default: scope.search,
              delay: 500,
              update: (err, v) => {
                if (!err && v != scope.search) {
                  scope.search = v
                  update()
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
        (!hasTotals || !check) &&
        !rowLinks.length &&
        !K.length ? null : tr({}, [
          !hasTotals || !check ? null : th({
            class: 'text-center align-middle',
            dataCtx: 'groupHide'
          }, [
            ctrl({
              size: 'sm',
              link: 'success',
              icon: 'check',
              href: () => {
                (state.base || []).forEach(row => {
                  const index = scope.checked.indexOf(row)
                  if (index < 0) {
                    scope.checked.push(row)
                  } else {
                    scope.checked.splice(index, 1)
                  }
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
            !sort ? null : text(' '),
            !sort ? null : a({
              dataCtx: 'sort:'+k,
              href: 'javascript:;',
              onclick: () => {
                scope.sort = (scope.sort == k ? '-' : '')+k
                update(true)
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
    const {view, totals, pages} = engine ? engine({...scope}, state, T) : {}
    if (view) {
      tbl.querySelectorAll('[data-ctx^="sort:"]').forEach(f => {
        const k = f.getAttribute('data-ctx').substr(5)
        const s = scope.sort
        f.innerHTML = ''
        f.appendChild(tag({
          icon: 'sort'+(s == k ? '-down' : s == '-'+k ? '-up' : '')
        }))
      })

      if (pagination) {
        if (!prevent) {
          pager.replaceWith(ctrl({
            ui: 'pagination',
            noValid: true,
            description: pagination,
            default: scope.page,
            maximum: pages,
            update: (err, v) => {
              if (!err && v && v != scope.page) {
                scope.page = v
                update(true)
              }
            },
            init: el => pager = el
          }))
        }
      }

      tbl.querySelectorAll('[data-ctx="groupHide"]')
        .forEach(g => {
          g.classList[scope.group ? 'add' : 'remove']('d-none')
        })

      const H = K.filter(
        k => scope.group && scope.group.indexOf(k) < 0 && U.indexOf(k) < 0 
      )
      K.forEach(k => {
        const grouped = scope.group && scope.group.indexOf(k) >= 0
        tbl.querySelectorAll(
          '[data-ctx="field:'+k+'"], [data-ctx="totals:'+k+'"]'
        ).forEach(g => {
          g.closest('th,td')
            .classList[H.indexOf(k) < 0 ? 'remove' : 'add']('d-none')
          if (g.getAttribute('data-ctx') == `field:${k}`) {
            g.classList.remove('text-uppercase', 'text-lowercase')
            if (scope.group) {
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
        x.appendChild(e(({tr, td, a, text}) =>
          tr({
            title: I.map(k => row[k]).join('\n')
          }, [
            scope.group || !hasTotals || !check ? null : td({
              class: 'text-center align-middle'
            }, [
              ctrl({
                type: 'boolean',
                noValid: true,
                default: scope.checked.indexOf(row) >= 0,
                update: (err, v) => {
                  if (!err) {
                    const index = scope.checked.indexOf(row)
                    if (index < 0 && v) {
                      scope.checked.push(row)
                      update()
                    } else if (index >= 0 && !v) {
                      scope.checked.splice(index, 1)
                      update()
                    }
                  }
                }
              })
            ])
          ].concat(rowLinks.map(L =>
            scope.group ? null : td({
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
                href: scope.group ? null : P[k].href,
                default: row[k],
                data: row,
                size: P[k].href && !scope.group && P[k].link ? 'sm' : null
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
    state.data = data
    update()
  }

  return tbl
}
