import node from './node.js'
import {tags} from './tags.js'
import html from '../hyperscript/html.js'

export default ({
  icon: 'code',
  title: 'hyperscript',
  description: 'Hyperscript function on steroids.',
  component: node,
  type: 'function',
  args: [
    {
      type: 'function',
      title: 'builder',
      returns: 'hyperscript',
      args: [
        {
          type: 'object',
          description: `
            Function that passes as a parameter an object containing all HTML tags. 
            Returns the associated DOM element.
            List of tags:
             - text
            ${tags.map(tag => ' - '+tag).join('\n         ')}
          `
        }
      ]
    }
  ],
  returns: {
    type: 'string/node'
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
      html: html(({
        div,
        h4,
        text,
        p
      }) => 
        div({
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
        ])
      )
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
      html: html(({
        div,
        text
      }) => 
        div({
          class: 'progress',
          role: 'progressbar',
          ariaLabel: 'Animated striped example',
          ariaValuenow: '75',
          ariaValuemin: '0',
          ariaValuemax: '100'
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
      )
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
      html: html(({
        button,
        text
      }) => 
        button({
          type: 'button',
          class: [
            'btn',
            'btn-primary'
          ],
          disabled: ''
        }, [
          text('No action!')
        ])
      )
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
      html: html(({
        button,
        text
      }) => 
        button({
          type: 'button',
          class: [
            'btn',
            'btn-primary'
          ]
        }, [
          text('Run')
        ])
      ),
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
