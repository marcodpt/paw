export default {
  icon: 'user',
  title: 'Users',
  description: 'List of available users',
  type: 'array',
  pagination: '📖',
  search: '🔎',
  sort: true,
  check: true,
  css: [
    'table-bordered',
    'table-striped',
    'table-hover'
  ],
  links: [
    {
      context: 'success',
      icon: 'pencil',
      title: 'Insert'
    }, {
      context: 'dark',
      icon: 'info-circle',
      title: 'Counter'
    }, {
      context: 'info',
      icon: 'filter',
      title: 'Filter'
    }, {
      context: 'warning',
      icon: 'th',
      title: 'Group'
    }, {
      context: 'secondary',
      icon: 'file',
      title: 'Export'
    }
  ],
  items: {
    type: 'object',
    title: 'User',
    description: 'Single user entry',
    properties: {
      id: {
        type: 'integer',
        title: 'Id',
        description: 'User id',
        default: 0,
        href: '#/users/{id}',
        totals: 'count'
      },
      name: {
        type: 'string',
        title: 'Name',
        description: 'User name',
        default: '',
        minLength: 1,
        maxLength: 255
      }, 
      age: {
        type: 'integer',
        title: 'Age (Y)',
        description: 'User age',
        default: 18,
        minimum: 18,
        maximum: 99,
        totals: 'avg'
      }, 
      balance: {
        type: 'number',
        title: 'Balance ($)',
        default: 0,
        minimum: 1000,
        maximum: 4000,
        ui: 'num.2',
        totals: 'sum'
      }
    },
    links: [
      {
        context: 'danger',
        icon: 'trash',
        title: 'Delete'
      }, {
        context: 'warning',
        icon: 'edit',
        title: 'Edit'
      }
    ]
  }
}
