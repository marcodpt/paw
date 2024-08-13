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
    pageTitle,
    description,
    copyright,
    lang,
    theme,
    navbar,
    links,
    linksFooter,
    variantFooter
  }) => {
    [document.body, home].forEach(e => {
      e.querySelectorAll('[data-paw-text=title]').forEach(e => {
        e.textContent = pageTitle
      })
      e.querySelectorAll('[data-paw-text=description]').forEach(e => {
        e.textContent = description
      })
    })
    document.title = pageTitle 
    document.documentElement.lang = lang
    document.getElementById('theme').setAttribute('href', theme)
    const nav = getNav()
    nav.setAttribute('class',
      nav.getAttribute('class').replace(getCss(nav), navbar)
    )
    nav.querySelector('.navbar-collapse').innerHTML = navLinks(links)
    
    const f = getFooter()
    const Css = f.getAttribute('class').split(' ')
    Css.shift()

    f.querySelector('p').innerHTML = copyright
    f.querySelector('ul').innerHTML = footerLinks(linksFooter)
    f.setAttribute('class', [variantFooter].concat(Css).join(' '))
  }

  const dflt = {
    pageTitle: document.title,
    description: home
          .querySelector('[data-paw-text="description"]')?.textContent,
    lang: document.documentElement.lang,
    theme: document.getElementById('theme').getAttribute('href'),
    navbar: getCss(getNav()),
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
    })),
    linksFooter: Array.from(document.body.
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
    })),
    variantFooter: getFooter().getAttribute('class')?.split(' ')[0],
    copyright: document.body.
      querySelector('footer')?.
      querySelector('p')?.
        innerHTML.trim()
  }

  return {rebuild, dflt}
}
