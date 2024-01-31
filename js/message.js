import e from './e.js'
import back from './tags/back.js'
import alert from './tags/alert.js'

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
  alert(description, ui),
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
