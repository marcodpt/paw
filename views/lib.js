const wait = time => new Promise(resolve => {
  setTimeout(() => {
    resolve(time)
  }, time)
})

export {wait}
