import spinner from '../spinner/index.js'
import form from '../form/index.js'
import T from '../lang/index.js'

export default (resolve, root) => {
  root = root || document.createElement('div')
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
        render(form({
          title: T('error'),
          description: err.toString(),
          context: 'danger',
          css: 'd-flex justify-content-center my-5'
        }))
        throw err
      })
  } else {
    render(resolve)
  }
  return root
}
