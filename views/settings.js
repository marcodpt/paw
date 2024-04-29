import {download} from './lib.js'

export default ({render, form}) => {
  const getNav = doc => doc.body.querySelector('nav.navbar')
  const getCss = nav => nav.getAttribute('class')
    .split(' ')
    .map(css => css.trim())
    .filter(css => /^bg-[a-z]+$/.test(css) || /^navbar-[a-z]+$/.test(css))
    .join(' ')

  const rebuild = (doc, Data) => {
    doc.body.querySelectorAll('[data-app-text=title]').forEach(e => {
      if (e.textContent == doc.title) {
        e.textContent = Data.title
      }
    })
    doc.title = Data.title
    doc.documentElement.lang = Data.lang
    doc.getElementById('theme').setAttribute('href', Data.theme)
    const nav = getNav(doc)
    nav.setAttribute('class',
      nav.getAttribute('class').replace(getCss(nav), Data.navbar)
    )
  }

  return render(form({
    css: 'container my-5',
    icon: 'cog',
    title: 'Settings',
    description: 'Setup your preferences!',
    type: 'object',
    block: true,
    properties: {
      title: {
        title: 'Title',
        type: 'string',
        default: document.title,
        minLength: 1
      },
      lang: {
        title: 'Lang',
        type: 'string',
        ui: 'lang',
        default: document.documentElement.lang
      },
      theme: {
        title: 'Theme',
        type: 'string',
        ui: 'theme',
        default: document.getElementById('theme').getAttribute('href')
      },
      navbar: {
        title: 'Navbar',
        type: 'string',
        ui: 'navbar',
        default: getCss(getNav(document))
      }
    },
    update: (err, Data) => err ? null : rebuild(document, Data),
    submit: Data => fetch(document.location.href)
      .then(response => response.text())
      .then(pageSource => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(pageSource, "text/html")
        rebuild(doc, Data)
        download(
          '<!DOCTYPE html>\n'+doc.documentElement.outerHTML,
          'index.html'
        )
      })
  }))
}
