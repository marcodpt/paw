import e from '../e.js'
import style from '../config/style.js'
import fields from '../tags/fields.js'
import link from '../tags/link.js'
import T from '../lang/index.js'

export default ({
  css,
  update,
  submit,
  links,
  block,
  ...schema
}) => {
  const K = Object.keys(schema.properties || {})
  const hasAlert = schema.ui && schema.description
  var Data = schema.default || {}
  var err = false
  var submitter = null
  const run = () => typeof submit != 'function' || err ? null : submit(Data)

  links = links instanceof Array ? links :
    typeof submit != 'function' ? [] : [{href: 'submit'}]
  links = links.map(l => {
    l.data = Data
    l.size = schema.size
    if (l.href === 'submit') {
      l.title = l.title == null ? T('submit') : l.title
      l.link = l.link == null ? 'primary' : l.link
      l.icon = l.icon == null ? 'check' : l.icon
      l.href = typeof submit != 'function' ? null : run
      submitter = link(l)
      return submitter
    } else {
      return link(l)
    }
  })

  return e(({
    div,
    form,
    fieldset,
    legend,
    label,
    text,
    a,
    hr
  }) => div({
    class: css,
    style: K.length ? null : style.alert
  }, [
    form({
      novalidate: true,
      onsubmit: ev => {
        ev.preventDefault()
        ev.stopPropagation()
        submitter ? submitter.click() : run()
      }
    }, [
      fields({
        ...schema,
        update: (error, data) => {
          Data = data
          err = error
          if (submitter) {
            submitter.disabled = !!err
          }
          if (typeof update == 'function') {
            update(err, Data)
          }
        } 
      }),
      !links.length || (!K.length && !hasAlert) ? null : hr({
        class: 'my-2'
      }),
      !links.length ? null : block ? div({
        class: 'btn-group w-100'
      }, links) : div({
        class: 'row g-2 align-items-center justify-content-'+
          (schema.close == 'modal' ? 'end' : 'start')
      }, links.map(L => 
        div({
          class: 'col-auto'
        }, [L])
      ))
    ])
  ]))
} 
