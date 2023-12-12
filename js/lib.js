const copy = X => JSON.parse(JSON.stringify(X))

const setOptions = V => V.map(v => ({value: v, label: v ? v : '_'}))

const interpolate = (str, X) => {
  if (typeof str != 'string') {
    return str
  }
  str = str.replace(/{([^{}]*)}/g, (a, b) => X &&
    (typeof X[b] == 'string' || typeof X[b] == 'number') ? X[b] : '{}'
  )

  if (str.indexOf('{}') >= 0) {
    str = ''
  }

  return str
}

const queryString = Params => Object.keys(Params)
  .reduce((P, key) => P.concat(Params[key] instanceof Array ?
    Params[key].map(value => ({key: `${key}[]`, value})) :
    {key, value: Params[key]}
  ), [])
  .filter(({value}) => typeof value == "number" || typeof value == "string")
  .map(({key, value}) =>
    encodeURIComponent(key)+'='+encodeURIComponent(value)
  ).join("&")

const readFiles = Files => {
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

const parser = ev => {
  const method = ev.target.getAttribute('data-parser')
  const k = ev.target.getAttribute('type') == 'file' ? 'files' : 'value'
  const x = ev.target[k] 

  if (method == 'date:int' || method == 'date:num') {
    if (!x) {
      return 0
    } else {
      var d = new Date(x+'T12:00').getTime() / 1000
      d = d <= 0 ? d-1 : d
      if (method == 'date:int') {
        d = Math.round(d)
      }
      return d
    }
  } else if (method == 'file' || method == 'files') {
    return readFiles(x)
      .then(files => method == 'files' ? files : files[0])
  } else if (method.substr(0, 4) == 'pow:') {
    return Math.round(parseFloat(x) * parseInt(method.substr(4)))
  } else if (method == 'integer') {
    return parseInt(x)
  } else if (method == 'number') {
    return parseFloat(x)
  } else if (method == 'boolean') {
    return x ? true : false
  } else if (method == 'json') {
    return JSON.parse(x)
  } else {
    return x
  }
}

export {copy, setOptions, interpolate, queryString, parser}
