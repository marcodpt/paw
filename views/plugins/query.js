import schema from '../data/schema.js'

export default ({modal, ctrl}, users) => {
  var btn = null

  const S = {
    filters: []
  }

  const btnQuery = {
    ...schema.links[2],
    init: el => {btn = btn || el},
    href: () => {
      const tbl = btn.closest('table')
      const {format, properties} = tbl.read()
      const P = properties
      const K = Object.keys(P)
      S.field = null
      S.operator = null
      S.value = null

      modal({
        ...schema.links[2],
        properties: {
          field: {
            type: 'string',
            title: 'Field',
            default: K[0],
            options: K.map(k => ({
              value: k,
              label: P[k].title || k
            }))
          },
          operator: {
            type: 'string',
            title: 'Operator',
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
            title: 'Value'
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
              const values = users.reduce((V, row) => {
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
                  options: values.map(v => ({
                    value: v,
                    label: format[field](v)
                  }))
                }
              })
            } else {
              form.setProp({
                value: {
                  type: 'string',
                  title: 'Value',
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

      const build = () => {
        const ref = ctrl({
          ...btnQuery,
          links: !S.filters.length ? null :
            S.filters.map((f, i) => ({
              icon: 'times',
              title: f.title,
              href: () => {
                S.filters.splice(i, 1)
                build()
              }
            }))
        })
        btn.replaceWith(ref)
        btn = ref

        tbl.setData(S.filters.reduce((users, {
          field, operator, value
        }) => users.filter(row => {
          const op = operator
          const v = row[field]
          const f = format[field]
          return v == null ? false :
            op == 'ct' ? f(v).toLowerCase().indexOf(value.toLowerCase()) >= 0 : 
            op == 'nc' ? f(v).toLowerCase().indexOf(value.toLowerCase()) < 0 : 
            op == 'eq' ? v == value : 
            op == 'ne' ? v != value : 
            op == 'gt' ? v > value : 
            op == 'ge' ? v >= value : 
            op == 'lt' ? v < value : 
            op == 'le' ? v <= value : true
        }), users))
      }
    }
  }
  return btnQuery
}
