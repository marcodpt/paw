import {wait} from './lib.js'

export default ({render}) => render(wait(500).then(() => `
  <div class="container my-5">
    <h1>Lazy HTML string</h1>
  </div>
`))
