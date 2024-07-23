import menu from './data/menu.js'

export default ({sidebar}) => {
  sidebar(menu)

  const home = document.body.querySelector('main')
    .firstElementChild.cloneNode(true)

  const wait = time => new Promise(resolve => {
    setTimeout(() => {
      resolve(time)
    }, time)
  })

  const print = (x, ident) => {
    ident = ident || ''
    const next = ident+'  '
    return ident+(
      x == null ? 'null' :
      x === true ? 'true' :
      x === false ? 'false' :
      typeof x == 'number' ? String(x) :
      typeof x == 'string' ? `'${x.replaceAll('\n', '\\n')}'` :
      x instanceof Array ? (
        !x.length ? '[]' :
        `[\n${x.map(v => print(v, next)).join(',\n')}\n${ident}]`
      ) : 
      typeof x == 'object' ? (
        x.nodeType === 1 ? x.outerHTML : 
        x.nodeType === 3 ? `document.createTextNode('${x.textContent}')` : 
        !Object.keys(x).length ? '{}' :
        `{\n${Object.keys(x).map(
          k => next+k+': '+print(x[k], next).substr(next.length)
        ).join(',\n')}\n${ident}}`
      ) :
      x.toString().replaceAll('\n        ', '\n')
    )
  }

  return {home, wait, print}
}
