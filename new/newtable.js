import e from './e.js'
import rawlink from './config/link.js'
import {link, icon, linkify, iconify, interpolate, lang} from './lib.js'
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
    data: schema.default,
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
                class: 'col-auto'
              }, [
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
                a({
                  class: link.close+' disabled'
                }, [
                  i({class: icon.close})
                ])
              ]),
              div({
                class: 'col-auto'
              }, [
                //input(searcher)
              ]),
              div({
                class: 'col-auto'
              }, [
                button({
                  class: link.filter
                }, [
                  i({class: icon.filter}),
                  text(' '+l.filter)
                ])
              ]),
              div({
                class: 'col-auto'
              }, [
                button({
                  class: link.group
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
        tr({}, [
          td()
        ].concat(rowLinks.map(() =>
          td()
        )).concat(K.map(k =>
          td({
            class: 'text-center align-middle',
            dataProp: k
          }, [
            text('_')
          ])
        ))),
        tr({}, [
          th({
            class: 'text-center align-middle'
          }, [
            button({
              class: linkify(rawlink.check, true)
            }, [
              i({class: icon.check})
            ])
          ])
        ].concat(rowLinks.map(({icon, title}) =>
          th({
            class: 'text-center align-middle'
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
              title: P[k].description
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
      state.pages = Math.ceil(run(
      )(state.data).length / 10) || 1
      if (state.page > state.pages) {
        state.page = state.pages
      } else if (state.page < 1) {
        state.page = 1
      }
      const rows = run(
        sort([state.sort || 'id']), 
        pager(state.page)
      )(state.data)

      tbl.querySelectorAll('[data-ctx^="sort:"]').forEach(i => {
        const k = i.getAttribute('data-ctx').substr(5)
        const s = state.sort
        i.setAttribute('class',
          icon['sort'+(s == k ? 'Asc' : s == '-'+k ? 'Desc' : '')]
        )
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

      rows.forEach(row => {
        x.appendChild(e(({tr, td, i, a, text}) =>
          tr({}, [
            td({
              class: 'text-center align-middle'
            }, [
              input({
                type: 'boolean',
                noValid: true,
                update: () => {

                }
              })
            ])
          ].concat(rowLinks.map(({link, icon, href}) =>
            td({
              class: 'text-center align-middle'
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
    state.data = data
    update()
  }

  return tbl
}
