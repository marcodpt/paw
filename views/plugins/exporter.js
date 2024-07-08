const Info = {
  link: 'secondary',
  icon: 'file',
  title: 'Export'
}

export default ({modal, wait}, schema, data, run) => ({
  ...Info,
  mime: 'text/plain; charset=UTF-8',
  download: (schema.title || 'data').toLowerCase().split(' ').join('_')+'.txt',
  href: ({rows, F}) => {
    const nl = '\n'
    const sep = '\t'

    const P = schema.items.properties
    const K = Object.keys(P)
    
    var data = ''
    data += K.map(k => P[k].title || k).join(sep)+nl
    data += rows
      .map(row => K.map(k => F[k](row[k])).join(sep))
      .join(nl)

    return data
  }
})
