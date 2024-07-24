import e from '../src/html/e.js'
import tags from '../src/html/tags.js'

export default ({
  icon: 'code',
  title: 'e',
  description: 'Hyperscript function on steroids.',
  component: e,
  properties: {
    param1: {
      title: 'Param 1 (function)',
      description: `
        Function that passes as a parameter an object containing all HTML tags. 
        Returns the associated DOM element.
        List of tags:
         - text
        ${Object.keys(tags)
          .filter(tag => tags[tag].usages.indexOf('body') >= 0)
          .map(tag => ' - '+tag)
          .join('\n         ')}
      `
    }
  },
  examples: [
    {
      title: 'Usage sample',
      data: [
        ({div, h4, p, hr, text}) => div({
          style: {
            maxWidth: '600px'
          },
          class: [
            'alert',
            'alert-success',
            'm-auto'
          ],
          role: 'alert'
        }, [
          h4({
            class: 'alert-heading'
          }, [
            text('Well done!')
          ]),
          p({
            class: 'mb-0'
          }, [
            text('You successfully read this important alert message.')
          ])
        ]),
        ({div, h4, p, hr, text}) => div({
          style: 'max-width: 600px',
          class: 'alert alert-success m-auto',
          role: 'alert'
        }, [
          h4({
            class: 'alert-heading'
          }, [
            text('Well done!')
          ]),
          p({
            class: 'mb-0'
          }, [
            text('You successfully read this important alert message.')
          ])
        ])
      ],
      html:
`<div style="max-width: 600px" class="alert alert-success m-auto" role="alert">
  <h4 class="alert-heading">Well done!</h4>
  <p class="mb-0">You successfully read this important alert message.</p>
</div>`
    }, {
      title: 'Attributes usage',
      data: [
        ({div, text}) => div({
          class: 'progress',
          role: 'progressbar',
          ariaLabel: 'Animated striped example',
          ariaValuenow: 75,
          ariaValuemin: 0,
          ariaValuemax: 100
        }, [
          div({
            class: [
              'progress-bar',
              'progress-bar-striped',
              'progress-bar-animated'
            ],
            style: {
              width: '75%'
            }
          }, [
            text('75%')
          ])
        ])
      ],
      html: 
`<div
  class="progress"
  role="progressbar"
  aria-label="Animated striped example"
  aria-valuenow="75"
  aria-valuemin="0"
  aria-valuemax="100"
>
  <div
    class="progress-bar progress-bar-striped progress-bar-animated"
    style="width: 75%"
  >75%</div>
</div>`
    }, {
      title: 'Boolean attributes',
      data: [
        ({button, text}) => button({
          type: 'button',
          class: 'btn btn-primary',
          disabled: true,
          autofocus: false
        }, [
          text('No action!')
        ])
      ],
      html:
`<button
  type="button"
  class="btn btn-primary"
  disabled=""
>No action!</button>`
    }, {
      title: 'Event listeners and functions',
      data: [
        ({button, text}) => button({
          type: 'button',
          class: 'btn btn-primary',
          onclick: ev => {
            ev.target.closest('button').textContent = 'Done!'
          },
          clear: (el, content) => {
            el.textContent = content
          }
        }, [
          text('Run')
        ])
      ],
      html: '<button type="button" class="btn btn-primary">Run</button>',
      test: (el, assert) => {
        assert.equal(el.textContent, 'Run')
        el.click()
        assert.equal(el.textContent, 'Done!')
        el.clear('Again!')
        assert.equal(el.textContent, 'Again!')
        el.click()
        assert.equal(el.textContent, 'Done!')
      }
    }, {
      title: 'Edge cases tests',
      data: [
        ({div, br, text}) => div({
          class: [                  //class can be a string or an array
            'container',            //only accepts strings as items
            '  border ',            //all classes will be trimed
            true,                   //all other values will be ignored
            false,
            0,
            3.14,
            null,
            undefined,
            {},
            {x: 1},
            [],
            ['x', 'y', 'z']
          ],
          style: {                   //style can be a string or an object
            maxWidth: '600px',       //camel case auto convert to kebab case
            border: 0,               //only accept strings and numbers
            dataA: undefined,        //everything else will be ignored
            dataB: null,
            dataC: false,
            dataD: true,
            dataG: ' ',              //empty string will be ignored
            dataI: {},
            dataJ: {x: 1},
            dataK: [],
            dataL: ['x', 'y', 'z'],
          },
          dataA: undefined,          //non numeric falsy will be ignored
          dataB: null,
          dataC: false,
          dataD: true,               //true stands for boolean attribute
          dataE: 0,                  //numeric values are allowed
          dataF: 3.14, 
          dataG: '',                 //also string values
          dataH: 'test',
          dataI: {},                 //objects are ignored
          dataJ: {x: 1},
          dataK: [],
          dataL: ['x', 'y', 'z']
        }, [
          text(),                    //undefined text is an empty string
          br(),
          text(undefined),
          br({}),
          text(''),
          br({}, [                   //self closing tags ignores children
            div()
          ]),
          text('test'),
          div(),
          text(null),               //all JSON values are printed as json
          div({}),
          text(false),
          div({}, br()),            //children must be an array
          text(true),
          br(),
          text({}),
          br(),
          text({x: 1}),
          br(),
          text([]),
          br(),
          text(['x', 'y', 'z'])
        ])
      ],
      html: 
`<div
  class="container border"
  style="max-width: 600px; border: 0"
  data-d=""
  data-e="0"
  data-f="3.14"
  data-g=""
  data-h="test"
>
  <br>
  <br>
  <br>test<div></div>null<div></div>false<div></div>true<br>{}<br>{
  "x": 1
}<br>[]<br>[
  "x",
  "y",
  "z"
]</div>`
    }
  ]
})
