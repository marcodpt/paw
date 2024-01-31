import spinner from './tags/spinner.js'
import message from './message.js'
import {lang} from './lib.js'

export default (resolve, root) => {
  const render = view => {
    root.innerHTML = typeof view == 'string' ? view : ''
    if (view && typeof view == 'object') {
      root.appendChild(view)
    }
  }

  if (typeof resolve == 'function') {
    render(spinner())
    Promise.resolve().then(() => resolve())
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
