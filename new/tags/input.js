import e from '../e.js'
import {lang, validator, parser} from '../lib.js'

export default ({title, description, css, update, ...schema}) => {
  const validate = validator(schema)
  const parse = parser(schema)
  const change = () => {
    const v = parse(target.value)
    const err = validate(v)
    target.classList.remove(`is-${err ? '' : 'in'}valid`)
    target.classList.add(`is-${err ? 'in' : ''}valid`)
    wrapper.querySelector('.invalid-feedback').textContent = err
    if (typeof update == 'function') {
      update(v, err)
    }
  }
  const target = e(({input}) => input({
    class: 'form-control',
    name: title,
    placeholder: description,
    value: schema.default,
    input: change
  }))
  const wrapper = e(({div}) => div({
    class: css
  }, [
    target,
    div({
      class: 'invalid-feedback'
    })
  ]))
  change()

  return wrapper
}
