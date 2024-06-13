import chart from '../src/chart.js'

export default ({
  icon: 'chart-line',
  title: 'chart',
  description: 'Line charts for data analysis.',
  component: chart,
  properties: {},
  examples: [
    {
      title: 'Sales',
      data: [
        {
          title: '$',
          labels: [
            "Jan",
            "Fev",
            "Mar"
          ],
          datasets: [
            {
              data: [
                1.5,
                3,
                4.5
              ],
              borderColor: "blue",
              label: "Sells ($)"
            }, {
              data: [
                2.5,
                3,
                2.5
              ],
              borderColor: "red",
              label: "Expenses ($)"
            }
          ]
        }
      ]
    }
  ]
})
