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
      pageTitle: {
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
      theme: {
        title: 'Theme',
        type: 'string',
        options: themes
      },
      navbar: {
        title: 'Navbar',
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
      },
      linksFooter: {
        title: 'Footer Links',
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
      variantFooter: {
        title: 'Footer',
        type: 'string',
        options: bg
      },
      copyright: {
        title: 'Footer Note',
        type: 'string'
      }
    },
    default: dflt,
    update: (err, Data) => err ? null : rebuild(Data),
    download: 'index.html',
    mime: 'text/html',
    submit: fullPage
  }))
}
