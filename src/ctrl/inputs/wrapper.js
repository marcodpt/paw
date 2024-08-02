import node from '../../hyperscript/node.js'

export default (target, noFeedback) => node(({div}) =>
  div({
    validate: (el, error) => {
      el.querySelectorAll('.invalid-feedback').forEach(feedback => {
        feedback.textContent = ''
      })
      el.querySelectorAll('.is-valid, .is-invalid').forEach(ctrl => {
        ctrl.classList.remove('is-valid', 'is-invalid')
      })
      el.querySelectorAll('.validate').forEach(ctrl => {
        if (error) {
          ctrl.classList.add('is-invalid')
        } else if (error === '') {
          ctrl.classList.add('is-valid')
        }
        const feedback = ctrl.parentNode.querySelector('.invalid-feedback')
        if (feedback) {
          feedback.textContent = error || ''
        }
      })
    }
  }, [].concat(node(target)).concat(noFeedback ? [] : [
    div({
      class: 'invalid-feedback'
    })
  ]))
)
