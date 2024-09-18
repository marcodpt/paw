import {node, ctrl} from '../components.js'

export default ({
  css,
  update,
  submit,
  links,
  block,
  download,
  mime,
  ...schema
}) => {
  var Data = null
  var Label = null
  var hasErr = false
  var submitter = null
  const run = () => typeof submit != 'function' || hasErr ? null :
    submit(Data, Label)

  links = links instanceof Array ? links :
    typeof submit != 'function' ? [] : [{href: 'submit'}]
  links = links.map(l => {
    l.data = Data
    l.size = schema.size
    if (l.href === 'submit') {
      l.link = l.link == null ? 'primary' : l.link
      l.icon = l.icon == null ? 'check' : l.icon
      l.href = typeof submit != 'function' ? null : run
      l.download = download
      l.mime = mime
      submitter = ctrl(l)
      return submitter
    } else {
      return ctrl(l)
    }
  })

  const hasFields = Object.keys(schema.properties || {}).length
  const footer = node(({div}) => !links.length ? null : block ? div({
    class: 'btn-group w-100'
  }, links) : div({
    class: 'row g-1 align-items-center justify-content-'+(
      schema.close == 'modal' ? 'end' :
        !hasFields ? 'center' : 'start'
    )
  }, links.map(L => 
    div({
      class: 'col-auto'
    }, [L])
  )))

  const fields = ctrl({
    type: 'object',
    ...schema,
    update: (err, ...args) => {
      if (submitter) {
        submitter.disabled = !!err
        submitter.parentNode.title = err
      }
      Data = args[0]
      Label = args[1]
      if (typeof update == 'function') {
        update(err, ...args)
      }
    }
  })

  console.log(fields)
  return node(({
    div,
    form,
    hr
  }) => form({
    class: css,
    novalidate: true,
    onsubmit: ev => {
      ev.preventDefault()
      ev.stopPropagation()
      submitter ? submitter.click() : run()
    }
  }, [
    fields,
    !links.length || !fields || fields.nodeType != 1 ? null : hr({
      class: 'my-2'
    }),
    footer
  ]))
} 
