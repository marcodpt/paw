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
  <input
    class="validate form-check-input is-valid"
    type="checkbox"
    checked=""
  >
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
    class="validate form-control is-valid"
    type="text"
    value="test"
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
    class="validate form-control is-valid"
    type="number"
    value="7"
    step="1"
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
    class="validate form-control is-valid"
    type="number"
    value="2.7"
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
    class="validate form-control is-valid"
    type="number"
    value="0.00"
    min="0.00"
    step="0.01"
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
    class="validate form-control is-valid"
    type="number"
    value="6.99"
    min="6.98"
    max="7.10"
    step="0.01"
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
    class="validate form-control is-valid"
    type="text"
    value="Yes"
    list="app.data.list"
  >
  <datalist id="app.data.list">
    <option>No</option>
    <option>Yes</option>
  </datalist>
  <div class="invalid-feedback"></div>
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
    class="validate form-control is-valid"
    type="date"
    value="${iso}"
    min="${iso_min}"
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
    class="validate form-control is-valid"
    type="date"
    value="${new Date(unix * 1000).toISOString().substr(0, 10)}"
    min="${new Date(unix_min * 1000).toISOString().substr(0, 10)}"
    max="${new Date(unix_max * 1000).toISOString().substr(0, 10)}"
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
    class="validate form-control is-valid"
    rows="6"
  >Text is used for store multiline text!\nAs you can see it!</textarea>
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
  <input
    class="validate form-control is-valid"
    type="password"
    value="secret"
  >
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
  <input
    class="validate form-control is-valid"
    type="file"
    multiple=""
  >
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'Raw FileList',
      data: [
        {
          ui: 'File',
          type: 'array',
          update
        }
      ],
      html:
`<div>
  <input
    class="validate form-control is-valid"
    type="file"
    multiple=""
  >
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
    checked=""
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
  <div class="invalid-feedback"></div>
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
    <input class="validate form-control is-valid" type="text">
  </div>
  <div class="invalid-feedback"></div>
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
    class="validate form-control is-valid"
    type="text"
    value="ui"
    list="app.data.list"
  >
  <datalist id="app.data.list">
    <option>_</option>
    <option>date</option>
    <option>bool</option>
    <option>text</option>
    <option>info</option>
    <option>num.1</option>
    <option>num.2</option>
    <option>num.3</option>
    <option>len:2</option>
    <option>len:3</option>
    <option>len:4</option>
    <option>len:5</option>
    <option>len:6</option>
    <option>len:7</option>
    <option>len:8</option>
    <option>len:9</option>
    <option>password</option>
    <option>file</option>
    <option>color</option>
    <option>progress</option>
    <option>link</option>
    <option>icon</option>
    <option>ui</option>
  </datalist>
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'Pending',
      data: [
        {
          ui: 'pending'
        }
      ],
      html:
`<div>
  <input
    class="form-control text-center"
    type="text"
    value="⏳"
    disabled=""
  >
</div>`
    }, {
      title: 'Typeahead Wrong sm',
      data: [
        {
          type: 'integer',
          options: [
            {
              value: 1,
              label: 'Dog'
            }, {
              value: 2,
              label: 'Cat'
            }, {
              value: 3,
              label: 'Bird'
            }, {
              value: 4,
              label: 'Horse'
            }
          ],
          size: 'sm',
          update
        }
      ],
      html: 
`<div>
  <input
    class="validate form-control form-control-sm is-invalid"
    type="text"
    value="0"
    list="app.data.list"
  >
  <datalist id="app.data.list">
    <option>Dog</option>
    <option>Cat</option>
    <option>Bird</option>
    <option>Horse</option>
  </datalist>
  <div class="invalid-feedback">Must be one of the possible options.</div>
</div>`
    }, {
      title: 'Typeahead Right without valid',
      data: [
        {
          type: 'integer',
          default: 1,
          options: [
            {
              value: 1,
              label: 'Dog'
            }, {
              value: 2,
              label: 'Cat'
            }, {
              value: 3,
              label: 'Bird'
            }, {
              value: 4,
              label: 'Horse'
            }
          ],
          update,
          noValid: true
        }
      ],
      html: 
`<div>
  <input
    class="validate form-control"
    type="text"
    value="Dog"
    list="app.data.list"
  >
  <datalist id="app.data.list">
    <option>Dog</option>
    <option>Cat</option>
    <option>Bird</option>
    <option>Horse</option>
  </datalist>
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'Typeahead Right Lg',
      data: [
        {
          type: 'integer',
          default: 2,
          options: [
            {
              value: 1,
              label: 'Dog'
            }, {
              value: 2,
              label: 'Cat'
            }, {
              value: 3,
              label: 'Bird'
            }, {
              value: 4,
              label: 'Horse'
            }
          ],
          size: 'lg',
          update
        }
      ],
      html: 
`<div>
  <input
    class="validate form-control form-control-lg is-valid"
    type="text"
    value="Cat"
    list="app.data.list"
  >
  <datalist id="app.data.list">
    <option>Dog</option>
    <option>Cat</option>
    <option>Bird</option>
    <option>Horse</option>
  </datalist>
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'Typeahead Wrong single',
      data: [
        {
          type: 'integer',
          options: [
            {
              value: 1,
              label: 'Dog'
            }
          ],
          update
        }
      ],
      html: 
`<div>
  <input
    class="validate form-control is-invalid"
    type="text"
    value="0"
    list="app.data.list"
  >
  <datalist id="app.data.list">
    <option>Dog</option>
  </datalist>
  <div class="invalid-feedback">Must be one of the possible options.</div>
</div>`
    }, {
      title: 'Typeahead Wrong none',
      data: [
        {
          type: 'integer',
          options: [],
          update
        }
      ],
      html: 
`<div>
  <input
    class="validate form-control is-invalid"
    type="text"
    value="0"
    list="app.data.list"
    disabled=""
  >
  <datalist id="app.data.list">
  </datalist>
  <div class="invalid-feedback">Must be one of the possible options.</div>
</div>`
    }, {
      title: 'Typeahead right single',
      data: [
        {
          type: 'integer',
          default: 1,
          options: [
            {
              value: 1,
              label: 'Dog'
            }
          ],
          update
        }
      ],
      html: 
`<div>
  <input
    class="validate form-control is-valid"
    type="text"
    value="Dog"
    list="app.data.list"
    disabled=""
  >
  <datalist id="app.data.list">
    <option>Dog</option>
  </datalist>
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'Select',
      data: []
    }, {
      title: 'Radio',
      data: []
    }, {
      title: 'Checkbox',
      data: []
    }
  ]
})
