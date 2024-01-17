import e from '../e.js'

export default () => e(({button, span}) => 
  button({
    class: 'navbar-toggler',
    dataBsToggle: 'collapse',
    dataBsTarget: '.navbar-collapse'
  }, [
    span({
      class: 'navbar-toggler-icon'
    })
  ])
)
