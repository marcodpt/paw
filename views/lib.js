import {download} from '../js/lib.js'

const wait = time => new Promise(resolve => {
  setTimeout(() => {
    resolve(time)
  }, time)
})

export {wait, download}
