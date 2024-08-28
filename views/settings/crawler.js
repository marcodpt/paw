import plugin from '../../src/router/plugins/active/index.js'

const getCss = nav => nav?.getAttribute('class')
  .split(' ')
  .map(css => css.trim())
  .filter(css => /^bg-[a-z]+$/.test(css) || /^navbar-[a-z]+$/.test(css))
  .join(' ') || ''

const readIcon = i => {
  const cls = i?.getAttribute('class') || ''
  const prefix = cls.startsWith('fa-brands fa-') ? '@' :
    cls.startsWith('fa-solid fa-') ? '' : false

  return prefix !== false ? prefix+cls.split(' ')[1].substr(3) : ''
}

export default (home, {navLinks, buildFooter}) => {
  const rebuild = (doc, {
    page,
    logo,
    navbar,
    foot
  }) => {
    [doc.body, home].forEach(e => {
      e.querySelectorAll('[data-paw-text=title]').forEach(e => {
        e.textContent = page.title
      })
      e.querySelectorAll('[data-paw-text=description]').forEach(e => {
        e.textContent = page.description
      })
    })
    doc.title = page.title 
    doc.head.
      querySelector('meta[name="description"]')?.
      setAttribute('content', page.description)
    doc.head.
      querySelector('link[rel="icon"]')?.
      setAttribute('href', page.favicon)
    doc.documentElement.lang = page.lang
    doc.getElementById('theme').setAttribute('href', page.theme)
    const nav = doc.body.querySelector('nav.navbar')
    const brand = nav.querySelector('.navbar-brand')
    const img = brand?.querySelector('img')
    brand?.setAttribute('title', page.description)
    img?.setAttribute('height', logo.height)
    img?.setAttribute('alt', page.title)
    img?.setAttribute('src', logo.src)
    img?.setAttribute('class', logo.css)

    nav.setAttribute('class',
      nav.getAttribute('class').replace(getCss(nav), navbar.variant)
    )
    nav.querySelector('.navbar-collapse').innerHTML = navLinks(navbar.links)
    
    var f = doc.body.querySelector('footer')
    if (f) {
      doc.body.removeChild(f)
    }
    f = buildFooter(foot)
    if (f) {
      const target = document.createElement('div')
      target.innerHTML = f
      doc.body.appendChild(target.firstElementChild)
    }
    plugin({url: '/settings'})
  }

  const dflt = (doc) => {
    const img = doc.body.querySelector('.navbar-brand > img')
    const ref = doc.body.querySelector('footer')?.querySelector('p')

    return {
      page: {
        title: doc.title.split(' | ').pop(),
        description: doc.head.
          querySelector('meta[name="description"]')?.
          getAttribute('content'),
        lang: doc.documentElement.lang,
        favicon: doc.head.
          querySelector('link[rel="icon"]')?.
          getAttribute('href'),
        theme: doc.
          getElementById('theme')?.
          getAttribute('href')
      },
      logo: {
        src: img?.getAttribute('src'),
        height: parseInt(img?.getAttribute('height') || 0),
        css: img?.getAttribute('class')
      },
      navbar: {
        variant: getCss(doc.body.querySelector('nav.navbar')),
        links: Array.from(doc.body.
          querySelector('nav')?.
          querySelector('.navbar-collapse')?.
          querySelectorAll('li.nav-item') || []
        ).map(li => ({
          li,
          a: li.querySelector('a')
        })).map(({li, a}) => ({
          title: li.querySelector('a').textContent.trim(),
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
            title: li.textContent.trim(),
            description: a?.getAttribute('title') || '',
            icon: readIcon(a?.querySelector('i')),
            href: a?.getAttribute('href')
          }))
        }))
      },
      foot: {
        variant: doc.body.querySelector('footer')?.
          getAttribute('class')?.split(' ')[0],
        links: Array.from(doc.body.
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
        refs: Array.from(doc.body.querySelector('footer')?.
          querySelectorAll('p > span') || []
        ).map(r => ({
          description: r.querySelector('span')?.textContent || '',
          title: r.querySelector('a')?.textContent.trim() || '',
          href: r.querySelector('a')?.getAttribute('href') || '',
          logo: r.querySelector('img')?.getAttribute('src') || '',
          height: parseInt(r.querySelector('img')?.getAttribute('height') || 0),
          css: r.querySelector('img')?.getAttribute('class') || ''
        }))
      }
    }
  }

  return {rebuild, dflt}
}
