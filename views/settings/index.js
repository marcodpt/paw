import {themes, variants, bg, langs} from './options.js'
import templates from './html.js'
import crawler from './crawler.js'

export default ({render, form, home, html}) => {
  const {navLinks, footerLinks, fullPage} = templates(html)
  const {rebuild, dflt} = crawler(home, navLinks, footerLinks)

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
      navbar: {
        title: 'Navbar',
        type: 'object',
        properties: {
          height: {
            title: 'Logo Height (px)',
            type: 'integer',
            ui: 'range'
          },
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
          copyright: {
            title: 'Note',
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
