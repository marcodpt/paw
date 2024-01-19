import e from './e.js'
import rawlink from './config/link.js'
import {link, icon, linkify, iconify, interpolate, lang} from './lib.js'
import back from './tags/back.js'
import spinner from './tags/spinner.js'
import output from './tags/output.js'
import input from './tags/input.js'

export default ({
  title,
  description,
  links,
  items
}) => {
  const l = lang()
  items = items || {}
  const rowLinks = items.links || []
  const P = items.properties || {}
  const K = Object.keys(P)
  const totals = null
  const rows = []
  const pager = {
    type: 'integer',
    title: 'pagination',
    enum: [],
    noValid: true,
    update: (v, err) => {
      const d = pager.default
      if (!err && d != null && v != d && pager.change) {
        pager.change(v)
      }
    }
  }
  const searcher = {
    type: 'string',
    description: l.search,
    noValid: true,
    old: null,
    update: (v, err) => {
      searcher.old = v
      setTimeout(() => {
        if (searcher.old == v && typeof searcher.change == 'function') {
          searcher.change(v)
        }
      }, 500)
    }
  }

  const state = {}

  const tbl = e(({
    table, thead, tbody, tr, th, td, div, a, i, text, button
  }) => table({
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
      tr({
        class: 'app-pagination'
      }, [
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
              a({
                class: link.pagination+' disabled'
              }, [
                i({
                  class: icon.first
                })
              ])
            ]),
            div({
              class: 'col-auto'
            }, [
              a({
                class: link.pagination+' disabled'
              }, [
                i({
                  class: icon.previous
                })
              ])
            ]),
            div({
              class: 'col-auto'
            }, [
              input(pager)
            ]),
            div({
              class: 'col-auto'
            }, [
              a({
                class: link.pagination+' disabled'
              }, [
                i({
                  class: icon.next
                })
              ])
            ]),
            div({
              class: 'col-auto'
            }, [
              a({
                class: link.pagination+' disabled'
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
              class: 'col-auto',
              dataAppCtx: 'clear'
            }, [
              a({
                class: link.close+' disabled'
              }, [
                i({class: icon.close})
              ])
            ]),
            div({
              class: 'col-auto',
              dataAppCtx: 'search'
            }, [
              input(searcher)
            ]),
            div({
              class: 'col-auto',
              dataAppCtx: 'filter'
            }, [
              button({
                class: link.filter
              }, [
                i({class: icon.filter}),
                text(' '+l.filter)
              ])
            ]),
            div({
              class: 'col-auto',
              dataAppCtx: 'group'
            }, [
              button({
                class: link.group
              }, [
                i({class: icon.group}),
                text(' '+l.group)
              ])
            ]),
            div({
              class: 'col-auto',
              dataAppCtx: 'exporter'
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
        class: 'app-totals'
      }, [
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
            dataAppSort: k,
            href: 'javascript:;',
            class: 'd-none'
          }, [
            i({
              class: icon.sort
            })
          ])
        ])
      )))
    ]),
    tbody()
  ]))

  tbl.addEventListener('app.table', ev => {
    const {rows, totals, pagination, sort, search} = ev.detail
    var x = null

    if (pagination) {
      const {page, pages, change, first, previous, next, last} = pagination
      x = tbl.querySelector('.app-pagination').querySelectorAll('.col-auto')
      if (page <= 1 || !first) {
        x[0].querySelector('a').classList.add('disabled')
        x[0].querySelector('a').removeAttribute('href')
      } else {
        x[0].querySelector('a').classList.remove('disabled')
        x[0].querySelector('a').setAttribute('href', first)
      }
      if (page <= 1 || !previous) {
        x[1].querySelector('a').classList.add('disabled')
        x[1].querySelector('a').removeAttribute('href')
      } else {
        x[1].querySelector('a').classList.remove('disabled')
        x[1].querySelector('a').setAttribute('href', previous)
      }
      pager.default = page
      pager.change = change
      x[2].querySelector('input').dispatchEvent(
        new CustomEvent('app.input.pagination.data', {
          detail: Array(pages).fill().map((v, i) => ({
            value: i + 1,
            label: l.pagination(i + 1, pages)
          }))
        })
      )
      if (page >= pages || !next) {
        x[3].querySelector('a').classList.add('disabled')
        x[3].querySelector('a').removeAttribute('href')
      } else {
        x[3].querySelector('a').classList.remove('disabled')
        x[3].querySelector('a').setAttribute('href', next)
      }
      if (page >= pages || !last) {
        x[4].querySelector('a').classList.add('disabled')
        x[4].querySelector('a').removeAttribute('href')
      } else {
        x[4].querySelector('a').classList.remove('disabled')
        x[4].querySelector('a').setAttribute('href', last)
      }
    }

    if (search) {
      const {clear, value, change} = search
      x = tbl.querySelector('[data-app-ctx="clear"]').querySelector('a')
      x.setAttribute('href', clear)
      x.classList[value ? 'remove' : 'add']('disabled')

      x = tbl.querySelector('[data-app-ctx="search"]').querySelector('input')
      x.value = value
      searcher.change = change
    }

    tbl.querySelectorAll('[data-app-sort]').forEach(a => {
      if (sort) {
        const {status, change} = sort
        const k = a.getAttribute('data-app-sort')
        a.setAttribute('href', change(k))
        a.classList.remove('d-none')
        const i = a.querySelector('i')
        const s = status(k)
        i.setAttribute('class',
          icon['sort'+(s > 0 ? 'Asc' : s < 0 ? 'Desc' : '')]
        )
      } else {
        a.classList.add('d-none')
      }
    })

    x = tbl.querySelector('.app-totals')
    x.querySelectorAll('[data-prop]').forEach(p => {
      const k = p.getAttribute('data-prop')
      p.textContent = totals && totals[k] != null ? totals[k] : '_'
    })

    x = tbl.querySelector('tbody')
    x.innerHTML = ''
    if (rows instanceof Array) {
      rows.forEach(row => {
        x.appendChild(e(({tr, td, i, a, text}) =>
          tr({}, [
            td({
              class: 'text-center align-middle'
            }, [
              input({
                type: 'boolean',
                noValid: true,
                title: 'row:'+row.id,
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
      x.appendChild(e(({tr, td}) => tr({}, [
        td({
          class: 'text-center',
          colspan: '100%'
        }, [
          spinner()
        ])
      ])))
    }
  })

  tbl.dispatchEvent(new CustomEvent('app.table', {detail: {}}))

  return tbl
}
