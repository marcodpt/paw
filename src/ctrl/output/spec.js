import ctrl from '../index.js'
import opt from '../options.js'

export default ({
  icon: 'font',
  title: 'output',
  description: 'Formatted outputs.',
  component: ctrl,
  properties: {
    type: {
      type: 'string',
      description: 'One of the allowed types of the JSON schema.',
      enum: opt('types', true)
    },
    default: {
      description: `The value associated with this output.`
    },
    ui: {
      type: 'string',
      description: 'One of the available UIs.',
      enum: opt('ui', true)
    },
    href: {
      type: 'string',
      description: `Used to create links in static content.`
    },
    context: {
      type: 'string',
      enum: opt('context', true),
      description: `
        One of the bootstrap 5 button variants.
        It only makes sense when href is present.
        The default value is: link.
      `
    },
    minimum: {
      type: 'number',
      description: `
        Used in progress bars to determine the starting value of the scale.
        The default value is: 0.
      `
    },
    maximum: {
      type: 'number',
      description: `
        Used in progress bars to determine the final scale value.
        The default value is: 100 (type: integer) or 1 (type: number).
      `
    }
  },
  examples: [
    {
      title: 'Empty',
      data: [
        {}, {
          type: 'string',
          default: null
        }, {
          default: undefined
        }, {
          default: ''
        }
      ],
      html: ''
    }, {
      title: 'Boolean False',
      data: [
        {
          default: false
        }, {
          type: 'boolean',
          default: false
        }, {
          ui: 'bool',
          default: 0
        }, {
          ui: 'bool',
          default: null
        }, {
          ui: 'bool'
        }, {
          ui: 'bool',
          default: ''
        }
      ],
      html: `No`
    }, {
      title: 'Boolean True',
      data: [
        {
          default: true
        }, {
          type: 'boolean',
          default: true
        }, {
          ui: 'bool',
          default: 1
        }, {
          ui: 'bool',
          default: {}
        }, {
          ui: 'bool',
          default: []
        }, {
          ui: 'bool',
          default: '0'
        }
      ],
      html: `Yes`
    }, {
      title: 'Integer',
      data: [
        {
          default: 1234
        }, {
          type: 'integer',
          default: 1234
        }, {
          type: 'integer',
          default: '1234'
        }, {
          type: 'integer',
          default: 1233.6
        }, {
          type: 'integer',
          default: 1233.5
        }, {
          type: 'integer',
          default: 1234.4
        }, {
          type: 'integer',
          default: '1233.5'
        }, {
          type: 'integer',
          default: '1234.4'
        }
      ],
      html: '1,234'
    }, {
      title: 'Number',
      data: [
        {
          default: 1234.56789
        }, {
          type: 'number',
          default: 1234.56789
        }, {
          type: 'number',
          default: '1234.56789'
        }
      ],
      html: '1,234.568'
    }, {
      title: 'String',
      data: [
        {
          default: 'test\nme'
        }, {
          type: 'string',
          default: 'test\nme'
        }
      ],
      html: 'test\nme'
    }, {
      title: 'Text',
      data: [
        {
          ui: 'text',
          default: 'test\nme'
        }, {
          ui: 'text',
          type: 'string',
          default: 'test\nme'
        }, {
          ui: 'info',
          default: 'test\nme'
        }, {
          ui: 'info',
          type: 'string',
          default: 'test\nme'
        }
      ],
      html: '<span style="white-space: pre-wrap">test\nme</span>'
    }, {
      title: 'JSON Object',
      data: [
        {
          default: {
            x: 1,
            test: 'me'
          }
        }
      ],
      html: 
`<span
  style="white-space: pre-wrap"
>{
  "x": 1,
  "test": "me"
}</span>`
    }, {
      title: 'JSON Array',
      data: [
        {
          default: [
            'dog',
            'cat',
            'bird'
          ]
        }
      ],
      html: 
`<span
  style="white-space: pre-wrap"
>[
  "dog",
  "cat",
  "bird"
]</span>`
    }, {
      title: 'Link Raw',
      data: [
        {
          default: 'google',
          href: 'https://www.google.com'
        }
      ],
      html: `<a href="https://www.google.com" target="_blank">google</a>`
    }, {
      title: 'Link Info',
      data: [
        {
          default: 'test',
          href: '#',
          context: 'info'
        }
      ],
      html: `<a class="btn btn-info" href="#">test</a>`
    }, {
      title: 'Password',
      data: [
        {
          default: 'secret password',
          ui: 'password'
        }, {
          type: 'string',
          default: 'another password',
          ui: 'password'
        }, {
          default: 3.14,
          ui: 'password'
        }, {
          ui: 'password'
        }
      ],
      html: `********`
    }, {
      title: 'Date Positive',
      data: [
        {
          default: '2007-12-10',
          ui: 'date'
        }, {
          default: '2007-12-10T14:39:25+0000',
          ui: 'date'
        }, {
          default: 1197310577,
          ui: 'date'
        }
      ],
      html: '12/10/2007'
    }, {
      title: 'Date Negative',
      data: [
        {
          default: '1968-10-04',
          ui: 'date'
        }, {
          default: '1968-10-04T14:39:25+0000',
          ui: 'date'
        }, {
          default: -39159823,
          ui: 'date'
        }
      ],
      html: '10/4/1968'
    }, {
      title: 'Date Empty',
      data: [
        {
          default: '',
          ui: 'date'
        }, {
          ui: 'date'
        }, {
          default: 0,
          ui: 'date'
        }
      ],
      html: ''
    }, {
      title: 'Fractional number with 2 digits',
      data: [
        {
          ui: 'num.2',
          default: 12345.6789
        }, {
          ui: 'num.2',
          default: '12345.6789'
        }
      ],
      html: '12,345.68'
    }, {
      title: 'Integer representing 2 digits fraction',
      data: [
        {
          ui: 'num.2',
          default: -5
        }, {
          ui: 'num.2',
          default: '-5'
        }
      ],
      html: '-0.05'
    }, {
      title: 'Integer with 4 digits',
      data: [
        {
          ui: 'len:4',
          default: 5
        }
      ],
      html: '0005'
    }, {
      title: 'Number with 5 digits',
      data: [
        {
          ui: 'len:5',
          default: 3.14
        }
      ],
      html: '03.14'
    }, {
      title: 'String with 5 digits',
      data: [
        {
          ui: 'len:5',
          default: 'test'
        }
      ],
      html: 'test '
    }, {
      title: 'Color blue',
      data: [
        {
          ui: 'color',
          default: '#0000FF'
        }, {
          ui: 'color',
          default: '0000FF'
        }
      ],
      html: 
`<div
  style="background-color:#0000FF"
  title="#0000FF"
  class="h-100 w-100"
></div>`
    }, {
      title: 'Icon check',
      data: [
        {
          ui: 'icon',
          default: 'check'
        }
      ],
      html: '<span><i class="fa-solid fa-check"></i> check</span>'
    }, {
      title: 'Icon github',
      data: [
        {
          ui: 'icon',
          default: '@github'
        }
      ],
      html: '<span><i class="fa-brands fa-github"></i> @github</span>'
    }, {
      title: 'Context primary',
      data: [
        {
          ui: 'context',
          default: 'primary'
        }
      ], 
      html: 
`<a
  class="btn btn-primary btn-sm"
  href="javascript:;"
>primary</a>`
    }, {
      title: 'Context other',
      data: [
        {
          ui: 'context',
          default: 'other'
        }
      ],
      html: 
`<a
  class="btn btn-link btn-sm"
  href="javascript:;"
>other</a>`
    }, {
      title: 'Progress 0%',
      data: [
        {
          ui: 'progress',
          default: 0
        }, {
          ui: 'progress',
          minimum: -200,
          maximum: 80,
          default: -200
        }
      ],
      html:
`<div
  style="min-width: 100px; background-color: lightgrey"
  class="rounded"
  title="0.0%"
>
  <div
    class="rounded text-white overflow-visible d-flex flex-row justify-content-center" 
    style="width: 0%; background-color: hsl(240.0,100%,25.0%)"
  >    0.0%</div>
</div>`
    }, {
      title: 'Progress 1%',
      data: [
        {
          ui: 'progress',
          default: 1
        }, {
          ui: 'progress',
          default: 0.01
        }, {
          ui: 'progress',
          default: 52,
          minimum: 50,
          maximum: 250
        }, {
          ui: 'progress',
          default: -990,
          minimum: -1000,
          maximum: 0
        }
      ],
      html:
`<div
  style="min-width: 100px; background-color: lightgrey"
  class="rounded"
  title="1.0%"
>
  <div
    class="rounded text-white overflow-visible d-flex flex-row justify-content-center"
    style="width: 1%; background-color: hsl(237.6,100%,25.3%)"
  >    1.0%</div>
</div>`
    }, {
      title: 'Progress 25%',
      data: [
        {
          ui: 'progress',
          default: 25
        }, {
          ui: 'progress',
          default: 0.25
        }, {
          ui: 'progress',
          default: 100,
          minimum: 50,
          maximum: 250
        }, {
          ui: 'progress',
          default: -750,
          minimum: -1000,
          maximum: 0
        }
      ],
      html:
`<div
  style="min-width: 100px; background-color: lightgrey"
  class="rounded"
  title="25.0%"
>
  <div
    class="rounded text-white overflow-visible d-flex flex-row justify-content-center" 
    style="width: 25%; background-color: hsl(180.0,100%,31.3%)"
  >    25.0%</div>
</div>`
    }, {
      title: 'Progress 50%',
      data: [
        {
          ui: 'progress',
          default: 50
        }, {
          ui: 'progress',
          default: 0.5
        }, {
          ui: 'progress',
          default: 150,
          minimum: 50,
          maximum: 250
        }, {
          ui: 'progress',
          default: -500,
          minimum: -1000,
          maximum: 0
        }
      ],
      html: 
`<div
  style="min-width: 100px; background-color: lightgrey"
  class="rounded"
  title="50.0%"
>
  <div
    class="rounded text-white overflow-visible d-flex flex-row justify-content-center" 
    style="width: 50%; background-color: hsl(120.0,100%,37.5%)"
  >    50.0%</div>
</div>`
    }, {
      title: 'Progress 75%',
      data: [
        {
          ui: 'progress',
          default: 75
        }, {
          ui: 'progress',
          default: 0.75
        }, {
          ui: 'progress',
          default: 200,
          minimum: 50,
          maximum: 250
        }, {
          ui: 'progress',
          default: -250,
          minimum: -1000,
          maximum: 0
        }
      ],
      html:
`<div
  style="min-width: 100px; background-color: lightgrey"
  class="rounded"
  title="75.0%"
>
  <div
    class="rounded text-white overflow-visible d-flex flex-row justify-content-center" 
    style="width: 75%; background-color: hsl(60.0,100%,43.8%)"
  >    75.0%</div>
</div>`
    }, {
      title: 'Progress 100%',
      data: [
        {
          ui: 'progress',
          default: 100
        }, {
          type: 'number',
          ui: 'progress',
          default: 1
        }, {
          ui: 'progress',
          default: 250,
          minimum: 50,
          maximum: 250
        }, {
          ui: 'progress',
          default: 0,
          minimum: -1000,
          maximum: 0
        }
      ],
      html:
`<div
  style="min-width: 100px; background-color: lightgrey"
  class="rounded"
  title="100.0%"
>
  <div
    class="rounded text-white overflow-visible d-flex flex-row justify-content-center" 
    style="width: 100%; background-color: hsl(0.0,100%,50.0%)"
  >    100.0%</div>
</div>`
    }, {
      title: 'Progress 125%',
      data: [
        {
          ui: 'progress',
          default: 125
        }, {
          ui: 'progress',
          default: 1.25
        }, {
          ui: 'progress',
          default: 300,
          minimum: 50,
          maximum: 250
        }, {
          ui: 'progress',
          default: 250,
          minimum: -1000,
          maximum: 0
        }
      ],
      html:
`<div
  style="min-width: 100px; background-color: lightgrey"
  class="rounded"
  title="125.0%"
>
  <div
    class="rounded text-white overflow-visible d-flex flex-row justify-content-center" 
    style="width: 100%; background-color: hsl(0.0,100%,50.0%)"
  >    125.0%</div>
</div>`
    }
  ]
})
