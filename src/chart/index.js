import {node, spinner} from '../components.js'
import deps from '../../dependencies.js' 

export default ({
  title,
  labels,
  datasets
}) => {
  const loading = spinner()
  const chart = node(({
    div, canvas
  }) =>
    div({
      class: 'w-100'
    }, [
      div({
        class: 'p-5 h-100'
      }, [
        div({
          class: 'card mb-3 h-100'
        }, [
          loading,
          canvas({
            class: 'h-100 w-100 m-auto'
          })
        ])
      ])
    ])
  )

  Promise.resolve().then(() => window.Chart != null ? null :
    import(deps.chart)
  ).then(() => {
    loading.parentNode.removeChild(loading)
    new Chart(chart.querySelector('canvas').getContext('2d'), {
      type: 'line',
      data: {
        labels,
        datasets: datasets.map((dataset, i) => ({
          label: 'data'+(i+1),
          data: labels.map(() => 0),
          borderColor: 'black',
          fill: false,
          pointStyle: 'circle',
          ...dataset
        }))
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: !!title,
            text: title
          }
        }
      }
    })
  })

  return chart
}
