export default ({icon, title, context}) => {
  return {
    icon,
    title,
    context,
    mime: 'text/plain; charset=UTF-8',
    download: 'users.txt',
    href: ({rows, format, properties, query}) => {
      const P = properties
      const K = Object.keys(P).filter(k =>
        !query.group || query.group.indexOf(k) >= 0 || P[k].totals
      )

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
