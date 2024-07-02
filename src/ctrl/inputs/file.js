import wrapper from './wrapper.js'

const read = Files => {
  const reader = (file, bin) => new Promise((resolve, reject) => {
    const r = new FileReader()
    const end = data => resolve({
      data: bin && data != null ? btoa(data) : data,
      name: file.name,
      mime: file.type,
      is_base64: bin ? 1 : 0
    })
    r.onloadend = () => {
      !r.error ? end(r.result) : 
        bin ? end(null) : reader(file, true)
    }
    bin ? r.readAsBinaryString(file) : r.readAsText(file, 'UTF-8')
  })
  
  const P = []
  for (var i = 0; i < Files.length; i++) {
    P.push(reader(Files[i], Files[i].type.indexOf('text/') < 0))
  }
  return Promise.all(P)
}

export default ({
  title,
  description,
  type,
  ui,
  readOnly,
  update,
  size
}) => {
  return wrapper(({input}) => 
    input({
      class: [
        'validate',
        'form-control',
        size ? 'form-control-'+size : ''
      ],
      type: 'file',
      name: title,
      placeholder: description,
      disabled: readOnly,
      multiple: type == 'array',
      oninput: ev => {
        if (ui == 'File') {
          update(type != 'array' ? ev.target.files[0] : ev.target.files)
        } else {
          read(ev.target.files).then(files => {
            const names = files.map(({name}) => name)
            if (type == 'array') {
              update(files, names.join('\n'))
            } else if (type == 'object') {
              update(files[0], names[0])
            } else if (type == 'string') {
              update(files[0].data, names[0])
            }
          })
        }
      }
    })
  )
}
