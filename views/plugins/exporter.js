const Info = {
  link: 'secondary',
  icon: 'file',
  title: 'Export'
}

export default () => {
  var btn = null
  return {
    ...Info,
    mime: 'text/plain; charset=UTF-8',
    download: 'users.txt',
    init: el => {btn = el},
    href: () => {
      const tbl = btn.closest('table')
      const {rows, format, properties} = tbl.read()
      const P = properties
      const K = Object.keys(P)

      const nl = '\n'
      const sep = '\t'
      
      var data = ''
      data += K.map(k => P[k].title || k).join(sep)+nl
      data += rows
        .map(row => K.map(k => format[k](row[k])).join(sep))
        .join(nl)

      return data
    }
  }
}
