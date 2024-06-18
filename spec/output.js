import ctrl from '../src/ctrl/index.js'

export default ({
  icon: 'font',
  title: 'output',
  description: 'Formatted outputs.',
  component: ctrl,
  properties: {},
  examples: [
    {
      title: 'Password',
      data: [
        {
          default: 'secret password',
          ui: 'password',
          readOnly: true
        }, {
          type: 'string',
          default: 'another password',
          ui: 'password',
          readOnly: true
        }, {
          default: 3.14,
          ui: 'password',
          readOnly: true
        }, {
          ui: 'password',
          readOnly: true
        }
      ],
      html: `********`
    }, {
      title: 'Boolean False',
      data: [
        {
          default: false,
          readOnly: true
        }, {
          type: 'boolean',
          default: false,
          readOnly: true
        }, {
          ui: 'bool',
          default: 0,
          readOnly: true
        }, {
          ui: 'bool',
          default: null,
          readOnly: true
        }, {
          ui: 'bool',
          readOnly: true
        }, {
          ui: 'bool',
          default: '',
          readOnly: true
        }
      ],
      html: `No`
    }, {
      title: 'Boolean True',
      data: [
        {
          default: true,
          readOnly: true
        }, {
          type: 'boolean',
          default: true,
          readOnly: true
        }, {
          ui: 'bool',
          default: 1,
          readOnly: true
        }, {
          ui: 'bool',
          default: {},
          readOnly: true
        }, {
          ui: 'bool',
          default: [],
          readOnly: true
        }, {
          ui: 'bool',
          default: '0',
          readOnly: true
        }
      ],
      html: `Yes`
    }, {
      title: 'Date Positive',
      data: [
        {
          default: '2007-12-10',
          ui: 'date',
          readOnly: true
        }, {
          default: '2007-12-10T14:39:25+0000',
          ui: 'date',
          readOnly: true
        }, {
          default: 1197310577,
          ui: 'date',
          readOnly: true
        }
      ],
      html: '12/10/2007'
    }, {
      title: 'Date Negative',
      data: [
        {
          default: '1968-10-04',
          ui: 'date',
          readOnly: true
        }, {
          default: '1968-10-04T14:39:25+0000',
          ui: 'date',
          readOnly: true
        }, {
          default: -39159823,
          ui: 'date',
          readOnly: true
        }
      ],
      html: '10/4/1968'
    }, {
      title: 'Date Empty',
      data: [
        {
          default: '',
          ui: 'date',
          readOnly: true
        }, {
          ui: 'date',
          readOnly: true
        }, {
          default: 0,
          ui: 'date',
          readOnly: true
        }
      ],
      html: ''
    }, {
      title: 'Fractional number with 2 digits',
      data: [
        {
          ui: 'num.2',
          readOnly: true,
          default: 12345.6789
        }, {
          ui: 'num.2',
          readOnly: true,
          default: '12345.6789'
        }
      ],
      html: '12,345.68'
    }, {
      title: 'Integer representing 2 digits fraction',
      data: [
        {
          ui: 'num.2',
          readOnly: true,
          default: -5
        }, {
          ui: 'num.2',
          readOnly: true,
          default: '-5'
        }
      ],
      html: '-0.05'
    }, {
      title: 'Integer with 4 digits',
      data: [
        {
          ui: 'len:4',
          readOnly: true,
          default: 5
        }
      ],
      html: '0005'
    }, {
      title: 'Number with 5 digits',
      data: [
        {
          ui: 'len:5',
          readOnly: true,
          default: 3.14
        }
      ],
      html: '03.14'
    }, {
      title: 'String with 5 digits',
      data: [
        {
          ui: 'len:5',
          readOnly: true,
          default: 'test'
        }
      ],
      html: 'test '
    }, {
      title: 'Color blue',
      data: [
        {
          ui: 'color',
          readOnly: true,
          default: '#0000FF'
        }, {
          ui: 'color',
          readOnly: true,
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
      title: 'Progress 0%',
      data: [
        {
          ui: 'progress',
          default: 0,
          readOnly: true
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
          default: 1,
          readOnly: true
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
          default: 25,
          readOnly: true
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
          default: 50,
          readOnly: true
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
          default: 75,
          readOnly: true
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
          default: 100,
          readOnly: true
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
          default: 125,
          readOnly: true
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
