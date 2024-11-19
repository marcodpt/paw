import {themes, variants, bg, langs} from './options.js'
import templates from './html.js'
import crawler from './crawler.js'

export default ({render, form, home, html}) => {
  const {fullPage, ...extra} = templates(html)
  const {rebuild, dflt} = crawler(home, extra)
  var doc = document

  const setView = () => render(form({
    css: 'container my-5',
    icon: 'cog',
    title: 'Settings',
    description: 'Setup your preferences!',
    type: 'object',
    align: 'block',
    properties: {
      file: {
        title: 'Import HTML',
        type: 'string',
        ui: 'file'
      },
      page: {
        title: '',
        type: 'object',
        properties: {
          title: {
            title: 'Title',
            type: 'string',
            minLength: 1
          },
          description: {
            title: 'Description',
            type: 'string'
          },
          lang: {
            title: 'Lang',
            type: 'string',
            options: langs
          },
          favicon: {
            title: 'Favicon',
            type: 'string'
          },
          theme: {
            title: 'Theme',
            type: 'string',
            options: themes
          },
        }
      },
      logo: {
        title: 'Logo',
        type: 'object',
        properties: {
          src: {
            title: 'URL',
            type: 'string'
          },
          height: {
            title: 'Height (px)',
            type: 'integer',
            minimum: 0
          },
          css: {
            title: 'Class',
            type: 'string'
          }
        }
      },
      navbar: {
        title: 'Navbar',
        type: 'object',
        properties: {
          variant: {
            title: 'Variant',
            type: 'string',
            options: variants
          },
          links: {
            title: 'Links',
            size: 'sm',
            items: {
              properties: {
                icon: {
                  title: 'Icon',
                  type: 'string',
                  ui: 'icon'
                },
                title: {
                  title: 'Title',
                  type: 'string'
                }, 
                description: {
                  title: 'Description',
                  type: 'string'
                }, 
                href: {
                  title: 'Href attribute',
                  type: 'string'
                },
                children: {
                  title: 'Items',
                  items: {
                    properties: {
                      icon: {
                        title: 'Icon',
                        type: 'string',
                        ui: 'icon'
                      },
                      title: {
                        title: 'Title',
                        type: 'string'
                      }, 
                      description: {
                        title: 'Description',
                        type: 'string'
                      }, 
                      href: {
                        title: 'Href attribute',
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      foot: {
        title: 'Footer',
        type: 'object',
        properties: {
          variant: {
            title: 'Variant',
            type: 'string',
            options: bg
          },
          links: {
            title: 'Links',
            size: 'sm',
            items: {
              properties: {
                icon: {
                  title: 'Icon',
                  type: 'string',
                  ui: 'icon'
                },
                title: {
                  title: 'Title',
                  type: 'string'
                }, 
                description: {
                  title: 'Description',
                  type: 'string'
                }, 
                href: {
                  title: 'Href attribute',
                  type: 'string'
                }
              }
            }
          },
          refs: {
            size: 'sm',
            title: 'References',
            items: {
              properties: {
                description: {
                  title: 'Description',
                  type: 'string'
                },
                title: {
                  title: 'Title',
                  type: 'string'
                },
                href: {
                  title: 'Href attribute',
                  type: 'string'
                },
                logo: {
                  title: 'Logo (URL)',
                  type: 'string'
                },
                height: {
                  title: 'Height (px)',
                  description: 'Logo height',
                  type: 'integer',
                  minimum: 0
                },
                css: {
                  title: 'Class',
                  description: 'Logo class',
                  type: 'string'
                }
              }
            }
          }
        }
      }
    },
    default: dflt(doc),
    update: (err, {file, ...Data}) => {
      if (file) {
        const parser = new DOMParser()
        doc = parser.parseFromString(file, "text/html")
        setView()
      } else if (!err) {
        rebuild(document, Data)
      }
    },
    download: 'index.html',
    mime: 'text/html',
    submit: fullPage,
    links: [
      {
        icon: 'download',
        href: 'submit',
        title: 'Save HTML'
      }
    ]
  }))

  return setView()
}
