import deps from '../../dependencies.js' 

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
  value: theme == 'Default' ? deps.bootstrap.css : 
    deps.bootstrap.theme(theme.toLowerCase()),
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

const bg = [
  {value: 'text-body-secondary', label: 'Raw'},
  {value: 'text-bg-dark', label: 'Dark'},
  {value: 'text-bg-light', label: 'Light'},
  {value: 'text-bg-primary', label: 'Primary'},
  {value: 'text-bg-secondary', label: 'Secondary'},
  {value: 'text-bg-success', label: 'Success'},
  {value: 'text-bg-danger', label: 'Danger'},
  {value: 'text-bg-warning', label: 'Warning'},
  {value: 'text-bg-info', label: 'Info'}
]

const langs = [
  {value: 'en', label: 'English'},
  {value: 'pt', label: 'Português'}
]

export {themes, variants, bg, langs}
