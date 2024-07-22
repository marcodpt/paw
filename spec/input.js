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
    list="app_list_000000"
  >
  <datalist id="app_list_000000">
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
    id="app_radio_000001"
    autocomplete="off"
    value="link"
  >
  <label
    class="btn btn-link me-2"
    for="app_radio_000001"
  >link</label>
  <input
    type="radio"
    class="btn-check"
    id="app_radio_000002"
    autocomplete="off"
    value="primary"
    checked=""
  >
  <label
    class="btn btn-primary me-2"
    for="app_radio_000002"
  >primary</label>
  <input
    type="radio"
    class="btn-check"
    id="app_radio_000003"
    autocomplete="off"
    value="secondary"
  >
  <label
    class="btn btn-secondary me-2"
    for="app_radio_000003"
  >secondary</label>
  <input
    type="radio"
    class="btn-check"
    id="app_radio_000004"
    autocomplete="off"
    value="success"
  >
  <label
    class="btn btn-success me-2"
    for="app_radio_000004"
  >success</label>
  <input
    type="radio"
    class="btn-check"
    id="app_radio_000005"
    autocomplete="off"
    value="danger"
  >
  <label
    class="btn btn-danger me-2"
    for="app_radio_000005"
  >danger</label>
  <input
    type="radio"
    class="btn-check"
    id="app_radio_000006"
    autocomplete="off"
    value="warning"
  >
  <label
    class="btn btn-warning me-2"
    for="app_radio_000006"
  >warning</label>
  <input
    type="radio"
    class="btn-check"
    id="app_radio_000007"
    autocomplete="off"
    value="info"
  >
  <label
    class="btn btn-info me-2"
    for="app_radio_000007"
  >info</label>
  <input
    type="radio"
    class="btn-check"
    id="app_radio_000008"
    autocomplete="off"
    value="light"
  >
  <label
    class="btn btn-light me-2"
    for="app_radio_000008"
  >light</label>
  <input
    type="radio"
    class="btn-check"
    id="app_radio_000009"
    autocomplete="off"
    value="dark"
  >
  <label
    class="btn btn-dark me-2"
    for="app_radio_000009"
  >dark</label>
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
    <input class="validate form-control is-valid" type="text" value="check">
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
    list="app_list_000000"
  >
  <datalist id="app_list_000000">
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
    list="app_list_000000"
  >
  <datalist id="app_list_000000">
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
    list="app_list_000000"
  >
  <datalist id="app_list_000000">
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
    list="app_list_000000"
  >
  <datalist id="app_list_000000">
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
    list="app_list_000000"
  >
  <datalist id="app_list_000000">
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
    list="app_list_000000"
    disabled=""
  >
  <datalist id="app_list_000000">
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
    list="app_list_000000"
    disabled=""
  >
  <datalist id="app_list_000000">
    <option>Dog</option>
  </datalist>
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'Select Wrong sm',
      data: [
        {
          type: 'integer',
          ui: 'select',
          description: 'Choose one option!',
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
  <select
    class="validate form-control form-control-sm is-invalid"
  >
    <option value="1">Dog</option>
    <option value="2">Cat</option>
    <option value="3">Bird</option>
    <option value="4">Horse</option>
    <option value="0" disabled="" selected="">Choose one option!</option>
  </select>
  <div class="invalid-feedback">Must be one of the possible options.</div>
</div>`
    }, {
      title: 'Select Right without valid',
      data: [
        {
          type: 'integer',
          ui: 'select',
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
  <select
    class="validate form-control"
  >
    <option value="1" selected="">Dog</option>
    <option value="2">Cat</option>
    <option value="3">Bird</option>
    <option value="4">Horse</option>
  </select>
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'Select Right Lg',
      data: [
        {
          type: 'integer',
          ui: 'select',
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
  <select class="validate form-control form-control-lg is-valid">
    <option value="1">Dog</option>
    <option value="2" selected="">Cat</option>
    <option value="3">Bird</option>
    <option value="4">Horse</option>
  </select>
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'Select Wrong single',
      data: [
        {
          type: 'integer',
          ui: 'select',
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
  <select class="validate form-control is-invalid">
    <option value="1">Dog</option>
    <option value="0" disabled="" selected="">0</option>
  </select>
  <div class="invalid-feedback">Must be one of the possible options.</div>
</div>`
    }, {
      title: 'Select Wrong none',
      data: [
        {
          type: 'integer',
          ui: 'select',
          options: [],
          update
        }
      ],
      html: 
`<div>
  <select
    class="validate form-control is-invalid"
    disabled=""
  >
    <option value="0" disabled="" selected="">0</option>
  </select>
  <div class="invalid-feedback">Must be one of the possible options.</div>
</div>`
    }, {
      title: 'Select right single',
      data: [
        {
          type: 'integer',
          ui: 'select',
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
  <select
    class="validate form-control is-valid"
    disabled=""
  >
    <option value="1" selected="">Dog</option>
  </select>
  <div class="invalid-feedback"></div>
</div>`
    }, {
      title: 'Radio Wrong sm',
      data: [
        {
          type: 'integer',
          ui: 'radio',
          description: 'Choose one option!',
          maximum: 2,
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
  <div class="form-check">
    <input 
      class="form-check-input"
      type="radio"
      name="app_radio_000001"
      value="1"
      id="app_radio_000003"
    >
    <label
      class="form-check-label"
      for="app_radio_000003"
    >Dog</label>
    <div class="invalid-feedback"></div>
  </div>
  <div class="form-check">
    <input 
      class="form-check-input"
      type="radio"
      name="app_radio_000001"
      value="2"
      id="app_radio_000004"
    >
    <label
      class="form-check-label"
      for="app_radio_000004"
    >Cat</label>
    <div class="invalid-feedback"></div>
  </div>
  <div class="form-check">
    <input 
      class="form-check-input"
      type="radio"
      name="app_radio_000001"
      value="3"
      id="app_radio_000005"
    >
    <label
      class="form-check-label"
      for="app_radio_000005"
    >Bird</label>
    <div class="invalid-feedback"></div>
  </div>
  <div class="form-check">
    <input 
      class="form-check-input"
      type="radio"
      name="app_radio_000001"
      value="4"
      id="app_radio_000006"
    >
    <label
      class="form-check-label"
      for="app_radio_000006"
    >Horse</label>
    <div class="invalid-feedback"></div>
  </div>
  <div class="form-check">
    <input 
      class="validate form-check-input is-invalid"
      type="radio"
      name="app_radio_000001"
      value="0"
      id="app_radio_000002"
      checked=""
      disabled=""
    >
    <label
      class="form-check-label"
      for="app_radio_000002"
    >Choose one option!</label>
    <div class="invalid-feedback">Must be one of the possible options.</div>
  </div>
</div>`
    }, {
      title: 'Radio Right without valid',
      data: [
        {
          type: 'integer',
          ui: 'radio',
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
  <div class="form-check">
    <input 
      class="validate form-check-input"
      type="radio"
      name="app_radio_000001"
      value="1"
      id="app_radio_000003"
      checked=""
    >
    <label
      class="form-check-label"
      for="app_radio_000003"
    >Dog</label>
    <div class="invalid-feedback"></div>
  </div>
  <div class="form-check">
    <input 
      class="form-check-input"
      type="radio"
      name="app_radio_000001"
      value="2"
      id="app_radio_000004"
    >
    <label
      class="form-check-label"
      for="app_radio_000004"
    >Cat</label>
    <div class="invalid-feedback"></div>
  </div>
  <div class="form-check">
    <input 
      class="form-check-input"
      type="radio"
      name="app_radio_000001"
      value="3"
      id="app_radio_000005"
    >
    <label
      class="form-check-label"
      for="app_radio_000005"
    >Bird</label>
    <div class="invalid-feedback"></div>
  </div>
  <div class="form-check">
    <input 
      class="form-check-input"
      type="radio"
      name="app_radio_000001"
      value="4"
      id="app_radio_000006"
    >
    <label
      class="form-check-label"
      for="app_radio_000006"
    >Horse</label>
    <div class="invalid-feedback"></div>
  </div>
</div>`
    }, {
      title: 'Radio Right Lg',
      data: [
        {
          type: 'integer',
          ui: 'radio',
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
  <div class="form-check">
    <input 
      class="form-check-input"
      type="radio"
      name="app_radio_000001"
      value="1"
      id="app_radio_000003"
    >
    <label
      class="form-check-label"
      for="app_radio_000003"
    >Dog</label>
    <div class="invalid-feedback"></div>
  </div>
  <div class="form-check">
    <input 
      class="validate form-check-input is-valid"
      type="radio"
      name="app_radio_000001"
      value="2"
      id="app_radio_000004"
      checked=""
    >
    <label
      class="form-check-label"
      for="app_radio_000004"
    >Cat</label>
    <div class="invalid-feedback"></div>
  </div>
  <div class="form-check">
    <input 
      class="form-check-input"
      type="radio"
      name="app_radio_000001"
      value="3"
      id="app_radio_000005"
    >
    <label
      class="form-check-label"
      for="app_radio_000005"
    >Bird</label>
    <div class="invalid-feedback"></div>
  </div>
  <div class="form-check">
    <input 
      class="form-check-input"
      type="radio"
      name="app_radio_000001"
      value="4"
      id="app_radio_000006"
    >
    <label
      class="form-check-label"
      for="app_radio_000006"
    >Horse</label>
    <div class="invalid-feedback"></div>
  </div>
</div>`
    }, {
      title: 'Radio Wrong single',
      data: [
        {
          type: 'integer',
          ui: 'radio',
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
  <div class="form-check">
    <input 
      class="form-check-input"
      type="radio"
      name="app_radio_000001"
      value="1"
      id="app_radio_000003"
    >
    <label
      class="form-check-label"
      for="app_radio_000003"
    >Dog</label>
    <div class="invalid-feedback"></div>
  </div>
  <div class="form-check">
    <input 
      class="validate form-check-input is-invalid"
      type="radio"
      name="app_radio_000001"
      value="0"
      id="app_radio_000002"
      checked=""
      disabled=""
    >
    <label
      class="form-check-label"
      for="app_radio_000002"
    >0</label>
    <div class="invalid-feedback">Must be one of the possible options.</div>
  </div>
</div>`
    }, {
      title: 'Radio Wrong none',
      data: [
        {
          type: 'integer',
          ui: 'radio',
          options: [],
          update
        }
      ],
      html: 
`<div>
  <div class="form-check">
    <input 
      class="validate form-check-input is-invalid"
      type="radio"
      name="app_radio_000001"
      value="0"
      id="app_radio_000002"
      checked=""
      disabled=""
    >
    <label
      class="form-check-label"
      for="app_radio_000002"
    >0</label>
    <div class="invalid-feedback">Must be one of the possible options.</div>
  </div>
</div>`
    }, {
      title: 'Radio right single',
      data: [
        {
          type: 'integer',
          ui: 'radio',
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
  <div class="form-check">
    <input 
      class="validate form-check-input is-valid"
      type="radio"
      name="app_radio_000001"
      value="1"
      id="app_radio_000003"
      checked=""
    >
    <label
      class="form-check-label"
      for="app_radio_000003"
    >Dog</label>
    <div class="invalid-feedback"></div>
  </div>
</div>`
    }, {
      title: 'Checkbox Multiple',
      data: [
        {
          type: 'array',
          default: [2, 4],
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
          update
        }
      ],
      html: 
`<div>
  <div class="form-check">
    <input 
      class="validate form-check-input is-valid"
      type="checkbox"
      value="1"
      id="app_checkbox_000003"
    >
    <label
      class="form-check-label"
      for="app_checkbox_000003"
    >Dog</label>
    <div class="invalid-feedback"></div>
  </div>
  <div class="form-check">
    <input 
      class="form-check-input"
      type="checkbox"
      value="2"
      id="app_checkbox_000004"
      checked=""
    >
    <label
      class="form-check-label"
      for="app_checkbox_000004"
    >Cat</label>
    <div class="invalid-feedback"></div>
  </div>
  <div class="form-check">
    <input 
      class="form-check-input"
      type="checkbox"
      value="3"
      id="app_checkbox_000005"
    >
    <label
      class="form-check-label"
      for="app_checkbox_000005"
    >Bird</label>
    <div class="invalid-feedback"></div>
  </div>
  <div class="form-check">
    <input 
      class="form-check-input"
      type="checkbox"
      value="4"
      id="app_checkbox_000006"
      checked=""
    >
    <label
      class="form-check-label"
      for="app_checkbox_000006"
    >Horse</label>
    <div class="invalid-feedback"></div>
  </div>
</div>`
    }, {
      title: 'Switch Multiple',
      data: [
        {
          type: 'array',
          ui: 'switch',
          default: [2, 4],
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
          noValid: true,
          update
        }
      ],
      html: 
`<div>
  <div class="form-check form-switch">
    <input 
      class="validate form-check-input"
      type="checkbox"
      value="1"
      id="app_checkbox_000003"
    >
    <label
      class="form-check-label"
      for="app_checkbox_000003"
    >Dog</label>
    <div class="invalid-feedback"></div>
  </div>
  <div class="form-check form-switch">
    <input 
      class="form-check-input"
      type="checkbox"
      value="2"
      id="app_checkbox_000004"
      checked=""
    >
    <label
      class="form-check-label"
      for="app_checkbox_000004"
    >Cat</label>
    <div class="invalid-feedback"></div>
  </div>
  <div class="form-check form-switch">
    <input 
      class="form-check-input"
      type="checkbox"
      value="3"
      id="app_checkbox_000005"
    >
    <label
      class="form-check-label"
      for="app_checkbox_000005"
    >Bird</label>
    <div class="invalid-feedback"></div>
  </div>
  <div class="form-check form-switch">
    <input 
      class="form-check-input"
      type="checkbox"
      value="4"
      id="app_checkbox_000006"
      checked=""
    >
    <label
      class="form-check-label"
      for="app_checkbox_000006"
    >Horse</label>
    <div class="invalid-feedback"></div>
  </div>
</div>`
    }, {
      title: 'Pending pagination',
      data: [
        {
          ui: 'pagination'
        }
      ],
      html:
`<div class="row gx-1 justify-content-center">
  <div class="col-auto">
    <button class="btn btn-secondary disabled" type="button">
      <i class="fa-solid fa-fast-backward"></i>
    </button>
  </div>
  <div class="col-auto">
    <button class="btn btn-secondary disabled" type="button">
      <i class="fa-solid fa-step-backward"></i>
    </button>
  </div>
  <div class="col-auto">
    <div>
      <input
        class="form-control text-center"
        type="text"
        value="⏳"
        disabled=""
      >
    </div>
  </div>
  <div class="col-auto">
    <button class="btn btn-secondary disabled" type="button">
      <i class="fa-solid fa-step-forward"></i>
    </button>
  </div>
  <div class="col-auto">
    <button class="btn btn-secondary disabled" type="button">
      <i class="fa-solid fa-fast-forward"></i>
    </button>
  </div>
</div>`
    }, {
      title: 'Single page pagination lg',
      data: [
        {
          ui: 'pagination',
          description: 'Page',
          link: 'primary',
          default: 1,
          maximum: 1,
          size: 'lg',
          update
        }
      ],
      html:
`<div class="row gx-1 justify-content-center">
  <div class="col-auto">
    <button class="btn btn-primary btn-lg" type="button" disabled="">
      <i class="fa-solid fa-fast-backward"></i>
    </button>
  </div>
  <div class="col-auto">
    <button class="btn btn-primary btn-lg" type="button" disabled="">
      <i class="fa-solid fa-step-backward"></i>
    </button>
  </div>
  <div class="col-auto">
    <div>
      <input
        class="validate form-control form-control-lg is-valid"
        type="text"
        value="Page (1 / 1)"
        list="app_list_000001"
        disabled=""
      >
      <datalist id="app_list_000001">
        <option>Page (1 / 1)</option>
      </datalist>
      <div class="invalid-feedback"></div>
    </div>
  </div>
  <div class="col-auto">
    <button class="btn btn-primary btn-lg" type="button" disabled="">
      <i class="fa-solid fa-step-forward"></i>
    </button>
  </div>
  <div class="col-auto">
    <button class="btn btn-primary btn-lg" type="button" disabled="">
      <i class="fa-solid fa-fast-forward"></i>
    </button>
  </div>
</div>`
    }, {
      title: 'Multiple pages pagination sm',
      data: [
        {
          ui: 'pagination',
          minimum: -3,
          maximum: 15,
          default: 7,
          size: 'sm',
          noValid: true,
          update
        }
      ],
      html:
`<div class="row gx-1 justify-content-center">
  <div class="col-auto">
    <button class="btn btn-secondary btn-sm" type="button">
      <i class="fa-solid fa-fast-backward"></i>
    </button>
  </div>
  <div class="col-auto">
    <button class="btn btn-secondary btn-sm" type="button">
      <i class="fa-solid fa-step-backward"></i>
    </button>
  </div>
  <div class="col-auto">
    <div>
      <input
        class="validate form-control form-control-sm"
        type="text"
        value="(7 / 15)"
        list="app_list_000001"
      >
      <datalist id="app_list_000001">
        <option>(-3 / 15)</option>
        <option>(-2 / 15)</option>
        <option>(-1 / 15)</option>
        <option>(0 / 15)</option>
        <option>(1 / 15)</option>
        <option>(2 / 15)</option>
        <option>(3 / 15)</option>
        <option>(4 / 15)</option>
        <option>(5 / 15)</option>
        <option>(6 / 15)</option>
        <option>(7 / 15)</option>
        <option>(8 / 15)</option>
        <option>(9 / 15)</option>
        <option>(10 / 15)</option>
        <option>(11 / 15)</option>
        <option>(12 / 15)</option>
        <option>(13 / 15)</option>
        <option>(14 / 15)</option>
        <option>(15 / 15)</option>
      </datalist>
      <div class="invalid-feedback"></div>
    </div>
  </div>
  <div class="col-auto">
    <button class="btn btn-secondary btn-sm" type="button">
      <i class="fa-solid fa-step-forward"></i>
    </button>
  </div>
  <div class="col-auto">
    <button class="btn btn-secondary btn-sm" type="button">
      <i class="fa-solid fa-fast-forward"></i>
    </button>
  </div>
</div>`
    }, {
      title: 'Items String Large',
      data: [
        {
          items: {
            type: 'string'
          },
          default: [
            'dog',
            'cat'
          ],
          size: 'lg',
          minItems: 1,
          maxItems: 5,
          update
        }
      ], html:
`<div>
  <div class="row g-1 align-items-center justify-content-start">
    <div class="col-auto">
      <button class="btn btn-secondary btn-lg" type="button">
        <i class="fa-solid fa-minus"></i>
      </button>
    </div>
    <div class="col-auto">
      <button class="btn btn-secondary btn-lg" type="button">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  </div>
  <div class="my-3">
    <div>
      <input
        class="validate form-control form-control-lg is-valid"
        type="text"
        value="dog"
      >
      <div class="invalid-feedback"></div>
    </div>
  </div>
  <div class="my-3">
    <div>
      <input
        class="validate form-control form-control-lg is-valid"
        type="text"
        value="cat"
      >
      <div class="invalid-feedback">
      </div>
    </div>
  </div>
</div>`
    }, {
      title: 'Object Items Small',
      data: [
        {
          items: {
            title: 'Person',
            icon: 'user',
            properties: {
              name: {
                type: 'string',
                minLength: 1
              }, 
              age: {
                type: 'integer',
                default: 30
              }
            }
          },
          update,
          size: 'sm',
          noValid: true,
          default: [
            {
              name: 'john'
            }
          ]
        }
      ], html:
`<div>
  <div class="row g-1 align-items-center justify-content-start">
    <div class="col-auto">
      <button class="btn btn-secondary btn-sm" type="button">
        <i class="fa-solid fa-minus"></i>
      </button>
    </div>
    <div class="col-auto">
      <button class="btn btn-secondary btn-sm" type="button">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  </div>
  <div class="my-1">
    <fieldset>
      <legend class="fw-bold clearfix fs-6">
        <span><i class="fa-solid fa-user"></i> Person</span>
      </legend>
      <hr class="my-2">
      <div class="row">
        <div class="col-12 my-1 row small">
          <div class="col-md-3">
            <label class="form-label fw-bold">name:</label>
          </div>
          <div class="col-md-9">
            <input
              class="validate form-control form-control-sm"
              type="text"
              name="name"
              value="john"
            >
            <div class="invalid-feedback"></div>
          </div>
        </div>
        <div class="col-12 my-1 row small">
          <div class="col-md-3">
            <label class="form-label fw-bold">age:</label>
          </div>
          <div class="col-md-9">
            <input
              class="validate form-control form-control-sm"
              type="number"
              name="age"
              value="30"
              step="1"
            >
            <div class="invalid-feedback"></div>
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</div>`
    }, {
      title: 'Navbar',
      data: [
        {
          noValid: true,
          items: {
            properties: {
              icon: {
                type: 'string',
                ui: 'icon'
              },
              title: {
                type: 'string'
              }, 
              href: {
                type: 'string'
              },
              children: {
                items: {
                  properties: {
                    icon: {
                      type: 'string',
                      ui: 'icon'
                    },
                    title: {
                      type: 'string'
                    }, 
                    href: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          },
          default: [
            {
              title: 'Tools',
              icon: 'tools',
              children: [
                {
                  title: 'Users',
                  icon: 'user',
                  href: '#/users'
                }, {
                  title: 'Settings',
                  icon: 'cog',
                  href: '#/settings'
                }
              ]
            }, {
              title: 'Repository',
              icon: '@github',
              href: 'https://github.com/marcodpt/app'
            }
          ],
          update
        }
      ], html:
`<div>
  <div class="row g-1 align-items-center justify-content-start">
    <div class="col-auto">
      <button class="btn btn-secondary" type="button">
        <i class="fa-solid fa-minus"></i>
      </button>
    </div>
    <div class="col-auto">
      <button class="btn btn-secondary" type="button">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  </div>
  <div class="my-2">
    <fieldset>
      <div class="row">
        <div class="col-12 my-2 row">
          <div class="col-md-3">
            <label class="form-label fw-bold">icon:</label>
          </div>
          <div class="col-md-9">
            <div class="input-group">
              <span class="input-group-text">
                <i class="fa-solid fa-tools"></i>
              </span>
              <input
                class="validate form-control"
                type="text"
                name="icon"
                value="tools"
                >
            </div>
              <div class="invalid-feedback">
              </div>
          </div>
        </div>
        <div class="col-12 my-2 row">
          <div class="col-md-3">
            <label class="form-label fw-bold">title:</label>
          </div>
          <div class="col-md-9">
            <input
              class="validate form-control"
              type="text"
              name="title"
              value="Tools"
              >
              <div class="invalid-feedback"></div>
          </div>
        </div>
        <div class="col-12 my-2 row">
          <div class="col-md-3">
            <label class="form-label fw-bold">href:</label>
          </div>
          <div class="col-md-9">
            <input
              class="validate form-control"
              type="text"
              name="href"
              value=""
              >
              <div class="invalid-feedback"></div>
          </div>
        </div>
        <div class="col-12 my-2 row">
          <div class="col-md-3">
            <label class="form-label fw-bold">children:</label>
          </div>
          <div class="col-md-9">
            <div class="row g-1 align-items-center justify-content-start">
              <div class="col-auto">
                <button class="btn btn-secondary" type="button">
                  <i class="fa-solid fa-minus"></i>
                </button>
              </div>
              <div class="col-auto">
                <button class="btn btn-secondary" type="button">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
            <div class="my-2">
              <fieldset>
                <div class="row">
                  <div class="col-12 my-2 row">
                    <div class="col-md-3">
                      <label class="form-label fw-bold">icon:</label>
                    </div>
                    <div class="col-md-9">
                      <div class="input-group">
                        <span class="input-group-text">
                          <i class="fa-solid fa-user"></i>
                        </span>
                        <input
                          class="validate form-control"
                          type="text"
                          name="icon"
                          value="user"
                          >
                      </div>
                        <div class="invalid-feedback"></div>
                    </div>
                  </div>
                  <div class="col-12 my-2 row">
                    <div class="col-md-3">
                      <label class="form-label fw-bold">title:</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        class="validate form-control"
                        type="text"
                        name="title"
                        value="Users"
                        >
                        <div class="invalid-feedback"></div>
                    </div>
                  </div>
                  <div class="col-12 my-2 row">
                    <div class="col-md-3">
                      <label class="form-label fw-bold">href:</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        class="validate form-control"
                        type="text"
                        name="href"
                        value="#/users"
                        >
                        <div class="invalid-feedback"></div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="my-2">
              <fieldset>
                <div class="row">
                  <div class="col-12 my-2 row">
                    <div class="col-md-3">
                      <label class="form-label fw-bold">icon:</label>
                    </div>
                    <div class="col-md-9">
                      <div class="input-group">
                        <span class="input-group-text">
                          <i class="fa-solid fa-cog"></i>
                        </span>
                        <input
                          class="validate form-control"
                          type="text"
                          name="icon"
                          value="cog"
                          >
                      </div>
                        <div class="invalid-feedback"></div>
                    </div>
                  </div>
                  <div class="col-12 my-2 row">
                    <div class="col-md-3">
                      <label class="form-label fw-bold">title:</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        class="validate form-control"
                        type="text"
                        name="title"
                        value="Settings"
                        >
                        <div class="invalid-feedback"></div>
                    </div>
                  </div>
                  <div class="col-12 my-2 row">
                    <div class="col-md-3">
                      <label class="form-label fw-bold">href:</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        class="validate form-control"
                        type="text"
                        name="href"
                        value="#/settings"
                        >
                        <div class="invalid-feedback"></div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  </div>
  <div class="my-2">
    <fieldset>
      <div class="row">
        <div class="col-12 my-2 row">
          <div class="col-md-3">
            <label class="form-label fw-bold">icon:</label>
          </div>
          <div class="col-md-9">
            <div class="input-group">
              <span class="input-group-text">
                <i class="fa-brands fa-github"></i>
              </span>
              <input
                class="validate form-control"
                type="text"
                name="icon"
                value="@github"
                >
            </div>
              <div class="invalid-feedback"></div>
          </div>
        </div>
        <div class="col-12 my-2 row">
          <div class="col-md-3">
            <label class="form-label fw-bold">title:</label>
          </div>
          <div class="col-md-9">
            <input
              class="validate form-control"
              type="text"
              name="title"
              value="Repository"
              >
              <div class="invalid-feedback">
              </div>
          </div>
        </div>
        <div class="col-12 my-2 row">
          <div class="col-md-3">
            <label class="form-label fw-bold">href:</label>
          </div>
          <div class="col-md-9">
            <input
              class="validate form-control"
              type="text"
              name="href"
              value="https://github.com/marcodpt/app"
              >
              <div class="invalid-feedback"></div>
          </div>
        </div>
        <div class="col-12 my-2 row">
          <div class="col-md-3">
            <label class="form-label fw-bold">children:</label>
          </div>
          <div class="col-md-9">
            <div class="row g-1 align-items-center justify-content-start">
              <div class="col-auto">
                <button class="btn btn-secondary" type="button" disabled="">
                  <i class="fa-solid fa-minus"></i>
                </button>
              </div>
              <div class="col-auto">
                <button class="btn btn-secondary" type="button">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</div>`
    }
  ]
})
