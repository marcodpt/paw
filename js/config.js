import form from './form.js'

export default () => {
  const nav = document.body.querySelector('nav.navbar') 
  var css = nav.getAttribute('class')
    .split(' ')
    .map(css => css.trim())
    .filter(css => /^bg-[a-z]+$/.test(css) || /^navbar-[a-z]+$/.test(css))
    .join(' ')

  return form({
    title: 'Config',
    type: 'object',
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
        default: css
      }
    },
    update: (err, Data, name) => {
      if (err) {
        return
      }
      if (name == 'title') {
        document.body.querySelectorAll('[data-app-text=title]').forEach(e => {
          if (e.textContent == document.title) {
            e.textContent = Data[name]
          }
        })
        document.title = Data[name]
      } else if (name == 'lang') {
        document.documentElement.lang = Data[name]
      } else if (name == 'theme') {
        document.getElementById('theme').setAttribute('href', Data[name])
      } else if (name == 'navbar') {
        nav.setAttribute('class',
          nav.getAttribute('class').replace(css, Data[name])
        )
        css = Data[name]
      }
    }
  })
  return 
}
