export default ({render, wait}) => render(wait(500).then(() => `
  <div class="container my-5">
    <h1>Lazy HTML string</h1>
  </div>
`))
