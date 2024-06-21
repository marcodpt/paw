const themes = [
  "Default",
  "Cerulean",
  "Cosmo",
  "Cyborg",
  "Darkly",
  "Flatly",
  "Journal",
  "Litera",
  "Lumen",
  "Lux",
  "Materia",
  "Minty",
  "Morph",
  "Pulse",
  "Quartz",
  "Sandstone",
  "Simplex",
  "Sketchy",
  "Slate",
  "Solar",
  "Spacelab",
  "Superhero",
  "United",
  "Vapor",
  "Yeti",
  "Zephyr"
].map(theme => ({
  value: 'https://cdn.jsdelivr.net/npm/'+(theme == 'Default' ?
    'bootstrap@5.3.3/dist/css' :
    'bootswatch@5.3.3/dist/'+theme.toLowerCase()
  )+'/bootstrap.min.css',
  label: theme
}))

const variants = [
  {value: 'bg-dark navbar-dark', label: 'Dark'},
  {value: 'bg-dark navbar-light', label: 'Dark Inverted'},
  {value: 'bg-light navbar-light', label: 'Light'},
  {value: 'bg-light navbar-dark', label: 'Light Inverted'},
  {value: 'bg-primary navbar-dark', label: 'Primary'},
  {value: 'bg-primary navbar-light', label: 'Primary Inverted'},
  {value: 'bg-secondary navbar-dark', label: 'Secondary'},
  {value: 'bg-secondary navbar-light', label: 'Secondary Inverted'},
  {value: 'bg-success navbar-dark', label: 'Success'},
  {value: 'bg-success navbar-light', label: 'Success Inverted'},
  {value: 'bg-danger navbar-dark', label: 'Danger'},
  {value: 'bg-danger navbar-light', label: 'Danger Inverted'},
  {value: 'bg-warning navbar-dark', label: 'Warning'},
  {value: 'bg-warning navbar-light', label: 'Warning Inverted'},
  {value: 'bg-info navbar-dark', label: 'Info'},
  {value: 'bg-info navbar-light', label: 'Info Inverted'},
]

const langs = [
  {value: 'en', label: 'English'},
  {value: 'pt', label: 'Português'}
]

export default ({render, form, home}) => {
  const getNav = () => document.body.querySelector('nav.navbar')
  const getCss = nav => nav.getAttribute('class')
    .split(' ')
    .map(css => css.trim())
    .filter(css => /^bg-[a-z]+$/.test(css) || /^navbar-[a-z]+$/.test(css))
    .join(' ')

  const rebuild = (doc, {title, description, lang, theme, navbar}) => {
    [document.body, home].forEach(e => {
      e.querySelectorAll('[data-app-text=title]').forEach(e => {
        e.textContent = title
      })
      e.querySelectorAll('[data-app-text=description]').forEach(e => {
        e.textContent = description
      })
    })
    document.title = title
    document.documentElement.lang = lang
    document.getElementById('theme').setAttribute('href', theme)
    const nav = getNav()
    nav.setAttribute('class',
      nav.getAttribute('class').replace(getCss(nav), navbar)
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
      description: {
        title: 'Description',
        type: 'string',
        default: home
          .querySelector('[data-app-text="description"]')?.textContent
      },
      lang: {
        title: 'Lang',
        type: 'string',
        options: langs,
        default: document.documentElement.lang
      },
      theme: {
        title: 'Theme',
        type: 'string',
        options: themes,
        default: document.getElementById('theme').getAttribute('href')
      },
      navbar: {
        title: 'Navbar',
        type: 'string',
        options: variants,
        default: getCss(getNav())
      }
    },
    update: (err, Data) => err ? null : rebuild(document, Data),
    submit: ({theme, lang, title, description, navbar}) => ({
      name: 'index.html',
      data: 
`<!DOCTYPE html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="favicon.ico" sizes="any">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link id="theme" rel="stylesheet" href="${theme}">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <title>${title}</title>
  </head>
  <body>
    <nav class="navbar navbar-expand-lg ${navbar}">
      <div class="container-fluid">
        <a class="navbar-brand" href="#/" data-app-text="title">${title}</a>
        <span class="navbar-text" data-app-text="current"></span>
      </div>
    </nav>
    <main>
      <div class="container my-5">
        <h1 data-app-text="title">${title}</h1>
        <p
          class="lead text-body-secondary"
          data-app-text="description"
        >${description}</p>
      </div>
    </main>
    <script type="module" src="app.js"></script>
  </body>
</html>
`
    })
  }))
}
