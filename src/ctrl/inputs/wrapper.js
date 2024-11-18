import {node} from '../../components.js'
import {uid} from '../../lib.js'

export default (target, noFeedback, list) => node(({
  div, datalist, option, text
}) => {
  let id = null
  let value = null
  const clear = ev => {
    value = ev.target.value
    ev.target.value = ''
  }
  const blur = ev => {
    if (!ev.target.value && value != null) {
      ev.target.value = value
    }
  }

  return div({
    class: 'position-relative',
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
  }, [].concat(node(target)).map((el, i) => {
    if (!i) {
      id = list ? uid('list') : null
      if (id) {
        el.setAttribute('list', id)
        el.addEventListener('focus', clear)
        el.addEventListener('blur', blur)
      }
    }
    return el
  }).concat(!list || !id ? [] : 
    datalist({
      id
    }, list.map(o => typeof o == 'object' && o.value != null ? 
      option({
        value: o.value
      }, [
        text(o.label)
      ]) :
      option({}, [
        text(o)
      ])
    ))
  ).concat(noFeedback ? [] : [
    div({
      class: 'invalid-feedback'
    })
  ]))
})
