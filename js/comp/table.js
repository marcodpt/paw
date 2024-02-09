import e from '../e.js'
import modal from '../modal.js'
import rawlink from '../config/link.js'
import {
  rm, copy, link, icon, linkify, iconify,
  interpolate, lang, formatter, download
} from '../lib.js'
import back from '../tags/back.js'
import spinner from '../tags/spinner.js'
import output from '../tags/output.js'
import ctrl from '../tags/ctrl.js'
import style from '../config/style.js'

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
  const T = sort(Fields)(data)
  const K = Object.keys(Methods).reduce((K, k) => {
    if (K.indexOf(k) < 0) {
      K.push(k)
    }
    return K
  }, copy(Fields))
  return T.reduce((T, row) => {
    const X = T[T.length - 1]
    if (X == null || notEqual(row, X)) {
      T.push(K.reduce((R, k) => ({
        ...R,
        [k]: Fields.indexOf(k) < 0 ? [row[k]] : row[k]
      }), {}))
    } else {
      K.filter(k => Fields.indexOf(k) < 0).forEach(k => {
        X[k].push(row[k])
      })
    }
    return T
  }, []).map(row => K
    .filter(k => Fields.indexOf(k) < 0)
    .reduce((R, k) => ({
      ...R,
      [k]: Methods[k](row[k])
    }), row)
  )
}

const filter = (Filters, F) => data => Filters.reduce((data, {
  field, operator, value
}) => data.filter(row => {
  const op = operator
  const v = row[field]
  const f = F[field]
  return v == null ? false :
    op == 'ct' ? f(v).toLowerCase().indexOf(value.toLowerCase()) >= 0 : 
    op == 'nc' ? f(v).toLowerCase().indexOf(value.toLowerCase()) < 0 : 
    op == 'eq' ? v == value : 
    op == 'ne' ? v != value : 
    op == 'gt' ? v > value : 
    op == 'ge' ? v >= value : 
    op == 'lt' ? v < value : 
    op == 'le' ? v <= value : true
}), data)

export default ({
  title,
  description,
  links,
  items,
  config,
  ...schema
}) => {
  config = config || {}

  const state = {
    data: copy(schema.default || null),
    base: null,
    rows: null,
    search: '',
    noSearch: !!config.noSearch,
    noFilter: !!config.noFilter,
    noGroup: !!config.noGroup,
    noCheck: !!config.noCheck,
    sort: null,
    page: 1,
    pages: 1,
    limit: config.limit == null ? 10 : config.limit,
    filter: {
      label: ['', '', '']
    },
    filters: []
  }

  const l = lang()
  items = items || {}
  const rowLinks = items.links || []
  const P = items.properties || {}
  const K = Object.keys(P).filter(k => P[k].ui != 'info')
  const I = Object.keys(P).filter(k => P[k].ui == 'info')
  const F = K.reduce((F, k) => ({
    ...F,
    [k]: formatter(P[k])
  }), {})
  const A = Object.keys(Aggregates)
  const M = K.reduce((M, k) => {
    if (A.indexOf(P[k].totals) >= 0) {
      M[k] = V => F[k](Aggregates[P[k].totals](V))
    }
    return M
  }, {})
  const T = Object.keys(M)
  const hasTotals = T.length > 0
  const O = Object.keys(l.operators)
  const S = ['ct', 'nc']

  const tbl = e(({
    table, thead, tbody, tr, th, td, div, a, i, text, button, ul
  }) =>
    table({
      class: [
        'table',
        'table-bordered',
        'table-center',
        'table-striped',
        'table-hover'
      ].join(' ')
    }, [
      thead({}, [
        !title ? null : tr({}, [
          th({
            class: 'text-center',
            colspan: '100%',
            title: description
          }, [
            text(title)
          ])
        ]),
        !links ? null : tr({}, [
          th({
            class: 'text-center',
            colspan: '100%'
          }, [
            div({
              class: 'row gx-1 justify-content-center'
            }, [
              div({
                class: 'col-auto'
              }, [
                back()
              ])
            ].concat(links.map(({
              href,
              link,
              icon,
              title
            }) =>
              div({
                class: 'col-auto'
              }, [
                a({
                  href: typeof href != 'function' ? href : 'javascript:;',
                  class: linkify(link),
                  onclick: typeof href != 'function' ? null : () => href()
                }, [
                  i({
                    class: iconify(icon)
                  }),
                  text(' '),
                  text(title)
                ])
              ])
            )))
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
                button({
                  class: link.pagination,
                  dataCtx: 'first',
                  onclick: () => {
                    state.page = 1
                    update()
                  }
                }, [
                  i({
                    class: icon.first
                  })
                ])
              ]),
              div({
                class: 'col-auto'
              }, [
                button({
                  class: link.pagination,
                  dataCtx: 'previous',
                  onclick: () => {
                    state.page--
                    update()
                  }
                }, [
                  i({
                    class: icon.previous
                  })
                ])
              ]),
              div({
                class: 'col-auto',
                dataCtx: 'pager'
              }, [
                ctrl({
                  type: 'integer',
                  title: 'pager',
                  noValid: true,
                  update: (err, v) => {
                    if (!err && v && v != state.page) {
                      state.page = v
                      update()
                    }
                  }
                }).setOptions(true)
              ]),
              div({
                class: 'col-auto'
              }, [
                button({
                  class: link.pagination,
                  dataCtx: 'next',
                  onclick: () => {
                    state.page++
                    update()
                  }
                }, [
                  i({
                    class: icon.next
                  })
                ])
              ]),
              div({
                class: 'col-auto'
              }, [
                button({
                  class: link.pagination,
                  dataCtx: 'last',
                  onclick: () => {
                    state.page = state.pages
                    update()
                  }
                }, [
                  i({
                    class: icon.last
                  })
                ])
              ])
            ])
          ])
        ]),
        tr({}, [
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
                button({
                  class: link.close,
                  disabled: true,
                  dataCtx: 'clear',
                  onclick: () => {
                    state.search = ''
                    update()
                  }
                }, [
                  i({class: icon.close})
                ])
              ]),
              state.noSearch ? null : div({
                class: 'col-auto',
                dataCtx: 'search'
              }, [
                ctrl({
                  type: 'string',
                  description: l.search,
                  noValid: true,
                  title: 'search',
                  default: state.search,
                  update: (err, v) => {
                    if (!err && v != state.search) {
                      state.search = v
                      setTimeout(() => {
                        if (state.search == v) {
                          update()
                        }
                      }, 500)
                    }
                  }
                })
              ]),
              state.noFilter ? null : div({
                class: 'col-auto',
                dataCtx: 'filters'
              }, [
                button({
                  class: link.filter,
                  onclick: () => {
                    const f = tbl.querySelector('[data-ctx=filter]')
                    f.classList.toggle('d-none')
                    f.querySelector('[data-ctrl="field"]').setValue()
                    f.querySelector('[data-ctrl="operator"]').setValue()
                    f.querySelector('[data-ctrl="value"]').setValue()
                    f.querySelector('button[class="'+link.filter+'"]')
                      .disabled = true
                  }
                }, [
                  i({class: icon.filter}),
                  text(' '+l.filter)
                ]),
                button({
                  dataBsToggle: 'dropdown',
                  ariaExpanded: 'false',
                  class: 'dropdown-toggle dropdown-toggle-split d-none '+
                    link.filter
                }),
                ul({
                  class: 'dropdown-menu d-none'
                })
              ]),
              !hasTotals || state.noGroup ? null : div({
                class: 'col-auto'
              }, [
                button({
                  class: link.group,
                  onclick: ev => {
                    const i = ev.target.closest('button').querySelector('i')
                    if (state.group) {
                      state.group = null
                      i.setAttribute('class', icon.group)
                    } else {
                      state.group = Array.from(tbl.querySelectorAll(
                        '[data-ctx^="field:"].text-'+rawlink.group
                      )).reduce((G, e) => {
                        G.push(e.getAttribute('data-ctx').substr(6))
                        e.classList.add('text-reset')
                        e.classList.remove('text-'+rawlink.group)
                        return G
                      }, [])
                      i.setAttribute('class', icon.close)
                    }
                    update()
                  }
                }, [
                  i({class: icon.group}),
                  text(' '+l.group)
                ])
              ]),
              div({
                class: 'col-auto'
              }, [
                button({
                  class: link.exporter,
                  onclick: () => {
                    const name = title.toLowerCase().split(' ').join('_')+
                      '.csv'
                    const nl = '\n'
                    const sep = '\t'
                    
                    var data = ''
                    data += K.map(k => P[k].title || k).join(sep)+nl
                    data += state.rows
                      .map(row => K.map(k => F[k](row[k])).join(sep))
                      .join(nl)

                    download(data, name)
                  }
                }, [
                  i({class: icon.exporter}),
                  text(' '+l.exporter)
                ])
              ])
            ])
          ])
        ]),
        state.noFilter ? null : tr({
          dataCtx: 'filter',
          class: 'd-none',
          update: (f, run) => {
            const {field, operator, value} = state.filter
            if (run) {
              const target = f.querySelector('[data-ctrl=value]')
              if (
                field != null && operator != null &&
                S.indexOf(operator) < 0 &&
                (state.data instanceof Array)
              ) {
                const Opt = state.data.map(row => ({
                  value: row[field],
                  label: F[field](row[field])
                }))
                Opt.sort(cmp(['value']))
                target.setOptions(Opt.filter(
                  (o, i) => !i || o.value != Opt[i - 1].value
                ), {
                  type: P[field].type,
                  minLength: null
                })
              } else {
                target.setOptions(false, {
                  type: 'string',
                  minLength: 1
                })
              }
            }
            f.querySelector('button[class="'+link.filter+'"]')
              .disabled = field == null || operator == null || value == null
          }
        }, [
          th({
            class: 'text-center',
            colspan: '100%'
          }, [
            div({
              class: 'row gx-1 justify-content-center'
            }, [
              div({
                class: 'col-auto'
              }, [
                button({
                  class: link.close,
                  onclick: () => {
                    tbl.querySelector('[data-ctx=filter]')
                      .classList.add('d-none')
                  }
                }, [
                  i({class: icon.close})
                ])
              ]),
              div({
                class: 'col-auto'
              }, [
                ctrl({
                  type: 'string',
                  title: 'field',
                  noValid: true,
                  default: K[0],
                  update: (err, v, label, wrapper) => {
                    state.filter.field = err ? null : v
                    state.filter.label[0] = label
                    const f = wrapper.closest('[data-ctx=filter]')
                    if (f) {
                      f.update(f, S.indexOf(state.filter.operator) < 0)
                    }
                  }
                }).setOptions(K.map(k => ({
                  value: k,
                  label: P[k].title || k
                })))
              ]),
              div({
                class: 'col-auto'
              }, [
                ctrl({
                  type: 'string',
                  title: 'operator',
                  noValid: true,
                  default: O[0],
                  update: (err, v, label, wrapper) => {
                    const change = (S.indexOf(v) < 0) !==
                      (S.indexOf(state.filter.operator) < 0)
                    state.filter.operator = err ? null : v
                    state.filter.label[1] = label
                    const f = wrapper.closest('[data-ctx=filter]')
                    if (f) {
                      f.update(f, change)
                    }
                  }
                }).setOptions(O.map(o => ({
                  value: o,
                  label: l.operators[o]
                })))
              ]),
              div({
                class: 'col-auto'
              }, [
                ctrl({
                  type: 'string',
                  minLength: 1,
                  title: 'value',
                  noValid: true,
                  update: (err, v, label, wrapper) => {
                    state.filter.value = err ? null : v
                    state.filter.label[2] = label
                    const f = wrapper.closest('[data-ctx=filter]')
                    if (f) {
                      f.update(f)
                    }
                  }
                })
              ]),
              div({
                class: 'col-auto'
              }, [
                button({
                  class: link.filter,
                  onclick: () => {
                    const {field, operator, value} = state.filter
                    if (
                      field != null && operator != null && value != null &&
                      (value !== '' || S.indexOf(operator) < 0)
                    ) {
                      const F = copy(state.filter)
                      const n = state.filters.length
                      F.label = F.label.join(' ')
                      state.filter.label = ['', '', '']
                      state.filters.push(F)
                      tbl.querySelector('[data-ctx=filter]')
                        .classList.toggle('d-none')
                      const f = tbl.querySelector('[data-ctx=filters]')
                      const ul = f.querySelector('ul')
                      const btn = f
                        .querySelector('button[data-bs-toggle=dropdown]')
                      ul.classList.remove('d-none')
                      btn.classList.remove('d-none')
                      f.classList.add('btn-group')
                      ul.appendChild(e(({li, a, i, text}) => 
                        li({}, [
                          a({
                            class: 'dropdown-item',
                            href: 'javascript:;',
                            onclick: ev => {
                              state.filters.splice(n, 1)
                              const node = ev.target.closest('li')
                              rm(node)
                              if (!state.filters.length) {
                                ul.classList.add('d-none')
                                btn.classList.add('d-none')
                                f.classList.remove('btn-group')
                              }
                              update()
                            }
                          }, [
                            i({
                              class: icon.close
                            }),
                            text(' '+F.label)
                          ])
                        ])
                      ))
                      update()
                    }
                  }
                }, [
                  i({class: icon.filter}),
                  text(' '+l.filter)
                ])
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
            button({
              class: linkify(rawlink.check, true),
              onclick: () => {
                (state.base || []).forEach(row => {
                  row.checked = !row.checked
                })
                update()
              }
            }, [
              i({class: icon.check})
            ])
          ])
        ].concat(rowLinks.map(({icon, title}) =>
          th({
            class: 'text-center align-middle',
            dataCtx: 'groupHide'
          }, [
            icon ? i({
              class: iconify(icon)
            }) : text(title)
          ])
        )).concat(K.map(k =>
          th({
            class: 'text-center align-middle'
          }, [
            a({
              class: 'text-decoration-none text-reset',
              title: P[k].description,
              href: 'javascript:;',
              dataCtx: 'field:'+k,
              onclick: ev => {
                if (state.group == null) {
                  const a = ev.target.closest('a')
                  a.classList.toggle('text-reset')
                  a.classList.toggle('text-'+rawlink.group)
                }
              }
            }, [
              text(P[k].title)
            ]),
            text(' '),
            a({
              href: 'javascript:;',
              onclick: () => {
                state.sort = (state.sort == k ? '-' : '')+k
                update()
              }
            }, [
              i({
                dataCtx: 'sort:'+k,
                class: icon.sort
              })
            ])
          ])
        )))
      ]),
      tbody()
    ])
  )

  const update = () => {
    const x = tbl.querySelector('tbody')
    x.innerHTML = ''
    if (state.data instanceof Array) {
      state.base = run(
        search(state.search),
        filter(state.filters, F)
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

      tbl.querySelectorAll('[data-ctx^="sort:"]').forEach(i => {
        const k = i.getAttribute('data-ctx').substr(5)
        const s = state.sort
        i.setAttribute('class',
          icon['sort'+(s == k ? 'Asc' : s == '-'+k ? 'Desc' : '')]
        )
      })

      tbl.querySelectorAll('[data-ctrl="pager"]').forEach(e => {
        e.setOptions(Array(state.pages).fill().map((v, i) => ({
          value: i + 1,
          label: l.pagination(i + 1, state.pages)
        })))
        .setValue(state.page)
      })

      tbl.querySelectorAll(
        '[data-ctx="first"], [data-ctx="previous"]'
      ).forEach(btn => {
        btn.disabled = state.page <= 1
      })

      tbl.querySelectorAll(
        '[data-ctx="next"], [data-ctx="last"]'
      ).forEach(btn => {
        btn.disabled = state.page >= state.pages
      })

      tbl.querySelectorAll('[data-ctx="clear"]').forEach(e => {
        e.disabled = !state.search
      })
      tbl.querySelectorAll('[data-ctrl="search"]').forEach(e => {
        e.setValue(state.search)
      })

      tbl.querySelectorAll('[data-ctx="groupHide"]')
        .forEach(g => {
          g.classList[state.group ? 'add' : 'remove']('d-none')
        })

      const H = K.filter(
        k => state.group && state.group.indexOf(k) < 0 && T.indexOf(k) < 0 
      )
      K.forEach(k => {
        tbl.querySelectorAll(
          '[data-ctx="field:'+k+'"], [data-ctx="totals:'+k+'"]'
        ).forEach(g => {
          g.closest('th,td')
            .classList[H.indexOf(k) < 0 ? 'remove' : 'add']('d-none')
        })
      })

      const X = state.base.filter(({checked}) => checked)
      const C = X.length ? X : state.base
      tbl.querySelectorAll('[data-ctx^="totals:"]').forEach(t => {
        const k = t.getAttribute('data-ctx').substr(7)
        t.textContent = M[k] ? M[k](C.map(row => row[k])) : '' 
      })

      view.forEach(row => {
        x.appendChild(e(({tr, td, i, a, text}) =>
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
          ].concat(rowLinks.map(({link, icon, title, href}) =>
            state.group ? null : td({
              class: 'text-center align-middle'
            }, [
              a({
                class: linkify(link, true),
                title,
                href: typeof href != 'function' ?
                  interpolate(href, row) : 'javascript:;',
                onclick: typeof href != 'function' ? null : () => href(row)
              }, [
                icon ? i({
                  class: iconify(icon)
                }) : text(title)
              ])
            ])
          )).concat(K.filter(k => H.indexOf(k) < 0).map(k =>
            td({
              class: 'align-middle text-'+
                (P[k].ui == 'text' ? 'left' : 'center'),
              style: P[k].ui == 'text' ? style.text : null
            }, [
              output({
                ...P[k],
                href: state.group ? null : typeof P[k].href == 'function' ?
                  P[k].href(row) : interpolate(P[k].href, row),
                default: row[k]
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
    state.data = copy(data)
    update()
  }

  return tbl
}
