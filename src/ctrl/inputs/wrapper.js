import e from '../../e.js'

export default target => e(({div}) =>
  div({
    validate: (el, error) => {
      el.querySelectorAll('.validate').forEach(ctrl => {
        ctrl.classList.remove('is-valid')
        ctrl.classList.remove('is-invalid')
        if (error) {
          ctrl.classList.add('is-invalid')
        } else if (error === '') {
          ctrl.classList.add('is-valid')
        }
      })
      el.querySelector('.invalid-feedback').textContent = error || ''
    }
  }, [].concat(e(X => target(X))).concat([
    div({
      class: 'invalid-feedback'
    })
  ]))
)
