import e from './e.js'
import {back} from './tags.js'

export default ({
  ui,
  title,
  description
}) => e(({div, h3, text}) => div({
  class: 'container my-5 mx-auto',
  style: 'max-width: 600px;'
}, [
  !title ? null : h3({}, [
    text(title)
  ]),
  !description ? null : div({
    class: 'alert alert-'+ui,
    role: 'alert',
    style: 'white-space: pre-wrap;'
  }, [
    text(description)
  ]),
  div({
    class: 'row g-2 align-items-center'
  }, [
    div({
      class: 'col-auto'
    }, [
      back()
    ])
  ])
]))
