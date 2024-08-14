const getNav = () => document.body.querySelector('nav.navbar')
const getCss = nav => nav.getAttribute('class')
  .split(' ')
  .map(css => css.trim())
  .filter(css => /^bg-[a-z]+$/.test(css) || /^navbar-[a-z]+$/.test(css))
  .join(' ')
const getFooter = () => document.body.querySelector('footer')

const readIcon = i => {
  const cls = i?.getAttribute('class') || ''
  const prefix = cls.startsWith('fa-brands fa-') ? '@' :
    cls.startsWith('fa-solid fa-') ? '' : false

  return prefix !== false ? prefix+cls.split(' ')[1].substr(3) : ''
}

export default (home, navLinks, footerLinks) => {
  const rebuild = ({
    page,
    navbar,
    foot,
  }) => {
    [document.body, home].forEach(e => {
      e.querySelectorAll('[data-paw-text=title]').forEach(e => {
        e.textContent = page.title
      })
      e.querySelectorAll('[data-paw-text=description]').forEach(e => {
        e.textContent = page.description
      })
    })
    document.title = page.title 
    document.head.
      querySelector('meta[name="description"]')?.
      setAttribute('content', page.description)
    document.head.
      querySelector('link[rel="icon"]')?.
      setAttribute('href', page.favicon)
    document.documentElement.lang = page.lang
    document.getElementById('theme').setAttribute('href', page.theme)
    const nav = getNav()
    const img = nav.querySelector('.navbar-brand > img')
    img?.setAttribute('height', navbar.height)

    nav.setAttribute('class',
      nav.getAttribute('class').replace(getCss(nav), navbar.variant)
    )
    nav.querySelector('.navbar-collapse').innerHTML = navLinks(navbar.links)
    
    const f = getFooter()
    const Css = f.getAttribute('class').split(' ')
    Css.shift()

    f.querySelector('p').innerHTML = foot.copyright
    f.querySelector('ul').innerHTML = footerLinks(foot.links)
    f.setAttribute('class', [foot.variant].concat(Css).join(' '))
  }

  const img = document.body.querySelector('.navbar-brand > img')
  const dflt = {
    page: {
      title: document.title,
      description: document.head.
        querySelector('meta[name="description"]')?.
        getAttribute('content'),
      lang: document.documentElement.lang,
      favicon: document.head.
        querySelector('link[rel="icon"]')?.
        getAttribute('href'),
      theme: document.
        getElementById('theme').
        getAttribute('href')
    },
    navbar: {
      height: parseInt(img?.height),
      variant: getCss(getNav()),
      links: Array.from(document.body.
        querySelector('nav')?.
        querySelector('.navbar-collapse')?.
        querySelectorAll('li.nav-item') || []
      ).map(li => ({
        li,
        a: li.querySelector('a')
      })).map(({li, a}) => ({
        title: li.getAttribute('data-paw-path'),
        description: a?.getAttribute('title') || '',
        icon: readIcon(a?.querySelector('i')),
        href: a?.getAttribute('href'),
        children: Array.from(li.
          querySelector('ul.dropdown-menu')?.
          querySelectorAll('li') || []
        ).map(li => ({
          li,
          a: li.querySelector('a')
        })).map(({li, a, icon}) => ({
          title: li.getAttribute('data-paw-path'),
          description: a?.getAttribute('title') || '',
          icon: readIcon(a?.querySelector('i')),
          href: a?.getAttribute('href')
        }))
      }))
    },
    foot: {
      variant: getFooter().getAttribute('class')?.split(' ')[0],
      copyright: document.body.
        querySelector('footer')?.
        querySelector('p')?.
          innerHTML.trim(),
      links: Array.from(document.body.
        querySelector('footer')?.
        querySelectorAll('li.nav-item') || []
      ).map(li => ({
        li,
        a: li.querySelector('a')
      })).map(({li, a}) => ({
        title: a?.textContent?.trim() || '',
        description: a?.getAttribute('title') || '',
        icon: readIcon(a?.querySelector('i')),
        href: a?.getAttribute('href')
      }))
    }
  }

  return {rebuild, dflt}
}
