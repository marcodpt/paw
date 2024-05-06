import T from '../lang/index.js'

const UI = {
  bool: [
    {value: 0, label: T('boolFalse')},
    {value: 1, label: T('boolTrue')}
  ],
  lang: [
    {value: 'en', label: 'English'},
    {value: 'pt', label: 'Português'}
  ],
  link: [
    'link',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark'
  ],
  ui: [
    '',
    'date',
    'bool',
    'text',
    'info',
    'num.1',
    'num.2',
    'num.3',
    'len:2',
    'len:3',
    'len:4',
    'len:5',
    'len:6',
    'len:7',
    'len:8',
    'len:9',
    'password',
    'file',
    'color',
    'progress',
    'link',
    'icon',
    'navbar',
    'theme',
    'lang',
    'ui'
  ],
  navbar: [
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
  ],
  theme: [
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
      'bootstrap@5.3.2/dist/css' :
      'bootswatch@5.3.2/dist/'+theme.toLowerCase()
    )+'/bootstrap.min.css',
    label: theme
  }))
}

const toOpt = V => !(V instanceof Array) ? null :
  V.map(v => typeof v == 'object' ? v : ({
    value: v,
    label: v != null && String(v) ? String(v) : '_'
  }))

export default (K, raw) => raw ? UI[K] :
  toOpt(K) || toOpt(UI[K])
