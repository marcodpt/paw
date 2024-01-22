import e from './e.js'
import rawlink from './config/link.js'
import {copy, link, icon, linkify, iconify, interpolate, lang} from './lib.js'
import back from './tags/back.js'
import spinner from './tags/spinner.js'
import output from './tags/output.js'
import input from './tags/input.js'

const run = (...F) => data => F.reduce((data, F) => F(data), data)

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

const pager = p => data => data.slice((p - 1) * 10, p * 10)

const search = match => data => {
  if (match) {
    data = data.filter(row => Object.keys(row).reduce((pass, k) =>
      pass || String(row[k]).toLowerCase().indexOf(match.toLowerCase()) >= 0
    , false))
  }
  return data
}

export default ({
  title,
  description,
  links,
  items,
  ...schema
}) => {
  const l = lang()
  items = items || {}
  const rowLinks = items.links || []
  const P = items.properties || {}
  const K = Object.keys(P)

  const state = {
    data: copy(schema.default || null),
    rows: null,
    search: '',
    sort: null,
    page: 1,
    pages: 1
  }

  const tbl = e(({
    table, thead, tbody, tr, th, td, div, a, i, text, button
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
            }) => div({
              class: 'col-auto'
            }, [
              a({
                href,
                class: linkify(link)
              }, [
                i({
                  class: iconify(icon)
                }),
                text(' '),
                text(title)
              ])
            ]))))
          ])
        ]),
        tr({}, [
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
                input({
                  type: 'integer',
                  enum: [],
                  title: 'pager',
                  noValid: true,
                  update: (v, err) => {
                    if (!err && v != state.page) {
                      state.page = v
                      update()
                    }
                  }
                })
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
              div({
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
              div({
                class: 'col-auto',
                dataCtx: 'search'
              }, [
                input({
                  type: 'string',
                  description: l.search,
                  noValid: true,
                  title: 'search',
                  default: state.search,
                  update: (v, err) => {
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
              div({
                class: 'col-auto'
              }, [
                button({
                  class: link.filter,
                  onclick: () => {
                    tbl.querySelector('[data-ctx=filter]')
                      .classList.toggle('d-none')
                  }
                }, [
                  i({class: icon.filter}),
                  text(' '+l.filter)
                ])
              ]),
              div({
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
                      console.log(state.group)
                    }
                    tbl.querySelectorAll('[data-ctx="groupHide"]')
                      .forEach(g => {
                        g.classList[state.group ? 'add' : 'remove']('d-none')
                      })
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
                  class: link.exporter
                }, [
                  i({class: icon.exporter}),
                  text(' '+l.exporter)
                ])
              ])
            ])
          ])
        ]),
        tr({
          dataCtx: 'filter',
          class: 'd-none'
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
                input({
                  type: 'string',
                  title: 'field',
                  noValid: true
                })
              ]),
              div({
                class: 'col-auto'
              }, [
                input({
                  type: 'string',
                  title: 'operator',
                  noValid: true
                })
              ]),
              div({
                class: 'col-auto'
              }, [
                input({
                  type: 'string',
                  title: 'value',
                  noValid: true
                })
              ]),
              div({
                class: 'col-auto'
              }, [
                button({
                  class: link.filter,
                  onclick: () => {
                    tbl.querySelector('[data-ctx=filter]')
                      .classList.toggle('d-none')
                  }
                }, [
                  i({class: icon.filter}),
                  text(' '+l.filter)
                ])
              ])
            ])
          ])
        ]),
        tr({}, [
          td({
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
          }, [
            text('_')
          ])
        ))),
        tr({}, [
          th({
            class: 'text-center align-middle',
            dataCtx: 'groupHide'
          }, [
            button({
              class: linkify(rawlink.check, true),
              onclick: () => {
                (state.rows || []).forEach(row => {
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
      state.rows = run(
        search(state.search),
        sort([state.sort || 'id'])
      )(state.data)
      state.pages = Math.ceil(state.rows.length / 10) || 1
      if (state.page > state.pages) {
        state.page = state.pages
      } else if (state.page < 1) {
        state.page = 1
      }
      const view = run(pager(state.page))(state.rows)

      tbl.querySelectorAll('[data-ctx^="sort:"]').forEach(i => {
        const k = i.getAttribute('data-ctx').substr(5)
        const s = state.sort
        i.setAttribute('class',
          icon['sort'+(s == k ? 'Asc' : s == '-'+k ? 'Desc' : '')]
        )
      })

      tbl.querySelector('[data-ctx="pager"]').querySelector('[name=pager]')
        .setOptions(Array(state.pages).fill().map((v, i) => ({
            value: i + 1,
            label: l.pagination(i + 1, state.pages)
          })), state.page)

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

      tbl.querySelector('[data-ctx="clear"]').disabled = !state.search
      tbl.querySelector('[data-ctx="search"]')
        .querySelector('[name=search]').setValue(state.search)

      console.log(state.rows.filter(({checked}) => checked).length)

      view.forEach(row => {
        x.appendChild(e(({tr, td, i, a, text}) =>
          tr({}, [
            td({
              class: 'text-center align-middle',
              dataCtx: 'groupHide'
            }, [
              input({
                type: 'boolean',
                noValid: true,
                default: !!row.checked,
                update: v => {
                  if (!!row.checked !== v) {
                    row.checked = v
                    update()
                  }
                }
              })
            ])
          ].concat(rowLinks.map(({link, icon, href}) =>
            td({
              class: 'text-center align-middle',
              dataCtx: 'groupHide'
            }, [
              a({
                class: linkify(link, true),
                href: interpolate(href, row)
              }, [
                icon ? i({
                  class: iconify(icon)
                }) : text(title)
              ])
            ])
          )).concat(K.map(k =>
            td({
              class: 'align-middle text-center'
            }, [
              output({
                ...P[k],
                href: interpolate(P[k].href, row),
                default: row[k]
              })
            ])
          )))
        ))
      })
    } else {
      state.rows = null
      x.appendChild(e(({tr, td}) =>
        tr({}, [
          td({
            class: 'text-center p-5',
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
