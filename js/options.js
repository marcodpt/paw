import {setOptions} from './lib.js'
const bootswatch = Themes => Themes.map(theme => ({
  value: 'https://cdn.jsdelivr.net/npm/'+(theme == 'Default' ?
    'bootstrap@5.3.2/dist/css' :
    'bootswatch@5.3.2/dist/'+theme.toLowerCase()
  )+'/bootstrap.min.css',
  label: theme
}))

export default {
  ui: setOptions([
    '',
    'date',
    'bool',
    'text',
    'info',
    'num.1',
    'num.2',
    'num.3',
    'fixed:2',
    'fixed:3',
    'fixed:4',
    'fixed:5',
    'fixed:6',
    'fixed:7',
    'fixed:8',
    'fixed:9',
    'password',
    'file',
    'link',
    'icon',
    'navbar',
    'theme',
    'lang',
    'ui'
  ]),
  link: setOptions([
    '',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark'
  ]),
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
  theme: bootswatch([
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
  ]),
  lang: [
    {value: 'en', label: 'English'},
    {value: 'pt', label: 'Português'}
  ]
}
