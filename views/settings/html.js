import html from '../../src/node/html.js'
import deps from '../../dependencies.js' 

const getIcon = icon => 'fa-'+
  (icon.substr(0, 1) == '@' ? 'brands' : 'solid')+
  ' fa-'+
  (icon.substr(0, 1) == '@' ? icon.substr(1) : icon)

const getTarget = href => !href || href.indexOf('://') < 0 ? null :
  '_blank'

export default () => {
  const getExt = target => !target ? '' : html(({sup, i}) => sup({}, [
    i({
      class: [
        'small',
        getIcon('arrow-up-right-from-square')
      ]
    })
  ]))
  const navLinks = links => !links || !links.length ? '' : html(({
    ul, li, a, i, span, text
  }) => 
    ul({
      class: [
        'navbar-nav',
        'ms-auto'
      ]
    }, links.map(link => ({
      target: getTarget(link.href),
      ...link
    })).map(({
      target,
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
        }, children.map(child => ({
          target: getTarget(child.href),
          ...child
        })).map(({
          target,
          title,
          description,
          icon,
          href
        }) =>
          li({
            dataPawPath: target || !title ? null : title
          }, [
            a({
              href,
              target,
              class: 'dropdown-item',
              dataPawActive: target ? null : 'active',
              title: description || null
            }, [
              span({
                dataBsToggle: 'collapse',
                dataBsTarget: '.navbar-collapse.show'
              }, [
                !icon ? null : i({
                  class: getIcon(icon)
                }),
                text(title),
                getExt(target)
              ])
            ])
          ])
        ))
      ]) :
      li({
        class: 'nav-item',
        dataPawPath: target || !title ? null : title
      }, [
        a({
          href,
          target,
          class: 'nav-link',
          dataPawActive: target ? null : 'active',
          title: description || null
        }, [
          span({
            dataBsToggle: 'collapse',
            dataBsTarget: '.navbar-collapse.show'
          }, [
            !icon ? null : i({
              class: getIcon(icon)
            }),
            text(title),
            getExt(target)
          ])
        ])
      ])
    ))
  )

  const buildFooter = ({
    variant, links, refs
  }) => !refs.length && !links.length ? null : html(({
    footer, div, ul, li, a, span, img, text, i, p
  }) =>
    footer({
      class: [
        variant, 
        'mt-auto'
      ]
    }, [
      div({
        class: [
          'container',
          'pt-5',
          'pb-4'
        ]
      }, [
        !links.length ? null : ul({
          class: [
            'nav',
            'justify-content-center',
            refs.length ? 'border-bottom' : '',
            refs.length ? 'pb-3' : '',
            refs.length ? 'mb-3' : ''
          ]
        }, links.map(link => ({
          target: getTarget(link.href),
          ...link
        })).map(({
          target,
          href,
          icon,
          title,
          description
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
              target,
              title: description || null
            }, [
              !icon ? null : i({
                class: getIcon(icon)
              }),
              title,
              getExt(target)
            ])
          ])
        )),
        !refs.length ? null : p({
          class: refs.length == 1 ? 'text-center' : [
            'd-flex',
            'flex-wrap',
            'justify-content-between',
            'align-items-center'
          ]
        }, refs.map(({
          description,
          title,
          href,
          logo,
          height,
          css
        }) => 
          span({}, [
            span({}, [
              text(description)
            ]),
            a({
              href,
              target: getTarget(href),
              class: [
                'text-reset',
                'text-decoration-none'
              ]
            }, [
              img({
                height,
                class: css,
                src: logo
              }),
              text(title),
              getExt(getTarget(href))
            ])
          ])
        ))
      ])
    ])
  )

  const fullPage = ({
    page,
    logo,
    navbar,
    foot
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
    img,
    span,
    main,
    h1,
    h2,
    p,
    footer
  }) => html({
    lang: page.lang
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
      title({}, [
        text(page.title)
      ]),
      meta({
        name: 'description',
        content: page.description
      }),
      link({
        rel: 'icon',
        href: page.favicon,
        sizes: 'any'
      }),
      link(deps.fontawesome),
      link({
        id: 'theme',
        rel: 'stylesheet',
        href: page.theme
      }),
      script(deps.bootstrap.js)
    ]),
    body({
      class: 'min-vh-100 d-flex flex-column'
    }, [
      nav({
        class: [
          'navbar',
          'navbar-expand-lg',
          navbar.variant
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
                }),
                span({
                  class: 'navbar-text visible pe-none',
                  dataPawText: 'current'
                })
              ])
            ])
          ]),
          a({
            class: 'navbar-brand',
            href: '#/',
            title: page.description
          }, [
            img({
              src: logo.src,
              alt: page.title,
              height: logo.height,
              class: logo.css
            }),
            span({
              dataPawText: 'title'
            }, [
              text(page.title)
            ])
          ]),
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
            navLinks(navbar.links)
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
            text(page.title)
          ]),
          p({
            class: [
              'lead',
              'text-body-secondary'
            ],
            dataPawText: 'description'
          }, [
            text(page.description)
          ]),
          h2({}, [
            text('❤️ Features')
          ]),
          ul({}, [
            li({}, [
              text('Theme '),
              a({
                href: 'https://marcodpt.github.io/paw/#/settings'
              }, [
                text('builder')
              ]),
              text(' optimized for SEO')
            ]),
            li({}, [
              text('Built-in SPA router')
            ]),
            li({}, [
              text('No build steps, no vDom, no need to rewrite any JS library!')
            ]),
            li({}, [
              text('JSON Schema based '),
              a({
                href: 'https://marcodpt.github.io/paw/#/example/form/4'
              }, [
                text('forms')
              ])
            ]),
            li({}, [
              text('HTML to Hyperscript '),
              a({
                href: 'https://marcodpt.github.io/paw/#/converter'
              }, [
                text('converter')
              ])
            ]),
            li({}, [
              a({
                href: 'https://marcodpt.github.io/paw/#/users'
              }, [
                text('Table')
              ]),
              text(' data with great flexibility')
            ]),
            li({}, [
              a({
                href: 'https://marcodpt.github.io/paw/#/example/graph/0'
              }, [
                text('Graph')
              ])
            ]),
            li({}, [
              a({
                href: 'https://marcodpt.github.io/paw/#/example/chart/0'
              }, [
                text('Chart')
              ])
            ]),
            li({}, [
              a({
                href: 'https://marcodpt.github.io/paw/#/example/barcode/0'
              }, [
                text('Barcode')
              ])
            ]),
            li({}, [
              a({
                href: 'https://marcodpt.github.io/paw/#/example/map/1'
              }, [
                text('Maps')
              ])
            ]),
          ])
        ])
      ]),
      buildFooter(foot),
      script({
        type: 'module',
        src: 'app.js'
      })
    ])
  ]))

  return {navLinks, buildFooter, fullPage}
}
