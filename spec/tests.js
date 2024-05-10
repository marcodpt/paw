import spec from './index.js'

const text = str => str.trim()
    .replace(/\\n/g, () => ' ')
    .replace(/>\s+</g, () => '><')
    .replace(/"\s+>/g, () => '">')
    .replace(/\s+/g, () => ' ')

spec.forEach(({title, examples}) => {
  var module
  QUnit.module(title, {
    before: () => import(`../src/${title}.js`)
      .then(mod => module = mod.default)
  }, () => {
    examples.forEach(({title, data, html}) => {
      QUnit.test(title, assert => {
        data.forEach(X => {
          const res = module(X)
          assert.equal(
            text(res.nodeType === 3 ? res.textContent : res.outerHTML),
            text(html)
          )
        })
      })
    })
  })
})
