import ctrl from '../src/ctrl/index.js'

const update = (err, v) => {
            console.log(err)
            console.log(v)
          }
const d = new Date()
export default ({
  icon: 'pencil',
  title: 'input',
  description: 'Form inputs.',
  component: ctrl,
  properties: {},
  examples: [
    {
      title: 'Raw Boolean',
      data: [
        {
          type: 'boolean',
          default: true,
          update
        }
      ]
    }, {
      title: 'Raw String',
      data: [
        {
          type: 'string',
          default: 'test',
          minLength: 1,
          maxLength: 5,
          update
        }
      ]
    }, {
      title: 'Raw Integer',
      data: [
        {
          type: 'integer',
          default: 7,
          update
        }
      ]
    }, {
      title: 'Raw Number',
      data: [
        {
          type: 'number',
          default: 2.7,
          update
        }
      ]
    }, {
      title: 'A currency example with precision',
      data: [
        {
          type: 'number',
          minimum: 0,
          ui: 'num.2',
          update
        }
      ]
    }, {
      title: 'Integer representing a currency',
      data: [
        {
          type: 'integer',
          ui: 'num.2',
          default: 699,
          minimum: 698,
          maximum: 710,
          update
        }
      ]
    }, {
      title: 'A boolean with integer type',
      data: [
        {
          type: 'integer',
          ui: 'bool',
          default: 1,
          update
        }
      ]
    }, {
      title: 'A date string using ISO dates',
      data: [
        {
          type: 'string',
          ui: 'date',
          default: d.toISOString().substr(0, 10),
          minimum: d.getFullYear()+'-'+('0'+(d.getMonth() + 1)).slice(-2)+'-01',
          update
        }
      ]
    }, {
      title: 'A date integer using Unix timestamp',
      data: [
        {
          type: 'integer',
          ui: 'date',
          default: Math.round(d.getTime() / 1000),
          minimum: (d.getTime() - 24 * 60 * 60 * 1000) / 1000,
          maximum: (d.getTime() + 7 * 24 * 60 * 60 * 1000) / 1000,
          update
        }
      ]
    }, {
      title: 'A multiline text string',
      data: [
        {
          type: 'string',
          ui: 'text',
          default: 'Text is used for store multiline text!\nAs you can see it!',
          minLength: 1,
          update
        }
      ]
    }, {
      title: 'A password string',
      data: [
        {
          type: 'string',
          ui: 'password',
          default: 'secret',
          minLength: 5,
          maxLength: 10,
          update
        }
      ]
    }, {
      title: 'An array of files',
      data: [
        {
          type: 'array',
          ui: 'file',
          update
        }
      ]
    }, {
      title: 'Raw FileList',
      data: [
        {
          ui: 'file',
          type: 'FileList',
          update
        }
      ]
    }, {
      title: 'Bootstrap btn string',
      data: [
        {
          type: 'string',
          ui: 'link',
          default: 'primary',
          update
        }
      ]
    }, {
      title: 'FontAwesome icon string',
      data: [
        {
          type: 'string',
          ui: 'icon',
          default: 'check',
          update
        }
      ]
    }, {
      title: 'Bootstrap navbar class string',
      data: [
        {
          type: 'string',
          ui: 'navbar',
          default: 'Dark',
          update
        }
      ]
    }, {
      title: 'Bootswatch theme string',
      data: [
        {
          type: 'string',
          ui: 'theme',
          default: 'Simplex',
          update
        }
      ]
    }, {
      title: 'Lang string',
      data: [
        {
          type: 'string',
          ui: 'lang',
          default: 'pt',
          update
        }
      ]
    }, {
      title: 'UI string',
      data: [
        {
          type: 'string',
          ui: 'ui',
          default: 'ui',
          update
        }
      ]
    }
  ]
})
