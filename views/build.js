import deps from '../dependencies.js' 
import menu from './data/menu.js'

var stylesheet = null
var script = null
export default ({sidebar, node, modal}) => {
  sidebar(menu)

  const home = document.body.querySelector('main')
    .firstElementChild.cloneNode(true)

  const wait = time => new Promise(resolve => {
    setTimeout(() => {
      resolve(time)
    }, time)
  })

  const fixIdent = (str, ident) => {
    str = str.trim()
    const Lines = str.split('\n')
    const first = Lines.shift()
    const i = Lines.filter(line => line.trim()).reduce((i, line) => {
      const count = line.search(/\S|$/)
      return i < 0 || count < i ? count : i  
    }, -1)
    const l = Lines.length
    const fix = (line, p) => (p ? ident : '')+line.substr(p ? i : 0)

    return (i <= 0 ? str.split('\n') : [first].concat(Lines))
      .map(fix).join('\n')
  }

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
      ) : fixIdent(x.toString(), ident)
    )
  }

  const highlight = () => {
    const build = () => {
      hljs.highlightAll()
    }
    if (!window.hljs) {
      if (!stylesheet) {
        stylesheet = node(({link}) => 
          link(deps.highlight.css)
        )
        document.head.appendChild(stylesheet)
      }
      if (!script) {
        script = node(({script}) => 
          script({
            src: deps.highlight.js
          })
        )
        document.head.appendChild(script)
      }
      script.addEventListener('load', build)
    } else {
      setTimeout(build, 100)
    }
  }

  const dialog = schema => {
    schema.links = [
      {
        context: 'secondary',
        icon: 'times',
        title: 'Close',
        bs: {
          dismiss: 'modal'
        }
      }
    ].concat(schema.links || []).
      concat(typeof schema.submit != 'function' ? [] : {
        title: 'Submit',
        href: 'submit'
      })
    return modal(schema)
  }

  return {home, wait, print, highlight, dialog}
}
