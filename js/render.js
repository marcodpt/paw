import spinner from './comp/spinner.js'
import form from './comp/form.js'
import T from './lang/index.js'

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
        render(form({
          title: T('error'),
          description: err.toString(),
          ui: 'danger',
          css: 'mx-auto my-5'
        }))
        throw err
      })
  } else {
    render(resolve)
  }
}
