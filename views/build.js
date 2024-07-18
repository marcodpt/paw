import menu from './data/menu.js'

export default ({nav}) => {
  nav(menu)
  const home = document.body.querySelector('main')
    .firstElementChild.cloneNode(true)
  const wait = time => new Promise(resolve => {
    setTimeout(() => {
      resolve(time)
    }, time)
  })
  return {home, wait}
}
