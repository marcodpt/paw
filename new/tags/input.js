import e from '../e.js'

export default ({title, description, ...schema}) => {
  return e(({input}) => input({
    class: 'form-control',
    name: title,
    placeholder: description,
    value: schema.default
  }))
}
