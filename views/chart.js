export default ({render, chart}) => render(chart({
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
}))
