import schema from '../data/schema.js'

export default () => {
  var btn = null
  return {
    ...schema.links[4],
    mime: 'text/plain; charset=UTF-8',
    download: 'users.txt',
    init: el => {btn = btn || el},
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
