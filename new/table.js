import e from './e.js'
import lang from './lang.js'
import links from './links.js'
import icons from './icons.js'
import {linkify, iconify, interpolate} from './lib.js'
import {back} from './tags.js'

export default ({
  title,
  description,
  links,
  page,
  pages,
  fields,
  totals,
  rowLinks,
  rows
}) => {
  const l = lang()

  return e(({
    table, thead, tbody, tr, th, td, div, a
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
      !page ? null : tr({}, [
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
                class: linkify(links.pagination),
                href: page <= 1 ? null : goto({
                  _page: 1
                }),
                disabled: page <= 1
              }, [
                i({
                  class: iconify(icons.first)
                })
              ])
            ]),
            div({
              class: 'col-auto'
            }, [
              a({
                class: linkify(links.pagination),
                href: page <= 1 ? null : goto({
                  _page: page - 1
                }),
                disabled: page <= 1
              }, [
                i({
                  class: iconify(icons.previous)
                })
              ])
            ]),
            div({
              class: 'col-auto'
            }, [
              text(l.pagination(page, pages))
            ]),
            div({
              class: 'col-auto'
            }, [
              a({
                class: linkify(links.pagination),
                href: page >= pages ? null : goto({
                  _page: page + 1
                }),
                disabled: page >= pages
              }, [
                i({
                  class: iconify(icons.next)
                })
              ])
            ]),
            div({
              class: 'col-auto'
            }, [
              a({
                class: linkify(links.pagination),
                href: page >= pages ? null : goto({
                  _page: pages
                }),
                disabled: page >= pages
              }, [
                i({
                  class: iconify(icons.last)
                })
              ])
            ])
          ])
        ])
      ]),
      !totals ? null : tr({}, []
        .concat(rowLinks.map(() => td()))
        .concat(fields.map(({name}) => td({
          class: 'text-center align-middle'
        }, [
          text(totals[name])
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
        .concat(fields.map(({title, description}) => th({
          class: 'text-center align-middle'
        }, [
          a({
            class: 'text-decoration-none',
            title: description
          }, [
            text(title)
          ])
        ])))
      )
    ]),
    tbody({}, []
      .concat(rows.map(row => tr({
        title: row.info
      }, []
        .concat(rowLinks.map(({link, icon, href}) => td({
          class: 'text-center align-middle'
        }, [
          a({
            class: linkify(link, true),
            href: interpolate(href, row.data)
          }, [
            icon ? i({
              class: iconify(icon)
            }) : text(title)
          ])
        ])))
        .concat(fields.map(({name}) => td({
          class: 'align-middle text-center'
        }, [
          text(row[name])
        ])))
      )))
    )
  ]))
}
