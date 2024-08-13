import deps from '../../dependencies.js' 

const getIcon = icon => 'fa-'+
  (icon.substr(0, 1) == '@' ? 'brands' : 'solid')+
  ' fa-'+
  (icon.substr(0, 1) == '@' ? icon.substr(1) : icon)

const getTarget = href => !href || href.indexOf('://') < 0 ? null :
  '_blank'

export default html => {
  const navLinks = links => !links || !links.length ? '' : html(({
    ul, li, a, i, span, text
  }) => 
    ul({
      class: [
        'navbar-nav',
        'ms-auto'
      ]
    }, links.map(({
      title,
      icon,
      description,
      href,
      children
    }) => children instanceof Array && children.length ?
      li({
        class: [
          'nav-item',
          'dropdown'
        ],
        dataPawPath: title || null
      }, [
        a({
          class: [
            'nav-link',
            'dropdown-toggle'
          ],
          dataPawActive: 'active',
          dataBsToggle: 'dropdown',
          role: 'button',
          ariaExpanded: 'false',
          title: description || null
        }, [
          !icon ? null : i({
            class: getIcon(icon)
          }),
          text(title)
        ]),
        ul({
          class: 'dropdown-menu'
        }, children.map(({
          title,
          description,
          icon,
          href
        }) => 
          li({
            dataPawPath: title || null
          }, [
            a({
              href,
              target: getTarget(href),
              class: 'dropdown-item',
              dataPawActive: 'active',
              title: description || null
            }, [
              span({
                dataBsToggle: 'collapse',
                dataBsTarget: '.navbar-collapse.show'
              }, [
                !icon ? null : i({
                  class: getIcon(icon)
                }),
                text(title)
              ])
            ])
          ])
        ))
      ]) :
      li({
        class: 'nav-item',
        dataPawPath: title || null
      }, [
        a({
          href,
          target: getTarget(href),
          class: 'nav-link',
          dataPawActive: 'active',
          title: description || null
        }, [
          span({
            dataBsToggle: 'collapse',
            dataBsTarget: '.navbar-collapse.show'
          }, [
            !icon ? null : i({
              class: getIcon(icon)
            }),
            text(title)
          ])
        ])
      ])
    ))
  )

  const footerLinks = links => links.map(({
    href,
    icon,
    title,
    description
  }) => html(({
    li, a, i, text
  }) =>
    li({
      class: 'nav-item'
    }, [
      a({
        href,
        class: [
          'nav-link',
          'px-2',
          'text-reset'
        ],
        target: getTarget(href),
        title: description || null
      }, [
        !icon ? null : i({
          class: getIcon(icon)
        }),
        title
      ])
    ])
  )).join('\n')

  const fullPage = ({
    theme,
    lang,
    pageTitle,
    description,
    navbar,
    links,
    linksFooter,
    variantFooter,
    copyright
  }) => html(({
    html,
    head,
    meta,
    link,
    script,
    title,
    text,
    body,
    nav,
    div,
    ul,
    li,
    a,
    i,
    span,
    main,
    h1,
    p,
    footer
  }) => html({
    lang: lang
  }, [
    head({}, [
      meta({
        charset: 'utf-8'
      }),
      meta({
        httpEquiv: 'x-ua-compatible',
        content: 'ie=edge'
      }),
      meta({
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }),
      link({
        rel: 'icon',
        href: 'favicon.ico',
        sizes: 'any'
      }),
      link(deps.fontawesome),
      link({
        id: 'theme',
        rel: 'stylesheet',
        href: theme
      }),
      script(deps.bootstrap.js),
      title({}, [
        text(pageTitle)
      ])
    ]),
    body({
      class: 'min-vh-100 d-flex flex-column'
    }, [
      nav({
        class: [
          'navbar',
          'navbar-expand-lg',
          navbar
        ]
      }, [
        div({
          class: 'container-fluid'
        }, [
          ul({
            class: 'navbar-nav'
          }, [
            li({
              class: 'nav-item'
            }, [
              a({
                href: '#sidebar',
                class: [
                  'nav-link',
                  'invisible'
                ],
                dataBsToggle: 'offcanvas',
                role: 'button',
                ariaControls: 'sidebar'
              }, [
                i({
                  class: [
                    'fa-solid',
                    'fa-bars'
                  ]
                })
              ])
            ])
          ]),
          a({
            class: 'navbar-brand',
            href: '#/',
            dataPawText: 'title'
          }, [
            text(pageTitle)
          ]),
          span({
            class: 'navbar-text',
            dataPawText: 'current'
          }),
          a({
            class: [
              'navbar-toggler',
              'border-0'
            ],
            dataBsToggle: 'collapse',
            dataBsTarget: '.navbar-collapse',
            role: 'button'
          }, [
            i({
              class: [
                'fa-solid',
                'fa-ellipsis-vertical'
              ]
            })
          ]),
          div({
            class: [
              'collapse',
              'navbar-collapse'
            ]
          }, [
            navLinks(links)
          ])
        ])
      ]),
      main({}, [
        div({
          class: [
            'container',
            'my-5'
          ]
        }, [
          h1({
            dataPawText: 'title'
          }, [
            text(pageTitle)
          ]),
          p({
            class: [
              'lead',
              'text-body-secondary'
            ],
            dataPawText: 'description'
          }, [
            text(description)
          ])
        ])
      ]),
      footer({
        class: [
          variantFooter, 
          'mt-auto'
        ]
      }, [
        div({
          class: [
            'container',
            'py-5'
          ]
        }, [
          ul({
            class: [
              'nav',
              'justify-content-center',
              'border-bottom',
              'pb-3',
              'mb-3'
            ]
          }, [
            footerLinks(linksFooter)
          ]),
          p({
            class: [
              'text-center'
            ]
          }, [
            copyright
          ])
        ])
      ]),
      script({
        type: 'module',
        src: 'app.js'
      })
    ])
  ]))

  return {navLinks, footerLinks, fullPage}
}
