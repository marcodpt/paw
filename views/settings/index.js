import {themes, variants, bg, langs} from './options.js'
import templates from './html.js'
import crawler from './crawler.js'

export default ({render, form, home, html}) => {
  const {fullPage, ...extra} = templates(html)
  const {rebuild, dflt} = crawler(home, extra)

  return render(form({
    css: 'container my-5',
    icon: 'cog',
    title: 'Settings',
    description: 'Setup your preferences!',
    type: 'object',
    block: true,
    properties: {
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
          }
        }
      },
      dev: {
        title: 'Developer',
        type: 'object',
        properties: {
          show: {
            title: 'Show',
            type: 'boolean'
          },
          intro: {
            title: 'Intro',
            type: 'string'
          },
          company: {
            title: 'Company',
            type: 'string'
          },
          website: {
            title: 'WebSite (URL)',
            type: 'string'
          },
          logo: {
            title: 'Logo (URL)',
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
      }
    },
    default: dflt,
    update: (err, Data) => err ? null : rebuild(Data),
    download: 'index.html',
    mime: 'text/html',
    submit: fullPage
  }))
}
