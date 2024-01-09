import e from './e.js'
import {link, icon, linkify, iconify, interpolate, lang} from './lib.js'
import back from './tags/back.js'
import spinner from './tags/spinner.js'
import output from './tags/output.js'

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

  const tbl = e(({
    table, thead, tbody, tr, th, td, div, a, i, text
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
              text(l.loading)
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
      tr({
        class: 'app-totals'
      }, []
        .concat(rowLinks.map(() => td()))
        .concat(K.map(k => td({
          class: 'text-center align-middle',
          dataProp: k
        }, [
          text('_')
        ])))
      ),
      tr({}, []
        .concat(rowLinks.map(({icon, title}) => th({
          class: 'text-center align-middle'
        }, [
          icon ? i({
            class: iconify(icon)
          }) : text(title)
        ])))
        .concat(K.map(k => th({
          class: 'text-center align-middle'
        }, [
          a({
            class: 'text-decoration-none',
            title: P[k].description
          }, [
            text(P[k].title)
          ])
        ])))
      )
    ]),
    tbody()
  ]))

  tbl.addEventListener('app.table', ev => {
    const {rows, totals, pagination} = ev.detail
    var x = null

    if (pagination) {
      const {page, pages, first, previous, next, last} = pagination
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
      x[2].textContent = l.pagination(page, pages)
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

    x = tbl.querySelector('.app-totals')
    x.querySelectorAll('[data-prop]').forEach(p => {
      const k = p.getAttribute('data-prop')
      p.textContent = totals && totals[k] != null ? totals[k] : '_'
    })

    x = tbl.querySelector('tbody')
    x.innerHTML = ''
    if (rows instanceof Array) {
      rows.forEach(row => {
        x.appendChild(e(({tr, td, i, a, text}) => tr({}, []
          .concat(rowLinks.map(({link, icon, href}) => td({
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
          ])))
          .concat(K.map(k => td({
            class: 'align-middle text-center'
          }, [
            output({
              ...P[k],
              href: interpolate(P[k].href, row),
              default: row[k]
            })
          ])))
        )))
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
