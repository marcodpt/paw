import e from '../../e.js'

const id = {}
const uid =  usage => {
  id[usage] = id[usage] ? id[usage] + 1 : 1
  return `app_${usage}_${String(id[usage]).padStart(6, '0')}`
}

export default (target, noFeedback) => e(({div}) =>
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
  }, [].concat(e(X => target({...X, uid}))).concat(noFeedback ? [] : [
    div({
      class: 'invalid-feedback'
    })
  ]))
)
