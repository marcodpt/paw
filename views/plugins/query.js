import {formatter} from '../../src/lib.js'

export default ({modal, ctrl}, schema, data, run) => {
  const btnFilter = {
    link: 'info',
    icon: 'filter',
    title: 'Filter'
  }
  const P = schema.items.properties
  const K = Object.keys(P)
  const F = K.reduce((F, k) => ({
    ...F,
    [k]: formatter(P[k])
  }), {})
  const S = {
    el: null,
    field: null,
    operator: null,
    value: null,
    filters: []
  }
  btnFilter.init = el => {
    S.el = el
  }
  btnFilter.href = () => {
    modal({
      title: btnFilter.title,
      icon: btnFilter.icon,
      properties: {
        field: {
          type: 'string',
          title: 'Field',
          noValid: true,
          default: K[0],
          options: K.map(k => ({
            value: k,
            label: P[k].title || k
          }))
        },
        operator: {
          type: 'string',
          title: 'Operator',
          noValid: true,
          default: 'ct',
          options: [
            {
              value: 'ct',
              label: 'Contains'
            }, {
              value: 'nc',
              label: 'Not contains'
            }, {
              value: 'eq',
              label: 'Equals'
            }, {
              value: 'ne',
              label: 'Not equals'
            }, {
              value: 'gt',
              label: 'Greater than'
            }, {
              value: 'ge',
              label: 'Greater than or equals'
            }, {
              value: 'lt',
              label: 'Less than'
            }, {
              value: 'le',
              label: 'Less than or equals'
            }
          ]
        },
        value: {
          type: 'string',
          minLength: 1,
          title: 'Value',
          noValid: true
        }
      },
      update: (err, Data, Label, form) => {
        const {field, operator, value} = Data
        const isFixed = op => ['ct', 'nc'].indexOf(op) < 0
        const fixed = isFixed(operator)
        const changed = (S.field !== field && fixed) || 
          fixed !== isFixed(S.operator)
        S.field = field
        S.operator = operator
        if (changed) {
          if (fixed) {
            const values = data.reduce((V, row) => {
              if (V.indexOf(row[field]) < 0) {
                V.push(row[field])
              }
              return V
            }, [])
            values.sort()

            form.setProp({
              value: {
                type: P[field].type,
                title: 'Value',
                noValid: true,
                options: values.map(v => ({
                  value: v,
                  label: F[field](v)
                }))
              }
            })
          } else {
            form.setProp({
              value: {
                type: 'string',
                title: 'Value',
                noValid: true,
                minLength: 1
              }
            })
          }
        }
      },
      submit: (Data, {field, operator, value}) => {
        S.field = K[0]
        S.operator = 'ct'
        Data.title = `${field} ${operator} ${value}`
        S.filters.push(Data)
        build()
      }
    })
  }
  const build = () => {
    S.el.replaceWith(ctrl({
      ...btnFilter,
      links: !S.filters.length ? null :
        S.filters.map((f, i) => ({
          icon: 'times',
          title: f.title,
          href: () => {
            S.filters.splice(i, 1)
            build()
          }
        }))
    }))

    run(S.filters.reduce((data, {
      field, operator, value
    }) => data.filter(row => {
      const op = operator
      const v = row[field]
      const f = F[field]
      return v == null ? false :
        op == 'ct' ? f(v).toLowerCase().indexOf(value.toLowerCase()) >= 0 : 
        op == 'nc' ? f(v).toLowerCase().indexOf(value.toLowerCase()) < 0 : 
        op == 'eq' ? v == value : 
        op == 'ne' ? v != value : 
        op == 'gt' ? v > value : 
        op == 'ge' ? v >= value : 
        op == 'lt' ? v < value : 
        op == 'le' ? v <= value : true
    }), data))
  }
  return btnFilter
}
