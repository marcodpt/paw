import ctrl from '../src/ctrl/index.js'

const d = new Date()
const iso = d.toISOString().substr(0, 10)
const iso_min = d.getFullYear()+'-'+('0'+(d.getMonth() + 1)).slice(-2)+'-01'
const unix = Math.round(d.getTime() / 1000)
const unix_min = (d.getTime() - 24 * 60 * 60 * 1000) / 1000
const unix_max = (d.getTime() + 7 * 24 * 60 * 60 * 1000) / 1000

const update = (err, v) => {
  console.log(err)
  console.log(v)
}
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
      ],
      html: 
`<div>
  <input type="checkbox" class="form-check-input is-valid">
  <div class="invalid-feedback"></div>
</div>`
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
      ],
      html: 
`<div>
  <input
    type="text"
    class="form-control is-valid"
  >
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'Raw Integer',
      data: [
        {
          type: 'integer',
          default: 7,
          update
        }
      ],
      html: 
`<div>
  <input
    type="number"
    step="1"
    class="form-control is-valid"
  >
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'Raw Number',
      data: [
        {
          type: 'number',
          default: 2.7,
          update
        }
      ],
      html: 
`<div>
  <input
    type="number"
    class="form-control is-valid"
  >
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'A currency example with precision',
      data: [
        {
          type: 'number',
          minimum: 0,
          ui: 'num.2',
          update
        }
      ],
      html: 
`<div>
  <input
    type="number"
    step="0.01"
    min="0.00"
    class="form-control is-valid"
  >
  <div class="invalid-feedback"></div>
</div>`
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
      ],
      html:
`<div>
  <input
    type="number"
    step="0.01"
    min="6.98"
    max="7.10"
    class="form-control is-valid"
  >
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'A boolean with integer type',
      data: [
        {
          type: 'integer',
          ui: 'bool',
          default: 1,
          update
        }
      ],
      html: 
`<div>
  <input
    type="text"
    class="form-control is-valid"
    list="app.data.list"
  >
  <div class="invalid-feedback"></div>
  <datalist id="app.data.list">
    <option value="No"></option>
    <option value="Yes"></option>
  </datalist>
</div>`
    }, {
      title: 'A date string using ISO dates',
      data: [
        {
          type: 'string',
          ui: 'date',
          default: iso,
          minimum: iso_min,
          update
        }
      ],
      html: 
`<div>
  <input
    type="date"
    min="${iso_min}"
    class="form-control is-valid"
  >
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'A date integer using Unix timestamp',
      data: [
        {
          type: 'integer',
          ui: 'date',
          default: unix,
          minimum: unix_min,
          maximum: unix_max,
          update
        }
      ],
      html:
`<div>
  <input
    type="date"
    min="${new Date(unix_min * 1000).toISOString().substr(0, 10)}"
    max="${new Date(unix_max * 1000).toISOString().substr(0, 10)}"
    class="form-control is-valid"
  >
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'A multiline text string',
      data: [
        {
          type: 'string',
          ui: 'text',
          default: 'Text is used for store multiline text!\nAs you can see it!',
          minLength: 1,
          update
        }, {
          type: 'string',
          ui: 'info',
          default: 'Text is used for store multiline text!\nAs you can see it!',
          minLength: 1,
          update
        }
      ],
      html:
`<div>
  <textarea
    class="form-control is-valid"
    rows="6"
  ></textarea>
  <div class="invalid-feedback"></div>
</div>`
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
      ],
      html:
`<div>
  <input type="password" class="form-control is-valid">
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'An array of files',
      data: [
        {
          type: 'array',
          ui: 'file',
          update
        }
      ],
      html:
`<div>
  <input type="file" class="form-control" multiple="true">
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'Raw FileList',
      data: [
        {
          ui: 'file',
          type: 'FileList',
          update
        }
      ],
      html:
`<div>
  <input type="file" class="form-control is-valid" multiple="true">
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'Bootstrap btn string',
      data: [
        {
          type: 'string',
          ui: 'link',
          default: 'primary',
          update
        }
      ],
      html:
`<div>
  <input
    type="radio"
    class="btn-check"
    id="app.radio.link"
    autocomplete="off"
    value="link"
  >
  <label class="btn btn-link me-2" for="app.radio.link">link</label>
  <input
    type="radio"
    class="btn-check"
    id="app.radio.primary"
    autocomplete="off"
    value="primary"
  >
  <label class="btn btn-primary me-2" for="app.radio.primary">primary</label>
  <input
    type="radio"
    class="btn-check"
    id="app.radio.secondary"
    autocomplete="off"
    value="secondary"
  >
  <label class="btn btn-secondary me-2" for="app.radio.secondary">secondary</label>
  <input
    type="radio"
    class="btn-check"
    id="app.radio.success"
    autocomplete="off"
    value="success"
  >
  <label class="btn btn-success me-2" for="app.radio.success">success</label>
  <input
    type="radio"
    class="btn-check"
    id="app.radio.danger"
    autocomplete="off"
    value="danger"
  >
  <label class="btn btn-danger me-2" for="app.radio.danger">danger</label>
  <input
    type="radio"
    class="btn-check"
    id="app.radio.warning"
    autocomplete="off"
    value="warning"
  >
  <label class="btn btn-warning me-2" for="app.radio.warning">warning</label>
  <input
    type="radio"
    class="btn-check"
    id="app.radio.info"
    autocomplete="off"
    value="info"
  >
  <label class="btn btn-info me-2" for="app.radio.info">info</label>
  <input
    type="radio"
    class="btn-check"
    id="app.radio.light"
    autocomplete="off"
    value="light"
  >
  <label class="btn btn-light me-2" for="app.radio.light">light</label>
  <input
    type="radio"
    class="btn-check"
    id="app.radio.dark"
    autocomplete="off"
    value="dark"
  >
  <label class="btn btn-dark me-2" for="app.radio.dark">dark</label>
</div>`
    }, {
      title: 'FontAwesome icon string',
      data: [
        {
          type: 'string',
          ui: 'icon',
          default: 'check',
          update
        }
      ],
      html: 
`<div>
  <div class="input-group">
    <span class="input-group-text"><i class="fa-solid fa-check"></i></span>
    <input type="text" class="form-control is-valid">
  </div>
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'Bootstrap navbar class string',
      data: [
        {
          type: 'string',
          ui: 'navbar',
          default: 'Dark',
          update
        }
      ],
      html: 
`<div>
  <input
    type="text"
    class="form-control is-valid"
    list="app.data.list"
  >
  <div class="invalid-feedback"></div>
  <datalist id="app.data.list">
    <option value="Dark"></option>
    <option value="Dark Inverted"></option>
    <option value="Light"></option>
    <option value="Light Inverted"></option>
    <option value="Primary"></option>
    <option value="Primary Inverted"></option>
    <option value="Secondary"></option>
    <option value="Secondary Inverted"></option>
    <option value="Success"></option>
    <option value="Success Inverted"></option>
    <option value="Danger"></option>
    <option value="Danger Inverted"></option>
    <option value="Warning"></option>
    <option value="Warning Inverted"></option>
    <option value="Info"></option>
    <option value="Info Inverted"></option>
  </datalist>
</div>`
    }, {
      title: 'Bootswatch theme string',
      data: [
        {
          type: 'string',
          ui: 'theme',
          default: 'Simplex',
          update
        }
      ],
      html: 
`<div>
  <input
    type="text"
    class="form-control is-valid"
    list="app.data.list"
  >
  <div class="invalid-feedback"></div>
  <datalist id="app.data.list">
    <option value="Default"></option>
    <option value="Cerulean"></option>
    <option value="Cosmo"></option>
    <option value="Cyborg"></option>
    <option value="Darkly"></option>
    <option value="Flatly"></option>
    <option value="Journal"></option>
    <option value="Litera"></option>
    <option value="Lumen"></option>
    <option value="Lux"></option>
    <option value="Materia"></option>
    <option value="Minty"></option>
    <option value="Morph"></option>
    <option value="Pulse"></option>
    <option value="Quartz"></option>
    <option value="Sandstone"></option>
    <option value="Simplex"></option>
    <option value="Sketchy"></option>
    <option value="Slate"></option>
    <option value="Solar"></option>
    <option value="Spacelab"></option>
    <option value="Superhero"></option>
    <option value="United"></option>
    <option value="Vapor"></option>
    <option value="Yeti"></option>
    <option value="Zephyr"></option>
  </datalist>
</div>`
    }, {
      title: 'Lang string',
      data: [
        {
          type: 'string',
          ui: 'lang',
          default: 'pt',
          update
        }
      ],
      html: 
`<div>
  <input
    type="text"
    class="form-control is-valid"
    list="app.data.list"
  >
  <div class="invalid-feedback"></div>
  <datalist id="app.data.list">
    <option value="English"></option>
    <option value="Português"></option>
  </datalist>
</div>`
    }, {
      title: 'UI string',
      data: [
        {
          type: 'string',
          ui: 'ui',
          default: 'ui',
          update
        }
      ],
      html: 
`<div>
  <input
    type="text"
    class="form-control is-valid"
    list="app.data.list"
  >
  <div class="invalid-feedback"></div>
  <datalist id="app.data.list">
    <option value="_"></option>
    <option value="date"></option>
    <option value="bool"></option>
    <option value="text"></option>
    <option value="info"></option>
    <option value="num.1"></option>
    <option value="num.2"></option>
    <option value="num.3"></option>
    <option value="len:2"></option>
    <option value="len:3"></option>
    <option value="len:4"></option>
    <option value="len:5"></option>
    <option value="len:6"></option>
    <option value="len:7"></option>
    <option value="len:8"></option>
    <option value="len:9"></option>
    <option value="password"></option>
    <option value="file"></option>
    <option value="color"></option>
    <option value="progress"></option>
    <option value="link"></option>
    <option value="icon"></option>
    <option value="navbar"></option>
    <option value="theme"></option>
    <option value="lang"></option>
    <option value="ui"></option>
  </datalist>
</div>`
    }
  ]
})
