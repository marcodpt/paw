import e from '../e.js'

export default ({
  name 
}) => {
  name = !name || typeof name != 'string' ? '' : 
    name.substr(0, 1) == '@' ? `fa-brands fa-${name.substr(1)}` :
      `fa-solid fa-${name}`

  return e(({i}) => !name ? null : i({
    class: name
  })) 
}

