export default {
  title: 'Users',
  description: 'List of available users',
  type: 'array',
  items: {
    type: 'object',
    title: 'User',
    description: 'Single user entry',
    properties: {
      id: {
        type: 'integer',
        title: 'Id',
        description: 'User id',
        default: 0
      },
      name: {
        type: 'string',
        title: 'Name',
        description: 'User name',
        default: ''
      }, 
      age: {
        type: 'integer',
        title: 'Age (Y)',
        description: 'User age',
        default: 18,
        minimum: 18,
        maximum: 99
      }, 
      balance: {
        type: 'number',
        title: 'Balance ($)',
        multipleOf: 0.01,
        default: 0,
        minimum: 1000,
        maximum: 4000
      }
    },
    links: [
      {
        link: 'danger',
        icon: 'trash',
        title: 'Delete',
        href: '#/delete/users/{id}'
      }, {
        link: 'warning',
        icon: 'edit',
        title: 'Edit',
        href: '#/edit/users/{id}'
      }
    ]
  },
  links: [
    {
      link: 'success',
      icon: 'pencil',
      title: 'Insert',
      href: '#/insert/users'
    }
  ]
}
