const d = new Date()
export default {
  type: 'object',
  title: 'Controls Showcase',
  properties: {
    bool: {
      title: 'Boolean',
      description: 'raw boolean',
      type: 'boolean',
      default: true
    },
    string: {
      title: 'String',
      description: 'raw string',
      type: 'string',
      default: 'test',
      minLength: 1,
      maxLength: 5
    },
    integer: {
      title: 'Integer',
      description: 'raw integer',
      type: 'integer',
      default: 7
    },
    number: {
      title: 'Number',
      description: 'raw number',
      type: 'number',
      default: 2.7
    },
    currency: {
      title: 'Currency ($)',
      description: 'A currency example with precision (ui: num.2)',
      type: 'number',
      minimum: 0,
      ui: 'num.2'
    },
    intnum: {
      title: 'Integer currency ($) (ui: num.2)',
      description: 'Integer representing a currency',
      type: 'integer',
      ui: 'num.2',
      default: 699,
      minimum: 698,
      maximum: 710
    },
    boolInt: {
      title: 'Boolean Integer',
      description: 'A boolean with integer type (ui: bool)',
      type: 'integer',
      ui: 'bool',
      default: 1
    },
    dateISO: {
      title: 'Date ISO',
      description: 'A date string using ISO dates (ui: date)',
      type: 'string',
      ui: 'date',
      default: d.toISOString().substr(0, 10),
      minimum: d.getFullYear()+'-'+('0'+(d.getMonth() + 1)).slice(-2)+'-01'
    },
    dateUnix: {
      title: 'Date Unix',
      description: 'A date integer using Unix timestamp (ui: date)',
      type: 'integer',
      ui: 'date',
      default: Math.round(d.getTime() / 1000),
      minimum: (d.getTime() - 24 * 60 * 60 * 1000) / 1000,
      maximum: (d.getTime() + 7 * 24 * 60 * 60 * 1000) / 1000
    },
    text: {
      title: 'Text',
      description: 'This is a text string (ui: text)',
      type: 'string',
      ui: 'text',
      default: 'Text is used for store multiline text!\nAs you can see it!',
      minLength: 1
    },
    password: {
      title: 'Password',
      description: 'This is a password string (ui: password)',
      type: 'string',
      ui: 'password',
      default: 'secret',
      minLength: 5,
      maxLength: 10
    },
    files: {
      title: 'Files',
      description: 'This is an array of files (ui: file).\nUse type: object for single file.',
      type: 'array',
      ui: 'file'
    },
    rawfiles: {
      title: 'Raw Files',
      description: 'This is a FileList (ui: file)\nUse type: File for a single file.',
      ui: 'file',
      type: 'FileList'
    },
    link: {
      title: 'Link',
      description: 'This is a bootstrap btn string (ui: link)',
      type: 'string',
      ui: 'link',
      default: 'primary'
    },
    icon: {
      title: 'Icon',
      description: 'This is a fontawesome icon string (ui: icon)',
      type: 'string',
      ui: 'icon',
      default: 'check'
    },
    navbar: {
      title: 'Navbar',
      description: 'This is a bootstrap navbar class string (ui: navbar)',
      type: 'string',
      ui: 'navbar',
      default: 'Dark'
    },
    theme: {
      title: 'Theme',
      description: 'This is a bootswatch theme string (ui: theme)',
      type: 'string',
      ui: 'theme',
      default: 'Simplex'
    },
    lang: {
      title: 'Lang',
      description: 'This is a lang string (ui: lang)',
      type: 'string',
      ui: 'lang',
      default: 'pt'
    },
    ui: {
      title: 'UI',
      description: 'This is an ui string (ui: ui)',
      type: 'string',
      ui: 'ui',
      default: 'ui'
    }
  }
}
