import spinner from './tags/spinner.js'
import message from './comp/message.js'
import {lang} from './lib.js'

export default (resolve, root) => {
  const render = view => {
    root.innerHTML = typeof view == 'string' ? view : ''
    if (view && typeof view == 'object') {
      root.appendChild(view)
    }
  }

  if (
    typeof resolve == 'function' ||
    (resolve && typeof resolve.then == 'function')
  ) {
    render(spinner())
    Promise.resolve()
      .then(() => typeof resolve == 'function' ? resolve() : resolve)
      .then(view => render(view))
      .catch(err => {
        const l = lang()
        render(message({
          title: l.error,
          description: err.toString()
        }))
        throw err
      })
  } else {
    render(resolve)
  }
}
