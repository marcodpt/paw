import table from '../src/table/index.js'

export default ({
  icon: 'table',
  title: 'table',
  description: 'Table with many integrated functionalities.',
  component: table,
  properties: {},
  examples: [
    {
      title: 'Empty',
      data: [
        {}
      ],
      html:
`<table class="table">
  <thead></thead>
  <tbody>
    <tr>
      <td colspan="100%">
        <div class="d-flex justify-content-center p-5" title="Loading...">
          <div
            class="spinner-border"
            style="width: 5rem; height: 5rem"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</table>`
    }, {
      title: 'With title',
      data: [
        {
          title: 'Accounts',
          icon: 'user',
          description: 'Users accounts'
        }
      ],
      html:
`<table class="table">
  <thead>
    <tr>
      <th class="text-center" colspan="100%">
        <span
          title="Users accounts"
        ><i class="fa-solid fa-user"></i> Accounts</span>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="100%">
        <div class="d-flex justify-content-center p-5" title="Loading...">
          <div
            class="spinner-border"
            style="width: 5rem; height: 5rem"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</table>`
    }, {
      title: 'With fields',
      data: [
        {
          items: {
            properties: {
              name: {
                type: 'string',
                title: 'Name',
                description: 'User name'
              }, 
              balance: {
                type: 'number',
                title: 'Balance ($)',
                ui: 'num.2'
              }
            }
          }
        }
      ],
      html:
`<table class="table">
  <thead>
    <tr>
      <th class="text-center align-middle">
        <span title="User name" data-ctx="field:name">Name</span>
      </th>
      <th class="text-center align-middle">
        <span data-ctx="field:balance">Balance ($)</span>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="100%">
        <div class="d-flex justify-content-center p-5" title="Loading...">
          <div
            class="spinner-border"
            style="width: 5rem; height: 5rem"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</table>`
    }, {
      title: 'With fields and data',
      data: [
        {
          items: {
            properties: {
              name: {
                type: 'string',
                title: 'Name',
                description: 'User name'
              }, 
              balance: {
                type: 'number',
                title: 'Balance ($)',
                ui: 'num.2'
              }
            }
          },
          default: [
            {
              name: 'Alice',
              balance: 1400.20
            }, {
              name: 'Bob',
              balance: 1250.34
            }
          ]
        }
      ],
      html:
`<table class="table">
  <thead>
    <tr>
      <th class="text-center align-middle">
        <span title="User name" data-ctx="field:name">Name</span>
      </th>
      <th class="text-center align-middle">
        <span data-ctx="field:balance">Balance ($)</span>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td
        class="align-middle text-center"
      >Alice</td>
      <td
        class="align-middle text-center"
      >1,400.20</td>
    </tr>
    <tr>
      <td
        class="align-middle text-center"
      >Bob</td>
      <td
        class="align-middle text-center"
      >1,250.34</td>
    </tr>
  </tbody>
</table>`
    }
  ]
})
