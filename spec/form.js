import form from '../src/form.js'
import schema from '../views/data/schema.js'
import users from '../views/data/users.js'
import T from '../src/lang/index.js'

const P = schema.items.properties
const K = Object.keys(P)
const O = Object.keys(T('operators'))
var oldData = null

export default ({
  icon: 'square-check',
  title: 'form',
  description: 'Form with validation.',
  component: form,
  properties: {},
  examples: [
    {
      title: 'Empty',
      data: [
        {}
      ],
      html: '<form novalidate=""></form>'
    }, {
      title: 'Alert',
      data: [
        {
          description: 'Hello!\nThis is an alert!',
          ui: 'info'
        }
      ],
      html: 
`<form novalidate="">
  <fieldset>
    <div class="alert alert-info my-0 " role="alert">
      <span
        style="white-space: pre-wrap"
      >Hello!\nThis is an alert!</span>
    </div>
  </fieldset>
</form>`
    }, {
      title: 'Header',
      data: [
        {
          title: 'A header',
          description: 'Associated description',
          icon: 'exclamation-circle'
        }
      ],
      html:
`<form novalidate="">
  <fieldset>
    <legend class="fw-bold clearfix fs-5">
      <span
        title="Associated description"
      ><i class="fa-solid fa-exclamation-circle"></i> A header</span>
    </legend>
    <hr class="my-2">
  </fieldset>
</form>`
    }, {
      title: 'Login',
      data: [
        {
          title: 'Login',
          icon: 'sign-in',
          size: 'lg',
          properties: {
            name: {
              title: '',
              type: 'string',
              description: 'Username'
            },
            pass: {
              title: '',
              type: 'string',
              ui: 'password',
              description: 'Password'
            }
          },
          block: true,
          links: [
            {
              icon: 'sign-in',
              link: 'primary',
              title: 'Login',
              href: (data) => {
                console.log(data)
              }
            }
          ]
        }
      ],
      html: 
`<form novalidate="">
  <fieldset>
    <legend class="fw-bold clearfix fs-4">
      <span><i class="fa-solid fa-sign-in"></i> Login</span>
    </legend>
    <hr class="my-2">
    <div class="row">
      <div class="col-12 my-3 fs-5">
        <div>
          <input
            class="validate form-control form-control-lg is-valid"
            type="text"
            name="name"
            value=""
            placeholder="Username"
          >
          <div class="invalid-feedback"></div>
        </div>
      </div>
      <div class="col-12 my-3 fs-5">
        <div>
          <input
            class="validate form-control form-control-lg is-valid"
            type="password"
            name="pass"
            value=""
            placeholder="Password"
          >
          <div class="invalid-feedback"></div>
        </div>
      </div>
    </div>
  </fieldset>
  <hr class="my-2">
  <div class="btn-group w-100">
    <button class="btn btn-primary btn-lg" type="button">
      <span><i class="fa-solid fa-sign-in"></i> Login</span>
    </button>
  </div>
</form>`
    }, {
      title: 'Register',
      data: [
        {
          title: 'Register',
          icon: 'user',
          size: 'sm',
          properties: {
            name: {
              type: 'string'
            },
            email: {
              type: 'string'
            },
            age: {
              type: 'integer'
            },
            language: {
              type: 'string',
              enum: [
                'English',
                'Spanish',
                'Chinese'
              ]
            },
            news: {
              type: 'boolean'
            },
            bio: {
              type: 'string',
              ui: 'text'
            }
          },
          submit: data => {
            console.log(data)
          }
        }
      ],
      html: 
`<form novalidate="">
  <fieldset>
    <legend class="fw-bold clearfix fs-6">
      <span><i class="fa-solid fa-user"></i> Register</span>
    </legend>
    <hr class="my-2">
    <div class="row">
      <div class="col-12 my-1 row small">
        <div class="col-md-3">
          <label class="form-label fw-bold">name:</label>
        </div>
        <div class="col-md-9">
          <input
            class="validate form-control form-control-sm is-valid"
            type="text"
            name="name"
            value=""
          >
          <div class="invalid-feedback"></div>
        </div>
      </div>
      <div class="col-12 my-1 row small">
        <div class="col-md-3">
          <label class="form-label fw-bold">email:</label>
        </div>
        <div class="col-md-9">
          <input
            class="validate form-control form-control-sm is-valid"
            type="text"
            name="email"
            value=""
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
            class="validate form-control form-control-sm is-valid"
            type="number"
            name="age"
            value="0"
            step="1"
          >
          <div class="invalid-feedback"></div>
        </div>
      </div>
      <div class="col-12 my-1 row small">
        <div class="col-md-3">
          <label class="form-label fw-bold">language:</label>
        </div>
        <div class="col-md-9">
          <input
            class="validate form-control form-control-sm is-invalid"
            type="text"
            name="language"
            value=""
            list="app.data.language"
          >
          <datalist id="app.data.language">
            <option value="English"></option>
            <option value="Spanish"></option>
            <option value="Chinese"></option>
          </datalist>
          <div
            class="invalid-feedback"
          >Must be one of the possible options.</div>
        </div>
      </div>
      <div class="col-12 my-1 row small">
        <div class="col-md-3">
          <label class="form-label fw-bold">news:</label>
        </div>
        <div class="col-md-9">
          <input
            class="validate form-check-input is-valid"
            type="checkbox"
            name="news"
          >
          <div class="invalid-feedback"></div>
        </div>
      </div>
      <div class="col-12 my-1 row small">
        <div class="col-md-3">
          <label class="form-label fw-bold">bio:</label>
        </div>
        <div class="col-md-9">
          <textarea
            class="validate form-control form-control-sm is-valid"
            name="bio"
            rows="6"
          ></textarea>
          <div class="invalid-feedback"></div>
        </div>
      </div>
    </div>
  </fieldset>
  <hr class="my-2">
  <div class="row g-1 align-items-center justify-content-start">
    <div class="col-auto">
      <button class="btn btn-primary btn-sm" type="button" disabled="">
        <span><i class="fa-solid fa-check"></i> Submit</span>
      </button>
    </div>
  </div>
</form>`
    }, {
      title: 'Filter',
      data: [
        {
          properties: {
            field: {
              type: 'string',
              title: T('field'),
              default: K[0],
              options: K.map(k => ({
                value: k,
                label: P[k].title
              }))
            },
            operator: {
              type: 'string',
              title: T('operator'),
              default: O[0],
              options: O.map(o => ({
                value: o,
                label: T('operators')[o]
              }))
            },
            value: {
              type: 'string',
              minLength: 1,
              title: T('value')
            }
          },
          submit: data => {
            console.log(data)
          },
          update: (hasErr, Data, Label, form) => {
            if (oldData == null) {
              oldData = {...Data}
              return
            }
            const anyValue = ({operator}) => [
              'ct', 'nc'
            ].indexOf(operator) >= 0

            if (!anyValue(oldData) && anyValue(Data)) {
              oldData = {...Data}
              form.setProp({
                value: {
                  type: 'string',
                  minLength: 1,
                  title: T('value'),
                  default: ''
                }
              })
            } else if (!anyValue(Data) &&
              (oldData.field != Data.field || anyValue(oldData))
            ) {
              oldData = {...Data}
              const f = Data.field
              const options = users.reduce((O, row) => {
                if (O.indexOf(row[f]) < 0) {
                  O.push(row[f])
                }
                return O
              }, [])
              options.sort()
              form.setProp({
                value: {
                  type: P[f].type,
                  ui: P[f].ui,
                  title: T('value'),
                  enum: options,
                  default: null
                }
              })
            }
          }
        }
      ],
      html: 
`<form novalidate="">
  <fieldset>
    <div class="row">
      <div class="col-12 my-2 row">
        <div class="col-md-3">
          <label class="form-label fw-bold">Field:</label>
        </div>
        <div class="col-md-9">
          <input
            class="validate form-control is-valid"
            type="text"
            name="field"
            value="Id"
            list="app.data.field"
          >
          <datalist id="app.data.field">
            <option value="Id"></option>
            <option value="Name"></option>
            <option value="Age (Y)"></option>
            <option value="Balance ($)"></option>
          </datalist>
          <div class="invalid-feedback"></div>
        </div>
      </div>
      <div class="col-12 my-2 row">
        <div class="col-md-3">
          <label class="form-label fw-bold">Operator:</label>
        </div>
        <div class="col-md-9">
          <input
            class="validate form-control is-valid"
            type="text"
            name="operator"
            value="Contains"
            list="app.data.operator"
          >
          <datalist id="app.data.operator">
            <option value="Contains"></option>
            <option value="Not contains"></option>
            <option value="Equals"></option>
            <option value="Not equals"></option>
            <option value="Greater than"></option>
            <option value="Greater than or equals"></option>
            <option value="Less than"></option>
            <option value="Less than or equals"></option>
          </datalist>
          <div class="invalid-feedback"></div>
        </div>
      </div>
      <div class="col-12 my-2 row">
        <div class="col-md-3">
          <label class="form-label fw-bold">Value:</label>
        </div>
        <div class="col-md-9">
          <input
            class="validate form-control is-invalid"
            type="text"
            name="value"
            value=""
          >
          <div
            class="invalid-feedback"
          >Must be a minimum of 1 character(s).</div>
        </div>
      </div>
    </div>
  </fieldset>
  <hr class="my-2">
  <div class="row g-1 align-items-center justify-content-start">
    <div class="col-auto">
      <button class="btn btn-primary" type="button" disabled="">
        <span><i class="fa-solid fa-check"></i> Submit</span>
      </button>
    </div>
  </div>
</form>`
    }, {
      title: 'Edit form',
      data: [
        {
          properties: {
            id: {
              default: 27,
              readOnly: true
            }, 
            name: {
              default: 'Josh',
              minLength: 2
            }, 
            age: {
              default: 30,
              readOnly: true,
              writeOnly: true
            }
          },
          submit: data => {
            console.log(data)
          }
        }
      ]
    }
  ]
})
